// ================================
// TRACK TYPES
// ================================

export interface LyricLine {
  time: number
  text: string
}

export interface Track {
  id: string
  title: string
  artistId: string
  artistName: string
  albumId?: string
  albumName?: string
  artworkUrl: string
  audioUrl: string
  duration: number
  genre?: string
  mood?: string
  year?: number
  format?: string
  bitrate?: string
  lyrics?: LyricLine[]
  // ================================
  // BACKEND TODO
  // ================================
  // Add fields as needed:
  // - createdAt
  // - updatedAt
  // - fileSize
  // - isrc
  // - preview_url
}

export interface TrackWithPlayCount extends Track {
  playCount: number
  lastPlayed?: Date
}
