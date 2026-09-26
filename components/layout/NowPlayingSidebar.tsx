'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { usePlayerStore } from '@/store/playerStore'
import ProgressBar from '@/components/player/ProgressBar'

export default function NowPlayingSidebar() {
    const {
        currentTrack,
        isPlaying,
        togglePlay,
        next,
        previous,
        volume,
        setVolumeValue,
        isMuted,
        mute,
        unmute,
    } = usePlayerStore()
    if (!currentTrack) {
        return (
            <aside className="hidden xl:flex w-[340px] shrink-0 border-l border-[rgba(255,255,255,0.08)] bg-[#05090B]/90 p-5">
                <div className="flex w-full items-center justify-center rounded-xl border border-dashed border-[rgba(0,245,184,0.25)] bg-[rgba(255,255,255,0.02)] text-[#6B7C85] text-sm">
                    No track selected
                </div>
            </aside>
        )
    }

    return (
        <aside className="hidden xl:flex w-[340px] shrink-0 border-l border-[rgba(255,255,255,0.08)] bg-[#05090B]/90 p-5">
            <div className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-between">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[0.35em] text-[#00F5B8]">
                        Now Playing
                    </span>
                    <Link href="/now-playing" className="text-[10px] uppercase tracking-[0.25em] text-[#8DAAB7] hover:text-[#E8F3F5] transition-colors">
                        Open
                    </Link>
                </div>

                <div className="relative h-52 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#020607] shadow-[0_0_30px_rgba(0,245,184,0.08)]">
                    <Image
                        src={currentTrack.artworkUrl}
                        alt={currentTrack.title}
                        fill
                        sizes="340px"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020607] via-transparent to-transparent" />
                </div>

                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#E8F3F5] truncate">{currentTrack.title}</h3>
                    <p className="text-sm text-[#8DAAB7] truncate">{currentTrack.artistName}</p>
                    {currentTrack.albumName && (
                        <p className="text-xs text-[#6B7C85] truncate">{currentTrack.albumName}</p>
                    )}
                </div>

                <div className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-3">
                    <ProgressBar />
                </div>

                <div className="flex items-center justify-center gap-3">
                    <button onClick={previous} className="p-2.5 rounded-full text-[#8DAAB7] hover:text-[#E8F3F5] transition-colors" title="Previous">
                        <SkipBack className="h-4 w-4" />
                    </button>

                    <button onClick={togglePlay} className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00F5B8] text-[#020607] shadow-[0_0_20px_rgba(0,245,184,0.45)] transition-transform hover:scale-105" title={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
                    </button>

                    <button onClick={next} className="p-2.5 rounded-full text-[#8DAAB7] hover:text-[#E8F3F5] transition-colors" title="Next">
                        <SkipForward className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => (isMuted ? unmute() : mute())}
                        className="p-2 rounded-full text-[#8DAAB7] hover:text-[#E8F3F5] transition-colors"
                        title={isMuted ? 'Unmute' : 'Mute'}
                    >
                        <Volume2 className="h-4 w-4" />
                    </button>

                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={isMuted ? 0 : Math.round(volume * 100)}
                        onChange={(e) => setVolumeValue(Math.max(0, Math.min(1, Number(e.target.value) / 100)))}
                        className="h-1.5 w-full cursor-pointer accent-[#00F5B8]"
                        title="Volume"
                    />
                </div>
            </div>
        </aside>
    )
}
