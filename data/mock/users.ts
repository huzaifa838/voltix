// ================================
// MOCK USER DATA
// ================================
// AUTH TODO:
// Replace mockUser with authenticated user

import { User } from '@/types'

export const MOCK_USER: User = {
  id: 'user-001',
  name: 'Audio Explorer',
  email: 'user@voltix.local',
  avatarUrl: '/images/placeholder-avatar.jpg',
  preferredMoods: ['chill', 'sad', 'relaxing'],
}

export const DEFAULT_USER_PREFERENCES = {
  theme: 'dark' as const,
  visualizerStyle: 'waveform' as const,
  enableAnimations: true,
  enableHackerEffects: true,
  autoplay: false,
  volumeNormalization: false,
  audioQuality: 'auto' as const,
}
