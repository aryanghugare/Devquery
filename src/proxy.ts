import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getOrCreateDB from './models/server/dbSetup'
import getOrCreateStorage from './models/server/storageSetup'

 
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
await Promise.all([
  getOrCreateDB(),
  getOrCreateStorage()
])
  return NextResponse.next()
}
 




// See "Matching Paths" below to learn more
export const config = {
  /* match all request paths except for the the ones that starts with:
  - api
  - _next/static
  - _next/image
  - favicon.com

  */
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}


// Explanation for this matcher : 
/*
The pattern "/((?!api|_next/static|_next/image|favicon.ico).*)" is a regular‑expression style matcher using a negative lookahead:
It matches any path that does NOT start with api, _next/static, _next/image, or favicon.ico.
In other words: run the middleware for all requests except requests to those excluded prefixes.

*/