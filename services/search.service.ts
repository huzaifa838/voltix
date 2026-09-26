// ================================
// SEARCH SERVICE
// ================================

import { Track, Artist, Album } from '@/types'
import { searchTracks } from './tracks.service'
import { searchArtists } from './artists.service'
import { searchAlbums } from './albums.service'

export interface SearchResults {
  tracks: Track[]
  artists: Artist[]
  albums: Album[]
}

/**
 * Universal search across all content types
 */
export async function search(query: string): Promise<SearchResults> {
  const term = query.trim().toLowerCase()

  if (!term) {
    return { tracks: [], artists: [], albums: [] }
  }

  const [tracks, artists, albums] = await Promise.all([
    searchTracks(term),
    searchArtists(term),
    searchAlbums(term),
  ])

  return { tracks, artists, albums }
}
