import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/auth/login', '/auth/register', '/'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths and static files
  if (
    PUBLIC_PATHS.some(p => pathname === p) ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/pengembang') ||
    pathname.startsWith('/pilih-peran') ||
    pathname.startsWith('/cara-kerja') ||
    pathname.startsWith('/hubungi-kami') ||
    pathname.startsWith('/asset') ||
    pathname.startsWith('/background') ||
    pathname.startsWith('/tim')
  ) {
    return NextResponse.next();
  }

  const userId = request.cookies.get('nusatani_uid')?.value;
  const role = request.cookies.get('nusatani_role')?.value;

  // If not logged in, redirect to login for protected routes
  if (!userId && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/petani') ||
    pathname.startsWith('/pengolah')
  )) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Role guard for /petani/* routes
  if (role === 'pengolah' && pathname.startsWith('/petani')) {
    return NextResponse.redirect(new URL('/pengolah/dashboard', request.url));
  }

  // Role guard for /pengolah/* routes
  if (role === 'petani' && pathname.startsWith('/pengolah')) {
    return NextResponse.redirect(new URL('/petani/dashboard', request.url));
  }

  // Legacy role guards for old /dashboard/* routes
  if (role === 'petani' && pathname.startsWith('/dashboard/pengolah')) {
    return NextResponse.redirect(new URL('/petani/dashboard', request.url));
  }
  if (role === 'pengolah' && pathname.startsWith('/dashboard/petani')) {
    return NextResponse.redirect(new URL('/pengolah/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/petani/:path*', '/pengolah/:path*', '/profile/:path*'],
};
