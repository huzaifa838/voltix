// ================================
// HOME PAGE
// ================================

'use client'

import { useEffect, useState } from 'react'
import MoodCard from '@/components/music/MoodCard'
import MusicCard from '@/components/music/MusicCard'
import { getMoods } from '@/services/playlists.service'
import { getTracks } from '@/services/tracks.service'
import { MOCK_HOME_CONFIG } from '@/data/mock'
import Image from 'next/image'
import { usePlayerStore } from '@/store/playerStore'
import { Mood, Track } from '@/types'
import { triggerSystemFX } from '@/components/hacker/SystemFX'

export default function HomePage() {
  const [moods, setMoods] = useState<Mood[]>([])
  const [recentTracks, setRecentTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  const { playTrack } = usePlayerStore()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [moodsData, tracksData] = await Promise.all([
          getMoods(),
          getTracks(),
        ])
        setMoods(moodsData)
        // Get first 8 tracks as "recently played"
        setRecentTracks(tracksData.slice(0, 8))
      } catch (error) {
        console.error('Failed to load home data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handlePlayTrack = (track: Track) => {
    playTrack(track)
    triggerSystemFX('PLAY')
  }

  const handlePlayMood = async (moodId: string) => {
    try {
      const { getTracksByMoodId } = await import('@/services/tracks.service')
      const moodTracks = await getTracksByMoodId(moodId)

      if (moodTracks.length === 0) {
        return
      }

      const queue = [...moodTracks].sort(() => Math.random() - 0.5)
      const firstTrack = queue[0]

      usePlayerStore.getState().setQueue(queue)
      playTrack(firstTrack, queue)
      triggerSystemFX('PLAY')
    } catch (error) {
      console.error('Failed to play mood queue:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#020607] p-6">
      {/* Hero Section */}
      <section className="mb-12 relative h-64 md:h-80 rounded-lg overflow-hidden">
        <Image
          src={MOCK_HOME_CONFIG.heroImage}
          alt="Hero"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020607] via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-5xl md:text-6xl font-bold text-[#E8F3F5] mb-2">
            {MOCK_HOME_CONFIG.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-[#8DAAB7] mb-6">
            {MOCK_HOME_CONFIG.heroSubtitle}
          </p>
          <button className="px-6 py-3 bg-[#00F5B8] text-[#020607] rounded font-semibold hover:bg-[#00C8FF] transition-colors">
            PLAY SOMETHING
          </button>
        </div>
      </section>

      {/* Mood Playlists */}
      {moods.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#E8F3F5] mb-4">
            MOOD PLAYLISTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {moods.map(mood => (
              <MoodCard
                key={mood.id}
                mood={mood}
                onPlay={() => handlePlayMood(mood.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recently Played */}
      {recentTracks.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-[#E8F3F5] mb-4">
            RECENTLY PLAYED
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentTracks.map(track => (
              <MusicCard
                key={track.id}
                id={track.id}
                title={track.title}
                subtitle={track.artistName}
                image={track.artworkUrl}
                type="track"
                onPlay={() => handlePlayTrack(track)}
              />
            ))}
          </div>
        </section>
      )}

      {loading && (
        <div className="text-center py-12 text-[#6B7C85]">
          Loading...
        </div>
      )}
    </div>
  )
}
