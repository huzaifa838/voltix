// ================================
// MOCK HISTORY DATA
// ================================
// BACKEND TODO:
// GET /api/history
// POST /api/history

import { ListeningHistoryEntry } from '@/types'

const now = new Date()
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)
const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000)

export const MOCK_HISTORY: ListeningHistoryEntry[] = [
  {
    id: 'history-001',
    trackId: 'track-001',
    userId: 'user-001',
    playedAt: now,
    durationPlayed: 234,
  },
  {
    id: 'history-002',
    trackId: 'track-003',
    userId: 'user-001',
    playedAt: new Date(now.getTime() - 30 * 60 * 1000),
    durationPlayed: 268,
  },
  {
    id: 'history-003',
    trackId: 'track-009',
    userId: 'user-001',
    playedAt: new Date(now.getTime() - 60 * 60 * 1000),
    durationPlayed: 244,
  },
  {
    id: 'history-004',
    trackId: 'track-002',
    userId: 'user-001',
    playedAt: yesterday,
    durationPlayed: 214,
  },
  {
    id: 'history-005',
    trackId: 'track-007',
    userId: 'user-001',
    playedAt: yesterday,
    durationPlayed: 242,
  },
  {
    id: 'history-006',
    trackId: 'track-004',
    userId: 'user-001',
    playedAt: twoDaysAgo,
    durationPlayed: 212,
  },
]

export function getHistoryByDate(date: Date): ListeningHistoryEntry[] {
  return MOCK_HISTORY.filter(
    entry =>
      new Date(entry.playedAt).toDateString() === date.toDateString()
  )
}

export function getHistorySince(days: number): ListeningHistoryEntry[] {
  const since = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000)
  return MOCK_HISTORY.filter(entry => new Date(entry.playedAt).getTime() >= since.getTime())
}
