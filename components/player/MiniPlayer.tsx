'use client'

import {
  Heart,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react'

import { usePlayerStore } from '@/store/playerStore'

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  return `${minutes}:${remainingSeconds
    .toString()
    .padStart(2, '0')}`
}

export default function MiniPlayer() {
  const currentTrack = usePlayerStore(
    (state) => state.currentTrack
  )

  const isPlaying = usePlayerStore(
    (state) => state.isPlaying
  )

  const currentTime = usePlayerStore(
    (state) => state.currentTime
  )

  const duration = usePlayerStore(
    (state) => state.duration
  )

  const volume = usePlayerStore(
    (state) => state.volume
  )

  const shuffle = usePlayerStore(
    (state) => state.shuffle
  )

  const repeat = usePlayerStore(
    (state) => state.repeat
  )

  const play = usePlayerStore(
    (state) => state.play
  )

  const pause = usePlayerStore(
    (state) => state.pause
  )

  const next = usePlayerStore(
    (state) => state.next
  )

  const previous = usePlayerStore(
    (state) => state.previous
  )

  const seek = usePlayerStore(
    (state) => state.seek
  )

  const setVolume = usePlayerStore(
    (state) => state.setVolumeValue
  )

  const toggleShuffle = usePlayerStore(
    (state) => state.toggleShuffle
  )

  const toggleRepeat = usePlayerStore(
    (state) => state.toggleRepeat
  )

  if (!currentTrack) {
    return null
  }

  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        border-t
        border-white/10
        bg-[#020708]/95
        backdrop-blur-xl
        shadow-[0_-10px_40px_rgba(0,0,0,0.35)]
      "
    >
      {/* Progress line */}
      <div className="h-[2px] w-full bg-white/5">
        <div
          className="
            h-full
            bg-emerald-400
            transition-[width]
            duration-150
          "
          style={{
            width: `${Math.min(100, Math.max(0, progress))}%`,
          }}
        />
      </div>

      <div
        className="
          mx-auto
          flex
          min-h-[76px]
          max-w-[1800px]
          items-center
          gap-3
          px-3
          py-2
          sm:px-5
          lg:px-6
        "
      >
        {/* ====================================== */}
        {/* TRACK INFORMATION                       */}
        {/* ====================================== */}

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5">
            <img
              src={currentTrack.artworkUrl}
              alt={currentTrack.title}
              className="h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.src =
                  '/images/default.jpg'
              }}
            />

            {isPlaying && (
              <div className="absolute inset-0 bg-black/20" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {currentTrack.title}
            </p>

            <p className="truncate text-xs text-slate-400">
              {currentTrack.artistName}
            </p>
          </div>

          <button
            type="button"
            className="
              hidden
              shrink-0
              rounded-full
              p-2
              text-slate-400
              transition
              hover:bg-white/5
              hover:text-emerald-400
              sm:block
            "
            aria-label="Like song"
          >
            <Heart size={18} />
          </button>
        </div>

        {/* ====================================== */}
        {/* MAIN CONTROLS                           */}
        {/* ====================================== */}

        <div className="flex shrink-0 items-center gap-1">
          {/* Shuffle */}

          <button
            type="button"
            onClick={toggleShuffle}
            className={`
              hidden
              rounded-full
              p-2
              transition
              md:block
              ${
                shuffle
                  ? 'text-emerald-400'
                  : 'text-slate-500 hover:text-white'
              }
            `}
            aria-label="Toggle shuffle"
            title="Shuffle"
          >
            <Shuffle size={18} />
          </button>

          {/* Previous */}

          <button
            type="button"
            onClick={previous}
            className="
              rounded-full
              p-2
              text-slate-300
              transition
              hover:bg-white/5
              hover:text-white
            "
            aria-label="Previous song"
            title="Previous"
          >
            <SkipBack size={20} />
          </button>

          {/* Play / Pause */}

          <button
            type="button"
            onClick={() => {
              if (isPlaying) {
                pause()
              } else {
                play()
              }
            }}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-emerald-400/40
              bg-emerald-400
              text-black
              shadow-[0_0_25px_rgba(52,211,153,0.18)]
              transition
              hover:scale-105
              hover:bg-emerald-300
            "
            aria-label={
              isPlaying
                ? 'Pause'
                : 'Play'
            }
          >
            {isPlaying ? (
              <Pause
                size={20}
                fill="currentColor"
              />
            ) : (
              <Play
                size={20}
                fill="currentColor"
              />
            )}
          </button>

          {/* Next */}

          <button
            type="button"
            onClick={next}
            className="
              rounded-full
              p-2
              text-slate-300
              transition
              hover:bg-white/5
              hover:text-white
            "
            aria-label="Next song"
            title="Next"
          >
            <SkipForward size={20} />
          </button>

          {/* Repeat */}

          <button
            type="button"
            onClick={toggleRepeat}
            className={`
              hidden
              rounded-full
              p-2
              transition
              md:block
              ${
                repeat !== 'off'
                  ? 'text-emerald-400'
                  : 'text-slate-500 hover:text-white'
              }
            `}
            aria-label="Toggle repeat"
            title={
              repeat === 'one'
                ? 'Repeat one'
                : repeat === 'all'
                  ? 'Repeat all'
                  : 'Repeat off'
            }
          >
            <Repeat size={18} />

            {repeat === 'one' && (
              <span className="absolute text-[8px]">
                1
              </span>
            )}
          </button>
        </div>

        {/* ====================================== */}
        {/* TIME                                    */}
        {/* ====================================== */}

        <div
          className="
            hidden
            min-w-[90px]
            text-center
            font-mono
            text-[11px]
            text-slate-500
            lg:block
          "
        >
          {formatTime(currentTime)}
          {' / '}
          {formatTime(duration)}
        </div>

        {/* ====================================== */}
        {/* VOLUME                                  */}
        {/* ====================================== */}

        <div
          className="
            hidden
            w-32
            items-center
            gap-2
            xl:flex
          "
        >
          <Volume2
            size={16}
            className="shrink-0 text-slate-500"
          />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) =>
              setVolume(
                Number(event.target.value)
              )
            }
            className="
              h-1
              w-full
              cursor-pointer
              appearance-none
              rounded-full
              bg-white/10
              accent-emerald-400
            "
            aria-label="Volume"
          />
        </div>
      </div>

      {/* ======================================== */}
      {/* MOBILE PROGRESS / TIME                   */}
      {/* ======================================== */}

      <div className="px-3 pb-2 sm:px-5 md:hidden">
        <div className="flex items-center justify-between font-mono text-[9px] text-slate-500">
          <span>
            {formatTime(currentTime)}
          </span>

          <span>
            {formatTime(duration)}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max={duration || 1}
          step="0.1"
          value={Math.min(currentTime, duration || 1)}
          onChange={(event) =>
            seek(
              Number(event.target.value)
            )
          }
          className="
            mt-1
            h-1
            w-full
            cursor-pointer
            appearance-none
            rounded-full
            bg-white/10
            accent-emerald-400
          "
          aria-label="Song progress"
        />
      </div>
    </div>
  )
}