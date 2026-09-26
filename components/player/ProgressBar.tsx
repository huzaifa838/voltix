// ================================
// PROGRESS BAR
// ================================

'use client'

import { usePlayerStore } from '@/store/playerStore'

export default function ProgressBar() {
  const { currentTime, duration, seek } = usePlayerStore()

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(parseFloat(e.target.value))
  }

  const percentage = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[#6B7C85] w-12 text-right">
        {formatTime(currentTime)}
      </span>

      <div className="flex-1">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime || 0}
          onChange={handleSeek}
          className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded cursor-pointer accent-[#00F5B8]"
          style={{
            background: `linear-gradient(to right, #00F5B8 0%, #00F5B8 ${percentage}%, rgba(255,255,255,0.08) ${percentage}%, rgba(255,255,255,0.08) 100%)`
          }}
        />
      </div>

      <span className="text-xs text-[#6B7C85] w-12 text-left">
        {formatTime(duration)}
      </span>
    </div>
  )
}
