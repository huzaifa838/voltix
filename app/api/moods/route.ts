import { MOCK_MOODS } from '@/data/mock'

export async function GET() {
  return Response.json(MOCK_MOODS)
}
