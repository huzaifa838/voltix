import { MOCK_TRACKS } from '@/data/mock'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') || '').trim().toLowerCase()
  const type = searchParams.get('type') || 'track'

  if (!q) {
    return Response.json([])
  }

  const filtered = MOCK_TRACKS.filter(track => {
    const haystack = [
      track.title,
      track.artistName,
      track.albumName,
      track.genre,
      track.mood,
    ].join(' ').toLowerCase()

    return haystack.includes(q)
  })

  if (type === 'artist') {
    return Response.json(filtered.map(track => ({
      id: track.artistId,
      name: track.artistName,
      avatarUrl: track.artworkUrl,
      genres: [track.genre || 'Music'],
    })))
  }

  if (type === 'album') {
    return Response.json(filtered.map(track => ({
      id: track.albumId,
      title: track.albumName || track.title,
      artistName: track.artistName,
      coverUrl: track.artworkUrl,
    })))
  }

  return Response.json(filtered)
}
