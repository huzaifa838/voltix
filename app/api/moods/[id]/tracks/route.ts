import { getTracksByMood } from '@/data/mock'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const moodMap: Record<string, string> = {
    'mood-chill': 'chill',
    'mood-depression': 'depression',
    'mood-sad': 'sad',
    'mood-relaxing': 'relaxing',
    'mood-time-pass': 'time-pass',
    'mood-with-friends': 'with-friends',
  }

  const mood = moodMap[id]
  if (!mood) {
    return Response.json([], { status: 404 })
  }

  return Response.json(getTracksByMood(mood))
}
