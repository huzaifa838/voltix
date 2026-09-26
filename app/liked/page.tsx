// ================================
// LIKED PAGE
// ================================

'use client'

import { useState, useEffect } from 'react'
import { getLikedTracks, unlikeTrack } from '@/services/likes.service'
import TrackRow from '@/components/music/TrackRow'
import { usePlayerStore } from '@/store/playerStore'
import { Track } from '@/types'

export default function LikedPage() {
  const [likedTracks, setLikedTracks] = useState<Track[]>([])
  const [loading, setLoading] = useState(true)

  const { playTrack } = usePlayerStore()

  useEffect(() => {
    const loadLiked = async () => {
      try {
        const tracks = await getLikedTracks()
        setLikedTracks(tracks)
      } catch (error) {
        console.error('Failed to load liked tracks:', error)
      } finally {
        setLoading(false)
      }
    }

    loadLiked()
  }, [])

  const handleUnlike = async (trackId: string) => {
    await unlikeTrack(trackId)
    setLikedTracks(likedTracks.filter(t => t.id !== trackId))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020607] p-6 flex items-center justify-center">
        <div className="text-[#6B7C85]">Loading...</div>
      </div>
    )
  }

  if (likedTracks.length === 0) {
    return (
      <div className="min-h-screen bg-[#020607] p-6 flex items-center justify-center">
        <div className="text-center text-[#6B7C85]">
          <div className="text-6xl mb-4">♡</div>
          <p className="text-lg">No liked songs yet</p>
          <p className="text-sm mt-2">Add songs to your likes by clicking the heart icon</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#020607] p-6">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-[#E8F3F5] mb-8">
          LIKED SONGS ({likedTracks.length})
        </h1>

        <div className="space-y-2">
          {likedTracks.map((track, i) => (
            <TrackRow
              key={track.id}
              track={track}
              index={i + 1}
              onPlay={() => playTrack(track)}
              onLike={() => handleUnlike(track.id)}
              isLiked={true}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
