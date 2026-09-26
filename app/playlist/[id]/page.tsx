'use client'

import { useMemo } from 'react'
import { ArrowLeft, Headphones, Play, Radio, Shuffle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import HudPanel from '@/components/hud/HudPanel'
import TrackRow from '@/components/music/TrackRow'
import { MOODS, tracksForMood } from '@/data/ui/moods'
import { usePlayerStore } from '@/store/playerStore'

export default function MoodPlaylistPage() {
  const params = useParams()
  const playQueue = usePlayerStore((state) => state.playQueue)

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
  const moodKey = slug?.replace(/^mood-/, '') as
    | (typeof MOODS)[number]['key']
    | undefined

  const mood = useMemo(
    () => MOODS.find((item) => item.key === moodKey),
    [moodKey],
  )

  const tracks = useMemo(
    () => (moodKey ? tracksForMood(moodKey) : []),
    [moodKey],
  )

  const handlePlayAll = () => {
    if (tracks.length > 0) {
      playQueue(tracks)
    }
  }

  const handleShuffle = () => {
    if (tracks.length > 0) {
      playQueue(tracks, undefined, true)
    }
  }

  if (!mood) {
    return (
      <main className="flex min-h-full items-center justify-center bg-[#020607] px-6 text-white">
        <HudPanel className="max-w-md p-8 text-center">
          <Radio className="mx-auto h-10 w-10 text-cyan-400" />

          <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.3em] text-red-400">
            SIGNAL NOT FOUND
          </div>

          <h1 className="mt-2 text-xl font-semibold">
            Unknown mood channel
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            The requested audio channel does not exist in the local index.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            RETURN HOME
          </Link>
        </HudPanel>
      </main>
    )
  }

  return (
    <main className="min-h-full bg-[#020607] text-[#E8F3F5]">
      {/* Ambient system background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[-15%] h-[420px] w-[420px] rounded-full bg-cyan-400/5 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[20%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[140px]" />

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
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition hover:text-cyan-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          AUDIO OS / HOME
        </Link>

        {/* Mood header */}
        <HudPanel
          label="MOOD CHANNEL"
          status="SIGNAL LOCKED"
          statusColor="green"
          className="overflow-hidden"
        >
          <div className="relative p-5 md:p-7 lg:p-9">
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative z-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                    <Headphones className="h-3.5 w-3.5" />
                    CHANNEL // {mood.key}
                  </div>

                  <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                    {mood.name}
                  </h1>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
                    {mood.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    <span>{tracks.length} TRACKS</span>
                    <span className="h-3 w-px bg-white/10" />
                    <span>LOCAL STORAGE</span>
                    <span className="h-3 w-px bg-white/10" />
                    <span className="text-green-400">READY</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={handlePlayAll}
                    disabled={tracks.length === 0}
                    className="inline-flex h-11 items-center gap-2 border border-cyan-400/40 bg-cyan-400/10 px-5 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    PLAY ALL
                  </button>

                  <button
                    type="button"
                    onClick={handleShuffle}
                    disabled={tracks.length === 0}
                    className="inline-flex h-11 items-center gap-2 border border-white/10 bg-white/[0.03] px-5 font-mono text-[10px] uppercase tracking-widest text-slate-300 transition hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Shuffle className="h-4 w-4" />
                    SHUFFLE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </HudPanel>

        {/* Playlist telemetry */}
        <div className="grid gap-3 sm:grid-cols-3">
          <HudPanel className="p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
              CHANNEL ID
            </div>

            <div className="mt-2 font-mono text-sm uppercase text-cyan-300">
              MOOD-{mood.key}
            </div>
          </HudPanel>

          <HudPanel className="p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
              TRACK COUNT
            </div>

            <div className="mt-2 text-2xl font-semibold text-white">
              {tracks.length}
            </div>
          </HudPanel>

          <HudPanel className="p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
              ENGINE STATUS
            </div>

            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-green-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              AUDIO LINK ACTIVE
            </div>
          </HudPanel>
        </div>

        {/* Track matrix */}
        <HudPanel
          label="CHANNEL STREAM"
          status={`${tracks.length} FILES`}
          statusColor="cyan"
          className="overflow-hidden"
        >
          {tracks.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.02]">
                <Headphones className="h-6 w-6 text-slate-600" />
              </div>

              <h2 className="mt-4 text-sm font-semibold text-white">
                Channel is empty
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
                No local audio files are currently assigned to this mood.
              </p>
            </div>
          ) : (
            <div>
              {tracks.map((track, index) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={index}
                  queue={tracks}
                />
              ))}
            </div>
          )}
        </HudPanel>

        {/* Bottom system line */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>VOLTIX AUDIO OS // MOOD CHANNEL</span>
          <span className="text-cyan-500/40">
            SIGNAL: {mood.key.toUpperCase()}
          </span>
        </div>
      </div>
    </main>
  )
}