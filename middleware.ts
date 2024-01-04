import { NextRequest, NextResponse } from 'next/server'
import { verifyJwtToken } from './libs/auth'

const AUTH_PAGES = ['/signin']

const isAuthPages = (url: any) => AUTH_PAGES.includes(url)

export async function middleware (req: NextRequest, res: NextResponse) {
  const { url, nextUrl, cookies } = req

  const cookie: any = cookies.get('survey::credentials')

  if (cookie) {
    const hasVerifiedToken = await verifyJwtToken(cookie.value)
    if (hasVerifiedToken) {
      if (isAuthPages(nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', url))
      }

      return NextResponse.next()
    } else {
      return NextResponse.redirect(new URL(`/signin`, url))
    }
  } else {
    if (isAuthPages(nextUrl.pathname)) {
      return NextResponse.next()
    } else {
      const searchParams = new URLSearchParams(nextUrl.searchParams)
      searchParams.set('next', nextUrl.pathname)
      return NextResponse.redirect(new URL('/signin?' + searchParams, url))
    }
  }
}

export const config = {
  matcher: ['/', '/signin']
}
