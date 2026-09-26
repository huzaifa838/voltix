// ================================
// HISTORY SERVICE
// ================================

import { ListeningHistoryEntry } from '@/types'
import { MOCK_HISTORY, getHistorySince } from '@/data/mock'
import { DATA_CONFIG } from '@/config/data.config'

const HISTORY_STORAGE_KEY = 'voltix_history'

function readHistory(): ListeningHistoryEntry[] {
  if (typeof window === 'undefined') return []

  try {
    const saved = window.localStorage.getItem(HISTORY_STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function writeHistory(entries: ListeningHistoryEntry[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(entries))
}

export async function getHistory(): Promise<ListeningHistoryEntry[]> {
  if (DATA_CONFIG.source === 'mock') {
    return MOCK_HISTORY
  }

  const entries = readHistory()
  return entries.length > 0 ? entries : []
}

export async function getHistoryFor(days: number): Promise<ListeningHistoryEntry[]> {
  if (DATA_CONFIG.source === 'mock') {
    return getHistorySince(days)
  }

  const now = Date.now()
  const cutoff = now - days * 24 * 60 * 60 * 1000
  return readHistory().filter(entry => new Date(entry.playedAt).getTime() >= cutoff)
}

export async function addToHistory(trackId: string, durationPlayed = 0): Promise<void> {
  const entry: ListeningHistoryEntry = {
    id: `history-${Date.now()}-${trackId}`,
    trackId,
    userId: 'local-user',
    playedAt: new Date().toISOString(),
    durationPlayed,
  }

  const history = readHistory()
  const next = [entry, ...history].slice(0, 100)
  writeHistory(next)

  if (DATA_CONFIG.source === 'mock') {
    return
  }

  try {
    await fetch(`${DATA_CONFIG.apiBaseUrl}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })
  } catch (error) {
    console.error('Failed to add to history:', error)
  }
}
