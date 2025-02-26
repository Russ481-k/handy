import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { fallbackLng, languages } from "./app/i18n/settings";

export function middleware(request: NextRequest) {
  // 현재 요청된 pathname 확인
  const pathname = request.nextUrl.pathname;

  // 루트 경로인 경우 기본 언어로 리다이렉트
  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${fallbackLng}`, request.url));
  }

  // 현재 설정된 언어 확인
  const pathnameIsMissingLocale = languages.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 언어 경로가 없는 경우 기본 언어로 리다이렉트
  if (pathnameIsMissingLocale) {
    const locale = request.cookies.get("NEXT_LOCALE")?.value || fallbackLng;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    "/((?!api|_next/static|_next/image|assets|favicon.ico).*)",
  ],
};
