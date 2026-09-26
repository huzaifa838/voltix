import { MOCK_TRACKS } from '@/data/mock'

export async function GET() {
  return Response.json(MOCK_TRACKS)
}
