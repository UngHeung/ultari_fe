import { getAccessToken } from '@/components/auth/functions/tokenInteract';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest, event: NextFetchEvent) => {
  const memberOnlyRoutes = [
    '/forgot',
    '/post/write',
    '/post/update',
    '/post/[0-9]*',
  ];
  const nonMemberRoutes = ['/sign', '/login', '/'];

  let accessToken = getAccessToken();
  console.log('token -> ', accessToken.length);
  const currentPath = request.nextUrl.pathname;

  if (!accessToken && memberOnlyRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    console.log('토큰없음&회원접근. ', url);

    url.pathname = '/login';

    return NextResponse.redirect(url);
  } else if (accessToken && nonMemberRoutes.includes(currentPath)) {
    const url = request.nextUrl.clone();
    console.log('토큰있음&비회원접근. ', url);

    url.pathname = '';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
