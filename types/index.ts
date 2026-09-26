export interface Track {
  id: string

  title: string

  artistId: string
  artistName: string

  albumId: string
  albumName: string

  audioUrl: string
  artworkUrl: string

  duration: number
  year: number

  format: string
  bitrate: string

  genre?: string
  mood?: string

  liked?: boolean
}

export interface Artist {
  id: string
  name: string
  artworkUrl?: string
  trackCount?: number
}

export interface Album {
  id: string
  name: string
  artistName: string
  artworkUrl?: string
  year?: number
  trackCount?: number
}

export interface Playlist {
  id: string
  name: string
  description?: string
  artworkUrl?: string
  tracks: Track[]
}

export type RepeatMode = 'off' | 'all' | 'one'