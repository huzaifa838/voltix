// ================================
// PLAYLISTS INDEX
// ================================

'use client'

import { useEffect, useState } from 'react'
import { getMoods } from '@/services/playlists.service'
import { Mood } from '@/types'
import MoodCard from '@/components/music/MoodCard'

export default function PlaylistsPage() {
  const [moods, setMoods] = useState<Mood[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMoods()
        setMoods(data)
      } catch (error) {
        console.error('Failed to load moods:', error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return <div className="min-h-screen bg-[#020607] p-6 text-[#6B7C85]">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#020607] p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#E8F3F5] mb-8">
          ALL PLAYLISTS
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moods.map(mood => (
            <MoodCard key={mood.id} mood={mood} />
          ))}
        </div>
      </div>
    </div>
  )
}
