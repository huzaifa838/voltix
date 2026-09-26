'use client'

import { useEffect } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
  Terminal,
} from 'lucide-react'
import Link from 'next/link'

import HudPanel from '@/components/hud/HudPanel'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('VOLTIX AUDIO OS ERROR:', error)
  }, [error])

  return (
    <main className="relative flex min-h-full items-center justify-center overflow-hidden bg-[#020607] px-4 pb-32 text-[#E8F3F5] md:px-6">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[10%] h-[380px] w-[380px] rounded-full bg-red-400/5 blur-[130px]" />
        <div className="absolute bottom-[5%] right-[15%] h-[320px] w-[320px] rounded-full bg-cyan-400/5 blur-[130px]" />

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
        {/* Error line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />

        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-red-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
              SYSTEM FAULT
            </div>

            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-700">
              VX-ERR
            </div>
          </div>

          {/* Icon */}
          <div className="relative mx-auto mt-9 flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-red-400/10" />
            <div className="absolute inset-4 rounded-full border border-red-400/10 border-dashed" />

            <div className="relative flex h-16 w-16 items-center justify-center border border-red-400/25 bg-red-400/5">
              <AlertTriangle className="h-7 w-7 text-red-400/70" />

              <span className="absolute -right-1 -top-1 h-2 w-2 bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" />
            </div>
          </div>

          {/* Message */}
          <div className="mt-7 text-center">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400/80">
              AUDIO OS EXCEPTION
            </div>

            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Something interrupted the signal
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">
              The interface encountered an unexpected runtime error. Your
              local audio files are not modified by this screen.
            </p>
          </div>

          {/* Diagnostic terminal */}
          <div className="mt-7 border border-white/5 bg-black/30 p-4">
            <div className="mb-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.2em] text-slate-700">
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              DIAGNOSTIC OUTPUT
            </div>

            <div className="space-y-2 font-mono text-[9px]">
              <div className="flex items-start justify-between gap-4">
                <span className="shrink-0 text-slate-700">STATUS</span>
                <span className="text-red-400">FAILED</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="shrink-0 text-slate-700">ENGINE</span>
                <span className="text-green-400">RUNNING</span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <span className="shrink-0 text-slate-700">RECOVERY</span>
                <span className="text-cyan-400">AVAILABLE</span>
              </div>

              {error?.digest && (
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-slate-700">DIGEST</span>
                  <span className="break-all text-slate-500">
                    {error.digest}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Recovery actions */}
          <div className="mt-7 flex flex-col justify-center gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex h-10 items-center justify-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-5 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              RETRY SYSTEM
            </button>

            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 border border-white/10 bg-white/[0.02] px-5 font-mono text-[10px] uppercase tracking-widest text-slate-400 transition hover:border-white/20 hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              RETURN HOME
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[7px] uppercase tracking-[0.2em] text-slate-800 sm:flex-row sm:items-center sm:justify-between">
            <span>VOLTIX AUDIO OS // ERROR RECOVERY</span>
            <span>LOCAL MEDIA: PRESERVED</span>
          </div>
        </div>
      </HudPanel>
    </main>
  )
}