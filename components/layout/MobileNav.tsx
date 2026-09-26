'use client'

import Link from 'next/link'
import type { Route } from 'next'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Clock3,
  Home,
  Library,
  ListMusic,
  Search,
  Settings,
} from 'lucide-react'

const NAV_ITEMS: {
  href: Route
  label: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
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
      label: 'Stats',
      icon: BarChart3,
    },
    {
      href: '/settings',
      label: 'Settings',
      icon: Settings,
    },
  ]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-2 bottom-2 z-50 md:hidden">
      <div className="relative overflow-hidden border border-cyan-400/15 bg-[#05090a]/95 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        {/* Scanline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

        {/* Navigation */}
        <div className="flex items-stretch overflow-x-auto scrollbar-none">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon

            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href ||
                pathname.startsWith(`${item.href}/`)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex min-w-[64px] flex-1 flex-col items-center justify-center gap-1 px-2 py-2.5 transition ${isActive
                    ? 'text-cyan-300'
                    : 'text-slate-600 hover:text-slate-300'
                  }`}
              >
                {isActive && (
                  <>
                    <span className="absolute inset-x-3 top-0 h-px bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                    <span className="absolute inset-0 bg-cyan-400/[0.04]" />
                  </>
                )}

                <Icon
                  className={`relative z-10 h-4 w-4 ${isActive ? 'drop-shadow-[0_0_6px_rgba(103,232,249,0.5)]' : ''
                    }`}
                />

                <span
                  className={`relative z-10 font-mono text-[7px] uppercase tracking-wider ${isActive ? 'text-cyan-300' : 'text-slate-600'
                    }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-1 h-0.5 w-0.5 rounded-full bg-cyan-300 shadow-[0_0_6px_rgba(103,232,249,0.8)]" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Bottom telemetry line */}
        <div className="flex h-3 items-center justify-between border-t border-white/5 px-3 font-mono text-[6px] uppercase tracking-[0.2em] text-slate-700">
          <span>VOLTIX // MOBILE HUD</span>

          <span className="flex items-center gap-1 text-green-500/50">
            <span className="h-1 w-1 animate-pulse rounded-full bg-green-400" />
            LINK
          </span>
        </div>
      </div>
    </nav>
  )
}