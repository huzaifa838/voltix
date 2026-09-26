// ================================
// DATA CONFIGURATION
// ================================
// Make it easy to swap between mock and real data

export const DATA_CONFIG: {
  source: 'mock' | 'api'
  apiBaseUrl: string
  apiTimeout: number
  audioBaseUrl: string
  imageBaseUrl: string
  storageProvider: 'local' | 'cloudinary' | 's3' | 'supabase'
  authProvider: 'mock' | 'firebase' | 'auth0' | 'nextauth'
  features: {
    lyrics: boolean
    recommendations: boolean
    socialSharing: boolean
    download: boolean
  }
} = {
  // Data source: 'mock' or 'api'
  source: (process.env.NEXT_PUBLIC_DATA_SOURCE === 'api' ? 'api' : 'mock'),

  // ================================
  // API CONFIGURATION
  // ================================
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  apiTimeout: 10000,

  // ================================
  // AUDIO CONFIGURATION
  // ================================
  // AUDIO TODO:
  // Replace with actual storage URL when available
  audioBaseUrl: process.env.NEXT_PUBLIC_AUDIO_URL || '',

  // ================================
  // IMAGE CONFIGURATION
  // ================================
  // STORAGE TODO:
  // Replace with actual CDN/storage URL when available
  imageBaseUrl: process.env.NEXT_PUBLIC_IMAGE_URL || '',

  // Storage provider: 'local', 'cloudinary', 's3', 'supabase'
  storageProvider: 'local' as const,

  // Auth provider: 'mock', 'firebase', 'auth0', 'nextauth'
  authProvider: 'mock' as const,

  // Feature flags
  features: {
    lyrics: false,
    recommendations: false,
    socialSharing: false,
    download: false,
  },
}

export type DataConfig = typeof DATA_CONFIG

// ================================
// HELPER: Check if using mock data
// ================================
export function isUsingMockData(): boolean {
  return DATA_CONFIG.source === 'mock'
}
