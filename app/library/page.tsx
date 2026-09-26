'use client'

import { useMemo, useState } from 'react'
import {
  AudioLines,
  Grid3X3,
  List,
  Music2,
  Play,
  Search,
  SlidersHorizontal,
} from 'lucide-react'

import HudPanel from '@/components/hud/HudPanel'
import TrackRow from '@/components/music/TrackRow'
import { MOCK_TRACKS } from '@/data/mock/tracks'
import { MOODS, tracksForMood } from '@/data/ui/moods'
import { usePlayerStore } from '@/store/playerStore'

type ViewMode = 'list' | 'grid'

export default function LibraryPage() {
  const playQueue = usePlayerStore((state) => state.playQueue)

  const [activeMood, setActiveMood] = useState<'all' | string>('all')
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('list')

  const filteredTracks = useMemo(() => {
    let tracks =
      activeMood === 'all'
        ? MOCK_TRACKS
        : tracksForMood(activeMood as (typeof MOODS)[number]['key'])

    if (query.trim()) {
      const search = query.toLowerCase().trim()

      tracks = tracks.filter((track) =>
        [
          track.title,
          track.artistName,
          track.albumName,
          track.genre,
          track.mood,
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(search)),
      )
    }

    return tracks
  }, [activeMood, query])

  const handlePlayAll = () => {
    if (filteredTracks.length > 0) {
      playQueue(filteredTracks)
    }
  }

  return (
    <main className="min-h-full bg-[#020607] text-[#E8F3F5]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[-15%] h-[420px] w-[420px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[15%] h-[360px] w-[360px] rounded-full bg-blue-500/5 blur-[120px]" />

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
        <section className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                AUDIO DATABASE // LIBRARY
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Your Library
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Local audio archive. Browse your music by signal type, search
                the database, or launch the entire collection.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-500">
              <AudioLines className="h-4 w-4 text-cyan-400" />
              <span>{MOCK_TRACKS.length} TRACKS INDEXED</span>
            </div>
          </div>

          {/* Search + controls */}
          <HudPanel
            label="LIBRARY CONTROL"
            status="INDEX ONLINE"
            statusColor="green"
            className="p-3 md:p-4"
          >
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-400" />

                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, artist, album, mood..."
                  className="h-11 w-full border border-white/10 bg-black/30 pl-10 pr-4 font-mono text-xs text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/40"
                />
              </div>

              <button
                type="button"
                onClick={handlePlayAll}
                disabled={filteredTracks.length === 0}
                className="flex h-11 items-center justify-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-5 font-mono text-xs uppercase tracking-wider text-cyan-300 transition hover:border-cyan-300/60 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Play className="h-4 w-4 fill-current" />
                PLAY ALL
              </button>

              <div className="flex h-11 items-center border border-white/10 bg-black/20 p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex h-full items-center gap-2 px-3 transition ${
                    viewMode === 'list'
                      ? 'bg-cyan-400/10 text-cyan-300'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <List className="h-4 w-4" />
                  <span className="hidden font-mono text-[10px] uppercase tracking-wider sm:inline">
                    LIST
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`flex h-full items-center gap-2 px-3 transition ${
                    viewMode === 'grid'
                      ? 'bg-cyan-400/10 text-cyan-300'
                      : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="hidden font-mono text-[10px] uppercase tracking-wider sm:inline">
                    GRID
                  </span>
                </button>
              </div>
            </div>

            {/* Mood filters */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveMood('all')}
                className={`shrink-0 border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition ${
                  activeMood === 'all'
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                    : 'border-white/10 bg-white/[0.02] text-slate-500 hover:border-white/20 hover:text-white'
                }`}
              >
                ALL
              </button>

              {MOODS.map((mood) => {
                const count = tracksForMood(mood.key).length

                return (
                  <button
                    key={mood.key}
                    type="button"
                    onClick={() => setActiveMood(mood.key)}
                    className={`shrink-0 border px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition ${
                      activeMood === mood.key
                        ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300'
                        : 'border-white/10 bg-white/[0.02] text-slate-500 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {mood.name}
                    <span className="ml-2 text-slate-600">{count}</span>
                  </button>
                )
              })}
            </div>
          </HudPanel>
        </section>

        {/* Library status */}
        <div className="grid gap-3 sm:grid-cols-3">
          <HudPanel className="p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
              COLLECTION
            </div>
            <div className="mt-2 text-2xl font-semibold text-white">
              {MOCK_TRACKS.length}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Indexed audio files
            </div>
          </HudPanel>

          <HudPanel className="p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
              ACTIVE FILTER
            </div>
            <div className="mt-2 truncate text-lg font-semibold text-cyan-300">
              {activeMood === 'all' ? 'ALL SIGNALS' : activeMood.toUpperCase()}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {filteredTracks.length} matching tracks
            </div>
          </HudPanel>

          <HudPanel className="p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
              SEARCH STATUS
            </div>
            <div className="mt-2 flex items-center gap-2 text-lg font-semibold text-green-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              READY
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Audio engine connected
            </div>
          </HudPanel>
        </div>

        {/* Track database */}
        <HudPanel
          label="TRACK MATRIX"
          status={`${filteredTracks.length} RESULTS`}
          statusColor="cyan"
          className="overflow-hidden"
        >
          <div className="border-b border-white/5 px-4 py-3 md:px-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                <SlidersHorizontal className="h-3.5 w-3.5 text-cyan-400" />
                AUDIO STREAM MATRIX
              </div>

              <div className="font-mono text-[10px] text-slate-600">
                {query ? `QUERY: "${query}"` : 'QUERY: NONE'}
              </div>
            </div>
          </div>

          {filteredTracks.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center border border-white/10 bg-white/[0.02]">
                <Music2 className="h-6 w-6 text-slate-600" />
              </div>

              <h2 className="text-sm font-semibold text-white">
                No audio signals found
              </h2>

              <p className="mt-2 max-w-md text-xs leading-5 text-slate-500">
                Try another search term or switch the active mood channel.
              </p>
            </div>
          ) : viewMode === 'list' ? (
            <div>
              {filteredTracks.map((track, index) => (
                <TrackRow
                  key={track.id}
                  track={track}
                  index={index}
                  queue={filteredTracks}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTracks.map((track, index) => (
                <div
                  key={track.id}
                  className="bg-[#05090a] p-4 transition hover:bg-white/[0.03]"
                >
                  <TrackRow
                    track={track}
                    index={index}
                    queue={filteredTracks}
                  />
                </div>
              ))}
            </div>
          )}
        </HudPanel>

        {/* Footer telemetry */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>VOLTIX AUDIO OS // LOCAL MEDIA INDEX</span>
          <span className="text-cyan-500/40">
            STORAGE: LOCAL // NETWORK: OPTIONAL
          </span>
        </div>
      </div>
    </main>
  )
}