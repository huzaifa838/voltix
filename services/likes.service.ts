// ================================
// LIKES SERVICE
// ================================
// BACKEND TODO:
// POST /api/likes
// DELETE /api/likes/:trackId
// GET /api/likes

import { Track } from '@/types'
import { MOCK_TRACKS } from '@/data/mock'
import { DATA_CONFIG } from '@/config/data.config'

const LIKES_STORAGE_KEY = 'voltix_likes'

/**
 * Get liked tracks
 * Initially stored in localStorage
 */
export async function getLikedTracks(): Promise<Track[]> {
  if (DATA_CONFIG.source === 'mock') {
    if (typeof window === 'undefined') return []
    const likes = localStorage.getItem(LIKES_STORAGE_KEY)
    const likedIds = likes ? JSON.parse(likes) : []
    return MOCK_TRACKS.filter(track => likedIds.includes(track.id))
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/likes`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch liked tracks:', error)
    return []
  }
}

/**
 * Check if track is liked
 */
export function isTrackLiked(trackId: string): boolean {
  if (typeof window === 'undefined') return false
  const likes = localStorage.getItem(LIKES_STORAGE_KEY)
  const likedIds = likes ? JSON.parse(likes) : []
  return likedIds.includes(trackId)
}

/**
 * Add track to likes
 * BACKEND: POST /api/likes/:trackId
 */
export async function likeTrack(trackId: string): Promise<void> {
  if (DATA_CONFIG.source === 'mock') {
    if (typeof window === 'undefined') return
    const likes = localStorage.getItem(LIKES_STORAGE_KEY)
    const likedIds = likes ? JSON.parse(likes) : []
    if (!likedIds.includes(trackId)) {
      likedIds.push(trackId)
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedIds))
    }
    return
  }

  try {
    await fetch(`${DATA_CONFIG.apiBaseUrl}/likes/${trackId}`, {
      method: 'POST',
    })
  } catch (error) {
    console.error('Failed to like track:', error)
  }
}

/**
 * Remove track from likes
 * BACKEND: DELETE /api/likes/:trackId
 */
export async function unlikeTrack(trackId: string): Promise<void> {
  if (DATA_CONFIG.source === 'mock') {
    if (typeof window === 'undefined') return
    const likes = localStorage.getItem(LIKES_STORAGE_KEY)
    const likedIds = likes ? JSON.parse(likes) : []
    const filtered = likedIds.filter((id: string) => id !== trackId)
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(filtered))
    return
  }

  try {
    await fetch(`${DATA_CONFIG.apiBaseUrl}/likes/${trackId}`, {
      method: 'DELETE',
    })
  } catch (error) {
    console.error('Failed to unlike track:', error)
  }
}

/**
 * Toggle like status
 */
export async function toggleLike(trackId: string): Promise<void> {
  if (isTrackLiked(trackId)) {
    await unlikeTrack(trackId)
  } else {
    await likeTrack(trackId)
  }
}
