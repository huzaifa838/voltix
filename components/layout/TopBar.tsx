// ================================
// TOP BAR COMPONENT
// ================================

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Bell } from 'lucide-react'

export default function TopBar() {
  const pathname = usePathname()

  return (
    <header className="hidden md:flex items-center justify-between px-6 py-4 bg-[#05090B] border-b border-[rgba(255,255,255,0.08)]">
      {/* Left: Branding (hidden since sidebar has it) */}
      <div className="w-64" />

      {/* Center: Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search songs, artists, or moods..."
            className="w-full px-4 py-2 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded text-sm text-[#E8F3F5] placeholder-[#6B7C85] focus:outline-none focus:border-[#00F5B8] transition-colors"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7C85]" />
        </div>
      </div>

      {/* Right: User Menu */}
      <div className="flex items-center gap-4 ml-6">
        <button className="text-[#8DAAB7] hover:text-[#E8F3F5] transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 bg-[#00F5B8] rounded flex items-center justify-center">
          <span className="text-[#020607] font-bold text-xs">AE</span>
        </div>
      </div>
    </header>
  )
}
