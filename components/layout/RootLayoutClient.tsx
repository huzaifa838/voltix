'use client'

import { useEffect } from 'react'

import Sidebar from '@/components/layout/Sidebar'
import MobileNav from '@/components/layout/MobileNav'
import PersistentPlayer from '@/components/player/PersistentPlayer'
import NowPlayingSidebar from '@/components/player/NowPlayingSidebar'

import { useAudioEngine } from '@/lib/audio/AudioEngine'
import { usePlayerStore } from '@/store/playerStore'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  /*
   * The audio engine is mounted exactly once here.
   *
   * This is what makes playback persistent while navigating
   * between pages.
   */
  useAudioEngine()

  const currentTrack = usePlayerStore(
    (state) => state.currentTrack,
  )

  const isPlaying = usePlayerStore(
    (state) => state.isPlaying,
  )

  const play = usePlayerStore(
    (state) => state.play,
  )

  const pause = usePlayerStore(
    (state) => state.pause,
  )

  const next = usePlayerStore(
    (state) => state.next,
  )

  const previous = usePlayerStore(
    (state) => state.previous,
  )

  const seek = usePlayerStore(
    (state) => state.seek,
  )

  /*
   * Browser Media Session integration.
   *
   * This enables hardware/media-key controls where the
   * browser supports the Media Session API.
   */
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('mediaSession' in navigator)
    ) {
      return
    }

    const mediaSession = navigator.mediaSession

    if (currentTrack) {
      mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artistName || 'Unknown Artist',
        album: currentTrack.albumName || 'VOLTIX AUDIO OS',
        artwork: currentTrack.artworkUrl
          ? [
              {
                src: currentTrack.artworkUrl,
                sizes: '512x512',
                type: 'image/jpeg',
              },
            ]
          : [],
      })
    } else {
      mediaSession.metadata = null
    }

    try {
      mediaSession.setActionHandler('play', () => {
        play()
      })
    } catch {
      // Browser does not support this action.
    }

    try {
      mediaSession.setActionHandler('pause', () => {
        pause()
      })
    } catch {
      // Browser does not support this action.
    }

    try {
      mediaSession.setActionHandler('nexttrack', () => {
        next()
      })
    } catch {
      // Browser does not support this action.
    }

    try {
      mediaSession.setActionHandler('previoustrack', () => {
        previous()
      })
    } catch {
      // Browser does not support this action.
    }

    try {
      mediaSession.setActionHandler('seekbackward', () => {
        const currentTime = usePlayerStore.getState().currentTime

        seek(Math.max(0, currentTime - 10))
      })
    } catch {
      // Browser does not support this action.
    }

    try {
      mediaSession.setActionHandler('seekforward', () => {
        const state = usePlayerStore.getState()

        const nextTime =
          state.duration > 0
            ? Math.min(
                state.duration,
                state.currentTime + 10,
              )
            : state.currentTime + 10

        seek(nextTime)
      })
    } catch {
      // Browser does not support this action.
    }

    return () => {
      try {
        mediaSession.setActionHandler('play', null)
      } catch {}

      try {
        mediaSession.setActionHandler('pause', null)
      } catch {}

      try {
        mediaSession.setActionHandler('nexttrack', null)
      } catch {}

      try {
        mediaSession.setActionHandler('previoustrack', null)
      } catch {}

      try {
        mediaSession.setActionHandler('seekbackward', null)
      } catch {}

      try {
        mediaSession.setActionHandler('seekforward', null)
      } catch {}
    }
  }, [
    currentTrack,
    next,
    pause,
    play,
    previous,
    seek,
  ])

  /*
   * Keep Media Session playback state synchronized with
   * the global player state.
   */
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !('mediaSession' in navigator)
    ) {
      return
    }

    navigator.mediaSession.playbackState = isPlaying
      ? 'playing'
      : 'paused'
  }, [isPlaying])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#020607]">
      {/* =====================================================
          DESKTOP HUD
      ====================================================== */}
      <div className="hidden h-full xl:grid xl:grid-cols-[250px_minmax(0,1fr)_360px]">
        {/* Left navigation */}
        <aside className="min-h-0">
          <Sidebar />
        </aside>

        {/* Main application */}
        <section className="relative min-h-0 overflow-y-auto overflow-x-hidden">
          {children}

          {/* Persistent desktop mini-player */}
          <PersistentPlayer />
        </section>

        {/* Right holographic player */}
        <aside className="min-h-0 overflow-hidden border-l border-white/5">
          <NowPlayingSidebar />
        </aside>
      </div>

      {/* =====================================================
          TABLET HUD
      ====================================================== */}
      <div className="hidden h-full md:grid md:grid-cols-[78px_minmax(0,1fr)] xl:hidden">
        {/* Compact sidebar */}
        <aside className="min-h-0 overflow-hidden">
          <Sidebar />
        </aside>

        {/* Main application */}
        <section className="relative min-h-0 overflow-y-auto overflow-x-hidden">
          {children}

          <PersistentPlayer />
        </section>
      </div>

      {/* =====================================================
          MOBILE HUD
      ====================================================== */}
      <div className="flex h-full flex-col md:hidden">
        <main className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>

        {/* Mobile persistent player */}
        <PersistentPlayer isMobile />

        {/* Bottom navigation */}
        <MobileNav />
      </div>
    </div>
  )
}