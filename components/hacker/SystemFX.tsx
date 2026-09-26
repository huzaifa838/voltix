// ================================
// HACKER SYSTEM FX
// ================================
// Cinematic system effects for interactions

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type SystemFXType = 
  | 'PLAY'
  | 'PAUSE'
  | 'NEXT'
  | 'PREVIOUS'
  | 'LIKE'
  | 'QUEUE'
  | 'PLAYLIST'
  | 'SEARCH'
  | 'SHUFFLE'
  | 'REPEAT'
  | 'VOLUME'
  | 'DOWNLOAD'
  | 'ERROR'
  | 'BUFFERING'

interface SystemFXEvent {
  type: SystemFXType
  id: string
}

let fxIdCounter = 0
const activeFXs = new Map<string, SystemFXEvent>()

// Global FX trigger
export function triggerSystemFX(type: SystemFXType) {
  const id = `fx-${fxIdCounter++}`
  const event: SystemFXEvent = { type, id }
  activeFXs.set(id, event)
  
  // Auto-remove after animation
  setTimeout(() => {
    activeFXs.delete(id)
  }, 1200)

  return event
}

export function SystemFX() {
  const [fxList, setFxList] = useState<SystemFXEvent[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      setFxList(Array.from(activeFXs.values()))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const getFXContent = (type: SystemFXType) => {
    const messages: Record<SystemFXType, string[]> = {
      'PLAY': ['> PLAYBACK INITIATED', '> AUDIO STREAM ACTIVE', '> SIGNAL LOCKED'],
      'PAUSE': ['> PLAYBACK PAUSED', '> STREAM SUSPENDED'],
      'NEXT': ['> TRACK SKIPPED', '> LOADING NEXT TRACK', '> BUFFER READY'],
      'PREVIOUS': ['> REWINDING TRACK', '> PREVIOUS LOADED'],
      'LIKE': ['> TRACK FAVORITED', '> ADDED TO COLLECTION'],
      'QUEUE': ['> QUEUED', '> ADDED TO PLAYBACK QUEUE'],
      'PLAYLIST': ['> PLAYLIST UPDATED', '> TRACK SAVED TO LIBRARY'],
      'SEARCH': ['> SEARCHING DATABASE', '> RESULTS LOADED'],
      'SHUFFLE': ['> SHUFFLE ENABLED', '> RANDOMIZING PLAYLIST'],
      'REPEAT': ['> REPEAT MODE ACTIVE', '> LOOP ENABLED'],
      'VOLUME': ['> VOLUME ADJUSTED', '> AUDIO LEVEL CHANGED'],
      'DOWNLOAD': ['> DOWNLOADING', '> FILE SAVED'],
      'ERROR': ['> ERROR DETECTED', '> STREAM UNAVAILABLE', '> CHECK CONNECTION'],
      'BUFFERING': ['> BUFFERING STREAM', '> LOADING AUDIO'],
    }

    return messages[type] || ['> SYSTEM UPDATE']
  }

  return (
    <div className="fixed top-0 left-0 pointer-events-none z-50 p-6">
      <AnimatePresence>
        {fxList.map(fx => (
          <motion.div
            key={fx.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mb-4 font-jetbrains text-xs text-[#00F5B8]"
          >
            {getFXContent(fx.type).map((line, i) => (
              <div key={i} className="text-[#00F5B8] opacity-80">
                {line}
              </div>
            ))}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.6 }}
              className="h-0.5 bg-[#00F5B8] mt-1"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
