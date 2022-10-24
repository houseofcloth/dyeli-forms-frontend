/**
 * worker/forms.js
 */
import { getAssetFromKV } from "@cloudflare/kv-asset-handler"
import manifestJSON from '__STATIC_CONTENT_MANIFEST'

//
import notFoundPage from "../dist/404.html"

//
const assetManifest = JSON.parse(manifestJSON)
// Set to same value of `basePath` in .eleventy.js
const basePath = '/forms'

//
export default {
  async fetch(request, env, ctx) {

    //
    const url = new URL(request.url.replace(basePath, ''))
    const { pathname, origin } = url
    const { method } = request

    // console.log("Frontend URL: ", url)

    // Handle form submissions
    if (method === "POST" && pathname.startsWith('/submit/')) {
      try {
        return await env.FORMS.fetch(new Request(`${origin}${pathname.replace('/submit/', '/')}`), request)
      }
      catch(e) {
        return new Response(
          JSON.stringify({ err: e.message || e.toString() }),
          { status: 500 }
        )
      }
    }

    // GET/HEAD onlye only
    if (method !== "GET" && method !== "HEAD")
      return new Response("Method not allowed", {
        status: 405,
        headers: {
          Allow: "HEAD, GET",
        },
      })
    
    // Session cookies
    if (method === "GET" && pathname.startsWith("/session/")) {
      try {
        // console.log("Frontend Session URL: ", url.replace('/session/','/'))
        return await env.SESSION.fetch(new Request(url.href.replace('/session/','/'),request))
      }
      catch(e) {
        console.log(e.message || e.toString())
        return new Response(
          JSON.stringify({ err: "Session error."}),
          { status: 500 }
        )
      }
    }

    //
    try {

      // As `dist/forms` is the bucket, the URL without `/forms/` is required
      // otherwise a 404 is served.
      const pageReq = new Request(url, request)

      const page = await getAssetFromKV(
            {
              request: pageReq,
              waitUntil(promise) {
                return ctx.waitUntil(promise)
              },
            }, {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: assetManifest,
            },
          )

      // allow headers to be altered
      const response = new Response(page.body, page)

      response.headers.set("X-XSS-Protection", "1; mode=block")
      response.headers.set("X-Content-Type-Options", "nosniff")
      response.headers.set("X-Frame-Options", "DENY")
      response.headers.set("Referrer-Policy", "no-referrer")
      response.headers.set("Feature-Policy", "none")
      response.headers.set("Cache-Control", "s-maxage=3600")
      response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet, notranslate")
      response.headers.set("Content-Security-Policy","base-uri 'self'; script-src 'self' 'nonce-e36aac6a4f48'; style-src 'self' 'nonce-e36adc6a4f48' https://fonts.googleapis.com; img-src 'self' data:; object-src 'self'; frame-ancestors 'none';")

      // return
      return response

    } catch (e) {

      // 404 Page
      return new Response(notFoundPage, {
        status: 404,
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
        }
      })
      
    }
  },
}
