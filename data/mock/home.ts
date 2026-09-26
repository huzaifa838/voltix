// ================================
// MOCK HOME PAGE CONFIG
// ================================
// IMAGE TODO:
// Replace with actual artwork URL/storage path

export const MOCK_HOME_CONFIG = {
  heroImage: '/images/placeholder-album.jpg',
  heroTitle: 'Good Evening',
  heroSubtitle: 'Let the music handle it.',
  heroDescription: 'Different moods. Same you.',
  heroTrackId: 'track-001',
}

// ================================
// MOCK STATS DATA
// ================================
// BACKEND TODO:
// Calculate statistics from real listening history

export const MOCK_STATS = {
  totalListeningTime: 1440, // minutes
  tracksPlayed: 156,
  topArtist: 'Alan Walker',
  topMood: 'Chill',
  topTrack: 'Night Drive',
  mostActiveDay: 'Saturday',
  weeklyListening: [
    { day: 'Mon', minutes: 180 },
    { day: 'Tue', minutes: 210 },
    { day: 'Wed', minutes: 190 },
    { day: 'Thu', minutes: 220 },
    { day: 'Fri', minutes: 240 },
    { day: 'Sat', minutes: 300 },
    { day: 'Sun', minutes: 270 },
  ],
  moodDistribution: [
    { name: 'Chill', value: 35 },
    { name: 'Sad', value: 20 },
    { name: 'Relaxing', value: 18 },
    { name: 'Time Pass', value: 15 },
    { name: 'With Friends', value: 10 },
    { name: 'Depression', value: 2 },
  ],
  topArtists: [
    { name: 'Alan Walker', plays: 24 },
    { name: 'Kavinsky', plays: 18 },
    { name: 'The Weeknd', plays: 16 },
    { name: 'M83', plays: 14 },
    { name: 'Vance Joy', plays: 12 },
  ],
}
