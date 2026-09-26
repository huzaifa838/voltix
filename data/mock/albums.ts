// ================================
// MOCK ALBUMS DATA
// ================================
// BACKEND TODO:
// Replace MOCK_ALBUMS with GET /api/albums

import { Album } from '@/types'

const ALBUM_COVERS = [
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1440404653062-ab4a3ec13af5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498038432885-fd6f938d30c5?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
]

export const MOCK_ALBUMS: Album[] = [
  {
    id: 'album-001',
    title: 'Outrun',
    artistId: 'artist-001',
    artistName: 'Kavinsky',
    coverUrl: ALBUM_COVERS[0],
    year: 2013,
    trackCount: 12,
    duration: 2400,
  },
  {
    id: 'album-002',
    title: 'I Love You.',
    artistId: 'artist-002',
    artistName: 'The Neighbourhood',
    coverUrl: ALBUM_COVERS[1],
    year: 2013,
    trackCount: 13,
    duration: 2600,
  },
  {
    id: 'album-003',
    title: 'Time',
    artistId: 'artist-003',
    artistName: 'Mr. Kitty',
    coverUrl: ALBUM_COVERS[2],
    year: 2017,
    trackCount: 14,
    duration: 2800,
  },
  {
    id: 'album-004',
    title: 'Faded',
    artistId: 'artist-004',
    artistName: 'Alan Walker',
    coverUrl: ALBUM_COVERS[3],
    year: 2015,
    trackCount: 5,
    duration: 1200,
  },
  {
    id: 'album-005',
    title: 'Future Nostalgia',
    artistId: 'artist-005',
    artistName: 'Dua Lipa',
    coverUrl: ALBUM_COVERS[4],
    year: 2020,
    trackCount: 11,
    duration: 2300,
  },
  {
    id: 'album-006',
    title: 'After Hours',
    artistId: 'artist-006',
    artistName: 'The Weeknd',
    coverUrl: ALBUM_COVERS[5],
    year: 2020,
    trackCount: 14,
    duration: 2800,
  },
  {
    id: 'album-007',
    title: 'All the Little Lights',
    artistId: 'artist-007',
    artistName: 'Passenger',
    coverUrl: ALBUM_COVERS[6],
    year: 2012,
    trackCount: 12,
    duration: 2400,
  },
  {
    id: 'album-008',
    title: 'Dream Your Life Away',
    artistId: 'artist-008',
    artistName: 'Vance Joy',
    coverUrl: ALBUM_COVERS[7],
    year: 2013,
    trackCount: 11,
    duration: 2200,
  },
  {
    id: 'album-009',
    title: 'Hurry Up, We\'re Dreaming',
    artistId: 'artist-009',
    artistName: 'M83',
    coverUrl: ALBUM_COVERS[8],
    year: 2011,
    trackCount: 17,
    duration: 3400,
  },
  {
    id: 'album-010',
    title: 'The 1975',
    artistId: 'artist-010',
    artistName: 'The 1975',
    coverUrl: ALBUM_COVERS[9],
    year: 2013,
    trackCount: 13,
    duration: 2700,
  },
  {
    id: 'album-011',
    title: 'Oracular Spectacular',
    artistId: 'artist-011',
    artistName: 'MGMT',
    coverUrl: ALBUM_COVERS[10],
    year: 2007,
    trackCount: 11,
    duration: 2200,
  },
  {
    id: 'album-012',
    title: 'The World From the Side of the Moon',
    artistId: 'artist-012',
    artistName: 'Phillip Phillips',
    coverUrl: ALBUM_COVERS[11],
    year: 2012,
    trackCount: 12,
    duration: 2400,
  },
]

export function getAlbumById(id: string): Album | undefined {
  return MOCK_ALBUMS.find(album => album.id === id)
}

export function getAlbumsByArtist(artistId: string): Album[] {
  return MOCK_ALBUMS.filter(album => album.artistId === artistId)
}
