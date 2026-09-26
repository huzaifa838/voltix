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
export interface User {
    id: string
    name: string
    email: string

    avatarUrl?: string

    preferredMoods?: string[]
}

export interface ListeningHistoryEntry {
    id: string
    trackId: string
    userId: string
    playedAt: Date | string
    durationPlayed: number
}

export interface Artist {
    id: string
    name: string

    avatarUrl?: string
    artworkUrl?: string

    bio?: string
    genres?: string[]

    trackCount?: number
}

export interface Album {
    id: string

    title: string
    name?: string

    artistId: string
    artistName: string

    coverUrl?: string
    artworkUrl?: string

    year?: number
    trackCount?: number
    duration?: number

    tracks?: string[]
}

export interface Playlist {
    id: string

    name: string
    title?: string

    description?: string

    coverUrl?: string
    artworkUrl?: string

    /*
     * Playlist mock data stores track IDs,
     * not complete Track objects.
     */
    tracks: string[]

    trackCount?: number
    duration?: number

    isPublic?: boolean
}

export interface UserPlaylist {
    id: string

    name: string
    description?: string

    coverUrl?: string
    artworkUrl?: string

    tracks: string[]

    trackCount: number
    duration: number

    isPublic: boolean

    createdAt: string
    updatedAt: string
}

export type RepeatMode = 'off' | 'all' | 'one'