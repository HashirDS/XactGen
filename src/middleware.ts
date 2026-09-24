import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // CVE-2025-29927: Block x-middleware-subrequest header injection
  if (request.headers.get('x-middleware-subrequest')) {
    return new NextResponse(null, { status: 403 })
  }
  return NextResponse.next()
}

export const config = {
  // Only run on admin routes — not on every page request
  matcher: ['/admin', '/admin/:path*'],
}
