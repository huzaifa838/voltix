// ================================
// MOCK ARTISTS DATA
// ================================
// BACKEND TODO:
// Replace MOCK_ARTISTS with GET /api/artists

import { Artist } from '@/types'

const ARTIST_AVATARS = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=10',
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
]

export const MOCK_ARTISTS: Artist[] = [
  {
    id: 'artist-001',
    name: 'Kavinsky',
    avatarUrl: ARTIST_AVATARS[0],
    bio: 'Synthwave pioneer',
    genres: ['Synthwave', 'Electronic'],
  },
  {
    id: 'artist-002',
    name: 'The Neighbourhood',
    avatarUrl: ARTIST_AVATARS[1],
    bio: 'Alt rock band from California',
    genres: ['Alternative', 'Indie Rock'],
  },
  {
    id: 'artist-003',
    name: 'Mr. Kitty',
    avatarUrl: ARTIST_AVATARS[2],
    bio: 'Electronic artist',
    genres: ['Synthpop', 'Electronic'],
  },
  {
    id: 'artist-004',
    name: 'Alan Walker',
    avatarUrl: ARTIST_AVATARS[3],
    bio: 'Norwegian electronic music producer',
    genres: ['Electronic', 'Dance'],
  },
  {
    id: 'artist-005',
    name: 'Dua Lipa',
    avatarUrl: ARTIST_AVATARS[4],
    bio: 'British-Kosovar singer',
    genres: ['Pop', 'Dance Pop'],
  },
  {
    id: 'artist-006',
    name: 'The Weeknd',
    avatarUrl: ARTIST_AVATARS[5],
    bio: 'Canadian singer and producer',
    genres: ['R&B', 'Pop', 'Synthwave'],
  },
  {
    id: 'artist-007',
    name: 'Passenger',
    avatarUrl: ARTIST_AVATARS[6],
    bio: 'British singer-songwriter',
    genres: ['Folk', 'Indie Pop'],
  },
  {
    id: 'artist-008',
    name: 'Vance Joy',
    avatarUrl: ARTIST_AVATARS[7],
    bio: 'Australian singer-songwriter',
    genres: ['Indie Pop', 'Folk Pop'],
  },
  {
    id: 'artist-009',
    name: 'M83',
    avatarUrl: ARTIST_AVATARS[8],
    bio: 'French electronic band',
    genres: ['Synth-pop', 'Electronic'],
  },
  {
    id: 'artist-010',
    name: 'The 1975',
    avatarUrl: ARTIST_AVATARS[9],
    bio: 'British pop rock band',
    genres: ['Indie Rock', 'Pop Rock'],
  },
  {
    id: 'artist-011',
    name: 'MGMT',
    avatarUrl: ARTIST_AVATARS[10],
    bio: 'American psychedelic band',
    genres: ['Synth-pop', 'Psychedelic'],
  },
  {
    id: 'artist-012',
    name: 'Phillip Phillips',
    avatarUrl: ARTIST_AVATARS[11],
    bio: 'American singer-songwriter',
    genres: ['Folk Rock', 'Pop'],
  },
]

export function getArtistById(id: string): Artist | undefined {
  return MOCK_ARTISTS.find(artist => artist.id === id)
}
