'use client'

import {
  ArrowLeft,
  ListMusic,
  Play,
  Radio,
  Trash2,
  X,
} from 'lucide-react'
import Link from 'next/link'

import HudPanel from '@/components/hud/HudPanel'
import TrackRow from '@/components/music/TrackRow'
import { usePlayerStore } from '@/store/playerStore'

export default function QueuePage() {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const queue = usePlayerStore((state) => state.queue)
  const queueIndex = usePlayerStore((state) => state.queueIndex)

  const isPlaying = usePlayerStore((state) => state.isPlaying)

  const playQueue = usePlayerStore((state) => state.playQueue)
  const removeFromQueue = usePlayerStore((state) => state.removeFromQueue)
  const clearQueue = usePlayerStore((state) => state.clearQueue)

  const handlePlayQueue = () => {
    if (queue.length > 0) {
      playQueue(queue, queue[0])
    }
  }

  const currentPosition =
    queueIndex >= 0 && queueIndex < queue.length ? queueIndex + 1 : 0

  return (
    <main className="min-h-full bg-[#020607] text-[#E8F3F5]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[18%] top-[-15%] h-[420px] w-[420px] rounded-full bg-cyan-400/5 blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[15%] h-[380px] w-[380px] rounded-full bg-blue-500/5 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px] space-y-5 p-4 pb-32 md:p-6 xl:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition hover:text-cyan-300"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              AUDIO OS / HOME
            </Link>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
              <ListMusic className="h-3.5 w-3.5" />
              PLAYBACK QUEUE
            </div>

            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Queue
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Active playback sequence and upcoming audio transmissions.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            {queue.length} SIGNALS LOADED
          </div>
        </div>

        {/* Current signal */}
        <HudPanel
          label="CURRENT SIGNAL"
          status={isPlaying ? 'TRANSMITTING' : 'PAUSED'}
          statusColor={isPlaying ? 'green' : 'yellow'}
          className="overflow-hidden"
        >
          {currentTrack ? (
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
              <div className="flex min-w-0 items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-cyan-400/20 bg-cyan-400/5">
                  <img
                    src={currentTrack.artworkUrl || '/images/default.jpg'}
                    alt=""
                    className="h-full w-full object-cover opacity-80"
                  />

                  <div className="absolute inset-0 bg-cyan-400/10" />
                </div>

                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-cyan-400">
                    <Radio className="h-3 w-3" />
                    LIVE POSITION
                  </div>

                  <h2 className="truncate text-sm font-semibold text-white md:text-base">
                    {currentTrack.title}
                  </h2>

                  <p className="truncate text-xs text-slate-500">
                    {currentTrack.artistName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right font-mono text-[9px] uppercase tracking-widest text-slate-600">
                  POSITION
                  <div className="mt-1 text-sm text-cyan-300">
                    {currentPosition}/{queue.length}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 font-mono text-xs text-slate-600">
              NO ACTIVE SIGNAL
            </div>
          )}
        </HudPanel>

        {/* Queue controls */}
        <HudPanel
          label="QUEUE CONTROL"
          status={queue.length > 0 ? 'READY' : 'EMPTY'}
          statusColor={queue.length > 0 ? 'green' : 'red'}
          className="p-4"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              {queue.length > 0
                ? `${queue.length} tracks in playback sequence`
                : 'Playback sequence contains no tracks'}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handlePlayQueue}
                disabled={queue.length === 0}
                className="inline-flex h-10 items-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-4 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                PLAY QUEUE
              </button>

              <button
                type="button"
                onClick={clearQueue}
                disabled={queue.length === 0}
                className="inline-flex h-10 items-center gap-2 border border-red-400/20 bg-red-400/5 px-4 font-mono text-[10px] uppercase tracking-widest text-red-300 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Trash2 className="h-3.5 w-3.5" />
                CLEAR
              </button>
            </div>
          </div>
        </HudPanel>

        {/* Queue matrix */}
        <HudPanel
          label="PLAYBACK MATRIX"
          status={`${queue.length} TRACKS`}
          statusColor="cyan"
          className="overflow-hidden"
        >
          {queue.length === 0 ? (
            <div className="flex min-h-[340px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-16 w-16 items-center justify-center border border-white/10 bg-white/[0.02]">
                <ListMusic className="h-7 w-7 text-slate-600" />
              </div>

              <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
                QUEUE EMPTY
              </div>

              <h2 className="mt-2 text-lg font-semibold text-white">
                No tracks loaded
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
                Start a playlist or select a track from your library to build
                the playback sequence.
              </p>

              <Link
                href="/library"
                className="mt-6 inline-flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20"
              >
                OPEN LIBRARY
              </Link>
            </div>
          ) : (
            <div>
              {queue.map((track, index) => {
                const isCurrent = currentTrack?.id === track.id

                return (
                  <div
                    key={`${track.id}-${index}`}
                    className={`group relative ${
                      isCurrent
                        ? 'bg-cyan-400/[0.035]'
                        : 'bg-transparent'
                    }`}
                  >
                    {/* Queue position */}
                    <div className="pointer-events-none absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-[8px] text-slate-700 md:block">
                      {String(index + 1).padStart(2, '0')}
                    </div>

                    <TrackRow
                      track={track}
                      index={index}
                      queue={queue}
                    />

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeFromQueue(index)}
                      className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-transparent text-slate-700 opacity-0 transition hover:border-red-400/20 hover:bg-red-400/5 hover:text-red-300 group-hover:opacity-100"
                      aria-label={`Remove ${track.title} from queue`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </HudPanel>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>VOLTIX AUDIO OS // PLAYBACK QUEUE</span>
          <span className="text-cyan-500/40">
            ENGINE: GLOBAL // STATE: PERSISTENT
          </span>
        </div>
      </div>
    </main>
  )
}