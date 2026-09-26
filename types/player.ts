// ================================
// PLAYER TYPES
// ================================

export interface PlayerState {
  currentTrack: any | null
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  queue: any[]
  queueIndex: number
  shuffle: boolean
  repeat: 'off' | 'all' | 'one'
  isMuted: boolean
  buffered: number
  isLoading: boolean
  error: string | null
}

export interface PlayerActions {
  play: () => void
  pause: () => void
  togglePlay: () => void
  next: () => void
  previous: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  mute: () => void
  unmute: () => void
  toggleShuffle: () => void
  toggleRepeat: () => void
  addToQueue: (track: any) => void
  removeFromQueue: (index: number) => void
  clearQueue: () => void
  setQueue: (tracks: any[]) => void
  playTrack: (track: any) => void
  setCurrentTime: (time: number) => void
}

export type RepeatMode = 'off' | 'all' | 'one'
