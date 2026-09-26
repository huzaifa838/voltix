'use client'

import {
  Activity,
  AudioLines,
  ChevronLeft,
  Disc3,
  Heart,
  Pause,
  Play,
  Radio,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react'
import Link from 'next/link'

import HudPanel from '@/components/hud/HudPanel'
import { usePlayerStore } from '@/store/playerStore'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default function NowPlayingPage() {
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
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0

  return (
    <main className="min-h-full bg-[#020607] text-[#E8F3F5]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[30%] top-[5%] h-[420px] w-[420px] rounded-full bg-cyan-400/5 blur-[140px]" />
        <div className="absolute right-[15%] bottom-[5%] h-[420px] w-[420px] rounded-full bg-blue-500/5 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px] p-4 pb-32 md:p-6 xl:p-8">
        {/* Top navigation */}
        <div className="mb-5 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition hover:text-cyan-300"
          >
            <ChevronLeft className="h-4 w-4" />
            RETURN TO AUDIO OS
          </Link>

          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            ENGINE ONLINE
          </div>
        </div>

        {!currentTrack ? (
          <HudPanel className="flex min-h-[70vh] items-center justify-center p-8">
            <div className="text-center">
              <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
                <div className="absolute inset-0 animate-pulse rounded-full border border-cyan-400/20" />
                <div className="absolute inset-5 rounded-full border border-cyan-400/10" />
                <div className="absolute inset-10 rounded-full bg-cyan-400/5" />

                <Disc3 className="h-16 w-16 text-cyan-500/30" />
              </div>

              <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400">
                AUDIO ENGINE IDLE
              </div>

              <h1 className="mt-3 text-2xl font-semibold text-white">
                No signal selected
              </h1>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Select a track from your library to initialize the holographic
                audio transmission interface.
              </p>

              <Link
                href="/library"
                className="mt-6 inline-flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20"
              >
                <AudioLines className="h-4 w-4" />
                OPEN LIBRARY
              </Link>
            </div>
          </HudPanel>
        ) : (
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
            {/* Main player */}
            <HudPanel
              label="NOW TRANSMITTING"
              status="AUDIO LINK STABLE"
              statusColor="green"
              className="overflow-hidden"
            >
              <div className="relative flex min-h-[680px] flex-col justify-between p-5 md:p-8 lg:p-10">
                {/* Technical corner */}
                <div className="pointer-events-none absolute right-5 top-5 font-mono text-[8px] uppercase tracking-[0.25em] text-slate-700">
                  VX-AUDIO // LIVE STREAM
                </div>

                {/* Holographic disc */}
                <div className="flex flex-1 items-center justify-center py-12">
                  <div className="relative flex h-[270px] w-[270px] items-center justify-center md:h-[360px] md:w-[360px]">
                    {/* outer rings */}
                    <div className="absolute inset-0 rounded-full border border-cyan-400/10" />
                    <div className="absolute inset-4 rounded-full border border-cyan-400/15 border-dashed" />
                    <div className="absolute inset-10 rounded-full border border-cyan-400/10" />

                    <div
                      className={`relative h-[205px] w-[205px] overflow-hidden rounded-full border border-cyan-300/30 bg-cyan-400/5 shadow-[0_0_70px_rgba(34,211,238,0.13)] md:h-[275px] md:w-[275px] ${
                        isPlaying
                          ? 'animate-[spin_13s_linear_infinite]'
                          : ''
                      }`}
                    >
                      <img
                        src={currentTrack.artworkUrl || '/images/default.jpg'}
                        alt=""
                        className="h-full w-full object-cover opacity-75"
                      />

                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,7,0.08)_45%,rgba(2,6,7,0.72)_100%)]" />

                      <div className="absolute inset-[38%] rounded-full border border-cyan-300/20 bg-[#020607]/80 backdrop-blur-sm" />

                      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,0.8)]" />
                    </div>

                    {/* rotating orbit */}
                    <div
                      className={`absolute inset-[15%] rounded-full border border-cyan-400/20 ${
                        isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''
                      }`}
                    >
                      <span className="absolute -right-1 top-1/2 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]" />
                    </div>

                    <div
                      className={`absolute inset-[8%] rounded-full border border-blue-400/10 ${
                        isPlaying
                          ? 'animate-[spin_16s_linear_infinite_reverse]'
                          : ''
                      }`}
                    >
                      <span className="absolute left-1/2 -top-1 h-1.5 w-1.5 rounded-full bg-blue-300" />
                    </div>
                  </div>
                </div>

                {/* Track information */}
                <div className="mx-auto w-full max-w-3xl">
                  <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400">
                    <Radio className="h-3.5 w-3.5" />
                    NOW TRANSMITTING
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h1 className="truncate text-2xl font-semibold tracking-tight text-white md:text-4xl">
                        {currentTrack.title}
                      </h1>

                      <p className="mt-2 truncate text-sm text-slate-400 md:text-base">
                        {currentTrack.artistName}
                        {currentTrack.albumName
                          ? ` // ${currentTrack.albumName}`
                          : ''}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="shrink-0 flex h-10 w-10 items-center justify-center border border-white/10 bg-white/[0.03] text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="mt-7">
                    <div className="relative h-1.5 bg-white/5">
                      <div
                        className="absolute inset-y-0 left-0 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
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

                    <div className="mt-2 flex justify-between font-mono text-[9px] text-slate-600">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Main controls */}
                  <div className="mt-6 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={toggleShuffle}
                      className={`hidden h-10 w-10 items-center justify-center border transition sm:flex ${
                        shuffle
                          ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
                          : 'border-white/10 bg-white/[0.02] text-slate-500 hover:text-white'
                      }`}
                      aria-label="Toggle shuffle"
                    >
                      <Shuffle className="h-4 w-4" />
                    </button>

                    <div className="flex flex-1 items-center justify-center gap-3 md:gap-5">
                      <button
                        type="button"
                        onClick={previous}
                        className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.02] text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300"
                        aria-label="Previous track"
                      >
                        <SkipBack className="h-5 w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={togglePlay}
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.12)] transition hover:bg-cyan-400/20"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <Pause className="h-6 w-6 fill-current" />
                        ) : (
                          <Play className="ml-1 h-6 w-6 fill-current" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={next}
                        className="flex h-11 w-11 items-center justify-center border border-white/10 bg-white/[0.02] text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300"
                        aria-label="Next track"
                      >
                        <SkipForward className="h-5 w-5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={toggleRepeat}
                      className={`hidden h-10 w-10 items-center justify-center border transition sm:flex ${
                        repeat !== 'off'
                          ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
                          : 'border-white/10 bg-white/[0.02] text-slate-500 hover:text-white'
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

                  {/* Mobile secondary controls */}
                  <div className="mt-5 flex justify-center gap-3 sm:hidden">
                    <button
                      type="button"
                      onClick={toggleShuffle}
                      className={`flex h-9 w-9 items-center justify-center border ${
                        shuffle
                          ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
                          : 'border-white/10 text-slate-500'
                      }`}
                    >
                      <Shuffle className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={toggleRepeat}
                      className={`flex h-9 w-9 items-center justify-center border ${
                        repeat !== 'off'
                          ? 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'
                          : 'border-white/10 text-slate-500'
                      }`}
                    >
                      {repeat === 'one' ? (
                        <Repeat1 className="h-3.5 w-3.5" />
                      ) : (
                        <Repeat className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Volume */}
                  <div className="mt-6 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={isMuted ? unmute : mute}
                      className="text-slate-500 transition hover:text-cyan-300"
                      aria-label={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
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
                      className="h-1 flex-1 cursor-pointer accent-cyan-400"
                      aria-label="Volume"
                    />

                    <span className="w-8 text-right font-mono text-[9px] text-slate-600">
                      {Math.round((isMuted ? 0 : volume) * 100)}
                    </span>
                  </div>
                </div>
              </div>
            </HudPanel>

            {/* Right telemetry */}
            <div className="space-y-5">
              <HudPanel
                label="SIGNAL TELEMETRY"
                status="LIVE"
                statusColor="green"
                className="p-5"
              >
                <div className="space-y-5">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                      FORMAT
                    </div>
                    <div className="mt-2 font-mono text-sm uppercase text-cyan-300">
                      {currentTrack.format || 'AUDIO'}
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                      BITRATE
                    </div>
                    <div className="mt-2 font-mono text-sm text-white">
                      {currentTrack.bitrate || 'UNKNOWN'}
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                      MOOD CHANNEL
                    </div>
                    <div className="mt-2 font-mono text-sm uppercase text-white">
                      {currentTrack.mood || 'UNASSIGNED'}
                    </div>
                  </div>

                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                      TRACK LENGTH
                    </div>
                    <div className="mt-2 font-mono text-sm text-white">
                      {formatTime(duration)}
                    </div>
                  </div>
                </div>
              </HudPanel>

              <HudPanel label="AUDIO ACTIVITY" className="p-5">
                <div className="flex h-28 items-end justify-center gap-1.5 overflow-hidden border border-white/5 bg-black/20 px-5 py-4">
                  {Array.from({ length: 24 }).map((_, index) => (
                    <span
                      key={index}
                      className={`w-1 rounded-full bg-cyan-400/70 ${
                        isPlaying ? 'animate-pulse' : ''
                      }`}
                      style={{
                        height: `${18 + ((index * 17) % 65)}%`,
                        animationDelay: `${index * 45}ms`,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-slate-600">
                  <span className="flex items-center gap-2">
                    <Activity className="h-3.5 w-3.5 text-cyan-400" />
                    SIGNAL
                  </span>

                  <span className="text-cyan-400">
                    {isPlaying ? 'TRANSMITTING' : 'PAUSED'}
                  </span>
                </div>
              </HudPanel>

              <HudPanel label="NAVIGATION" className="p-5">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/library"
                    className="border border-white/10 bg-white/[0.02] px-3 py-3 font-mono text-[9px] uppercase tracking-widest text-slate-500 transition hover:border-cyan-400/20 hover:text-cyan-300"
                  >
                    LIBRARY
                  </Link>

                  <Link
                    href="/search"
                    className="border border-white/10 bg-white/[0.02] px-3 py-3 font-mono text-[9px] uppercase tracking-widest text-slate-500 transition hover:border-cyan-400/20 hover:text-cyan-300"
                  >
                    SEARCH
                  </Link>
                </div>
              </HudPanel>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}