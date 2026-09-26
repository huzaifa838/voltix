// ================================
// ARTIST TYPES
// ================================

export interface Artist {
  id: string
  name: string
  avatarUrl: string
  bio?: string
  genres?: string[]
  // ================================
  // BACKEND TODO
  // ================================
  // Add fields as needed:
  // - followingCount
  // - followerCount
  // - isFollowing
  // - createdAt
  // - externalUrls
}

export interface ArtistWithStats extends Artist {
  topTrackCount: number
  topMoodCategory?: string
}
