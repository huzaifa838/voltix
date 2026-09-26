// ================================
// PLAYLIST TYPES
// ================================

export interface Playlist {
  id: string
  name: string
  description?: string
  coverUrl?: string
  tracks: string[] // track IDs
  trackCount: number
  duration: number
  isPublic: boolean
  // ================================
  // BACKEND TODO
  // ================================
  // Add fields as needed:
  // - userId
  // - createdAt
  // - updatedAt
  // - followers
}

export interface PlaylistWithTracks extends Playlist {
  trackObjects?: any[] // populated with track data
}

export interface UserPlaylist extends Playlist {
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export interface Album {
  id: string
  name: string
  artistName: string
  artworkUrl?: string
  year?: number
  trackCount?: number
}

export interface Mood {
  id: string
  name: string
  description: string

  coverUrl?: string
  color?: string
  accentColor?: string

  trackCount?: number
  playlistId?: string
}
