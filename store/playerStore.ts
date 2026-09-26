'use client'

import { create } from 'zustand'

import type { RepeatMode, Track } from '@/types'

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean

  currentTime: number
  duration: number
  buffered: number

  volume: number
  previousVolume: number
  isMuted: boolean

  queue: Track[]
  queueIndex: number

  shuffle: boolean
  repeat: RepeatMode

  isLoading: boolean
  error: string | null

  setCurrentTrack: (track: Track | null) => void
  setIsPlaying: (playing: boolean) => void

  setCurrentTime: (time: number) => void
  setDuration: (duration: number) => void
  setBuffered: (buffered: number) => void

  setVolumeValue: (volume: number) => void
  mute: () => void
  unmute: () => void

  setQueue: (queue: Track[]) => void
  setQueueIndex: (index: number) => void

  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void

  play: () => void
  pause: () => void
  togglePlay: () => void

  playTrack: (track: Track, queueOverride?: Track[]) => void
  playQueue: (
    tracks: Track[],
    startTrack?: Track,
    shouldShuffle?: boolean,
  ) => void

  next: () => void
  previous: () => void

  seek: (time: number) => void

  toggleShuffle: () => void
  toggleRepeat: () => void

  addToQueue: (track: Track) => void
  removeFromQueue: (index: number) => void
  clearQueue: () => void

  resetPlayer: () => void
}

function shuffleTracks(tracks: Track[]) {
  const result = [...tracks]

  for (let i = result.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    ;[result[i], result[randomIndex]] = [
      result[randomIndex],
      result[i],
    ]
  }

  return result
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,

  currentTime: 0,
  duration: 0,
  buffered: 0,

  volume: 1,
  previousVolume: 1,
  isMuted: false,

  queue: [],
  queueIndex: -1,

  shuffle: false,
  repeat: 'off',

  isLoading: false,
  error: null,

  setCurrentTrack: (track) =>
    set({
      currentTrack: track,
      currentTime: 0,
      duration: track?.duration || 0,
      error: null,
    }),

  setIsPlaying: (playing) =>
    set({
      isPlaying: playing,
    }),

  setCurrentTime: (time) =>
    set({
      currentTime: Math.max(0, time),
    }),

  setDuration: (duration) =>
    set({
      duration:
        Number.isFinite(duration) && duration > 0 ? duration : 0,
    }),

  setBuffered: (buffered) =>
    set({
      buffered: Math.min(100, Math.max(0, buffered)),
    }),

  setVolumeValue: (volume) => {
    const safeVolume = Math.min(1, Math.max(0, volume))

    set({
      volume: safeVolume,
      isMuted: safeVolume === 0,
      previousVolume:
        safeVolume > 0 ? safeVolume : get().previousVolume,
    })
  },

  mute: () => {
    const { volume } = get()

    set({
      previousVolume: volume > 0 ? volume : 1,
      isMuted: true,
      volume: 0,
    })
  },

  unmute: () => {
    const { previousVolume } = get()

    const restoredVolume =
      previousVolume > 0 ? previousVolume : 1

    set({
      volume: restoredVolume,
      previousVolume: restoredVolume,
      isMuted: false,
    })
  },

  setQueue: (queue) =>
    set({
      queue,
      queueIndex: queue.length > 0 ? 0 : -1,
    }),

  setQueueIndex: (index) =>
    set({
      queueIndex:
        index >= 0 && index < get().queue.length ? index : -1,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setError: (error) =>
    set({
      error,
      isLoading: false,
    }),

  play: () =>
    set({
      isPlaying: true,
      error: null,
    }),

  pause: () =>
    set({
      isPlaying: false,
    }),

  togglePlay: () => {
    const { currentTrack, isPlaying } = get()

    if (!currentTrack) {
      return
    }

    set({
      isPlaying: !isPlaying,
    })
  },

  playTrack: (track, queueOverride) => {
    const currentQueue = queueOverride?.length
      ? queueOverride
      : [track]

    const selectedIndex = currentQueue.findIndex(
      (item) => item.id === track.id,
    )

    set({
      currentTrack: track,
      queue: currentQueue,
      queueIndex: selectedIndex >= 0 ? selectedIndex : 0,
      currentTime: 0,
      duration: track.duration || 0,
      isPlaying: true,
      error: null,
      isLoading: true,
    })
  },

  playQueue: (tracks, startTrack, shouldShuffle) => {
    if (tracks.length === 0) {
      return
    }

    let nextQueue = [...tracks]

    const shouldUseShuffle =
      typeof shouldShuffle === 'boolean'
        ? shouldShuffle
        : get().shuffle

    if (shouldUseShuffle) {
      nextQueue = shuffleTracks(nextQueue)
    }

    let startIndex = 0

    if (startTrack) {
      const selectedIndex = nextQueue.findIndex(
        (track) => track.id === startTrack.id,
      )

      if (selectedIndex >= 0) {
        startIndex = selectedIndex
      } else {
        nextQueue.unshift(startTrack)
        startIndex = 0
      }
    }

    const selectedTrack = nextQueue[startIndex]

    set({
      queue: nextQueue,
      queueIndex: startIndex,
      currentTrack: selectedTrack,
      currentTime: 0,
      duration: selectedTrack?.duration || 0,
      isPlaying: true,
      error: null,
      isLoading: true,
    })
  },

  next: () => {
    const {
      queue,
      queueIndex,
      repeat,
    } = get()

    if (queue.length === 0) {
      return
    }

    /*
     * Repeat-one:
     * Keep the same track and restart it.
     */
    if (repeat === 'one') {
      set({
        currentTime: 0,
        isPlaying: true,
        isLoading: true,
      })

      return
    }

    let nextIndex = queueIndex + 1

    /*
     * End of queue.
     */
    if (nextIndex >= queue.length) {
      if (repeat === 'all') {
        nextIndex = 0
      } else {
        set({
          isPlaying: false,
          currentTime: 0,
        })

        return
      }
    }

    const nextTrack = queue[nextIndex]

    if (!nextTrack) {
      return
    }

    set({
      currentTrack: nextTrack,
      queueIndex: nextIndex,
      currentTime: 0,
      duration: nextTrack.duration || 0,
      isPlaying: true,
      error: null,
      isLoading: true,
    })
  },

  previous: () => {
    const {
      currentTime,
      queue,
      queueIndex,
      repeat,
    } = get()

    if (queue.length === 0) {
      return
    }

    /*
     * Spotify-style behavior:
     * pressing previous within the first few seconds
     * goes to the previous track; otherwise restart
     * the current track.
     */
    if (currentTime > 3) {
      set({
        currentTime: 0,
      })

      return
    }

    let previousIndex = queueIndex - 1

    if (previousIndex < 0) {
      if (repeat === 'all') {
        previousIndex = queue.length - 1
      } else {
        previousIndex = 0
      }
    }

    const previousTrack = queue[previousIndex]

    if (!previousTrack) {
      return
    }

    set({
      currentTrack: previousTrack,
      queueIndex: previousIndex,
      currentTime: 0,
      duration: previousTrack.duration || 0,
      isPlaying: true,
      error: null,
      isLoading: true,
    })
  },

  seek: (time) => {
    const { duration } = get()

    const maxTime = duration > 0 ? duration : Infinity

    set({
      currentTime: Math.min(
        Math.max(0, time),
        maxTime,
      ),
    })
  },

  toggleShuffle: () => {
    const {
      shuffle,
      queue,
      currentTrack,
    } = get()

    if (queue.length <= 1) {
      set({
        shuffle: !shuffle,
      })

      return
    }

    /*
     * Turning shuffle ON:
     * keep the currently playing track first,
     * then randomize everything else.
     */
    if (!shuffle) {
      let remainingTracks = queue.filter(
        (track) => track.id !== currentTrack?.id,
      )

      remainingTracks = shuffleTracks(remainingTracks)

      const shuffledQueue = currentTrack
        ? [currentTrack, ...remainingTracks]
        : remainingTracks

      set({
        shuffle: true,
        queue: shuffledQueue,
        queueIndex: currentTrack ? 0 : -1,
      })

      return
    }

    /*
     * Turning shuffle OFF:
     * restore the original order as much as possible
     * using the current queue as the source.
     *
     * Since the original order is not persisted separately,
     * the current queue order is retained.
     */
    set({
      shuffle: false,
    })
  },

  toggleRepeat: () => {
    const { repeat } = get()

    if (repeat === 'off') {
      set({
        repeat: 'all',
      })

      return
    }

    if (repeat === 'all') {
      set({
        repeat: 'one',
      })

      return
    }

    set({
      repeat: 'off',
    })
  },

  addToQueue: (track) => {
    const { queue } = get()

    /*
     * Prevent accidental duplicate queue entries.
     */
    const alreadyExists = queue.some(
      (item) => item.id === track.id,
    )

    if (alreadyExists) {
      return
    }

    set({
      queue: [...queue, track],
    })
  },

  removeFromQueue: (index) => {
    const {
      queue,
      queueIndex,
      currentTrack,
    } = get()

    if (index < 0 || index >= queue.length) {
      return
    }

    const removedTrack = queue[index]
    const nextQueue = queue.filter((_, i) => i !== index)

    /*
     * Removing the currently playing track:
     * move to the next valid item when possible.
     */
    if (removedTrack?.id === currentTrack?.id) {
      if (nextQueue.length === 0) {
        set({
          queue: [],
          queueIndex: -1,
          currentTrack: null,
          isPlaying: false,
          currentTime: 0,
          duration: 0,
        })

        return
      }

      const nextIndex = Math.min(
        queueIndex,
        nextQueue.length - 1,
      )

      const nextTrack = nextQueue[nextIndex]

      set({
        queue: nextQueue,
        queueIndex: nextIndex,
        currentTrack: nextTrack,
        currentTime: 0,
        duration: nextTrack?.duration || 0,
      })

      return
    }

    let nextQueueIndex = queueIndex

    if (index < queueIndex) {
      nextQueueIndex = queueIndex - 1
    }

    set({
      queue: nextQueue,
      queueIndex: nextQueueIndex,
    })
  },

  clearQueue: () => {
    const { currentTrack } = get()

    /*
     * Keep the active track as a standalone queue entry.
     * This allows the player to remain usable after clearing.
     */
    if (currentTrack) {
      set({
        queue: [currentTrack],
        queueIndex: 0,
      })

      return
    }

    set({
      queue: [],
      queueIndex: -1,
    })
  },

  resetPlayer: () =>
    set({
      currentTrack: null,
      isPlaying: false,

      currentTime: 0,
      duration: 0,
      buffered: 0,

      queue: [],
      queueIndex: -1,

      isLoading: false,
      error: null,
    }),
}))