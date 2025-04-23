# dprint-plugins-proxy

## What it do?

This is a stupidly simple proxy for the [dprint.dev](https://dprint.dev) website, which adds
an `Access-Control-Allow-Origin` header (and some conditional cache controls) to allow CORS
requests to the WebAssembly plugins hosted on the site.

It forwards all requests from `https://dprint.deno.dev/*` -> `https://plugins.dprint.dev/*`,
and if it encounters a 404 then it attempts to forward to `https://dprint.dev/*` instead.

When it detects HTML content, it rewrites any dprint.dev URLs in the content to use the
Deno Deploy origin of the proxy server instead. Requests that appear to be for WASM files
are cached as immutable assets with a max age of 1 year.

## But why?

I was getting CORS errors trying to fetch dprint plugins. Half a coffee later and here we are.

---

[MIT] (c) Nicholas Berlette. All rights reserved.

[MIT]: https://nick.mit-license.org
