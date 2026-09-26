// ==============================================
// VOLTIX AUDIO OS — SEARCH TERMINAL
// ==============================================
// Searches:
// - Songs
// - Artists
// - Albums
// - Genres
// - Moods
//
// Current source:
// data/mock/tracks.ts
//
// BACKEND TODO:
// Replace local filtering with:
// GET /api/search?q=...
//
// ==============================================

'use client'

import { useMemo, useState } from 'react'

import {
  AudioLines,
  Filter,
  Radio,
  Search,
  SlidersHorizontal,
  Terminal,
  X,
} from 'lucide-react'

import { MOCK_TRACKS } from '@/data/mock/tracks'

import HudPanel from '@/components/hud/HudPanel'

import TrackRow from '@/components/music/TrackRow'

// ==============================================
// TYPES
// ==============================================

type SearchFilter =
  | 'all'
  | 'tracks'
  | 'artists'
  | 'albums'

// ==============================================
// PAGE
// ==============================================

export default function SearchPage() {

  // ============================================
  // STATE
  // ============================================

  const [query, setQuery] =
    useState('')

  const [filter, setFilter] =
    useState<SearchFilter>('all')

  const [showFilters, setShowFilters] =
    useState(false)

  // ============================================
  // SEARCH
  // ============================================

  const results =
    useMemo(() => {

      const search =
        query
          .trim()
          .toLowerCase()

      if (!search) {
        return MOCK_TRACKS
      }

      return MOCK_TRACKS.filter(
        (track) => {

          const title =
            track.title
              ?.toLowerCase() ?? ''

          const artist =
            track.artistName
              ?.toLowerCase() ?? ''

          const album =
            track.albumName
              ?.toLowerCase() ?? ''

          const genre =
            track.genre
              ?.toLowerCase() ?? ''

          const mood =
            track.mood
              ?.toLowerCase() ?? ''

          return (
            title.includes(search) ||
            artist.includes(search) ||
            album.includes(search) ||
            genre.includes(search) ||
            mood.includes(search)
          )
        }
      )

    }, [query])

  // ============================================
  // FILTERED DISPLAY
  // ============================================

  const filteredResults =
    useMemo(() => {

      if (filter === 'all') {
        return results
      }

      if (filter === 'tracks') {
        return results
      }

      if (filter === 'artists') {

        const seen =
          new Set<string>()

        return results.filter(
          (track) => {

            if (
              seen.has(
                track.artistName
              )
            ) {
              return false
            }

            seen.add(
              track.artistName
            )

            return true
          }
        )
      }

      if (filter === 'albums') {

        const seen =
          new Set<string>()

        return results.filter(
          (track) => {

            if (
              seen.has(
                track.albumName
              )
            ) {
              return false
            }

            seen.add(
              track.albumName
            )

            return true
          }
        )
      }

      return results

    }, [
      results,
      filter,
    ])

  // ============================================
  // CLEAR SEARCH
  // ============================================

  const clearSearch = () => {
    setQuery('')
  }

  // ============================================
  // RENDER
  // ============================================

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#020607]
        px-3
        pb-10
        pt-4
        sm:px-5
        sm:pt-5
        lg:px-6
      "
    >

      {/* ====================================== */}
      {/* BACKGROUND GRID                        */}
      {/* ====================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          opacity-[0.11]
          [background-image:
            linear-gradient(
              rgba(34,211,238,0.06)_1px,
              transparent_1px
            ),
            linear-gradient(
              90deg,
              rgba(34,211,238,0.06)_1px,
              transparent_1px
            )
          ]
          [background-size:32px_32px]
        "
      />

      {/* TOP ATMOSPHERIC GLOW */}

      <div
        className="
          pointer-events-none
          fixed
          left-[45%]
          top-0
          h-[320px]
          w-[320px]
          -translate-x-1/2
          rounded-full
          bg-cyan-400/[0.035]
          blur-[110px]
        "
      />

      {/* ====================================== */}
      {/* CONTENT                                */}
      {/* ====================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-[1250px]
        "
      >

        {/* ==================================== */}
        {/* HEADER                               */}
        {/* ==================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >

          <div>

            {/* TECH LABEL */}

            <div
              className="
                flex
                items-center
                gap-2
                font-mono
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-cyan-300/60
              "
            >

              <Terminal size={11} />

              02 / SEARCH TERMINAL

            </div>

            {/* TITLE */}

            <h1
              className="
                mt-2
                text-3xl
                font-semibold
                tracking-tight
                text-slate-100
                sm:text-4xl
              "
            >
              Search music
            </h1>

            <p
              className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-slate-600
              "
            >
              Query your personal audio
              network by song, artist,
              album, genre or mood.
            </p>

          </div>


          {/* SYSTEM STATE */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-emerald-300/10
              bg-emerald-300/[0.02]
              px-3
              py-2
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                animate-pulse
                rounded-full
                bg-emerald-300
                shadow-[0_0_8px_rgba(110,231,183,0.8)]
              "
            />

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.14em]
                text-emerald-300/60
              "
            >
              INDEX ONLINE
            </span>

          </div>

        </div>


        {/* ==================================== */}
        {/* SEARCH INPUT                         */}
        {/* ==================================== */}

        <div
          className="
            relative
            mt-6
            overflow-hidden
            rounded-xl
            border
            border-cyan-300/[0.15]
            bg-[#041017]/90
            shadow-[0_0_40px_rgba(0,180,255,0.04)]
            backdrop-blur-xl
          "
        >

          {/* Top glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-0
              right-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-300/50
              to-transparent
            "
          />

          <div
            className="
              flex
              items-center
              gap-3
              px-4
              py-4
            "
          >

            <Search
              size={19}
              className="
                shrink-0
                text-cyan-300/55
              "
            />

            <input
              type="text"
              value={query}
              onChange={(event) =>
                setQuery(
                  event.target.value
                )
              }
              placeholder="Search songs, artists, albums, moods..."
              className="
                min-w-0
                flex-1
                bg-transparent
                font-mono
                text-sm
                text-cyan-100
                outline-none
                placeholder:text-slate-700
              "
              autoFocus
            />

            {/* Clear */}

            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="
                  rounded-md
                  p-1.5
                  text-slate-600
                  transition
                  hover:bg-white/5
                  hover:text-slate-300
                "
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

            {/* Filter */}

            <button
              type="button"
              onClick={() =>
                setShowFilters(
                  !showFilters
                )
              }
              className={[
                'rounded-md',
                'border',
                'p-2',
                'transition',
                showFilters
                  ? [
                      'border-cyan-300/20',
                      'bg-cyan-300/10',
                      'text-cyan-200',
                    ].join(' ')
                  : [
                      'border-white/[0.05]',
                      'text-slate-600',
                      'hover:text-slate-300',
                    ].join(' '),
              ].join(' ')}
              aria-label="Toggle filters"
              title="Filters"
            >
              <SlidersHorizontal
                size={15}
              />
            </button>

          </div>


          {/* ================================= */}
          {/* FILTER BAR                        */}
          {/* ================================= */}

          {showFilters && (
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
                border-t
                border-white/[0.05]
                bg-black/[0.12]
                px-4
                py-3
              "
            >

              <div
                className="
                  mr-1
                  flex
                  items-center
                  gap-1.5
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.13em]
                  text-slate-700
                "
              >
                <Filter size={11} />
                FILTER
              </div>

              <FilterButton
                active={
                  filter === 'all'
                }
                onClick={() =>
                  setFilter('all')
                }
              >
                ALL
              </FilterButton>

              <FilterButton
                active={
                  filter === 'tracks'
                }
                onClick={() =>
                  setFilter('tracks')
                }
              >
                TRACKS
              </FilterButton>

              <FilterButton
                active={
                  filter === 'artists'
                }
                onClick={() =>
                  setFilter('artists')
                }
              >
                ARTISTS
              </FilterButton>

              <FilterButton
                active={
                  filter === 'albums'
                }
                onClick={() =>
                  setFilter('albums')
                }
              >
                ALBUMS
              </FilterButton>

            </div>
          )}

        </div>


        {/* ==================================== */}
        {/* QUERY STATUS                         */}
        {/* ==================================== */}

        <div
          className="
            mt-4
            flex
            flex-wrap
            items-center
            justify-between
            gap-2
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <span
              className="
                font-mono
                text-[8px]
                uppercase
                tracking-[0.14em]
                text-slate-700
              "
            >
              QUERY
            </span>

            <span
              className="
                max-w-[300px]
                truncate
                font-mono
                text-[9px]
                text-cyan-200/60
              "
            >
              {query
                ? `"${query}"`
                : 'ALL AUDIO'}
            </span>

          </div>


          <div
            className="
              flex
              items-center
              gap-2
              font-mono
              text-[8px]
              uppercase
              tracking-[0.14em]
              text-slate-700
            "
          >

            <Radio size={11} />

            {filteredResults.length}{' '}
            SIGNAL
            {filteredResults.length === 1
              ? ''
              : 'S'} FOUND

          </div>

        </div>


        {/* ==================================== */}
        {/* RESULTS                              */}
        {/* ==================================== */}

        <HudPanel
          className="mt-3"
          label="audio database"
          status="indexed"
          statusColor="green"
        >

          {/* TABLE HEADER */}

          <div
            className="
              hidden
              grid-cols-[38px_minmax(0,1fr)_80px_72px]
              items-center
              gap-3
              border-b
              border-white/[0.05]
              px-3
              py-2
              sm:grid
            "
          >

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.15em]
                text-slate-700
              "
            >
              #
            </span>

            <span
              className="
                font-mono
                text-[7px]
                uppercase
                tracking-[0.15em]
                text-slate-700
              "
            >
              SIGNAL / TRACK
            </span>

            <span
              className="
                text-right
                font-mono
                text-[7px]
                uppercase
                tracking-[0.15em]
                text-slate-700
              "
            >
              DURATION
            </span>

            <span
              className="
                text-right
                font-mono
                text-[7px]
                uppercase
                tracking-[0.15em]
                text-slate-700
              "
            >
              ACTION
            </span>

          </div>


          {/* RESULT LIST */}

          <div className="p-2 sm:p-3">

            {filteredResults.length > 0 ? (

              filteredResults.map(
                (
                  track,
                  index
                ) => (

                  <TrackRow
                    key={track.id}
                    track={track}
                    index={index}
                    queue={results}
                  />

                )
              )

            ) : (

              /* EMPTY */

              <div
                className="
                  flex
                  min-h-[360px]
                  flex-col
                  items-center
                  justify-center
                  px-5
                  text-center
                "
              >

                <div
                  className="
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-cyan-300/10
                    bg-cyan-300/[0.02]
                    shadow-[0_0_40px_rgba(34,211,238,0.05)]
                  "
                >

                  <AudioLines
                    size={30}
                    strokeWidth={1}
                    className="
                      text-cyan-300/25
                    "
                  />

                </div>


                <div
                  className="
                    mt-5
                    font-mono
                    text-[10px]
                    uppercase
                    tracking-[0.18em]
                    text-slate-600
                  "
                >
                  NO SIGNALS FOUND
                </div>


                <p
                  className="
                    mt-2
                    max-w-sm
                    text-xs
                    leading-5
                    text-slate-700
                  "
                >
                  No tracks matched the
                  current search query.
                </p>

              </div>

            )}

          </div>

        </HudPanel>


        {/* ==================================== */}
        {/* TERMINAL FOOTER                      */}
        {/* ==================================== */}

        <div
          className="
            mt-3
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-white/[0.04]
            bg-white/[0.01]
            px-3
            py-2.5
          "
        >

          <span
            className="
              font-mono
              text-[8px]
              text-cyan-300/45
            "
          >
            $
          </span>

          <span
            className="
              truncate
              font-mono
              text-[8px]
              uppercase
              tracking-[0.12em]
              text-slate-700
            "
          >
            {query
              ? `SEARCHING LOCAL INDEX FOR "${query}"`
              : 'READY FOR AUDIO QUERY'}
          </span>

        </div>

      </div>

    </div>
  )
}


// ==============================================
// FILTER BUTTON
// ==============================================

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {

  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-md',
        'border',
        'px-3',
        'py-1.5',
        'font-mono',
        'text-[8px]',
        'uppercase',
        'tracking-[0.12em]',
        'transition-all',

        active
          ? [
              'border-cyan-300/25',
              'bg-cyan-300/10',
              'text-cyan-200',
            ].join(' ')
          : [
              'border-white/[0.05]',
              'bg-white/[0.01]',
              'text-slate-600',
              'hover:border-cyan-300/15',
              'hover:text-slate-300',
            ].join(' '),
      ].join(' ')}
    >
      {children}
    </button>
  )
}