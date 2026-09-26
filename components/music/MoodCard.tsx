'use client'

import {
  Headphones,
  Play,
  Radio,
} from 'lucide-react'

import type { Track } from '@/types'
import { usePlayerStore } from '@/store/playerStore'

interface MoodCardProps {
  name: string
  description: string
  tracks: Track[]
  image?: string
}

const MOOD_THEMES: Record<
  string,
  {
    accent: string
    soft: string
    border: string
  }
> = {
  Chill: {
    accent: 'text-cyan-300',
    soft: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
  },

  Depression: {
    accent: 'text-blue-300',
    soft: 'bg-blue-400/10',
    border: 'border-blue-400/20',
  },

  Sad: {
    accent: 'text-indigo-300',
    soft: 'bg-indigo-400/10',
    border: 'border-indigo-400/20',
  },

  Relaxing: {
    accent: 'text-teal-300',
    soft: 'bg-teal-400/10',
    border: 'border-teal-400/20',
  },

  'Time Pass': {
    accent: 'text-sky-300',
    soft: 'bg-sky-400/10',
    border: 'border-sky-400/20',
  },

  'With Friends': {
    accent: 'text-emerald-300',
    soft: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
  },
}

export default function MoodCard({
  name,
  description,
  tracks,
  image = '/images/default.jpg',
}: MoodCardProps) {
  const playQueue = usePlayerStore(
    (state) => state.playQueue,
  )

  const theme =
    MOOD_THEMES[name] || MOOD_THEMES.Chill

  const handlePlay = () => {
    if (tracks.length === 0) {
      return
    }

    playQueue(tracks)
  }

  return (
    <div
      className={`group relative overflow-hidden border border-white/8 bg-[#05090a] transition duration-300 hover:border-cyan-400/20 hover:bg-white/[0.015]`}
    >
      {/* Ambient glow */}
      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl ${theme.soft}`}
      />

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/5">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover opacity-40 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-55 group-hover:grayscale-0"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#05090a] via-[#05090a]/30 to-transparent" />

        {/* Scanline */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_3px,rgba(34,211,238,0.025)_4px)]" />

        {/* Channel label */}
        <div className="absolute left-3 top-3 flex items-center gap-2 border border-white/10 bg-[#020607]/70 px-2.5 py-1.5 backdrop-blur-sm">
          <span
            className={`h-1.5 w-1.5 animate-pulse rounded-full bg-current ${theme.accent}`}
          />

          <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-slate-500">
            CHANNEL ACTIVE
          </span>
        </div>

        {/* Track count */}
        <div className="absolute right-3 top-3 border border-white/10 bg-[#020607]/70 px-2.5 py-1.5 backdrop-blur-sm">
          <span className="font-mono text-[8px] text-slate-500">
            {tracks.length.toString().padStart(2, '0')} FILES
          </span>
        </div>

        {/* Play button */}
        <button
          type="button"
          onClick={handlePlay}
          disabled={tracks.length === 0}
          className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center border backdrop-blur-md transition ${
            tracks.length === 0
              ? 'cursor-not-allowed border-white/5 bg-black/30 text-slate-700'
              : `${theme.border} ${theme.soft} ${theme.accent} hover:scale-105 hover:bg-cyan-400/15`
          }`}
          aria-label={`Play ${name}`}
        >
          <Play className="ml-0.5 h-4 w-4 fill-current" />
        </button>
      </div>

      {/* Content */}
      <div className="relative p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div
              className={`mb-1 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] ${theme.accent}`}
            >
              <Radio className="h-3 w-3" />
              MOOD CHANNEL
            </div>

            <h3 className="truncate text-base font-semibold text-white md:text-lg">
              {name}
            </h3>
          </div>

          <Headphones
            className={`h-4 w-4 shrink-0 opacity-60 ${theme.accent}`}
          />
        </div>

        <p className="mt-2 min-h-[40px] text-xs leading-5 text-slate-500">
          {description}
        </p>

        {/* Technical footer */}
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="font-mono text-[7px] uppercase tracking-[0.2em] text-slate-700">
            LOCAL AUDIO
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.15em] text-green-400/50">
            <span className="h-1 w-1 animate-pulse rounded-full bg-green-400" />
            READY
          </div>
        </div>
      </div>

      {/* Active edge */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 transition group-hover:opacity-100" />
    </div>
  )
}