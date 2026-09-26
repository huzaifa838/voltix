// ================================
// TERMINAL PAGE
// ================================
// Hacker terminal music control

'use client'

import { useState, useRef, useEffect } from 'react'
import { usePlayerStore } from '@/store/playerStore'
import { getTracks } from '@/services/tracks.service'
import { Track } from '@/types'
import { triggerSystemFX } from '@/components/hacker/SystemFX'

interface Command {
  input: string
  output: string[]
  timestamp: Date
}

export default function TerminalPage() {
  const [commands, setCommands] = useState<Command[]>([])
  const [input, setInput] = useState('')
  const [tracks, setTracks] = useState<Track[]>([])
  const terminalRef = useRef<HTMLDivElement>(null)

  const { currentTrack, isPlaying, togglePlay, next, previous, playTrack, } = usePlayerStore()

  useEffect(() => {
    const loadTracks = async () => {
      const data = await getTracks()
      setTracks(data)
    }
    loadTracks()
  }, [])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [commands])

  const processCommand = (cmd: string): string[] => {
    const parts = cmd.trim().toLowerCase().split(' ')
    const output: string[] = []

    if (cmd.trim() === '') {
      return output
    }

    output.push(`$ ${cmd}`)

    const command = parts[0]
    const args = parts.slice(1).join(' ')

    switch (command) {
      case 'help':
        output.push('')
        output.push('Available commands:')
        output.push('  play [track]     - Play a track or resume playback')
        output.push('  pause            - Pause playback')
        output.push('  next             - Skip to next track')
        output.push('  prev             - Go to previous track')
        output.push('  queue            - Show current queue')
        output.push('  shuffle          - Toggle shuffle')
        output.push('  repeat [mode]    - Set repeat mode')
        output.push('  volume [0-100]   - Set volume')
        output.push('  now              - Show current track')
        output.push('  list [artist]    - List tracks')
        output.push('  clear            - Clear terminal')
        break

      case 'play':
        if (args) {
          const found = tracks.find(t => t.title.toLowerCase().includes(args) || t.artistName.toLowerCase().includes(args))
          if (found) {
            playTrack(found)
            output.push('> SEARCHING AUDIO DATABASE...')
            output.push('> TRACK FOUND')
            output.push('> LOADING STREAM...')
            output.push('> BUFFER 100%')
            output.push('> PLAYBACK STARTED')
            output.push(`> Now playing: ${found.title} by ${found.artistName}`)
            triggerSystemFX('PLAY')
          } else {
            output.push('> TRACK NOT FOUND')
            output.push('> Try: list')
          }
        } else {
          togglePlay()
          output.push(isPlaying ? '> PLAYBACK PAUSED' : '> PLAYBACK RESUMED')
          triggerSystemFX(isPlaying ? 'PAUSE' : 'PLAY')
        }
        break

      case 'pause':
        if (isPlaying) {
          togglePlay()
          output.push('> PLAYBACK PAUSED')
          triggerSystemFX('PAUSE')
        } else {
          output.push('> Already paused')
        }
        break

      case 'next':
        next()
        output.push('> TRACK SKIPPED')
        output.push(`> Now playing: ${currentTrack?.title}`)
        triggerSystemFX('NEXT')
        break

      case 'prev':
        previous()
        output.push('> PREVIOUS TRACK LOADED')
        triggerSystemFX('PREVIOUS')
        break

      case 'now':
        if (currentTrack) {
          output.push('> CURRENT TRACK')
          output.push(`> ${currentTrack.title}`)
          output.push(`> ${currentTrack.artistName}`)
          output.push(`> Status: ${isPlaying ? 'PLAYING' : 'PAUSED'}`)
        } else {
          output.push('> No track playing')
        }
        break

      case 'list':
        if (args) {
          const filtered = tracks.filter(t => t.artistName.toLowerCase().includes(args))
          output.push(`> Found ${filtered.length} tracks`)
          filtered.slice(0, 10).forEach((t, i) => {
            output.push(`> ${i + 1}. ${t.title} - ${t.artistName}`)
          })
          if (filtered.length > 10) {
            output.push(`> ... and ${filtered.length - 10} more`)
          }
        } else {
          output.push(`> ${tracks.length} tracks in library`)
          tracks.slice(0, 5).forEach((t, i) => {
            output.push(`> ${i + 1}. ${t.title} - ${t.artistName}`)
          })
          output.push('> Use: list [artist]')
        }
        break

      case 'volume':
        if (args) {
          const vol = parseInt(args)
          if (vol >= 0 && vol <= 100) {
            output.push(`> Volume set to ${vol}%`)
            triggerSystemFX('VOLUME')
          } else {
            output.push('> Volume must be 0-100')
          }
        } else {
          output.push('> Usage: volume [0-100]')
        }
        break

      case 'clear':
        setCommands([])
        return []

      default:
        output.push(`> Unknown command: ${command}`)
        output.push('> Type "help" for available commands')
    }

    output.push('')
    return output
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const output = processCommand(input)
    setCommands([...commands, { input, output, timestamp: new Date() }])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-[#020607] p-6 font-jetbrains">
      <div className="max-w-4xl mx-auto">
        {/* Terminal */}
        <div className="bg-[#05090B] border border-[rgba(0,245,184,0.3)] rounded overflow-hidden flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="px-4 py-2 bg-[#00F5B8] text-[#020607] font-bold text-sm flex items-center gap-2">
            <span>● VOLTIX TERMINAL</span>
          </div>

          {/* Terminal Output */}
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-4 space-y-1 text-sm text-[#00F5B8]"
          >
            <div>VOLTIX AUDIO OS TERMINAL v1.0</div>
            <div>Type &quot;help&quot; for available commands</div>
            <div />

            {commands.map((cmd, i) => (
              <div key={i} className="space-y-0.5">
                {cmd.output.map((line, j) => (
                  <div key={j} className="text-[#00F5B8]">
                    {line}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex items-center gap-2">
              <span>$</span>
              <span>{input}</span>
              <span className="animate-pulse">▋</span>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter command..."
            className="w-full px-4 py-2 bg-[#05090B] border border-[rgba(0,245,184,0.3)] rounded text-[#00F5B8] placeholder-[#6B7C85] focus:outline-none focus:border-[#00F5B8] font-jetbrains"
            autoFocus
          />
        </form>

        {/* Info */}
        <div className="mt-8 p-4 bg-[rgba(0,245,184,0.05)] border border-[rgba(0,245,184,0.2)] rounded text-sm text-[#8DAAB7]">
          <p className="mb-2">🎵 Terminal commands are connected to your player:</p>
          <ul className="list-inside space-y-1 text-xs">
            <li>
              • &quot;play night drive&quot; - searches and plays tracks
            </li>
            <li>
              • &quot;play&quot; - toggle play/pause
            </li>
            <li>
              • &quot;next&quot; / &quot;prev&quot; - navigate tracks
            </li>
            <li>
              • &quot;list&quot; - show available tracks
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
