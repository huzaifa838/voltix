import { Activity, AudioLines, Radio } from 'lucide-react'

export default function Loading() {
  return (
    <main className="flex min-h-full items-center justify-center overflow-hidden bg-[#020607] text-[#E8F3F5]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/5 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative w-full max-w-md px-6 text-center">
        {/* Holographic core */}
        <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
          <div className="absolute inset-0 animate-pulse rounded-full border border-cyan-400/10" />

          <div className="absolute inset-4 animate-[spin_10s_linear_infinite] rounded-full border border-cyan-400/15 border-dashed" />

          <div className="absolute inset-9 rounded-full border border-cyan-400/20 bg-cyan-400/5 shadow-[0_0_50px_rgba(34,211,238,0.08)]" />

          <div className="relative flex h-14 w-14 items-center justify-center border border-cyan-400/30 bg-[#030708]/80">
            <Radio className="h-6 w-6 text-cyan-300" />

            <span className="absolute -right-1 -top-1 h-1.5 w-1.5 animate-pulse bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]" />
          </div>
        </div>

        {/* Status */}
        <div className="mt-8 flex items-center justify-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-400">
          <Activity className="h-3.5 w-3.5 animate-pulse" />
          INITIALIZING AUDIO OS
        </div>

        <h1 className="mt-3 text-xl font-semibold tracking-tight text-white">
          Establishing signal...
        </h1>

        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700">
          Loading interface modules
        </p>

        {/* Loading bars */}
        <div className="mx-auto mt-7 max-w-xs space-y-2">
          <div className="h-1 overflow-hidden bg-white/5">
            <div className="h-full w-[72%] animate-pulse bg-cyan-400/50" />
          </div>

          <div className="flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.2em] text-slate-700">
            <span className="flex items-center gap-1.5">
              <AudioLines className="h-3 w-3" />
              AUDIO ENGINE
            </span>

            <span className="text-cyan-500/50">CONNECTING</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-white/5 pt-4 font-mono text-[7px] uppercase tracking-[0.25em] text-slate-800">
          VOLTIX AUDIO OS // SYSTEM BOOT
        </div>
      </div>
    </main>
  )
}