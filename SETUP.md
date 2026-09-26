# VOLTIX AUDIO OS - Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Navigate to project
cd volt

# Install dependencies
npm install

# Run development server
npm run dev
```

**Access the application**:
- Desktop: http://localhost:3000
- Mobile: Open on phone at your computer's IP

---

## Project Structure

```
volt/
├── app/                          # Next.js app router pages
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── search/page.tsx          # Search
│   ├── library/page.tsx         # Library
│   ├── liked/page.tsx           # Liked songs
│   ├── history/page.tsx         # Listening history
│   ├── queue/page.tsx           # Playback queue
│   ├── stats/page.tsx           # Statistics
│   ├── settings/page.tsx        # Settings
│   ├── terminal/page.tsx        # Terminal
│   ├── now-playing/page.tsx     # Full screen player
│   ├── playlist/[id]/page.tsx   # Playlist details
│   ├── playlists/page.tsx       # All playlists
│   └── api/                     # API routes (future)
│
├── components/                   # React components
│   ├── layout/
│   │   ├── RootLayoutClient.tsx # Root provider
│   │   ├── Sidebar.tsx          # Desktop sidebar
│   │   ├── TopBar.tsx           # Desktop top bar
│   │   └── MobileNav.tsx        # Mobile navigation
│   │
│   ├── player/
│   │   ├── PersistentPlayer.tsx # Bottom player bar
│   │   └── ProgressBar.tsx      # Progress/seek bar
│   │
│   ├── music/
│   │   ├── MusicCard.tsx        # Track/album/artist card
│   │   ├── MoodCard.tsx         # Mood playlist card
│   │   └── TrackRow.tsx         # Table row track
│   │
│   ├── hacker/
│   │   └── SystemFX.tsx         # Hacker effects/notifications
│   │
│   ├── visualizer/              # Audio visualizer (future)
│   ├── charts/                  # Stats charts (future)
│   └── pages/
│       └── HomePage.tsx         # Home page component
│
├── store/
│   └── playerStore.ts           # Zustand player state
│
├── services/                     # API/data services
│   ├── tracks.service.ts
│   ├── artists.service.ts
│   ├── albums.service.ts
│   ├── playlists.service.ts
│   ├── history.service.ts
│   ├── likes.service.ts
│   ├── search.service.ts
│   └── stats.service.ts
│
├── lib/
│   ├── audio/
│   │   └── AudioEngine.ts       # Web Audio API integration
│   ├── db/                      # Database (future)
│   └── designSystem.ts          # Design tokens
│
├── data/
│   └── mock/                    # Mock data
│       ├── tracks.ts
│       ├── artists.ts
│       ├── albums.ts
│       ├── playlists.ts
│       ├── history.ts
│       ├── users.ts
│       └── home.ts
│
├── types/                        # TypeScript interfaces
│   ├── track.ts
│   ├── artist.ts
│   ├── album.ts
│   ├── playlist.ts
│   ├── player.ts
│   ├── user.ts
│   ├── history.ts
│   └── index.ts
│
├── config/
│   └── data.config.ts           # Configuration
│
├── public/
│   ├── audio/                   # Audio files (placeholder)
│   └── images/                  # Images (placeholder)
│
├── BACKEND.md                   # Backend integration guide
├── README.md                    # Project documentation
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.ts
```

---

## Key Features

### ✅ Implemented
- [x] Cybersecurity dashboard aesthetic
- [x] Dark theme with cyan accents
- [x] Responsive mobile/desktop layout
- [x] Home page with mood playlists
- [x] Music search functionality
- [x] Track/album/artist browsing
- [x] Persistent audio player
- [x] Play/pause/next/previous controls
- [x] Volume control and mute
- [x] Shuffle and repeat modes
- [x] Playback queue
- [x] Liked songs (localStorage)
- [x] Listening history
- [x] Statistics dashboard
- [x] Terminal music control
- [x] Settings page
- [x] System FX animations
- [x] Full-screen now playing page
- [x] Mock data for all features

### 🚀 To Implement (Next Phase)
- [ ] Audio visualizer
- [ ] Lyrics display
- [ ] Album/artist pages with details
- [ ] Keyboard shortcuts
- [ ] Drag-to-reorder queue
- [ ] Collaborative playlists
- [ ] User profiles
- [ ] Advanced search filters
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts help modal
- [ ] Notification system
- [ ] Offline mode
- [ ] PWA capabilities

---

## Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **React**: 19+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Audio**: Web Audio API, Media Session API
- **Database** (Future): MongoDB + Mongoose
- **Auth** (Future): NextAuth, Firebase, or Auth0

---

## Configuration

### Data Source

In `/config/data.config.ts`:

```typescript
export const DATA_CONFIG = {
  source: 'mock',  // 'mock' or 'api'
  // ... other config
}
```

**`'mock'`** (default): Uses data from `/data/mock/`
**`'api'`**: Makes HTTP requests to backend

All services automatically fall back to mock data on error.

---

## Scripts

```bash
# Development
npm run dev          # Start dev server (localhost:3000)

# Build
npm run build        # Build for production
npm run start        # Start production server

# Code quality
npm run lint         # Run linting
npm run type-check   # Type check (typescript)
npm run format       # Format code
```

---

## Environment Variables

Create `.env.local`:

```env
# Optional: Will be filled in when connecting backend
# NEXT_PUBLIC_API_URL=http://localhost:3001/api
# NEXT_PUBLIC_AUDIO_URL=https://...
# NEXT_PUBLIC_IMAGE_URL=https://...
```

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Known Limitations

1. **Audio playback**: Uses placeholder MP3. Connect to real audio service to play actual music.
2. **Statistics**: Mock data. Real statistics calculated from backend.
3. **Lyrics**: Not implemented. Requires lyrics provider API.
4. **Audio quality**: UI only. Real quality selection requires audio service.
5. **Search**: Client-side filtering. Backend search will be faster.

---

## Development Tips

### Add a New Page

1. Create file: `app/[route]/page.tsx`
2. Import page as client component: `'use client'`
3. Use existing components from `/components/`
4. Add navigation link in `Sidebar.tsx` or `MobileNav.tsx`

### Add a New Service

1. Create `services/[feature].service.ts`
2. Import mock data from `/data/mock/`
3. Check `DATA_CONFIG.source` to decide mock vs API
4. Return typed objects from `/types/`

### Modify Design System

1. Colors: Update CSS variables in `app/globals.css`
2. Fonts: Update in `app/layout.tsx` font imports
3. Design tokens: Edit `lib/designSystem.ts`

### Use Player State

```typescript
import { usePlayerStore } from '@/store/playerStore'

export default function MyComponent() {
  const { currentTrack, isPlaying, play, pause } = usePlayerStore()
  // ...
}
```

### Trigger System Effects

```typescript
import { triggerSystemFX } from '@/components/hacker/SystemFX'

triggerSystemFX('PLAY')      // Show play effect
triggerSystemFX('NEXT')      // Show next effect
triggerSystemFX('SHUFFLE')   // Show shuffle effect
```

---

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001  # Use different port
```

### Module not found errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start again
npm run dev
```

### TypeScript errors
```bash
npm run type-check  # Check all errors
npm run lint        # Check linting
```

---

## Next Steps to Production

1. **Setup Backend** (See BACKEND.md)
   - Create API routes
   - Connect to MongoDB
   - Implement authentication

2. **Connect Audio Service**
   - Upload audio to Cloudinary/S3/etc
   - Update audio URLs
   - Test playback

3. **Deploy**
   - Vercel (recommended for Next.js)
   - Netlify
   - Self-hosted server

4. **Monitoring**
   - Error tracking (Sentry)
   - Analytics (Plausible, Mixpanel)
   - Performance (Web Vitals)

---

## Support & Contributing

- Issues: [GitHub Issues]
- Discussions: [GitHub Discussions]
- Documentation: See BACKEND.md for integration details

---

## License

This project is for personal use. All rights reserved.

---

**Happy listening! 🎵**
