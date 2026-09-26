import { MOCK_PLAYLISTS } from '@/data/mock'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const playlist = MOCK_PLAYLISTS.find(item => item.id === id)

  if (!playlist) {
    return Response.json({ error: 'Playlist not found' }, { status: 404 })
  }

  return Response.json(playlist)
}
