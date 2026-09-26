// ================================
// MUSIC CARD COMPONENT
// ================================
// Reusable card for displaying tracks/albums/artists

'use client'

import { Heart, Play, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

interface MusicCardProps {
  id: string
  title: string
  subtitle: string
  image: string
  type: 'track' | 'album' | 'artist'
  onPlay?: () => void
  onLike?: () => void
  isLiked?: boolean
}

export default function MusicCard({
  id,
  title,
  subtitle,
  image,
  type,
  onPlay,
  onLike,
  isLiked = false,
}: MusicCardProps) {
  const [hovered, setHovered] = useState(false)

  const href = 
    type === 'track' ? '#' :
    type === 'album' ? `/album/${id}` :
    `/artist/${id}`

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card Container */}
      <div className="bg-[rgba(255,255,255,0.035)] rounded border border-[rgba(255,255,255,0.08)] overflow-hidden hover:bg-[rgba(255,255,255,0.05)] transition-colors">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-[#05090B] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Overlay */}
          {hovered && (
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm flex items-center justify-center gap-2">
              {onPlay && (
                <button
                  onClick={onPlay}
                  className="p-3 bg-[#00F5B8] text-[#020607] rounded-full hover:bg-[#00C8FF] transition-colors"
                  title="Play"
                >
                  <Play className="w-5 h-5 ml-0.5" />
                </button>
              )}
              {onLike && (
                <button
                  onClick={onLike}
                  className={`p-3 rounded-full transition-colors ${
                    isLiked
                      ? 'bg-[#FF4D67] text-white'
                      : 'bg-[rgba(255,255,255,0.1)] text-[#E8F3F5] hover:bg-[rgba(0,248,184,0.1)]'
                  }`}
                  title={isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3 space-y-1">
          <Link href={href} className="block group/link">
            <h3 className="text-sm font-semibold text-[#E8F3F5] truncate group-hover/link:text-[#00F5B8] transition-colors">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-[#6B7C85] truncate">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
