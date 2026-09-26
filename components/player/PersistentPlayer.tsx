'use client'

import Link from 'next/link'
import {
  ChevronUp,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'

import { usePlayerStore } from '@/store/playerStore'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

interface PersistentPlayerProps {
  isMobile?: boolean
}

export default function PersistentPlayer({
  isMobile = false,
}: PersistentPlayerProps) {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const currentTime = usePlayerStore((state) => state.currentTime)
  const duration = usePlayerStore((state) => state.duration)
  const volume = usePlayerStore((state) => state.volume)
  const isMuted = usePlayerStore((state) => state.isMuted)
  const shuffle = usePlayerStore((state) => state.shuffle)
  const repeat = usePlayerStore((state) => state.repeat)

  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const next = usePlayerStore((state) => state.next)
  const previous = usePlayerStore((state) => state.previous)
  const seek = usePlayerStore((state) => state.seek)
  const setVolumeValue = usePlayerStore((state) => state.setVolumeValue)
  const mute = usePlayerStore((state) => state.mute)
  const unmute = usePlayerStore((state) => state.unmute)
  const toggleShuffle = usePlayerStore((state) => state.toggleShuffle)
  const toggleRepeat = usePlayerStore((state) => state.toggleRepeat)

  const progress =
    duration > 0
      ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
      : 0

  if (isMobile) {
    return (
      <div className="fixed inset-x-2 bottom-[76px] z-40">
        <div className="relative overflow-hidden border border-cyan-400/20 bg-[#05090a]/95 shadow-[0_0_35px_rgba(0,0,0,0.55)] backdrop-blur-xl">
          {/* Top signal line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          {/* Progress */}
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-white/5">
            <div
              className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {currentTrack ? (
            <div className="p-3">
              <div className="flex items-center gap-3">
                {/* Artwork */}
                <Link
                  href="/now-playing"
                  className="relative h-11 w-11 shrink-0 overflow-hidden border border-cyan-400/20 bg-cyan-400/5"
                >
                  <img
                    src={currentTrack.artworkUrl || '/images/default.jpg'}
                    alt=""
                    className="h-full w-full object-cover opacity-80"
                  />

                  <div className="absolute inset-0 bg-cyan-400/10" />

                  {isPlaying && (
                    <span className="absolute bottom-1 right-1 h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_7px_rgba(103,232,249,0.8)]" />
                  )}
                </Link>

                {/* Track info */}
                <Link
                  href="/now-playing"
                  className="min-w-0 flex-1"
                >
                  <div className="truncate text-xs font-semibold text-white">
                    {currentTrack.title}
                  </div>

                  <div className="mt-0.5 truncate font-mono text-[8px] uppercase tracking-wider text-slate-600">
                    {currentTrack.artistName}
                  </div>
                </Link>

                {/* Controls */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={previous}
                    className="flex h-8 w-8 items-center justify-center text-slate-500 transition hover:text-cyan-300"
                    aria-label="Previous track"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-9 w-9 items-center justify-center border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition hover:bg-cyan-400/20"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-4 w-4 fill-current" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="flex h-8 w-8 items-center justify-center text-slate-500 transition hover:text-cyan-300"
                    aria-label="Next track"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between font-mono text-[7px] uppercase tracking-widest text-slate-700">
                <span>{formatTime(currentTime)}</span>
                <span className="flex items-center gap-1 text-green-400/50">
                  <span className="h-1 w-1 animate-pulse rounded-full bg-green-400" />
                  LIVE
                </span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3">
              <div className="flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.02]">
                <Volume2 className="h-4 w-4 text-slate-700" />
              </div>

              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-600">
                  AUDIO ENGINE
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  No signal selected
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-[250px] right-[360px] z-50 hidden md:block">
      <div className="relative border-t border-cyan-400/15 bg-[#030708]/95 shadow-[0_-8px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {/* Scanline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        {/* Progress */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-white/5">
          <div
            className="h-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.65)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {currentTrack ? (
          <div className="mx-auto flex h-[76px] max-w-[1600px] items-center gap-4 px-4">
            {/* Track */}
            <Link
              href="/now-playing"
              className="flex min-w-[180px] max-w-[280px] flex-1 items-center gap-3"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden border border-cyan-400/20 bg-cyan-400/5">
                <img
                  src={currentTrack.artworkUrl || '/images/default.jpg'}
                  alt=""
                  className={`h-full w-full object-cover opacity-80 ${
                    isPlaying ? 'animate-pulse' : ''
                  }`}
                />

                <div className="absolute inset-0 bg-cyan-400/10" />
              </div>

              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-white">
                  {currentTrack.title}
                </div>

                <div className="mt-1 truncate font-mono text-[8px] uppercase tracking-wider text-slate-600">
                  {currentTrack.artistName}
                </div>
              </div>
            </Link>

            {/* Main controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleShuffle}
                className={`flex h-9 w-9 items-center justify-center transition ${
                  shuffle
                    ? 'text-cyan-300'
                    : 'text-slate-600 hover:text-slate-300'
                }`}
                aria-label="Toggle shuffle"
              >
                <Shuffle className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={previous}
                className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:text-cyan-300"
                aria-label="Previous track"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition hover:bg-cyan-400/20"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="ml-0.5 h-4 w-4 fill-current" />
                )}
              </button>

              <button
                type="button"
                onClick={next}
                className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:text-cyan-300"
                aria-label="Next track"
              >
                <SkipForward className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={toggleRepeat}
                className={`flex h-9 w-9 items-center justify-center transition ${
                  repeat !== 'off'
                    ? 'text-cyan-300'
                    : 'text-slate-600 hover:text-slate-300'
                }`}
                aria-label="Toggle repeat"
              >
                {repeat === 'one' ? (
                  <Repeat1 className="h-4 w-4" />
                ) : (
                  <Repeat className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Timeline */}
            <div className="hidden min-w-[180px] max-w-[420px] flex-[2] items-center gap-3 lg:flex">
              <span className="w-8 text-right font-mono text-[8px] text-slate-700">
                {formatTime(currentTime)}
              </span>

              <div className="relative h-1 flex-1 bg-white/5">
                <div
                  className="absolute inset-y-0 left-0 bg-cyan-400/70"
                  style={{ width: `${progress}%` }}
                />

                <input
                  type="range"
                  min={0}
                  max={duration || 1}
                  step={0.1}
                  value={Math.min(currentTime, duration || 1)}
                  onChange={(event) =>
                    seek(Number(event.target.value))
                  }
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  aria-label="Track progress"
                />
              </div>

              <span className="w-8 font-mono text-[8px] text-slate-700">
                {formatTime(duration)}
              </span>
            </div>

            {/* Volume */}
            <div className="hidden items-center gap-2 xl:flex">
              <button
                type="button"
                onClick={isMuted ? unmute : mute}
                className="text-slate-600 transition hover:text-cyan-300"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
              </button>

              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={(event) =>
                  setVolumeValue(Number(event.target.value))
                }
                className="w-20 cursor-pointer accent-cyan-400"
                aria-label="Volume"
              />
            </div>

            {/* Player link */}
            <Link
              href="/now-playing"
              className="ml-auto flex h-9 w-9 items-center justify-center border border-white/5 text-slate-600 transition hover:border-cyan-400/20 hover:text-cyan-300"
              aria-label="Open now playing"
            >
              <ChevronUp className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="flex h-[76px] items-center justify-center px-4">
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-600" />
              AUDIO ENGINE IDLE // SELECT A TRACK TO BEGIN
            </div>
          </div>
        )}
      </div>
    </div>
  )
}