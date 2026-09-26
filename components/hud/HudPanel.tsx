// ==============================================
// VOLTIX AUDIO OS — HUD PANEL
// ==============================================
// Reusable futuristic panel used throughout the
// dashboard, player, queue, stats and terminal UI.
//
// UI ONLY
// No backend dependency.
//
// ==============================================

'use client'

import type { ReactNode } from 'react'

interface HudPanelProps {
  children: ReactNode
  className?: string
  label?: string
  status?: string
  statusColor?: 'cyan' | 'green' | 'red' | 'yellow'
}

const STATUS_COLORS = {
  cyan: {
    dot: 'bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.85)]',
    text: 'text-cyan-300/75',
  },

  green: {
    dot: 'bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]',
    text: 'text-emerald-300/75',
  },

  red: {
    dot: 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.85)]',
    text: 'text-red-300/75',
  },

  yellow: {
    dot: 'bg-yellow-300 shadow-[0_0_10px_rgba(253,224,71,0.8)]',
    text: 'text-yellow-300/75',
  },
}

export default function HudPanel({
  children,
  className = '',
  label,
  status,
  statusColor = 'cyan',
}: HudPanelProps) {
  const colors = STATUS_COLORS[statusColor]

  return (
    <section
      className={[
        'group relative overflow-hidden',
        'rounded-xl',
        'border border-cyan-300/[0.12]',
        'bg-[#041017]/80',
        'backdrop-blur-xl',
        'shadow-[0_0_35px_rgba(0,180,255,0.035)]',
        'transition-colors duration-300',
        'hover:border-cyan-300/[0.18]',
        className,
      ].join(' ')}
    >
      {/* ====================================== */}
      {/* TECHNICAL GRID                         */}
      {/* ====================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.16]
          [background-image:
            linear-gradient(rgba(34,211,238,0.07)_1px,transparent_1px),
            linear-gradient(90deg,rgba(34,211,238,0.07)_1px,transparent_1px)
          ]
          [background-size:24px_24px]
        "
      />

      {/* ====================================== */}
      {/* TOP GLOW                               */}
      {/* ====================================== */}

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
          via-cyan-300/40
          to-transparent
          opacity-70
        "
      />

      {/* ====================================== */}
      {/* CORNER ACCENTS                         */}
      {/* ====================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          h-5
          w-5
          border-l
          border-t
          border-cyan-300/40
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          right-0
          h-5
          w-5
          border-b
          border-r
          border-cyan-300/30
        "
      />

      {/* ====================================== */}
      {/* HEADER                                 */}
      {/* ====================================== */}

      {(label || status) && (
        <div
          className="
            relative
            z-10
            flex
            min-h-[38px]
            items-center
            justify-between
            border-b
            border-white/[0.05]
            px-4
          "
        >
          {/* LEFT */}

          <div className="flex min-w-0 items-center gap-2">
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-cyan-300
                shadow-[0_0_9px_rgba(103,232,249,0.8)]
              "
            />

            {label && (
              <span
                className="
                  truncate
                  font-mono
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-slate-500
                "
              >
                {label}
              </span>
            )}
          </div>

          {/* RIGHT */}

          {status && (
            <div
              className={[
                'flex shrink-0 items-center gap-2',
                'font-mono text-[8px]',
                'uppercase tracking-[0.16em]',
                colors.text,
              ].join(' ')}
            >
              <span
                className={[
                  'h-1.5',
                  'w-1.5',
                  'rounded-full',
                  colors.dot,
                ].join(' ')}
              />

              {status}
            </div>
          )}
        </div>
      )}

      {/* ====================================== */}
      {/* CONTENT                                */}
      {/* ====================================== */}

      <div className="relative z-10">
        {children}
      </div>

      {/* ====================================== */}
      {/* SCANLINE HOVER                         */}
      {/* ====================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          -translate-y-px
          bg-cyan-300/30
          opacity-0
          transition-all
          duration-500
          group-hover:translate-y-[300px]
          group-hover:opacity-30
        "
      />
    </section>
  )
}