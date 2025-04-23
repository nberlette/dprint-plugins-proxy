Deno.serve(async (req) => {
  const path = new URL(req.url).pathname.replace(/^\//, "");

  let res = await fetch(`https://plugins.dprint.dev/${path}`);
  if (res.status === 404) {
    res = await fetch(`https://dprint.dev/${path}`);
  }

  const { status } = res;
  const headers = new Headers(res.headers);
  headers.set("Access-Control-Allow-Origin", "*");

  if (path.endsWith(".wasm") && !path.endsWith("latest.wasm")) {
    headers.set(
      "Cache-Control", 
      "public, immutable, max-age=31557600, s-maxage=31557600, must-revalidate, no-transform"
    );
  }
  
  let body: BodyInit;
  if (!res.bodyUsed && headers.get("content-type").startsWith("text/html")) {
    body = await res.text();
    body = body.replace(/https:\/\/plugins\.dprint\.dev\//g, "https://dprint.deno.dev/");
  } else {
    body = res.body;
  }

  return new Response(body, { headers, status });
});