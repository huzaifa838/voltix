'use client'

import {
  Heart,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
} from 'lucide-react'

import type { Track } from '@/types'
import { usePlayerStore } from '@/store/playerStore'

interface TrackRowProps {
  track: Track
  index: number
  queue: Track[]
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}

export default function TrackRow({
  track,
  index,
  queue,
}: TrackRowProps) {
  const currentTrack = usePlayerStore(
    (state) => state.currentTrack,
  )

  const isPlaying = usePlayerStore(
    (state) => state.isPlaying,
  )

  const playQueue = usePlayerStore(
    (state) => state.playQueue,
  )

  const addToQueue = usePlayerStore(
    (state) => state.addToQueue,
  )

  const active = currentTrack?.id === track.id

  const handlePlay = () => {
    /*
     * Always pass the surrounding queue.
     *
     * This is important because selecting an individual
     * track should still allow NEXT to continue through
     * the playlist/library.
     */
    playQueue(queue, track)
  }

  return (
    <div
      className={`group relative flex min-h-[68px] items-center gap-3 border-b border-white/[0.035] px-3 transition md:px-5 ${
        active
          ? 'bg-cyan-400/[0.045]'
          : 'hover:bg-white/[0.025]'
      }`}
    >
      {/* Active signal indicator */}
      <div className="hidden w-5 shrink-0 items-center justify-center md:flex">
        {active ? (
          <div className="flex h-4 items-end gap-[2px]">
            <span
              className={`w-[2px] rounded-full bg-cyan-300 ${
                isPlaying
                  ? 'animate-[scaleY_0.7s_ease-in-out_infinite]'
                  : 'h-2'
              }`}
              style={{
                height: isPlaying ? '70%' : '50%',
              }}
            />

            <span
              className={`w-[2px] rounded-full bg-cyan-300 ${
                isPlaying
                  ? 'animate-[scaleY_0.55s_ease-in-out_infinite]'
                  : 'h-3'
              }`}
              style={{
                height: isPlaying ? '100%' : '75%',
              }}
            />

            <span
              className={`w-[2px] rounded-full bg-cyan-300 ${
                isPlaying
                  ? 'animate-[scaleY_0.8s_ease-in-out_infinite]'
                  : 'h-1.5'
              }`}
              style={{
                height: isPlaying ? '55%' : '40%',
              }}
            />
          </div>
        ) : (
          <span className="font-mono text-[8px] text-slate-800">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* Artwork */}
      <button
        type="button"
        onClick={handlePlay}
        className="relative h-11 w-11 shrink-0 overflow-hidden border border-white/10 bg-white/[0.02]"
        aria-label={
          active && isPlaying
            ? `Pause ${track.title}`
            : `Play ${track.title}`
        }
      >
        <img
          src={track.artworkUrl || '/images/default.jpg'}
          alt=""
          className={`h-full w-full object-cover transition ${
            active ? 'opacity-65' : 'opacity-55 group-hover:opacity-75'
          }`}
        />

        <div className="absolute inset-0 bg-cyan-400/[0.03]" />

        <div
          className={`absolute inset-0 flex items-center justify-center transition ${
            active || 'group-hover:opacity-100'
          }`}
        >
          {active && isPlaying ? (
            <Pause className="h-4 w-4 fill-cyan-300 text-cyan-300" />
          ) : (
            <Play className="ml-0.5 h-4 w-4 fill-white text-white opacity-0 transition group-hover:opacity-100" />
          )}
        </div>

        {active && (
          <span className="absolute bottom-0 left-0 right-0 h-px bg-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
        )}
      </button>

      {/* Track identity */}
      <button
        type="button"
        onClick={handlePlay}
        className="min-w-0 flex-1 text-left"
      >
        <div
          className={`truncate text-xs font-medium transition md:text-sm ${
            active
              ? 'text-cyan-200'
              : 'text-slate-300 group-hover:text-white'
          }`}
        >
          {track.title}
        </div>

        <div className="mt-1 flex min-w-0 items-center gap-2">
          <span className="truncate text-[10px] text-slate-600">
            {track.artistName || 'Unknown Artist'}
          </span>

          {track.mood && (
            <>
              <span className="h-1 w-1 shrink-0 rounded-full bg-slate-800" />

              <span className="hidden truncate font-mono text-[8px] uppercase tracking-wider text-slate-700 sm:block">
                {track.mood}
              </span>
            </>
          )}
        </div>
      </button>

      {/* Album */}
      <div className="hidden w-[170px] shrink-0 truncate text-left font-mono text-[9px] text-slate-700 lg:block">
        {track.albumName || 'My Music'}
      </div>

      {/* Format */}
      <div className="hidden w-12 shrink-0 text-center font-mono text-[8px] uppercase text-slate-800 xl:block">
        {track.format || '—'}
      </div>

      {/* Duration */}
      <div className="w-11 shrink-0 text-right font-mono text-[9px] text-slate-700">
        {formatDuration(track.duration)}
      </div>

      {/* Add to queue */}
      <button
        type="button"
        onClick={() => addToQueue(track)}
        className="flex h-8 w-8 shrink-0 items-center justify-center border border-transparent text-slate-700 opacity-100 transition hover:border-cyan-400/15 hover:bg-cyan-400/5 hover:text-cyan-300 md:opacity-0 md:group-hover:opacity-100"
        aria-label={`Add ${track.title} to queue`}
        title="Add to queue"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>

      {/* Like */}
      <button
        type="button"
        className="hidden h-8 w-8 shrink-0 items-center justify-center border border-transparent text-slate-700 opacity-0 transition hover:border-cyan-400/15 hover:text-cyan-300 md:flex md:group-hover:opacity-100"
        aria-label={`Like ${track.title}`}
        title="Like"
      >
        <Heart className="h-3.5 w-3.5" />
      </button>

      {/* More */}
      <button
        type="button"
        className="flex h-8 w-8 shrink-0 items-center justify-center text-slate-700 transition hover:text-slate-300"
        aria-label={`More options for ${track.title}`}
        title="More options"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {/* Active edge */}
      {active && (
        <span className="absolute bottom-0 left-0 top-0 w-px bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
      )}
    </div>
  )
}