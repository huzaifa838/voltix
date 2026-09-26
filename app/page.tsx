

'use client'

import Link from 'next/link'
import type { Route } from 'next'

import {
  Activity,
  ArrowRight,
  AudioLines,
  Database,
  Headphones,
  Library,
  Radio,
  ScanLine,
  ShieldCheck,
  Terminal,
} from 'lucide-react'

import { MOCK_TRACKS } from '@/data/mock/tracks'

import { MOCK_MOODS } from '@/data/mock/playlists'

import HudPanel from '@/components/hud/HudPanel'

import MoodCard from '@/components/music/MoodCard'

import TrackRow from '@/components/music/TrackRow'

// ==============================================
// PAGE
// ==============================================

const MOODS = MOCK_MOODS

function tracksForMood(moodId: string) {
  return MOCK_TRACKS.filter((track) => track.mood === moodId.replace('mood-', ''))
}

export default function HomePage() {

  // ============================================
  // RECENT / INDEXED TRACKS
  // ============================================

  const recentTracks =
    MOCK_TRACKS.slice(0, 8)

  // ============================================
  // TOTAL TRACKS
  // ============================================

  const totalTracks =
    MOCK_TRACKS.length

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
      {/* GLOBAL BACKGROUND GRID                */}
      {/* ====================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          opacity-[0.12]
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

      {/* ====================================== */}
      {/* AMBIENT GLOW                          */}
      {/* ====================================== */}

      <div
        className="
          pointer-events-none
          fixed
          right-[12%]
          top-[6%]
          h-[320px]
          w-[320px]
          rounded-full
          bg-cyan-400/[0.035]
          blur-[110px]
        "
      />

      <div
        className="
          pointer-events-none
          fixed
          bottom-[15%]
          left-[18%]
          h-[240px]
          w-[240px]
          rounded-full
          bg-blue-500/[0.025]
          blur-[100px]
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
          max-w-[1550px]
        "
      >

        {/* ==================================== */}
        {/* SYSTEM HEADER                        */}
        {/* ==================================== */}

        <div
          className="
            mb-4
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >

          <div>

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

              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-emerald-300
                  shadow-[0_0_10px_rgba(110,231,183,0.8)]
                "
              />

              VOLTIX AUDIO OS

            </div>

            <h1
              className="
                mt-2
                text-2xl
                font-semibold
                tracking-tight
                text-slate-100
                sm:text-3xl
              "
            >
              Command Center
            </h1>

          </div>


          {/* SYSTEM META */}

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-lg
                border
                border-white/[0.06]
                bg-white/[0.015]
                px-3
                py-2
                sm:flex
              "
            >

              <ScanLine
                size={13}
                className="text-cyan-300/50"
              />

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.14em]
                  text-slate-600
                "
              >
                NODE: LOCAL
              </span>

            </div>

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
                ONLINE
              </span>

            </div>

          </div>

        </div>


        {/* ====================================== */}
        {/* HERO / COMMAND PANEL                  */}
        {/* ====================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-cyan-300/[0.13]
            bg-[#041017]/90
            shadow-[0_0_55px_rgba(0,180,255,0.045)]
          "
        >

          {/* HERO GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-[360px]
              w-[360px]
              rounded-full
              bg-cyan-300/[0.07]
              blur-[100px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-0
              h-[180px]
              w-[280px]
              rounded-full
              bg-blue-500/[0.04]
              blur-[80px]
            "
          />

          {/* GRID */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-20
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
              [background-size:28px_28px]
            "
          />

          {/* TOP SCANLINE */}

          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-cyan-300/60
              to-transparent
            "
          />

          <div
            className="
              relative
              grid
              gap-8
              p-5
              sm:p-7
              lg:grid-cols-[minmax(0,1.2fr)_minmax(310px,0.8fr)]
              lg:p-8
            "
          >

            {/* ================================== */}
            {/* HERO TEXT                          */}
            {/* ================================== */}

            <div
              className="
                flex
                min-h-[260px]
                flex-col
                justify-between
              "
            >

              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-cyan-300/65
                  "
                >

                  <Activity size={12} />

                  PERSONAL MUSIC NETWORK

                </div>


                <h2
                  className="
                    mt-5
                    max-w-2xl
                    text-4xl
                    font-semibold
                    leading-[1.03]
                    tracking-[-0.03em]
                    text-slate-100
                    sm:text-5xl
                    xl:text-6xl
                  "
                >
                  Let the music
                  <span
                    className="
                      block
                      text-cyan-200
                      drop-shadow-[0_0_20px_rgba(165,243,252,0.16)]
                    "
                  >
                    handle it.
                  </span>
                </h2>


                <p
                  className="
                    mt-5
                    max-w-xl
                    text-sm
                    leading-6
                    text-slate-500
                    sm:text-[15px]
                  "
                >
                  One personal audio system for
                  every mood, every session,
                  and every late-night signal.
                </p>

              </div>


              {/* ACTIONS */}

              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <Link
                  href="/library"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-cyan-200/30
                    bg-cyan-300
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-[#021014]
                    shadow-[0_0_25px_rgba(34,211,238,0.12)]
                    transition
                    hover:bg-cyan-200
                  "
                >
                  <Library size={14} />
                  Open library
                </Link>


                <Link
                  href="/terminal"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    px-4
                    py-2.5
                    font-mono
                    text-xs
                    text-slate-400
                    transition
                    hover:border-cyan-300/20
                    hover:text-cyan-200
                  "
                >
                  <Terminal size={14} />
                  $ terminal
                </Link>

              </div>

            </div>


            {/* ================================== */}
            {/* SYSTEM CORE                       */}
            {/* ================================== */}

            <div
              className="
                relative
                flex
                min-h-[260px]
                items-center
                justify-center
              "
            >

              {/* RADAR RINGS */}

              <div
                className="
                  absolute
                  h-[220px]
                  w-[220px]
                  rounded-full
                  border
                  border-cyan-300/10
                "
              />

              <div
                className="
                  absolute
                  h-[175px]
                  w-[175px]
                  rounded-full
                  border
                  border-cyan-300/10
                "
              />

              <div
                className="
                  absolute
                  h-[125px]
                  w-[125px]
                  rounded-full
                  border
                  border-blue-300/10
                "
              />

              {/* RADAR CROSS */}

              <div
                className="
                  absolute
                  h-[240px]
                  w-px
                  bg-gradient-to-b
                  from-transparent
                  via-cyan-300/15
                  to-transparent
                "
              />

              <div
                className="
                  absolute
                  h-px
                  w-[240px]
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300/15
                  to-transparent
                "
              />

              {/* CORE */}

              <div
                className="
                  relative
                  flex
                  h-32
                  w-32
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-cyan-200/25
                  bg-cyan-300/[0.025]
                  shadow-[0_0_55px_rgba(34,211,238,0.10)]
                "
              >

                <div
                  className="
                    absolute
                    inset-3
                    rounded-full
                    border
                    border-cyan-300/15
                  "
                />

                <div
                  className="
                    absolute
                    inset-8
                    animate-pulse
                    rounded-full
                    bg-cyan-300/[0.04]
                    shadow-[0_0_35px_rgba(34,211,238,0.18)]
                  "
                />

                <AudioLines
                  size={34}
                  strokeWidth={1}
                  className="text-cyan-200/65"
                />

              </div>


              {/* SIGNAL NODES */}

              <span
                className="
                  absolute
                  left-[19%]
                  top-[28%]
                  h-2
                  w-2
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_rgba(34,211,238,0.9)]
                "
              />

              <span
                className="
                  absolute
                  right-[16%]
                  top-[39%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-blue-300
                  shadow-[0_0_11px_rgba(147,197,253,0.9)]
                "
              />

              <span
                className="
                  absolute
                  bottom-[25%]
                  left-[27%]
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-emerald-300
                  shadow-[0_0_11px_rgba(110,231,183,0.85)]
                "
              />


              {/* TELEMETRY */}

              <div
                className="
                  absolute
                  bottom-3
                  left-1/2
                  flex
                  -translate-x-1/2
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-white/[0.06]
                  bg-[#020607]/65
                  px-3
                  py-2
                  backdrop-blur-md
                "
              >

                <Radio
                  size={11}
                  className="text-cyan-300/50"
                />

                <span
                  className="
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                    text-slate-600
                  "
                >
                  AUDIO CORE
                </span>

                <span
                  className="
                    font-mono
                    text-[8px]
                    text-emerald-300/60
                  "
                >
                  ONLINE
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ====================================== */}
        {/* MOOD CHANNELS                         */}
        {/* ====================================== */}

        <section className="mt-7">

          <div
            className="
              mb-4
              flex
              items-end
              justify-between
              gap-4
            "
          >

            <div>

              <div
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-cyan-300/55
                "
              >
                01 / signal channels
              </div>

              <h2
                className="
                  mt-1.5
                  text-xl
                  font-semibold
                  text-slate-100
                  sm:text-2xl
                "
              >
                Choose your mood
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-600
                "
              >
                Your personal audio states.
              </p>

            </div>


            <div
              className="
                hidden
                font-mono
                text-[8px]
                uppercase
                tracking-[0.16em]
                text-slate-700
                sm:block
              "
            >
              {MOODS.length} channels loaded
            </div>

          </div>


          <div
            className="
              grid
              grid-cols-2
              gap-3
              md:grid-cols-3
              xl:grid-cols-6
            "
          >

            {MOODS.map((mood) => (

              <Link
                key={mood.id}
                href={`/playlist/${mood.id}`}
                className="block"
              >

                <MoodCard
                  name={mood.name}
                  description={
                    mood.description
                  }
                  image={mood.coverUrl}
                  tracks={
                    tracksForMood(
                      mood.id
                    )
                  }
                />

              </Link>

            ))}

          </div>

        </section>


        {/* ====================================== */}
        {/* RECENT + TELEMETRY                     */}
        {/* ====================================== */}

        <section
          className="
            mt-7
            grid
            gap-4
            lg:grid-cols-[minmax(0,1fr)_330px]
          "
        >

          {/* ==================================== */}
          {/* RECENT TRACKS                        */}
          {/* ==================================== */}

          <HudPanel
            label="recent stream"
            status="live"
            statusColor="green"
          >

            <div className="p-2 sm:p-3">

              {recentTracks.length ? (

                recentTracks.map(
                  (
                    track,
                    index
                  ) => (

                    <TrackRow
                      key={track.id}
                      track={track}
                      index={index}
                      queue={recentTracks}
                    />

                  )
                )

              ) : (

                <div
                  className="
                    flex
                    min-h-[260px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                  "
                >

                  <Headphones
                    size={28}
                    className="text-slate-700"
                  />

                  <div
                    className="
                      mt-4
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.16em]
                      text-slate-600
                    "
                  >
                    NO AUDIO SIGNALS
                  </div>

                  <p
                    className="
                      mt-2
                      max-w-xs
                      text-xs
                      text-slate-700
                    "
                  >
                    Add music files to
                    public/audio to begin.
                  </p>

                </div>

              )}

            </div>

          </HudPanel>


          {/* ==================================== */}
          {/* TELEMETRY                           */}
          {/* ==================================== */}

          <HudPanel
            label="system telemetry"
            status="stable"
            statusColor="cyan"
          >

            <div
              className="
                space-y-2
                p-3
              "
            >

              <TelemetryRow
                icon={Database}
                label="LOCAL TRACKS"
                value={String(totalTracks)}
              />

              <TelemetryRow
                icon={Radio}
                label="MOOD CHANNELS"
                value={String(MOODS.length)}
              />

              <TelemetryRow
                icon={AudioLines}
                label="AUDIO SOURCE"
                value="LOCAL"
              />

              <TelemetryRow
                icon={ShieldCheck}
                label="PLAYER CORE"
                value="ONLINE"
              />


              {/* BUFFER */}

              <div
                className="
                  rounded-lg
                  border
                  border-white/[0.05]
                  bg-black/[0.12]
                  p-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    font-mono
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                  "
                >

                  <span className="text-slate-600">
                    BUFFER
                  </span>

                  <span className="text-cyan-200/60">
                    READY
                  </span>

                </div>

                <div
                  className="
                    mt-2
                    h-1
                    overflow-hidden
                    rounded-full
                    bg-white/[0.05]
                  "
                >

                  <div
                    className="
                      h-full
                      w-[92%]
                      rounded-full
                      bg-cyan-300/60
                      shadow-[0_0_10px_rgba(34,211,238,0.5)]
                    "
                  />

                </div>

              </div>


              {/* QUICK LINKS */}

              <div
                className="
                  mt-2
                  grid
                  grid-cols-2
                  gap-2
                "
              >

                <QuickLink
                  href="/queue"
                  label="QUEUE"
                />

                <QuickLink
                  href="/analytics"
                  label="ANALYTICS"
                />

                <QuickLink
                  href="/history"
                  label="HISTORY"
                />

                <QuickLink
                  href="/settings"
                  label="SETTINGS"
                />

              </div>

            </div>

          </HudPanel>

        </section>


        {/* ====================================== */}
        {/* BOTTOM SYSTEM MESSAGE                 */}
        {/* ====================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-4
            rounded-lg
            border
            border-white/[0.04]
            bg-white/[0.01]
            px-3
            py-2.5
          "
        >

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2
            "
          >

            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                animate-pulse
                rounded-full
                bg-emerald-300
              "
            />

            <span
              className="
                truncate
                font-mono
                text-[8px]
                uppercase
                tracking-[0.13em]
                text-slate-700
              "
            >
              &gt; AUDIO NETWORK READY
            </span>

          </div>


          <span
            className="
              hidden
              shrink-0
              font-mono
              text-[8px]
              text-slate-800
              sm:block
            "
          >
            VOLTIX / LOCAL NODE
          </span>

        </div>

      </div>

    </div>
  )
}


// ==============================================
// TELEMETRY ROW
// ==============================================

function TelemetryRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Database
  label: string
  value: string
}) {

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-lg
        border
        border-white/[0.05]
        bg-black/[0.10]
        px-3
        py-3
      "
    >

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <Icon
          size={14}
          className="text-cyan-300/50"
        />

        <span
          className="
            font-mono
            text-[8px]
            uppercase
            tracking-[0.12em]
            text-slate-600
          "
        >
          {label}
        </span>

      </div>


      <span
        className="
          font-mono
          text-[9px]
          text-cyan-200/65
        "
      >
        {value}
      </span>

    </div>
  )
}


// ==============================================
// QUICK LINK
// ==============================================

function QuickLink({
  href,
  label,
}: {
  href: Route
  label: string
}) {

  return (
    <Link
      href={href}
      className="
        flex
        items-center
        justify-between
        rounded-lg
        border
        border-white/[0.05]
        bg-black/[0.10]
        px-3
        py-2.5
        font-mono
        text-[8px]
        uppercase
        tracking-[0.12em]
        text-slate-600
        transition
        hover:border-cyan-300/15
        hover:bg-cyan-300/[0.03]
        hover:text-cyan-200
      "
    >

      <span>
        {label}
      </span>

      <ArrowRight
        size={12}
      />

    </Link>
  )
}