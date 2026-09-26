// ================================
// PLAYLISTS SERVICE
// ================================

import { Playlist, Mood, UserPlaylist } from '@/types'
import { MOCK_PLAYLISTS, MOCK_MOODS } from '@/data/mock'
import { DATA_CONFIG } from '@/config/data.config'

const USER_PLAYLISTS_STORAGE_KEY = 'voltix_user_playlists'

export async function getPlaylists(): Promise<Playlist[]> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_PLAYLISTS
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/playlists`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch playlists:', error)
    return MOCK_PLAYLISTS
  }
}

export async function getPlaylist(id: string): Promise<Playlist | null> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_PLAYLISTS.find(playlist => playlist.id === id) || null
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/playlists/${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch playlist ${id}:`, error)
    return MOCK_PLAYLISTS.find(playlist => playlist.id === id) || null
  }
}

export async function getMoods(): Promise<Mood[]> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_MOODS
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/moods`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch moods:', error)
    return MOCK_MOODS
  }
}

export async function getMood(id: string): Promise<Mood | null> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_MOODS.find(mood => mood.id === id) || null
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/moods/${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch mood ${id}:`, error)
    return MOCK_MOODS.find(mood => mood.id === id) || null
  }
}

export function getUserPlaylists(): UserPlaylist[] {
  if (typeof window === 'undefined') return []

  try {
    const saved = window.localStorage.getItem(USER_PLAYLISTS_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function saveUserPlaylists(playlists: UserPlaylist[]): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(USER_PLAYLISTS_STORAGE_KEY, JSON.stringify(playlists))
}

export function createUserPlaylist(name: string, trackIds: string[] = [], description?: string): UserPlaylist {
  const playlists = getUserPlaylists()
  const playlist: UserPlaylist = {
    id: `user-playlist-${Date.now()}`,
    name,
    description: description || 'Custom playlist',
    coverUrl: '/images/placeholder-album.jpg',
    tracks: trackIds,
    trackCount: trackIds.length,
    duration: 0,
    isPublic: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  const next = [playlist, ...playlists]
  saveUserPlaylists(next)
  return playlist
}

export function addTrackToPlaylist(playlistId: string, trackId: string): UserPlaylist[] {
  const playlists = getUserPlaylists()
  const next = playlists.map(playlist => {
    if (playlist.id !== playlistId) return playlist

    const tracks = playlist.tracks.includes(trackId)
      ? playlist.tracks
      : [...playlist.tracks, trackId]

    return {
      ...playlist,
      tracks,
      trackCount: tracks.length,
      updatedAt: new Date().toISOString(),
    }
  })

  saveUserPlaylists(next)
  return next
}

export function removeTrackFromPlaylist(playlistId: string, trackId: string): UserPlaylist[] {
  const playlists = getUserPlaylists()
  const next = playlists.map(playlist => {
    if (playlist.id !== playlistId) return playlist

    const tracks = playlist.tracks.filter(id => id !== trackId)
    return {
      ...playlist,
      tracks,
      trackCount: tracks.length,
      updatedAt: new Date().toISOString(),
    }
  })

  saveUserPlaylists(next)
  return next
}

export function deleteUserPlaylist(playlistId: string): UserPlaylist[] {
  const next = getUserPlaylists().filter(playlist => playlist.id !== playlistId)
  saveUserPlaylists(next)
  return next
}
