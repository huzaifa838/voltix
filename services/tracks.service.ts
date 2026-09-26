// ================================
// TRACKS SERVICE
// ================================
// BACKEND TODO:
// Replace with actual API calls when backend is ready

import { Track } from '@/types'
import { MOCK_TRACKS, getTracksByMood } from '@/data/mock'
import { DATA_CONFIG } from '@/config/data.config'

/**
 * Get all tracks
 * BACKEND: GET /api/tracks
 */
export async function getTracks(): Promise<Track[]> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_TRACKS
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/tracks`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch tracks:', error)
    return MOCK_TRACKS
  }
}

/**
 * Get track by ID
 * BACKEND: GET /api/tracks/[id]
 */
export async function getTrack(id: string): Promise<Track | null> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_TRACKS.find(track => track.id === id) || null
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/tracks/${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch track ${id}:`, error)
    return MOCK_TRACKS.find(track => track.id === id) || null
  }
}

/**
 * Get tracks by mood
 * BACKEND: GET /api/moods/[moodId]/tracks
 */
export async function getTracksByMoodId(moodId: string): Promise<Track[]> {
  const moodMap: Record<string, string> = {
    'mood-chill': 'chill',
    'mood-depression': 'depression',
    'mood-sad': 'sad',
    'mood-relaxing': 'relaxing',
    'mood-time-pass': 'time-pass',
    'mood-with-friends': 'with-friends',
  }

  const mood = moodMap[moodId]

  if (DATA_CONFIG.source === 'mock') {
    return getTracksByMood(mood)
  }

  try {
    const response = await fetch(
      `${DATA_CONFIG.apiBaseUrl}/moods/${moodId}/tracks`
    )
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch mood tracks:`, error)
    return getTracksByMood(mood)
  }
}

/**
 * Search tracks
 * BACKEND: GET /api/search?q=...&type=track
 */
export async function searchTracks(query: string): Promise<Track[]> {
  if (DATA_CONFIG.source === 'mock') {
    const lowerQuery = query.toLowerCase()
    return MOCK_TRACKS.filter(
      track =>
        track.title.toLowerCase().includes(lowerQuery) ||
        track.artistName.toLowerCase().includes(lowerQuery) ||
        track.albumName?.toLowerCase().includes(lowerQuery)
    )
  }

  try {
    const response = await fetch(
      `${DATA_CONFIG.apiBaseUrl}/search?q=${query}&type=track`
    )
    return await response.json()
  } catch (error) {
    console.error('Failed to search tracks:', error)
    return []
  }
}
