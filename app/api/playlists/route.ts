import { MOCK_PLAYLISTS } from '@/data/mock'

export async function GET() {
  return Response.json(MOCK_PLAYLISTS)
}
