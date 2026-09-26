'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import {
  Activity,
  BarChart3,
  Clock3,
  Home,
  Library,
  ListMusic,
  Radio,
  Search,
  Settings,
} from 'lucide-react'

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

type MoodNavItem = {
  href: string
  label: string
}

const MAIN_NAV: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
  },
  {
    href: '/search',
    label: 'Search',
    icon: Search,
  },
  {
    href: '/library',
    label: 'Library',
    icon: Library,
  },
]

const SYSTEM_NAV: NavItem[] = [
  {
    href: '/queue',
    label: 'Queue',
    icon: ListMusic,
  },
  {
    href: '/history',
    label: 'History',
    icon: Clock3,
  },
  {
    href: '/analytics',
    label: 'Analytics',
    icon: BarChart3,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
  },
]

const MOOD_NAV: MoodNavItem[] = [
  {
    href: '/playlist/mood-chill',
    label: 'Chill',
  },
  {
    href: '/playlist/mood-depression',
    label: 'Depression',
  },
  {
    href: '/playlist/mood-sad',
    label: 'Sad',
  },
  {
    href: '/playlist/mood-relaxing',
    label: 'Relaxing',
  },
  {
    href: '/playlist/mood-time-pass',
    label: 'Time Pass',
  },
  {
    href: '/playlist/mood-with-friends',
    label: 'With Friends',
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="relative flex h-full w-full flex-col overflow-hidden border-r border-white/5 bg-[#030708]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-24 top-20 h-48 w-48 rounded-full bg-cyan-400/5 blur-[80px]" />

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Header */}
      <div className="relative border-b border-white/5 px-5 py-5">
        <Link href="/" className="block">
          <div className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 items-center justify-center border border-cyan-400/30 bg-cyan-400/5">
              <Radio className="h-4 w-4 text-cyan-300" />

              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
            </div>

            <div className="min-w-0">
              <div className="font-mono text-[11px] font-semibold tracking-[0.2em] text-white">
                VOLTIX
              </div>

              <div className="font-mono text-[7px] uppercase tracking-[0.3em] text-cyan-400/60">
                AUDIO OS
              </div>
            </div>
          </div>
        </Link>

        <div className="mt-4 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.2em]">
          <span className="text-slate-700">SYSTEM NODE</span>

          <span className="flex items-center gap-1.5 text-green-400/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            ONLINE
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative flex-1 overflow-y-auto px-3 py-5 scrollbar-none">
        <NavSection title="PRIMARY">
          {MAIN_NAV.map((item) => (
            <SidebarLink
              key={item.href}
              {...item}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </NavSection>

        <NavSection title="SYSTEM">
          {SYSTEM_NAV.map((item) => (
            <SidebarLink
              key={item.href}
              {...item}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </NavSection>

        <NavSection title="MOOD CHANNELS">
          <div className="space-y-0.5">
            {MOOD_NAV.map((item, index) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 border px-3 py-2 transition ${active
                    ? 'border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300'
                    : 'border-transparent text-slate-600 hover:border-white/5 hover:bg-white/[0.02] hover:text-slate-300'
                    }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 border transition ${active
                      ? 'border-cyan-300 bg-cyan-300 shadow-[0_0_7px_rgba(103,232,249,0.6)]'
                      : 'border-slate-700 group-hover:border-cyan-400/50'
                      }`}
                  />

                  <span className="truncate font-mono text-[9px] uppercase tracking-wider">
                    {item.label}
                  </span>

                  <span className="ml-auto font-mono text-[7px] text-slate-800">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {active && (
                    <span className="absolute right-0 top-1/2 h-4 w-px -translate-y-1/2 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
                  )}
                </Link>
              )
            })}
          </div>
        </NavSection>
      </div>

      {/* Bottom status */}
      <div className="relative border-t border-white/5 p-3">
        <div className="border border-white/5 bg-white/[0.015] p-3">
          <div className="flex items-center gap-2">
            <Activity className="h-3 w-3 text-cyan-400" />

            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-600">
              AUDIO ENGINE
            </span>

            <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          </div>

          <div className="mt-2 font-mono text-[8px] text-slate-700">
            LOCAL {'//'} READY
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between px-1 font-mono text-[6px] uppercase tracking-[0.2em] text-slate-800">
          <span>VX-OS</span>
          <span>01.0</span>
        </div>
      </div>
    </aside>
  )
}

function NavSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-6">
      <div className="mb-2 px-3 font-mono text-[7px] uppercase tracking-[0.3em] text-slate-800">
        {title}
      </div>

      <div className="space-y-0.5">{children}</div>
    </section>
  )
}

function SidebarLink({
  href,
  label,
  icon: Icon,
  active,
}: NavItem & {
  active: boolean
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 border px-3 py-2.5 transition ${active
        ? 'border-cyan-400/20 bg-cyan-400/[0.06] text-cyan-300'
        : 'border-transparent text-slate-600 hover:border-white/5 hover:bg-white/[0.02] hover:text-slate-300'
        }`}
    >
      <Icon
        className={`h-3.5 w-3.5 shrink-0 transition ${active
          ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(103,232,249,0.5)]'
          : 'text-slate-700 group-hover:text-cyan-400/70'
          }`}
      />

      <span className="font-mono text-[9px] uppercase tracking-[0.12em]">
        {label}
      </span>

      {active && (
        <>
          <span className="ml-auto h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_7px_rgba(103,232,249,0.8)]" />

          <span className="absolute right-0 top-1/2 h-5 w-px -translate-y-1/2 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.7)]" />
        </>
      )}
    </Link>
  )
}

function isActivePath(
  pathname: string,
  href: string,
) {
  if (href === '/') {
    return pathname === '/'
  }

  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  )
}