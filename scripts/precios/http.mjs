// fetch con timeout, reintentos y una pausa mínima entre requests al mismo súper.
export const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Un "throttle" por tienda: como mucho 1 request cada `gap` ms.
export function throttle(gap = 1000) {
  let next = 0;
  return async () => {
    const now = Date.now();
    const wait = Math.max(0, next - now);
    next = Math.max(now, next) + gap;
    if (wait) await sleep(wait);
  };
}

export async function request(url, { method = "GET", headers = {}, body, timeout = 30000, retries = 1, wait } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    if (wait) await wait();
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), timeout);
    try {
      const res = await fetch(url, {
        method,
        headers,
        body: body == null ? undefined : typeof body === "string" ? body : JSON.stringify(body),
        signal: ctrl.signal,
        redirect: "follow"
      });
      const text = await res.text();
      if (res.status >= 500 && attempt < retries) { lastErr = new Error("HTTP " + res.status); await sleep(2000); continue; }
      return { status: res.status, text, json: () => JSON.parse(text) };
    } catch (e) {
      lastErr = e;
      if (attempt < retries) await sleep(2000);
    } finally {
      clearTimeout(t);
    }
  }
  throw lastErr;
}
