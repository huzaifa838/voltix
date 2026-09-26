'use client'

import { useEffect, useRef } from 'react'

import { usePlayerStore } from '@/store/playerStore'

export interface AudioEngineConfig {
  onTimeUpdate?: (currentTime: number) => void
  onDurationChange?: (duration: number) => void
  onEnded?: () => void
  onError?: (error: string) => void
}

let audioInstance: HTMLAudioElement | null = null
let audioContextInstance: AudioContext | null = null
let analyserInstance: AnalyserNode | null = null
let sourceInstance: MediaElementAudioSourceNode | null = null

let connectedAudioElement: HTMLAudioElement | null = null

export function getAudioElement(): HTMLAudioElement {
  if (typeof window === 'undefined') {
    throw new Error('Audio element is only available in the browser.')
  }

  if (!audioInstance) {
    audioInstance = new Audio()

    audioInstance.preload = 'auto'
    audioInstance.crossOrigin = 'anonymous'
  }

  return audioInstance
}

/**
 * Creates the Web Audio analyser only once.
 *
 * Important:
 * A MediaElementAudioSourceNode can only be created once
 * for the same HTMLAudioElement.
 */
function getAnalyser(
  audio: HTMLAudioElement,
): AnalyserNode | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    if (!audioContextInstance) {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext
          }
        ).webkitAudioContext

      if (!AudioContextClass) {
        return null
      }

      audioContextInstance = new AudioContextClass()
    }

    if (!sourceInstance) {
      sourceInstance =
        audioContextInstance.createMediaElementSource(audio)

      connectedAudioElement = audio
    }

    if (!analyserInstance) {
      analyserInstance =
        audioContextInstance.createAnalyser()

      analyserInstance.fftSize = 2048
      analyserInstance.smoothingTimeConstant = 0.82

      sourceInstance.connect(analyserInstance)
      analyserInstance.connect(audioContextInstance.destination)
    }

    return analyserInstance
  } catch (error) {
    console.warn(
      'VOLTIX AUDIO OS: Web Audio analyser unavailable.',
      error,
    )

    return null
  }
}

export function getAnalyserNode(): AnalyserNode | null {
  if (!audioInstance) {
    return null
  }

  return getAnalyser(audioInstance)
}

export function getWaveformData(): Uint8Array | null {
  const analyser = getAnalyserNode()

  if (!analyser) {
    return null
  }

  const data = new Uint8Array(analyser.fftSize)

  analyser.getByteTimeDomainData(data)

  return data
}

export function getFrequencyData(): Uint8Array | null {
  const analyser = getAnalyserNode()

  if (!analyser) {
    return null
  }

  const data = new Uint8Array(analyser.frequencyBinCount)

  analyser.getByteFrequencyData(data)

  return data
}

export function getAudioContext(): AudioContext | null {
  return audioContextInstance
}

async function resumeAudioContext() {
  if (!audioContextInstance) {
    return
  }

  if (audioContextInstance.state === 'suspended') {
    try {
      await audioContextInstance.resume()
    } catch {
      // Browser may reject resume until user interaction.
    }
  }
}

export function useAudioEngine(
  config: AudioEngineConfig = {},
) {
  /*
   * IMPORTANT:
   * Use individual Zustand selectors here.
   *
   * Selecting a new object on every render can create an
   * infinite update loop in React/Zustand.
   */
  const currentTrack = usePlayerStore(
    (state) => state.currentTrack,
  )

  const isPlaying = usePlayerStore(
    (state) => state.isPlaying,
  )

  const volume = usePlayerStore(
    (state) => state.volume,
  )

  const isMuted = usePlayerStore(
    (state) => state.isMuted,
  )

  const repeat = usePlayerStore(
    (state) => state.repeat,
  )

  const setIsPlaying = usePlayerStore(
    (state) => state.setIsPlaying,
  )

  const setCurrentTime = usePlayerStore(
    (state) => state.setCurrentTime,
  )

  const setDuration = usePlayerStore(
    (state) => state.setDuration,
  )

  const setBuffered = usePlayerStore(
    (state) => state.setBuffered,
  )

  const setLoading = usePlayerStore(
    (state) => state.setLoading,
  )

  const setError = usePlayerStore(
    (state) => state.setError,
  )

  const next = usePlayerStore(
    (state) => state.next,
  )

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const currentTrackIdRef = useRef<string | null>(null)

  const configRef = useRef<AudioEngineConfig>(config)

  useEffect(() => {
    configRef.current = config
  }, [config])

  /*
   * Create the global audio element once.
   */
  useEffect(() => {
    const audio = getAudioElement()

    audioRef.current = audio

    /*
     * Lazily initialize Web Audio.
     *
     * This is attempted here, but playback can still work
     * normally if the browser blocks AudioContext creation.
     */
    getAnalyser(audio)

    return () => {
      /*
       * Do NOT destroy or pause the global audio element here.
       *
       * The player must remain alive while navigating between
       * pages.
       */
      audioRef.current = audio
    }
  }, [])

  /*
   * Audio event listeners.
   */
  useEffect(() => {
    const audio = getAudioElement()

    const handleLoadStart = () => {
      setLoading(true)
      setBuffered(0)
    }

    const handleLoadedMetadata = () => {
      const nextDuration = Number.isFinite(audio.duration)
        ? audio.duration
        : 0

      setDuration(nextDuration)
      setLoading(false)

      configRef.current.onDurationChange?.(nextDuration)
    }

    const handleDurationChange = () => {
      const nextDuration = Number.isFinite(audio.duration)
        ? audio.duration
        : 0

      setDuration(nextDuration)

      configRef.current.onDurationChange?.(nextDuration)
    }

    const handleCanPlay = () => {
      setLoading(false)
    }

    const handleTimeUpdate = () => {
      const time = Number.isFinite(audio.currentTime)
        ? audio.currentTime
        : 0

      setCurrentTime(time)

      configRef.current.onTimeUpdate?.(time)
    }

    const handleProgress = () => {
      try {
        if (audio.duration > 0 && audio.buffered.length > 0) {
          const bufferedEnd = audio.buffered.end(
            audio.buffered.length - 1,
          )

          const percentage = Math.min(
            100,
            Math.max(
              0,
              (bufferedEnd / audio.duration) * 100,
            ),
          )

          setBuffered(percentage)
        }
      } catch {
        // Buffered ranges may change while the source is loading.
      }
    }

    const handlePlay = () => {
      setIsPlaying(true)
      setLoading(false)
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handleWaiting = () => {
      setLoading(true)
    }

    const handlePlaying = () => {
      setLoading(false)
      setIsPlaying(true)
    }

    const handleVolumeChange = () => {
      /*
       * The Zustand store is the source of truth for volume.
       * No additional store update is required here.
       */
    }

    const handleError = () => {
      const mediaError = audio.error

      let message = 'Unable to load audio.'

      if (mediaError) {
        switch (mediaError.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            message = 'Audio loading was aborted.'
            break

          case MediaError.MEDIA_ERR_NETWORK:
            message = 'Network error while loading audio.'
            break

          case MediaError.MEDIA_ERR_DECODE:
            message = 'Audio format could not be decoded.'
            break

          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            message =
              'Audio source is missing or unsupported.'
            break

          default:
            message = 'Unknown audio engine error.'
        }
      }

      setError(message)

      configRef.current.onError?.(message)
    }

    const handleEnded = async () => {
      configRef.current.onEnded?.()

      /*
       * Repeat-one is handled directly because the currentTrack
       * does not change. That means waiting for the currentTrack
       * effect would not reload the audio source.
       */
      if (repeat === 'one') {
        try {
          audio.currentTime = 0

          await resumeAudioContext()

          await audio.play()

          setCurrentTime(0)
          setIsPlaying(true)

          return
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : 'Unable to repeat track.'

          setError(message)
          setIsPlaying(false)

          return
        }
      }

      /*
       * Repeat-all and normal queue progression are handled
       * by the Zustand queue engine.
       */
      next()
    }

    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener(
      'loadedmetadata',
      handleLoadedMetadata,
    )
    audio.addEventListener(
      'durationchange',
      handleDurationChange,
    )
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('progress', handleProgress)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener(
      'volumechange',
      handleVolumeChange,
    )
    audio.addEventListener('error', handleError)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener(
        'loadstart',
        handleLoadStart,
      )
      audio.removeEventListener(
        'loadedmetadata',
        handleLoadedMetadata,
      )
      audio.removeEventListener(
        'durationchange',
        handleDurationChange,
      )
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener(
        'timeupdate',
        handleTimeUpdate,
      )
      audio.removeEventListener('progress', handleProgress)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener(
        'playing',
        handlePlaying,
      )
      audio.removeEventListener(
        'volumechange',
        handleVolumeChange,
      )
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [
    next,
    repeat,
    setBuffered,
    setCurrentTime,
    setDuration,
    setError,
    setIsPlaying,
    setLoading,
  ])

  /*
   * Load a new track whenever the global currentTrack changes.
   */
  useEffect(() => {
    const audio = getAudioElement()

    if (!currentTrack) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()

      currentTrackIdRef.current = null

      setCurrentTime(0)
      setDuration(0)
      setBuffered(0)
      setLoading(false)

      return
    }

    /*
     * Prevent the same track from being loaded repeatedly.
     */
    if (currentTrackIdRef.current === currentTrack.id) {
      return
    }

    currentTrackIdRef.current = currentTrack.id

    const nextSource = currentTrack.audioUrl

    if (!nextSource) {
      setError('This track does not have an audio URL.')
      setIsPlaying(false)

      return
    }

    setLoading(true)
    setError(null)
    setCurrentTime(0)
    setBuffered(0)

    audio.pause()

    audio.src = nextSource
    audio.currentTime = 0
    audio.preload = 'auto'

    audio.load()
  }, [
    currentTrack,
    setBuffered,
    setCurrentTime,
    setDuration,
    setError,
    setIsPlaying,
    setLoading,
  ])

  /*
   * Apply volume and mute state.
   */
  useEffect(() => {
    const audio = getAudioElement()

    const safeVolume = Math.min(
      1,
      Math.max(0, volume),
    )

    audio.volume = safeVolume
    audio.muted = isMuted || safeVolume === 0
  }, [isMuted, volume])

  /*
   * Synchronize play / pause state with the actual audio element.
   */
  useEffect(() => {
    const audio = getAudioElement()

    if (!currentTrack) {
      audio.pause()
      return
    }

    if (!isPlaying) {
      if (!audio.paused) {
        audio.pause()
      }

      return
    }

    let cancelled = false

    const startPlayback = async () => {
      try {
        await resumeAudioContext()

        if (cancelled) {
          return
        }

        /*
         * Do not call play() if the browser already considers
         * the element playing.
         */
        if (!audio.paused) {
          return
        }

        await audio.play()
      } catch (error) {
        if (cancelled) {
          return
        }

        const message =
          error instanceof Error
            ? error.message
            : 'Browser prevented audio playback.'

        setError(message)
        setIsPlaying(false)
      }
    }

    startPlayback()

    return () => {
      cancelled = true
    }
  }, [
    currentTrack,
    isPlaying,
    setError,
    setIsPlaying,
  ])

  /*
   * Keep store seek position synchronized with the global
   * HTMLAudioElement when the user seeks through Zustand.
   */
  const currentTime = usePlayerStore(
    (state) => state.currentTime,
  )

  useEffect(() => {
    const audio = getAudioElement()

    if (!currentTrack) {
      return
    }

    const difference = Math.abs(
      audio.currentTime - currentTime,
    )

    /*
     * Ignore normal timeupdate drift.
     * Only update the media element for an actual seek.
     */
    if (difference > 0.35) {
      try {
        audio.currentTime = Math.max(
          0,
          Math.min(
            currentTime,
            Number.isFinite(audio.duration)
              ? audio.duration
              : currentTime,
          ),
        )
      } catch {
        // Ignore invalid seek attempts while media is loading.
      }
    }
  }, [currentTime, currentTrack])

  /*
   * Expose the audio element through the global browser object
   * for debugging during development.
   */
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const globalWindow = window as typeof window & {
      __VOLTIX_AUDIO__?: HTMLAudioElement
      __VOLTIX_ANALYSER__?: AnalyserNode | null
    }

    globalWindow.__VOLTIX_AUDIO__ = getAudioElement()
    globalWindow.__VOLTIX_ANALYSER__ = getAnalyserNode()

    return () => {
      /*
       * Deliberately leave the global audio engine alive.
       */
      if (
        globalWindow.__VOLTIX_AUDIO__ ===
        getAudioElement()
      ) {
        globalWindow.__VOLTIX_AUDIO__ =
          getAudioElement()
      }

      globalWindow.__VOLTIX_ANALYSER__ =
        analyserInstance
    }
  }, [])

  /*
   * connectedAudioElement is intentionally retained so the
   * MediaElementAudioSourceNode is never recreated.
   */
  void connectedAudioElement
}