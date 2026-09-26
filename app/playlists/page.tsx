'use client'

import Link from 'next/link'
import {
  ArrowLeft,
  Headphones,
  Radio,
} from 'lucide-react'

import HudPanel from '@/components/hud/HudPanel'
import MoodCard from '@/components/music/MoodCard'
import { MOODS, tracksForMood } from '@/data/ui/moods'

export default function PlaylistsPage() {
  return (
    <main className="min-h-full bg-[#020607] text-[#E8F3F5]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[-15%] h-[420px] w-[420px] rounded-full bg-cyan-400/5 blur-[130px]" />

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
        <div>
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
                <Headphones className="h-3.5 w-3.5" />
                AUDIO CHANNELS
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Playlists
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Your six local mood channels, organized for quick access to
                the personal audio archive.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-green-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              CHANNELS ONLINE
            </div>
          </div>
        </div>

        {/* Channel status */}
        <HudPanel
          label="PLAYLIST MATRIX"
          status={`${MOODS.length} CHANNELS`}
          statusColor="green"
          className="p-5"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600">
                <Radio className="h-3.5 w-3.5 text-cyan-400" />
                LOCAL AUDIO NETWORK
              </div>

              <div className="mt-2 text-sm text-slate-300">
                Select a mood channel to start a transmission.
              </div>
            </div>

            <div className="font-mono text-[9px] uppercase tracking-widest text-cyan-400/60">
              SOURCE: /public/audio
            </div>
          </div>
        </HudPanel>

        {/* Mood cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {MOODS.map((mood) => (
            <MoodCard
              key={mood.key}
              name={mood.name}
              description={mood.description}
              tracks={tracksForMood(mood.key)}
              image={mood.image}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>VOLTIX AUDIO OS {'//'} PLAYLIST MATRIX</span>

          <span className="text-cyan-500/40">
            LOCAL SIGNALS
          </span>
        </div>
      </div>
    </main>
  )
}