'use client'

import { useState } from 'react'
import {
  AudioLines,
  Bell,
  Check,
  Database,
  Gauge,
  HardDrive,
  Monitor,
  Moon,
  Palette,
  Radio,
  Save,
  Settings,
  Shield,
  Volume2,
} from 'lucide-react'

import HudPanel from '@/components/hud/HudPanel'
import { usePlayerStore } from '@/store/playerStore'

export default function SettingsPage() {
  const volume = usePlayerStore((state) => state.volume)
  const isMuted = usePlayerStore((state) => state.isMuted)
  const setVolumeValue = usePlayerStore((state) => state.setVolumeValue)
  const mute = usePlayerStore((state) => state.mute)
  const unmute = usePlayerStore((state) => state.unmute)

  const [autoplay, setAutoplay] = useState(true)
  const [visualizer, setVisualizer] = useState(true)
  const [notifications, setNotifications] = useState(false)
  const [compactMode, setCompactMode] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    window.setTimeout(() => {
      setSaved(false)
    }, 1800)
  }

  return (
    <main className="min-h-full bg-[#020607] text-[#E8F3F5]">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[15%] top-[-15%] h-[420px] w-[420px] rounded-full bg-cyan-400/5 blur-[130px]" />
        <div className="absolute bottom-[-15%] right-[15%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1500px] space-y-5 p-4 pb-32 md:p-6 xl:p-8">
        {/* Header */}
        <section>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                <Settings className="h-3.5 w-3.5" />
                SYSTEM CONFIGURATION
              </div>

              <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Settings
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Configure playback behavior, interface preferences, visual
                telemetry, and the local audio engine.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="inline-flex h-10 items-center justify-center gap-2 border border-cyan-400/30 bg-cyan-400/10 px-5 font-mono text-[10px] uppercase tracking-widest text-cyan-300 transition hover:bg-cyan-400/20"
            >
              {saved ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  SAVED
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  SAVE CONFIG
                </>
              )}
            </button>
          </div>
        </section>

        {/* Player settings */}
        <HudPanel
          label="PLAYBACK CONFIGURATION"
          status="ACTIVE"
          statusColor="green"
          className="overflow-hidden"
        >
          <div className="divide-y divide-white/5">
            {/* Volume */}
            <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-cyan-400" />

                  <h2 className="text-sm font-semibold text-white">
                    Master Volume
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-500">
                  Global volume level for the audio engine.
                </p>
              </div>

              <div className="flex w-full items-center gap-3 md:w-[300px]">
                <button
                  type="button"
                  onClick={isMuted ? unmute : mute}
                  className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/10 bg-white/[0.02] text-slate-500 transition hover:border-cyan-400/20 hover:text-cyan-300"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  <Volume2 className="h-3.5 w-3.5" />
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={isMuted ? 0 : volume}
                  onChange={(event) =>
                    setVolumeValue(Number(event.target.value))
                  }
                  className="h-1 flex-1 cursor-pointer accent-cyan-400"
                  aria-label="Master volume"
                />

                <span className="w-10 text-right font-mono text-[9px] text-cyan-400">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </div>

            {/* Autoplay */}
            <SettingRow
              icon={<Radio className="h-4 w-4 text-cyan-400" />}
              title="Autoplay Next Track"
              description="Continue through the active queue when a track ends."
              enabled={autoplay}
              onToggle={() => setAutoplay((value) => !value)}
            />

            {/* Visualizer */}
            <SettingRow
              icon={<ActivityIcon />}
              title="Audio Visualizer"
              description="Enable live waveform and signal activity animations."
              enabled={visualizer}
              onToggle={() => setVisualizer((value) => !value)}
            />

            {/* Notifications */}
            <SettingRow
              icon={<Bell className="h-4 w-4 text-cyan-400" />}
              title="Playback Notifications"
              description="Allow browser-level playback status notifications."
              enabled={notifications}
              onToggle={() => setNotifications((value) => !value)}
            />

            {/* Compact */}
            <SettingRow
              icon={<Monitor className="h-4 w-4 text-cyan-400" />}
              title="Compact Interface"
              description="Reduce spacing and interface density across supported screens."
              enabled={compactMode}
              onToggle={() => setCompactMode((value) => !value)}
            />
          </div>
        </HudPanel>

        {/* Interface */}
        <HudPanel
          label="INTERFACE PROFILE"
          status="CYBER HUD"
          statusColor="cyan"
          className="p-5"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileCard
              icon={<Moon className="h-5 w-5" />}
              title="DARK CORE"
              description="Deep black system canvas"
              active
            />

            <ProfileCard
              icon={<Palette className="h-5 w-5" />}
              title="CYAN SIGNAL"
              description="Primary interface accent"
              active
            />

            <ProfileCard
              icon={<Gauge className="h-5 w-5" />}
              title="SOC HUD"
              description="Technical telemetry layout"
              active
            />
          </div>
        </HudPanel>

        {/* Storage */}
        <HudPanel
          label="STORAGE & MEDIA"
          status="LOCAL"
          statusColor="green"
          className="overflow-hidden"
        >
          <div className="grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
            <InfoBlock
              icon={<HardDrive className="h-4 w-4 text-cyan-400" />}
              label="AUDIO SOURCE"
              value="/public/audio"
            />

            <InfoBlock
              icon={<Database className="h-4 w-4 text-cyan-400" />}
              label="METADATA"
              value="LOCAL MOCK INDEX"
            />

            <InfoBlock
              icon={<Shield className="h-4 w-4 text-cyan-400" />}
              label="NETWORK ACCESS"
              value="OPTIONAL"
            />
          </div>
        </HudPanel>

        {/* Engine */}
        <HudPanel
          label="AUDIO ENGINE"
          status="CONNECTED"
          statusColor="green"
          className="p-5"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <EngineStat label="ENGINE" value="HTML AUDIO" />
            <EngineStat label="ANALYSIS" value="WEB AUDIO API" />
            <EngineStat label="MEDIA KEYS" value="MEDIA SESSION" />
            <EngineStat label="STATE" value="ZUSTAND" />
          </div>
        </HudPanel>

        {/* Footer */}
        <div className="flex flex-col gap-2 border-t border-white/5 pt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <span>VOLTIX AUDIO OS // SYSTEM SETTINGS</span>

          <span className="flex items-center gap-2 text-cyan-500/40">
            <AudioLines className="h-3 w-3" />
            CONFIGURATION LOCAL
          </span>
        </div>
      </div>
    </main>
  )
}

function SettingRow({
  icon,
  title,
  description,
  enabled,
  onToggle,
}: {
  icon: React.ReactNode
  title: string
  description: string
  enabled: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-5">
      <div className="flex min-w-0 items-start gap-3">
        <div className="mt-0.5 shrink-0">{icon}</div>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-white">{title}</h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 border transition ${
          enabled
            ? 'border-cyan-400/40 bg-cyan-400/10'
            : 'border-white/10 bg-white/[0.03]'
        }`}
      >
        <span
          className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 transition-all ${
            enabled
              ? 'left-[22px] bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,0.5)]'
              : 'left-1 bg-slate-700'
          }`}
        />
      </button>
    </div>
  )
}

function ProfileCard({
  icon,
  title,
  description,
  active,
}: {
  icon: React.ReactNode
  title: string
  description: string
  active?: boolean
}) {
  return (
    <div
      className={`border p-4 transition ${
        active
          ? 'border-cyan-400/25 bg-cyan-400/[0.04]'
          : 'border-white/10 bg-white/[0.02]'
      }`}
    >
      <div
        className={`mb-4 flex h-10 w-10 items-center justify-center border ${
          active
            ? 'border-cyan-400/20 bg-cyan-400/10 text-cyan-300'
            : 'border-white/10 text-slate-600'
        }`}
      >
        {icon}
      </div>

      <div className="font-mono text-[10px] uppercase tracking-widest text-white">
        {title}
      </div>

      <div className="mt-1 text-xs text-slate-500">{description}</div>

      {active && (
        <div className="mt-4 flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-green-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
          ACTIVE PROFILE
        </div>
      )}
    </div>
  )
}

function InfoBlock({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="bg-[#05090a] p-5">
      <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600">
        {icon}
        {label}
      </div>

      <div className="mt-3 break-all font-mono text-xs text-white">
        {value}
      </div>
    </div>
  )
}

function EngineStat({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="border border-white/5 bg-white/[0.02] p-4">
      <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-slate-600">
        {label}
      </div>

      <div className="mt-2 font-mono text-xs text-cyan-300">{value}</div>
    </div>
  )
}

function ActivityIcon() {
  return (
    <span className="relative flex h-4 w-4 items-center justify-center text-cyan-400">
      <span className="absolute h-3 w-3 rounded-full border border-cyan-400/40" />
      <span className="h-1 w-1 rounded-full bg-cyan-300" />
    </span>
  )
}