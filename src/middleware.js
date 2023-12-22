import { NextResponse } from 'next/server'

export function middleware(request) {

  const { pathname: nextPathname } = request.nextUrl

  const destinationUrl = (url) => new URL(url, request.url)

  if(nextPathname === '/') {
    return NextResponse.redirect(destinationUrl('/profile'))
  }

  return NextResponse.next()
}
