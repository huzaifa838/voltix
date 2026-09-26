// ================================
// STATS PAGE
// ================================

'use client'

import { useEffect, useState } from 'react'
import { getStats, ListeningStats } from '@/services/stats.service'

export default function StatsPage() {
  const [stats, setStats] = useState<ListeningStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await getStats()
        setStats(data)
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020607] p-6 flex items-center justify-center">
        <div className="text-[#6B7C85]">Loading statistics...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-[#020607] p-6 flex items-center justify-center">
        <div className="text-[#6B7C85]">Failed to load statistics</div>
      </div>
    )
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  return (
    <div className="min-h-screen bg-[#020607] p-6">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-[#E8F3F5] mb-8">
          STATISTICS
        </h1>

        {/* ================================
            SUMMARY CARDS
            ================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          <div className="p-6 bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-sm text-[#6B7C85] mb-2">TOTAL LISTENING TIME</div>
            <div className="text-3xl font-bold text-[#E8F3F5]">
              {formatTime(stats.totalListeningTime)}
            </div>
          </div>

          <div className="p-6 bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-sm text-[#6B7C85] mb-2">TRACKS PLAYED</div>
            <div className="text-3xl font-bold text-[#E8F3F5]">
              {stats.tracksPlayed}
            </div>
          </div>

          <div className="p-6 bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-sm text-[#6B7C85] mb-2">MOST ACTIVE DAY</div>
            <div className="text-3xl font-bold text-[#E8F3F5]">
              {stats.mostActiveDay}
            </div>
          </div>

          <div className="p-6 bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-sm text-[#6B7C85] mb-2">TOP ARTIST</div>
            <div className="text-2xl font-bold text-[#E8F3F5]">
              {stats.topArtist}
            </div>
          </div>

          <div className="p-6 bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-sm text-[#6B7C85] mb-2">TOP MOOD</div>
            <div className="text-2xl font-bold text-[#E8F3F5]">
              {stats.topMood}
            </div>
          </div>

          <div className="p-6 bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.08)] rounded">
            <div className="text-sm text-[#6B7C85] mb-2">TOP TRACK</div>
            <div className="text-xl font-bold text-[#E8F3F5] truncate">
              {stats.topTrack}
            </div>
          </div>
        </div>

        {/* ================================
            TOP ARTISTS
            ================================ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#E8F3F5] mb-4">
            TOP ARTISTS
          </h2>
          <div className="space-y-2">
            {stats.topArtists.map((artist, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.03)] rounded">
                <span className="text-sm text-[#6B7C85] w-8">{i + 1}.</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[#E8F3F5]">
                    {artist.name}
                  </div>
                </div>
                <div className="text-sm text-[#6B7C85]">
                  {artist.plays} plays
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================
            MOOD DISTRIBUTION
            ================================ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#E8F3F5] mb-4">
            MOOD DISTRIBUTION
          </h2>
          <div className="space-y-3">
            {stats.moodDistribution.map((mood, i) => {
              const maxValue = Math.max(...stats.moodDistribution.map(m => m.value))
              const percentage = (mood.value / maxValue) * 100

              return (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#E8F3F5]">{mood.name}</span>
                    <span className="text-[#6B7C85]">{mood.value}%</span>
                  </div>
                  <div className="h-2 bg-[rgba(255,255,255,0.08)] rounded overflow-hidden">
                    <div
                      className="h-full bg-[#00F5B8]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ================================
            WEEKLY LISTENING
            ================================ */}
        <section>
          <h2 className="text-2xl font-bold text-[#E8F3F5] mb-4">
            WEEKLY LISTENING
          </h2>
          <div className="grid grid-cols-7 gap-2">
            {stats.weeklyListening.map((day, i) => {
              const maxMinutes = Math.max(...stats.weeklyListening.map(d => d.minutes))
              const height = (day.minutes / maxMinutes) * 200

              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-full bg-[#00F5B8] rounded-t mb-2 transition-all hover:bg-[#00C8FF]"
                    style={{ height: `${height}px`, minHeight: '30px' }}
                  />
                  <div className="text-xs text-[#6B7C85]">{day.day}</div>
                  <div className="text-xs text-[#6B7C85]">{day.minutes}m</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Info Box */}
        <div className="mt-12 p-4 bg-[rgba(0,245,184,0.05)] border border-[rgba(0,245,184,0.2)] rounded text-sm text-[#8DAAB7]">
          ℹ️ Note: Statistics are currently using mock data. When connected to a backend, real listening data will be displayed.
        </div>
      </div>
    </div>
  )
}
