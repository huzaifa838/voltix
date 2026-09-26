// ================================
// STATS SERVICE
// ================================
// BACKEND TODO:
// Calculate statistics from real listening history

import { MOCK_STATS } from '@/data/mock'
import { DATA_CONFIG } from '@/config/data.config'

export interface ListeningStats {
  totalListeningTime: number
  tracksPlayed: number
  topArtist: string
  topMood: string
  topTrack: string
  mostActiveDay: string
  weeklyListening: Array<{ day: string; minutes: number }>
  moodDistribution: Array<{ name: string; value: number }>
  topArtists: Array<{ name: string; plays: number }>
}

export async function getStats(): Promise<ListeningStats> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_STATS
  }

  try {
    const response = await fetch(`${DATA_CONFIG.apiBaseUrl}/stats`)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch stats:', error)
    return MOCK_STATS
  }
}
