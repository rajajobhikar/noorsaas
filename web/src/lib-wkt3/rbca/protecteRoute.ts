import { NextRequest, NextResponse } from 'next/server';
import { hasAccess } from './checkAccess';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('session')?.value;
  const userId = token?.split('-')[1]; // e.g., session-u1-xyz
  if (!userId || !hasAccess(userId, 'SUPERADMIN')) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};