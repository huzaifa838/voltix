'use client'

import {
  Activity,
  AudioLines,
  BarChart3,
  Database,
  Disc3,
  FileAudio,
  Music2,
  Radio,
} from 'lucide-react'

import HudPanel from '@/components/hud/HudPanel'
import { MOCK_TRACKS } from '@/data/mock/tracks'
import { MOODS, tracksForMood } from '@/data/ui/moods'

function formatDuration(totalSeconds: number) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) {
    return '0h 00m'
  }

  const totalMinutes = Math.floor(totalSeconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return `${hours}h ${minutes.toString().padStart(2, '0')}m`
}

export default function AnalyticsPage() {
  const totalTracks = MOCK_TRACKS.length

  const totalDuration = MOCK_TRACKS.reduce(
    (sum, track) => sum + (track.duration || 0),
    0,
  )

  const artistCount = new Set(
    MOCK_TRACKS.map((track) => track.artistName).filter(Boolean),
  ).size

  const albumCount = new Set(
    MOCK_TRACKS.map((track) => track.albumName).filter(Boolean),
  ).size

  const formatCounts = MOCK_TRACKS.reduce<Record<string, number>>(
    (acc, track) => {
      const format = track.format?.toUpperCase() || 'UNKNOWN'
      acc[format] = (acc[format] || 0) + 1
      return acc
    },
    {},
  )

  const moodStats = MOODS.map((mood) => ({
    ...mood,
    count: tracksForMood(mood.key).length,
  }))

  const maxMoodCount = Math.max(
    ...moodStats.map((mood) => mood.count),
    1,
  )

  const topFormats = Object.entries(formatCounts).sort(
    (a, b) => b[1] - a[1],
  )

  return (
    <main className="min-h-full bg-[#020607] text-[#E8F3F5]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[-15%] h-[420px] w-[420px] rounded-full bg-cyan-400/5 blur-[130px]" />
        <div className="absolute right-[10%] bottom-[-15%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[140px]" />

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
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                <BarChart3 className="h-3.5 w-3.5" />
                SYSTEM ANALYTICS // AUDIO
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Audio Analytics
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Local collection telemetry, format distribution, mood
                allocation, and indexed library statistics.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-green-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              ANALYTICS ONLINE
            </div>
          </div>
        </section>

        {/* Core metrics */}
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <HudPanel className="p-5">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                TOTAL TRACKS
              </div>

              <Music2 className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="mt-3 text-3xl font-semibold text-white">
              {totalTracks}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Audio files indexed
            </div>
          </HudPanel>

          <HudPanel className="p-5">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                TOTAL DURATION
              </div>

              <Activity className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="mt-3 text-3xl font-semibold text-white">
              {formatDuration(totalDuration)}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Available playback time
            </div>
          </HudPanel>

          <HudPanel className="p-5">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                ARTISTS
              </div>

              <Radio className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="mt-3 text-3xl font-semibold text-white">
              {artistCount}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Unique artist entries
            </div>
          </HudPanel>

          <HudPanel className="p-5">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                ALBUMS
              </div>

              <Disc3 className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="mt-3 text-3xl font-semibold text-white">
              {albumCount}
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Unique album entries
            </div>
          </HudPanel>
        </section>

        {/* Mood distribution + formats */}
        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <HudPanel
            label="MOOD DISTRIBUTION"
            status={`${MOODS.length} CHANNELS`}
            statusColor="cyan"
            className="p-5"
          >
            <div className="space-y-5">
              {moodStats.map((mood) => {
                const percentage =
                  totalTracks > 0
                    ? Math.round((mood.count / totalTracks) * 100)
                    : 0

                const width =
                  mood.count > 0
                    ? Math.max((mood.count / maxMoodCount) * 100, 5)
                    : 0

                return (
                  <div key={mood.key}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />

                        <span className="truncate font-mono text-[10px] uppercase tracking-wider text-slate-300">
                          {mood.name}
                        </span>
                      </div>

                      <div className="shrink-0 font-mono text-[9px] text-slate-600">
                        {mood.count} // {percentage}%
                      </div>
                    </div>

                    <div className="h-2 overflow-hidden bg-white/5">
                      <div
                        className="h-full bg-cyan-400/60 transition-all"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </HudPanel>

          <HudPanel
            label="FILE FORMATS"
            status="INDEXED"
            statusColor="green"
            className="p-5"
          >
            <div className="space-y-3">
              {topFormats.length === 0 ? (
                <div className="py-8 text-center font-mono text-[10px] uppercase tracking-widest text-slate-600">
                  NO FORMAT DATA
                </div>
              ) : (
                topFormats.map(([format, count]) => {
                  const percentage =
                    totalTracks > 0
                      ? Math.round((count / totalTracks) * 100)
                      : 0

                  return (
                    <div
                      key={format}
                      className="border border-white/5 bg-white/[0.02] p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileAudio className="h-3.5 w-3.5 text-cyan-400" />

                          <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">
                            {format}
                          </span>
                        </div>

                        <span className="font-mono text-[10px] text-slate-500">
                          {count}
                        </span>
                      </div>

                      <div className="mt-2 h-1 bg-white/5">
                        <div
                          className="h-full bg-cyan-400/50"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </HudPanel>
        </section>

        {/* Database telemetry */}
        <HudPanel
          label="DATABASE TELEMETRY"
          status="LOCAL STORAGE"
          statusColor="green"
          className="overflow-hidden"
        >
          <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-[#05090a] p-5">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
                <Database className="h-3.5 w-3.5 text-cyan-400" />
                SOURCE
              </div>

              <div className="mt-3 font-mono text-sm text-white">
                /public/audio
              </div>
            </div>

            <div className="bg-[#05090a] p-5">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
                INDEX STATUS
              </div>

              <div className="mt-3 flex items-center gap-2 font-mono text-sm text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                OPERATIONAL
              </div>
            </div>

            <div className="bg-[#05090a] p-5">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
                MOOD CHANNELS
              </div>

              <div className="mt-3 font-mono text-sm text-white">
                {MOODS.length}
              </div>
            </div>

            <div className="bg-[#05090a] p-5">
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
                NETWORK
              </div>

              <div className="mt-3 font-mono text-sm text-cyan-300">
                OPTIONAL
              </div>
            </div>
          </div>
        </HudPanel>

        {/* Technical footer */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>VOLTIX AUDIO OS // ANALYTICS CORE</span>

          <span className="flex items-center gap-2 text-cyan-500/40">
            <AudioLines className="h-3 w-3" />
            TELEMETRY: LOCAL
          </span>
        </div>
      </div>
    </main>
  )
}