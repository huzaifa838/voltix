'use client'

import Link from 'next/link'
import { ArrowLeft, Radio, Search, Terminal } from 'lucide-react'

import HudPanel from '@/components/hud/HudPanel'

export default function NotFound() {
  return (
    <main className="relative flex min-h-full items-center justify-center overflow-hidden bg-[#020607] px-4 pb-32 text-[#E8F3F5] md:px-6">
      {/* Ambient system background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[20%] top-[10%] h-[360px] w-[360px] rounded-full bg-cyan-400/5 blur-[120px]" />
        <div className="absolute bottom-[5%] right-[15%] h-[320px] w-[320px] rounded-full bg-blue-500/5 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <HudPanel className="relative w-full max-w-2xl overflow-hidden">
        {/* Top signal line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />

        <div className="p-6 text-center md:p-10">
          {/* Status */}
          <div className="flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-red-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)]" />
            SIGNAL ERROR // 404
          </div>

          {/* Visual */}
          <div className="relative mx-auto mt-8 flex h-44 w-44 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-red-400/10" />
            <div className="absolute inset-5 rounded-full border border-red-400/10 border-dashed" />
            <div className="absolute inset-10 rounded-full border border-red-400/10" />

            <div className="absolute h-24 w-24 animate-pulse rounded-full bg-red-400/5 blur-2xl" />

            <div className="relative flex h-20 w-20 items-center justify-center border border-red-400/20 bg-red-400/5">
              <Radio className="h-8 w-8 text-red-400/60" />

              <span className="absolute right-[-2px] top-[-2px] h-2 w-2 bg-red-400" />
            </div>
          </div>

          {/* Heading */}
          <div className="mt-7 font-mono text-6xl font-semibold tracking-tight text-white md:text-7xl">
            404
          </div>

          <h1 className="mt-2 text-xl font-semibold text-white md:text-2xl">
            Audio channel not found
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
            The requested route does not exist in the VOLTIX AUDIO OS
            navigation matrix.
          </p>

          {/* Terminal output */}
          <div className="mx-auto mt-7 max-w-lg border border-white/5 bg-black/30 p-4 text-left">
            <div className="mb-3 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-700">
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              ROUTE DIAGNOSTICS
            </div>

            <div className="space-y-2 font-mono text-[9px]">
              <div className="flex justify-between gap-4">
                <span className="text-slate-700">NODE</span>
                <span className="text-slate-500">UNKNOWN</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-700">SIGNAL</span>
                <span className="text-red-400">NOT FOUND</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-700">ENGINE</span>
                <span className="text-green-400">ONLINE</span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-700">RECOVERY</span>
                <span className="text-cyan-400">AVAILABLE</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-5 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              RETURN HOME
            </Link>

            <Link
              href="/library"
              className="inline-flex h-10 items-center justify-center gap-2 border border-white/10 bg-white/[0.02] px-5 font-mono text-[10px] uppercase tracking-widest text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              <Search className="h-3.5 w-3.5" />
              OPEN LIBRARY
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[7px] uppercase tracking-[0.2em] text-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <span>VOLTIX AUDIO OS // ROUTE RECOVERY</span>
            <span>STATUS: ONLINE</span>
          </div>
        </div>
      </HudPanel>
    </main>
  )
}