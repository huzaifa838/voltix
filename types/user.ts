// ================================
// USER TYPES
// ================================

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  preferredMoods?: string[]
  // ================================
  // AUTH TODO
  // ================================
  // Replace mockUser with authenticated user
  // Add fields:
  // - authProvider
  // - createdAt
  // - updatedAt
  // - preferences
}

export interface UserPreferences {
  theme: 'dark' | 'light'
  visualizerStyle: 'waveform' | 'bars' | 'circular' | 'spectrum'
  enableAnimations: boolean
  enableHackerEffects: boolean
  autoplay: boolean
  volumeNormalization: boolean
  audioQuality: 'auto' | 'high' | 'lossless'
}
