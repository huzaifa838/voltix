// ================================
// ALBUM TYPES
// ================================

export interface Album {
  id: string
  title: string
  artistId: string
  artistName: string
  coverUrl: string
  year: number
  trackCount: number
  duration: number
  // ================================
  // BACKEND TODO
  // ================================
  // Add fields as needed:
  // - releaseDate
  // - genres
  // - label
  // - createdAt
  // - isrc
}
