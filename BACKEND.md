# VOLTIX AUDIO OS - Backend Integration Map

This document outlines all the places where the frontend connects to a backend service.

**Current Status: Using Mock Data**

All features work with local, mocked data. When you're ready to connect a backend, follow this integration map.

---

## 1. AUTHENTICATION

**Current**: Mock user in `data/mock/users.ts`

**File**: `data/mock/users.ts`

```typescript
export const MOCK_USER: User = {
  id: 'user-001',
  name: 'Audio Explorer',
  email: 'user@voltix.local',
  avatarUrl: '/images/placeholder-avatar.jpg',
  preferredMoods: ['chill', 'sad', 'relaxing'],
}
```

**Backend TODO**:
```
Replace MOCK_USER with authenticated user from:

POST /api/auth/login
POST /api/auth/register
GET /api/auth/me
POST /api/auth/logout
POST /api/auth/refresh

Technologies:
- NextAuth.js
- Firebase Auth
- Auth0
- Custom JWT
```

---

## 2. TRACKS / MUSIC DATA

**Current**: `data/mock/tracks.ts`

**Files**:
- `services/tracks.service.ts`
- `data/mock/tracks.ts`

**Service Functions**:
```typescript
getTracks()              // GET /api/tracks
getTrack(id)             // GET /api/tracks/:id
searchTracks(query)      // GET /api/search?q=...&type=track
getTracksByMoodId(id)    // GET /api/moods/:id/tracks
```

**Backend TODO**:
```
Implement these endpoints:

GET /api/tracks
  Response: { tracks: Track[] }

GET /api/tracks/:id
  Response: Track

GET /api/search?q=query&type=track
  Response: { tracks: Track[] }

GET /api/moods/:id/tracks
  Response: { tracks: Track[] }

Database Model:

interface Track {
  _id: ObjectId
  title: string
  artistId: ObjectId
  artistName: string
  albumId?: ObjectId
  albumName?: string
  artworkUrl: string
  audioUrl: string (URL to audio file)
  duration: number
  genre?: string
  mood?: string
  year?: number
  format?: string
  bitrate?: string
  lyrics?: LyricLine[]
  createdAt: Date
  updatedAt: Date
}
```

---

## 3. ARTISTS

**Current**: `data/mock/artists.ts`

**Files**:
- `services/artists.service.ts`
- `data/mock/artists.ts`

**Service Functions**:
```typescript
getArtists()        // GET /api/artists
getArtist(id)       // GET /api/artists/:id
searchArtists(q)    // GET /api/search?q=...&type=artist
```

**Backend TODO**:
```
GET /api/artists
GET /api/artists/:id
GET /api/search?q=query&type=artist

Database Model:

interface Artist {
  _id: ObjectId
  name: string
  avatarUrl: string
  bio?: string
  genres?: string[]
  followingCount: number
  followerCount: number
  createdAt: Date
}
```

---

## 4. ALBUMS

**Current**: `data/mock/albums.ts`

**Files**:
- `services/albums.service.ts`
- `data/mock/albums.ts`

**Service Functions**:
```typescript
getAlbums()        // GET /api/albums
getAlbum(id)       // GET /api/albums/:id
searchAlbums(q)    // GET /api/search?q=...&type=album
```

**Backend TODO**:
```
GET /api/albums
GET /api/albums/:id
GET /api/albums/:id/tracks
GET /api/search?q=query&type=album

Database Model:

interface Album {
  _id: ObjectId
  title: string
  artistId: ObjectId
  artistName: string
  coverUrl: string
  year: number
  trackCount: number
  duration: number
  releaseDate: Date
  createdAt: Date
}
```

---

## 5. PLAYLISTS / MOODS

**Current**: `data/mock/playlists.ts`

**Files**:
- `services/playlists.service.ts`
- `data/mock/playlists.ts`

**Service Functions**:
```typescript
getPlaylists()      // GET /api/playlists
getPlaylist(id)     // GET /api/playlists/:id
getMoods()          // GET /api/moods
getMood(id)         // GET /api/moods/:id
```

**Backend TODO**:
```
GET /api/moods
GET /api/moods/:id
GET /api/moods/:id/tracks
POST /api/playlists (create)
PUT /api/playlists/:id (update)
DELETE /api/playlists/:id

Database Model:

interface Mood {
  _id: ObjectId
  name: string
  description: string
  coverUrl: string
  color: string
  trackCount: number
  playlistId: ObjectId
  userId?: ObjectId
  createdAt: Date
}

interface Playlist {
  _id: ObjectId
  name: string
  description?: string
  coverUrl?: string
  tracks: ObjectId[]
  userId: ObjectId
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}
```

---

## 6. LIKES / FAVORITES

**Current**: `localStorage` (client-side)

**Files**:
- `services/likes.service.ts`

**Storage Key**: `voltix_likes` (in localStorage)

**Service Functions**:
```typescript
getLikedTracks()        // GET /api/likes
likeTrack(id)           // POST /api/likes/:id
unlikeTrack(id)         // DELETE /api/likes/:id
toggleLike(id)          // POST/DELETE /api/likes/:id
isTrackLiked(id)        // Check local storage
```

**Backend TODO**:
```
Replace localStorage with:

GET /api/likes
  Response: { likes: Track[] }

POST /api/likes/:trackId
  Auth: Required
  Response: { success: true }

DELETE /api/likes/:trackId
  Auth: Required
  Response: { success: true }

Database Model:

interface Like {
  _id: ObjectId
  userId: ObjectId
  trackId: ObjectId
  createdAt: Date
}

Create a composite index on (userId, trackId) for fast queries.
```

---

## 7. LISTENING HISTORY

**Current**: `data/mock/history.ts`

**Files**:
- `services/history.service.ts`
- `data/mock/history.ts`

**Service Functions**:
```typescript
getHistory()            // GET /api/history
getHistoryFor(days)     // GET /api/history?days=...
addToHistory(trackId)   // POST /api/history
```

**Backend TODO**:
```
GET /api/history
  Query: ?days=7
  Response: { history: ListeningHistoryEntry[] }

POST /api/history
  Body: { trackId: string }
  Auth: Required
  Response: { success: true }

Database Model:

interface ListeningHistoryEntry {
  _id: ObjectId
  userId: ObjectId
  trackId: ObjectId
  playedAt: Date
  durationPlayed: number
  createdAt: Date
}

Consider capping history per user (e.g., last 1000 entries).
```

---

## 8. STATISTICS

**Current**: `data/mock/home.ts` (MOCK_STATS)

**Files**:
- `services/stats.service.ts`
- `data/mock/home.ts`

**Service Functions**:
```typescript
getStats()  // GET /api/stats
```

**Backend TODO**:
```
GET /api/stats
  Auth: Required
  Response: {
    totalListeningTime: number,
    tracksPlayed: number,
    topArtist: string,
    topMood: string,
    topTrack: string,
    mostActiveDay: string,
    weeklyListening: Array<{ day, minutes }>,
    moodDistribution: Array<{ name, value }>,
    topArtists: Array<{ name, plays }>
  }

Aggregate from:
- ListeningHistoryEntry collection
- Calculate time ranges
- Group by mood, artist, day
```

---

## 9. AUDIO STORAGE

**Current**: Placeholder URLs in mock data

**Audio File URL**: `track.audioUrl`

**Audio Files Location**: `/public/audio/demo-track.mp3`

**Backend TODO**:
```
Choose one storage provider:

Option 1: Cloudinary
- cloudinary.com
- Easy integration, free tier available
- Configure: NEXT_PUBLIC_CLOUDINARY_URL

Option 2: AWS S3
- aws.amazon.com/s3/
- Scalable, reliable
- Configure: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

Option 3: Supabase Storage
- supabase.com
- Firebase alternative, easier setup
- Configure: SUPABASE_URL, SUPABASE_KEY

Option 4: Self-hosted
- Store files on your server
- More control, requires more infrastructure
- Configure: AUDIO_SERVER_URL

Update track.audioUrl to point to actual files:

Example:
"audioUrl": "https://cdn.example.com/audio/track-001.mp3"
```

---

## 10. ARTWORK / IMAGES STORAGE

**Current**: Placeholder images in `/public/images/`

**Image URL Fields**:
- `track.artworkUrl`
- `artist.avatarUrl`
- `album.coverUrl`
- `mood.coverUrl`

**Placeholder Location**: `/public/images/placeholder-album.jpg`

**Backend TODO**:
```
Use same provider as audio storage (Cloudinary, S3, etc.):

Update image URLs to point to real storage:

Example:
"artworkUrl": "https://cdn.example.com/images/album-001.jpg"

If using Cloudinary:
- Upload on create
- Use Cloudinary URL transformation API
- Example: cloudinary_url(...w_300,h_300,c_fill...)
```

---

## 11. SEARCH

**Current**: Client-side filtering in `services/search.service.ts`

**Files**:
- `services/search.service.ts`

**Service Functions**:
```typescript
search(query)  // Combines track, artist, album search
searchTracks(query)
searchArtists(query)
searchAlbums(query)
```

**Backend TODO**:
```
GET /api/search?q=query&type=track,artist,album
  Response: {
    tracks: Track[],
    artists: Artist[],
    albums: Album[]
  }

For large datasets, implement:
- Full-text search (MongoDB Text Search)
- Elasticsearch for better performance
- Autocomplete API for suggestions
```

---

## 12. QUEUE (User Preference)

**Current**: In-memory via Zustand player store

**Files**:
- `store/playerStore.ts`

**Backend TODO**:
```
Optional: Persist queue per user

POST /api/queue
  Body: { trackIds: string[] }
  Auth: Required
  Response: { success: true }

GET /api/queue
  Auth: Required
  Response: { tracks: Track[] }

DELETE /api/queue
  Auth: Required
  Response: { success: true }
```

---

## 13. DATABASE MODELS (MongoDB/Mongoose)

Create these schema files in `/models/`:

```typescript
// User.ts
interface User {
  _id: ObjectId
  email: string
  password: string (hashed)
  name: string
  avatarUrl: string
  theme: 'dark' | 'light'
  createdAt: Date
  updatedAt: Date
}

// Track.ts
interface Track {
  _id: ObjectId
  title: string
  artistId: ObjectId
  albumId?: ObjectId
  duration: number
  audioUrl: string
  artworkUrl: string
  genre?: string
  mood?: string
  year?: number
  createdAt: Date
}

// Artist.ts
interface Artist {
  _id: ObjectId
  name: string
  avatarUrl: string
  bio?: string
  genres?: string[]
  createdAt: Date
}

// Album.ts
interface Album {
  _id: ObjectId
  title: string
  artistId: ObjectId
  coverUrl: string
  year: number
  createdAt: Date
}

// Playlist.ts
interface Playlist {
  _id: ObjectId
  name: string
  userId: ObjectId
  tracks: ObjectId[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

// Like.ts
interface Like {
  _id: ObjectId
  userId: ObjectId
  trackId: ObjectId
  createdAt: Date
}

// ListeningHistory.ts
interface ListeningHistory {
  _id: ObjectId
  userId: ObjectId
  trackId: ObjectId
  playedAt: Date
  durationPlayed: number
  createdAt: Date
}
```

---

## 14. ENVIRONMENT VARIABLES TO ADD

```env
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/voltix

# APIs
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_AUDIO_URL=https://cdn.example.com/audio
NEXT_PUBLIC_IMAGE_URL=https://cdn.example.com/images

# Storage (Choose one)
NEXT_PUBLIC_CLOUDINARY_URL=cloudinary://...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SUPABASE_URL=...
SUPABASE_KEY=...

# Auth (Choose one)
NEXTAUTH_SECRET=...
NEXTAUTH_URL=http://localhost:3000
FIREBASE_API_KEY=...
AUTH0_DOMAIN=...
AUTH0_CLIENT_ID=...
```

---

## 15. DATA CONFIG UPDATE

In `/config/data.config.ts`, update:

```typescript
export const DATA_CONFIG = {
  source: 'api',  // Change from 'mock' to 'api'
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
  audioBaseUrl: process.env.NEXT_PUBLIC_AUDIO_URL,
  imageBaseUrl: process.env.NEXT_PUBLIC_IMAGE_URL,
  storageProvider: 'cloudinary', // or 's3', 'supabase'
  authProvider: 'nextauth', // or 'firebase', 'auth0'
}
```

---

## Integration Checklist

- [ ] Set up MongoDB database
- [ ] Create API routes in `/app/api/`
- [ ] Implement authentication (NextAuth/Firebase/Auth0)
- [ ] Create Mongoose schemas
- [ ] Connect audio storage (Cloudinary/S3/etc)
- [ ] Connect image storage
- [ ] Implement search endpoint
- [ ] Test all service functions
- [ ] Update DATA_CONFIG to use API
- [ ] Remove mock data from services
- [ ] Set up environment variables
- [ ] Deploy backend
- [ ] Deploy frontend

---

## Service Architecture

The frontend services layer (`/services/`) automatically:
1. Checks `DATA_CONFIG.source`
2. If `'mock'` → returns mock data
3. If `'api'` → makes API call, falls back to mock on error

This allows smooth transition from mock → real data.

To switch to API:
```typescript
// In data.config.ts
source: 'api'  // Changed from 'mock'
```

All services will automatically use API endpoints.
