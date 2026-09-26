// ================================
// MOCK PLAYLISTS & MOODS DATA
// ================================
// BACKEND TODO:
// Replace MOCK_MOODS with database playlists/categories

import { Playlist, Mood } from '@/types'

const MOOD_IMAGES = [
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
]

export const MOCK_MOODS: Mood[] = [
  {
    id: 'mood-chill',
    name: 'Chill',
    description: 'Relaxed vibes and laid-back beats',
    coverUrl: MOOD_IMAGES[0],
    color: '#00F5B8',
    accentColor: '#00C8FF',
    trackCount: 48,
    playlistId: 'playlist-chill',
  },
  {
    id: 'mood-depression',
    name: 'Depression',
    description: 'Deep, melancholic soundscapes',
    coverUrl: MOOD_IMAGES[1],
    color: '#4F46E5',
    accentColor: '#7C3AED',
    trackCount: 42,
    playlistId: 'playlist-depression',
  },
  {
    id: 'mood-sad',
    name: 'Sad',
    description: 'Heartfelt and emotional tracks',
    coverUrl: MOOD_IMAGES[2],
    color: '#3B82F6',
    accentColor: '#8B5CF6',
    trackCount: 54,
    playlistId: 'playlist-sad',
  },
  {
    id: 'mood-relaxing',
    name: 'Relaxing',
    description: 'Peaceful music for calm moments',
    coverUrl: MOOD_IMAGES[3],
    color: '#06B6D4',
    accentColor: '#14B8A6',
    trackCount: 60,
    playlistId: 'playlist-relaxing',
  },
  {
    id: 'mood-time-pass',
    name: 'Time Pass',
    description: 'Great for passing time and focus',
    coverUrl: MOOD_IMAGES[4],
    color: '#7C3AED',
    accentColor: '#A855F7',
    trackCount: 56,
    playlistId: 'playlist-time-pass',
  },
  {
    id: 'mood-with-friends',
    name: 'With Friends',
    description: 'Upbeat tracks for good company',
    coverUrl: MOOD_IMAGES[5],
    color: '#FF6B6B',
    accentColor: '#FF8C42',
    trackCount: 66,
    playlistId: 'playlist-with-friends',
  },
]

export const MOCK_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-chill',
    name: 'Chill',
    description: 'Relaxed vibes and laid-back beats',
    coverUrl: MOOD_IMAGES[0],
    tracks: ['track-001', 'track-003', 'track-006', 'track-009'],
    trackCount: 48,
    duration: 11520,
    isPublic: false,
  },
  {
    id: 'playlist-depression',
    name: 'Depression',
    description: 'Deep, melancholic soundscapes',
    coverUrl: MOOD_IMAGES[1],
    tracks: ['track-002', 'track-004', 'track-007'],
    trackCount: 42,
    duration: 10080,
    isPublic: false,
  },
  {
    id: 'playlist-sad',
    name: 'Sad',
    description: 'Heartfelt and emotional tracks',
    coverUrl: MOOD_IMAGES[2],
    tracks: ['track-002', 'track-004', 'track-007', 'track-010'],
    trackCount: 54,
    duration: 12960,
    isPublic: false,
  },
  {
    id: 'playlist-relaxing',
    name: 'Relaxing',
    description: 'Peaceful music for calm moments',
    coverUrl: MOOD_IMAGES[3],
    tracks: ['track-005', 'track-012'],
    trackCount: 60,
    duration: 14400,
    isPublic: false,
  },
  {
    id: 'playlist-time-pass',
    name: 'Time Pass',
    description: 'Great for passing time and focus',
    coverUrl: MOOD_IMAGES[4],
    tracks: ['track-008', 'track-010', 'track-011'],
    trackCount: 56,
    duration: 13440,
    isPublic: false,
  },
  {
    id: 'playlist-with-friends',
    name: 'With Friends',
    description: 'Upbeat tracks for good company',
    coverUrl: MOOD_IMAGES[5],
    tracks: ['track-008', 'track-011', 'track-005'],
    trackCount: 66,
    duration: 15840,
    isPublic: false,
  },
]

export function getMoodById(id: string): Mood | undefined {
  return MOCK_MOODS.find(mood => mood.id === id)
}

export function getPlaylistById(id: string): Playlist | undefined {
  return MOCK_PLAYLISTS.find(playlist => playlist.id === id)
}
