'use client'

import {
  Activity,
  ArrowLeft,
  Clock3,
  Database,
  History,
  Radio,
  RotateCcw,
  Trash2,
} from 'lucide-react'
import Link from 'next/link'

import HudPanel from '@/components/hud/HudPanel'
import TrackRow from '@/components/music/TrackRow'
import { usePlayerStore } from '@/store/playerStore'

export default function HistoryPage() {
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const queue = usePlayerStore((state) => state.queue)

  /*
   * History persistence will be connected to the global player
   * later. For now, this screen shows the current playback session
   * and the active queue as a visual history foundation.
   */
  const sessionTracks = currentTrack
    ? [
        currentTrack,
        ...queue.filter((track) => track.id !== currentTrack.id),
      ]
    : queue

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
        <section>
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition hover:text-cyan-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            AUDIO OS / HOME
          </Link>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                <History className="h-3.5 w-3.5" />
                PLAYBACK ARCHIVE
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Listening History
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Playback activity, recently loaded signals, and session-level
                audio telemetry.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-green-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              SESSION MONITORING
            </div>
          </div>
        </section>

        {/* Telemetry */}
        <section className="grid gap-3 sm:grid-cols-3">
          <HudPanel className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                ACTIVE SIGNAL
              </span>
              <Radio className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="mt-3 truncate text-sm font-semibold text-white">
              {currentTrack?.title || 'NONE'}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Current playback target
            </div>
          </HudPanel>

          <HudPanel className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                SESSION QUEUE
              </span>
              <Activity className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="mt-3 text-3xl font-semibold text-white">
              {queue.length}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Loaded audio signals
            </div>
          </HudPanel>

          <HudPanel className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                ARCHIVE MODE
              </span>
              <Database className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="mt-3 font-mono text-sm text-cyan-300">
              SESSION
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Persistent history module pending
            </div>
          </HudPanel>
        </section>

        {/* Archive */}
        <HudPanel
          label="RECENT SIGNALS"
          status={
            sessionTracks.length > 0
              ? `${sessionTracks.length} SIGNALS`
              : 'NO DATA'
          }
          statusColor={sessionTracks.length > 0 ? 'cyan' : 'yellow'}
          className="overflow-hidden"
        >
          {sessionTracks.length > 0 ? (
            <div>
              {sessionTracks.map((track, index) => (
                <TrackRow
                  key={`${track.id}-${index}`}
                  track={track}
                  index={index}
                  queue={sessionTracks}
                />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[340px] flex-col items-center justify-center px-6 text-center">
              <div className="relative flex h-16 w-16 items-center justify-center border border-white/10 bg-white/[0.02]">
                <Clock3 className="h-7 w-7 text-slate-600" />

                <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse bg-cyan-400" />
              </div>

              <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-600">
                HISTORY BUFFER EMPTY
              </div>

              <h2 className="mt-2 text-lg font-semibold text-white">
                No playback activity
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
                Start playing music and the session monitor will have active
                signals to display.
              </p>

              <Link
                href="/library"
                className="mt-6 inline-flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20"
              >
                OPEN LIBRARY
              </Link>
            </div>
          )}
        </HudPanel>

        {/* History module status */}
        <HudPanel
          label="ARCHIVE MODULE"
          status="DEVELOPMENT"
          statusColor="yellow"
          className="p-5"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-yellow-400">
                <Database className="h-3.5 w-3.5" />
                PERSISTENCE LAYER
              </div>

              <h2 className="mt-2 text-sm font-semibold text-white">
                Permanent listening history
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                The current player is fully functional with local audio. A
                dedicated history store will later record playback events,
                timestamps, completion percentage, and listening statistics.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-slate-600">
              <RotateCcw className="h-3.5 w-3.5" />
              MODULE READY
            </div>
          </div>
        </HudPanel>

        {/* Future controls */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>VOLTIX AUDIO OS // HISTORY CORE</span>

          <span className="flex items-center gap-2 text-slate-700">
            <Trash2 className="h-3 w-3" />
            CLEAR HISTORY: PENDING
          </span>
        </div>
      </div>
    </main>
  )
}