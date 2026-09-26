export async function POST(
  _request: Request,
  { params }: { params: Promise<{ trackId: string }> }
) {
  const { trackId } = await params
  return Response.json({ ok: true, trackId })
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ trackId: string }> }
) {
  const { trackId } = await params
  return Response.json({ ok: true, trackId, deleted: true })
}
