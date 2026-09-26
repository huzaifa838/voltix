export async function GET() {
  return Response.json({
    ok: true,
    service: 'voltix-audio-api',
    mode: 'local-ready',
    timestamp: new Date().toISOString(),
  })
}
