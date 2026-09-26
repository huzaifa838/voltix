// ================================
// IMAGE UTILITIES
// ================================
// Generate random placeholder images

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=400&h=400&fit=crop',
]

const AVATAR_IMAGES = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=10',
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
]

/**
 * Get a random album/track artwork image
 */
export function getRandomAlbumArt(): string {
  return PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)]
}

/**
 * Get a random artist avatar
 */
export function getRandomAvatar(): string {
  return AVATAR_IMAGES[Math.floor(Math.random() * AVATAR_IMAGES.length)]
}

/**
 * Get a random mood playlist cover
 */
export function getRandomMoodCover(): string {
  return PLACEHOLDER_IMAGES[Math.floor(Math.random() * PLACEHOLDER_IMAGES.length)]
}

/**
 * Get a specific or random image with seed
 */
export function getRandomImage(seed?: number): string {
  if (seed !== undefined) {
    return PLACEHOLDER_IMAGES[seed % PLACEHOLDER_IMAGES.length]
  }
  return getRandomAlbumArt()
}
