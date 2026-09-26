'use client'

import Link from 'next/link'
import {
  Activity,
  ChevronRight,
  Disc3,
  ExternalLink,
  Heart,
  ListMusic,
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

export default function NowPlayingSidebar() {
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

  return (
    <div className="relative h-full min-h-0 bg-[#030708]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[25%] h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/[0.045] blur-[110px]" />

        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/[0.035] blur-[100px]" />
      </div>

      {/* Technical grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative flex h-full min-h-0 flex-col">
        {/* Header */}
        <div className="shrink-0 border-b border-white/5 px-5 py-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] font-semibold tracking-[0.2em] text-white">
                VOLTIX
              </div>

              <div className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.3em] text-cyan-400/60">
                AUDIO OS
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.2em] text-green-400/70">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              LIVE
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.18em]">
            <span className="text-slate-700">AUDIO LINK</span>
            <span className="text-cyan-500/50">
              {currentTrack ? 'STABLE' : 'IDLE'}
            </span>
          </div>
        </div>

        {!currentTrack ? (
          <IdleState />
        ) : (
          <>
            {/* Scrollable content */}
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 scrollbar-none">
              {/* Telemetry */}
              <div className="mb-5 grid grid-cols-3 gap-1.5">
                <TelemetryItem
                  label="FORMAT"
                  value={currentTrack.format || 'AUDIO'}
                />

                <TelemetryItem
                  label="BITRATE"
                  value={currentTrack.bitrate || '—'}
                />

                <TelemetryItem
                  label="MOOD"
                  value={currentTrack.mood || '—'}
                />
              </div>

              {/* Holographic CD */}
              <div className="relative mx-auto flex aspect-square w-full max-w-[285px] items-center justify-center">
                {/* outer radial glow */}
                <div className="absolute inset-[20%] rounded-full bg-cyan-400/10 blur-[45px]" />

                {/* Orbit ring */}
                <div
                  className={`absolute inset-[7%] rounded-full border border-cyan-400/10 ${
                    isPlaying
                      ? 'animate-[spin_18s_linear_infinite]'
                      : ''
                  }`}
                >
                  <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cyan-300/70 shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
                </div>

                {/* Orbit ring */}
                <div
                  className={`absolute inset-[13%] rounded-full border border-cyan-400/15 border-dashed ${
                    isPlaying
                      ? 'animate-[spin_11s_linear_infinite_reverse]'
                      : ''
                  }`}
                >
                  <span className="absolute bottom-[5%] left-[10%] h-1.5 w-1.5 rounded-full bg-cyan-300/60" />
                </div>

                {/* CD */}
                <div
                  className={`relative aspect-square w-[69%] overflow-hidden rounded-full border border-cyan-300/25 bg-cyan-400/5 shadow-[0_0_60px_rgba(34,211,238,0.10)] ${
                    isPlaying
                      ? 'animate-[spin_13s_linear_infinite]'
                      : ''
                  }`}
                >
                  <img
                    src={currentTrack.artworkUrl || '/images/default.jpg'}
                    alt=""
                    className="h-full w-full object-cover opacity-65"
                  />

                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.16),transparent_25%),radial-gradient(circle_at_center,transparent_25%,rgba(2,6,7,0.14)_55%,rgba(2,6,7,0.8)_100%)]" />

                  {/* CD tracks */}
                  <div className="absolute inset-[12%] rounded-full border border-white/10" />
                  <div className="absolute inset-[24%] rounded-full border border-white/5" />

                  {/* Center hub */}
                  <div className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/20 bg-[#020607]/80 backdrop-blur-sm">
                    <div className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.85)]" />
                  </div>
                </div>

                {/* Floating nodes */}
                <span className="absolute right-[12%] top-[23%] h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300/70" />
                <span className="absolute bottom-[20%] left-[9%] h-1 w-1 animate-pulse rounded-full bg-blue-300/70" />
                <span className="absolute right-[18%] bottom-[16%] h-1 w-1 rounded-full bg-cyan-400/50" />
              </div>

              {/* Track identity */}
              <div className="mt-5 text-center">
                <div className="font-mono text-[7px] uppercase tracking-[0.3em] text-cyan-400/70">
                  NOW TRANSMITTING
                </div>

                <h2 className="mt-2 truncate text-lg font-semibold text-white">
                  {currentTrack.title}
                </h2>

                <p className="mt-1 truncate text-xs text-slate-500">
                  {currentTrack.artistName}
                </p>

                {currentTrack.albumName && (
                  <p className="mt-1 truncate font-mono text-[8px] uppercase tracking-wider text-slate-700">
                    {currentTrack.albumName}
                  </p>
                )}
              </div>

              {/* Like */}
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  className="flex h-8 items-center gap-2 border border-white/5 bg-white/[0.015] px-3 font-mono text-[8px] uppercase tracking-[0.15em] text-slate-600 transition hover:border-cyan-400/20 hover:text-cyan-300"
                >
                  <Heart className="h-3 w-3" />
                  SAVE SIGNAL
                </button>
              </div>

              {/* Progress */}
              <div className="mt-6">
                <div className="relative h-1 bg-white/5">
                  <div
                    className="absolute inset-y-0 left-0 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.45)]"
                    style={{ width: `${progress}%` }}
                  />

                  <input
                    type="range"
                    min={0}
                    max={duration || 1}
                    step={0.1}
                    value={Math.min(
                      currentTime,
                      duration || 1,
                    )}
                    onChange={(event) =>
                      seek(Number(event.target.value))
                    }
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    aria-label="Track progress"
                  />
                </div>

                <div className="mt-2 flex justify-between font-mono text-[8px] text-slate-700">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback controls */}
              <div className="mt-5">
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={toggleShuffle}
                    className={`flex h-8 w-8 items-center justify-center transition ${
                      shuffle
                        ? 'text-cyan-300'
                        : 'text-slate-600 hover:text-slate-300'
                    }`}
                    aria-label="Toggle shuffle"
                  >
                    <Shuffle className="h-3.5 w-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={previous}
                    className="flex h-9 w-9 items-center justify-center border border-white/10 text-slate-500 transition hover:border-cyan-400/20 hover:text-cyan-300"
                    aria-label="Previous track"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/10 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.10)] transition hover:bg-cyan-400/20"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="flex h-9 w-9 items-center justify-center border border-white/10 text-slate-500 transition hover:border-cyan-400/20 hover:text-cyan-300"
                    aria-label="Next track"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={toggleRepeat}
                    className={`flex h-8 w-8 items-center justify-center transition ${
                      repeat !== 'off'
                        ? 'text-cyan-300'
                        : 'text-slate-600 hover:text-slate-300'
                    }`}
                    aria-label="Toggle repeat"
                  >
                    {repeat === 'one' ? (
                      <Repeat1 className="h-3.5 w-3.5" />
                    ) : (
                      <Repeat className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Volume */}
              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={isMuted ? unmute : mute}
                  className="flex h-7 w-7 items-center justify-center text-slate-600 transition hover:text-cyan-300"
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
                    setVolumeValue(
                      Number(event.target.value),
                    )
                  }
                  className="h-1 flex-1 cursor-pointer accent-cyan-400"
                  aria-label="Volume"
                />

                <span className="w-7 text-right font-mono text-[8px] text-slate-700">
                  {Math.round(
                    (isMuted ? 0 : volume) * 100,
                  )}
                </span>
              </div>

              {/* Signal visualizer */}
              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.2em] text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Activity className="h-3 w-3 text-cyan-400/60" />
                    SIGNAL ACTIVITY
                  </span>

                  <span
                    className={
                      isPlaying
                        ? 'text-cyan-400/60'
                        : 'text-slate-700'
                    }
                  >
                    {isPlaying ? 'LIVE' : 'PAUSED'}
                  </span>
                </div>

                <div className="flex h-10 items-end gap-1 overflow-hidden border border-white/5 bg-black/20 px-3 py-2">
                  {Array.from({ length: 28 }).map(
                    (_, index) => (
                      <span
                        key={index}
                        className={`w-1 flex-1 origin-bottom rounded-full bg-cyan-400/40 ${
                          isPlaying
                            ? 'animate-pulse'
                            : ''
                        }`}
                        style={{
                          height: `${
                            20 +
                            ((index * 23) % 65)
                          }%`,
                          animationDelay: `${index * 35}ms`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Bottom navigation */}
            <div className="shrink-0 border-t border-white/5 px-5 py-4">
              <div className="grid grid-cols-3 gap-1.5">
                <SidebarAction
                  href="/queue"
                  icon={<ListMusic className="h-3.5 w-3.5" />}
                  label="QUEUE"
                />

                <SidebarAction
                  href="/now-playing"
                  icon={<Disc3 className="h-3.5 w-3.5" />}
                  label="PLAYER"
                  active
                />

                <SidebarAction
                  href="/analytics"
                  icon={<Activity className="h-3.5 w-3.5" />}
                  label="ANALYTICS"
                />
              </div>

              <Link
                href="/now-playing"
                className="mt-2 flex items-center justify-between border border-white/5 bg-white/[0.015] px-3 py-2 font-mono text-[7px] uppercase tracking-[0.18em] text-slate-700 transition hover:border-cyan-400/15 hover:text-cyan-400"
              >
                <span className="flex items-center gap-1.5">
                  OPEN FULL PLAYER
                  <ExternalLink className="h-2.5 w-2.5" />
                </span>

                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function TelemetryItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="min-w-0 border border-white/5 bg-white/[0.015] px-2.5 py-2">
      <div className="font-mono text-[6px] uppercase tracking-[0.2em] text-slate-700">
        {label}
      </div>

      <div className="mt-1 truncate font-mono text-[8px] uppercase text-cyan-300/70">
        {value}
      </div>
    </div>
  )
}

function SidebarAction({
  href,
  icon,
  label,
  active = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex min-w-0 items-center justify-center gap-1.5 border px-2 py-2.5 font-mono text-[7px] uppercase tracking-wider transition ${
        active
          ? 'border-cyan-400/20 bg-cyan-400/[0.05] text-cyan-300'
          : 'border-white/5 bg-white/[0.01] text-slate-700 hover:border-white/10 hover:text-slate-300'
      }`}
    >
      {icon}

      <span className="truncate">{label}</span>
    </Link>
  )
}

function IdleState() {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 text-center">
      <div className="relative flex h-48 w-48 items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cyan-400/10" />

        <div className="absolute inset-5 rounded-full border border-cyan-400/10 border-dashed animate-[spin_18s_linear_infinite]" />

        <div className="absolute inset-10 rounded-full border border-cyan-400/15" />

        <div className="absolute inset-16 rounded-full bg-cyan-400/5 blur-xl" />

        <Disc3 className="relative h-12 w-12 text-cyan-400/25" />
      </div>

      <div className="mt-8 font-mono text-[8px] uppercase tracking-[0.3em] text-cyan-400/50">
        AUDIO ENGINE IDLE
      </div>

      <h2 className="mt-2 text-sm font-semibold text-slate-300">
        No signal selected
      </h2>

      <p className="mt-2 max-w-[230px] text-[11px] leading-5 text-slate-700">
        Select a track from the library to initialize the holographic
        audio interface.
      </p>

      <Link
        href="/library"
        className="mt-5 inline-flex items-center gap-2 border border-cyan-400/15 bg-cyan-400/[0.03] px-4 py-2 font-mono text-[8px] uppercase tracking-widest text-cyan-400/60 transition hover:border-cyan-400/30 hover:text-cyan-300"
      >
        OPEN LIBRARY
        <ChevronRight className="h-3 w-3" />
      </Link>
    </div>
  )
}