import type { Track } from '@/types'
import { getTracksByMood } from '@/data/mock/tracks'

export const MOODS = [
  {
    key: 'chill',
    name: 'Chill',
    description: 'Slow the signal down',
    image: '/images/default.jpg',
  },
  {
    key: 'depression',
    name: 'Depression',
    description: 'Dark rooms. Quiet signals.',
    image: '/images/default.jpg',
  },
  {
    key: 'sad',
    name: 'Sad',
    description: 'Feel it. Let it pass.',
    image: '/images/default.jpg',
  },
  {
    key: 'relaxing',
    name: 'Relaxing',
    description: 'Low pulse. Clear mind.',
    image: '/images/default.jpg',
  },
  {
    key: 'time pass',
    name: 'Time Pass',
    description: 'No objective. Just play.',
    image: '/images/default.jpg',
  },
  {
    key: 'with friends',
    name: 'With Friends',
    description: 'Shared signal. Better noise.',
    image: '/images/default.jpg',
  },
] as const

export type MoodKey = (typeof MOODS)[number]['key']

export function tracksForMood(mood: MoodKey): Track[] {
  return getTracksByMood(mood)
}