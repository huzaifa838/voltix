// ================================
// ALBUMS SERVICE
// ================================

import { Album } from '@/types'
import { MOCK_ALBUMS } from '@/data/mock'
import { DATA_CONFIG } from '@/config/data.config'

export async function getAlbums(): Promise<Album[]> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_ALBUMS
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/albums`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch albums:', error)
    return MOCK_ALBUMS
  }
}

export async function getAlbum(id: string): Promise<Album | null> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_ALBUMS.find(album => album.id === id) || null
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/albums/${id}`)
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch album ${id}:`, error)
    return MOCK_ALBUMS.find(album => album.id === id) || null
  }
}

export async function searchAlbums(query: string): Promise<Album[]> {
  if (DATA_CONFIG.source === 'mock') {
    const lowerQuery = query.toLowerCase()
    return MOCK_ALBUMS.filter(album =>
      album.title.toLowerCase().includes(lowerQuery) ||
      album.artistName.toLowerCase().includes(lowerQuery)
    )
  }

  try {
    const response = await fetch(
      `${DATA_CONFIG.apiBaseUrl}/search?q=${query}&type=album`
    )
    return await response.json()
  } catch (error) {
    console.error('Failed to search albums:', error)
    return []
  }
}
