// ================================
// ARTISTS SERVICE
// ================================

import { Artist } from '@/types'
import { MOCK_ARTISTS } from '@/data/mock'
import { DATA_CONFIG } from '@/config/data.config'

export async function getArtists(): Promise<Artist[]> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_ARTISTS
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/artists`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch artists:', error)
    return MOCK_ARTISTS
  }
}

export async function getArtist(id: string): Promise<Artist | null> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_ARTISTS.find(artist => artist.id === id) || null
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/artists/${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch artist ${id}:`, error)
    return MOCK_ARTISTS.find(artist => artist.id === id) || null
  }
}

export async function searchArtists(query: string): Promise<Artist[]> {
  if (DATA_CONFIG.source === 'mock') {
    const lowerQuery = query.toLowerCase()
    return MOCK_ARTISTS.filter(artist =>
      artist.name.toLowerCase().includes(lowerQuery)
    )
  }

  try {
    const response = await fetch(
      `${DATA_CONFIG.apiBaseUrl}/search?q=${query}&type=artist`
    )
    return await response.json()
  } catch (error) {
    console.error('Failed to search artists:', error)
    return []
  }
}
