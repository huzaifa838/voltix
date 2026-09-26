// ================================
// HISTORY TYPES
// ================================

export interface ListeningHistoryEntry {
  id: string
  trackId: string
  userId: string
  playedAt: Date | string
  durationPlayed: number
  // ================================
  // BACKEND TODO
  // ================================
  // GET /api/history
  // POST /api/history
}

export interface HistoryGroupedByDate {
  date: Date
  dateLabel: string
  entries: ListeningHistoryEntry[]
}
