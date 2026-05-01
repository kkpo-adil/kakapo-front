import type { DemoResult, DemoQueryRequest, DemoHealth } from "@/types/demo";

const API = process.env.NEXT_PUBLIC_API_URL ?? "";
const TIMEOUT = 30000;

async function fetchWithTimeout(url: string, options: RequestInit, signal?: AbortSignal): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);
  const combinedSignal = signal ?? controller.signal;
  try {
    const res = await fetch(url, { ...options, signal: combinedSignal });
    clearTimeout(timer);
    return res;
  } catch (e) {
    clearTimeout(timer);
    throw e;
  }
}

export async function postDemoQuery(payload: DemoQueryRequest, signal?: AbortSignal): Promise<DemoResult> {
  const res = await fetchWithTimeout(`${API}/demo/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }, signal);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: "Erreur inconnue" }));
    throw new Error(err.detail ?? `HTTP ${res.status}`);
  }
  return res.json();
}

export async function postDemoExport(requestId: string, signal?: AbortSignal): Promise<Blob> {
  const res = await fetchWithTimeout(`${API}/demo/export`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ request_id: requestId }),
  }, signal);
  if (!res.ok) throw new Error("Export indisponible — relancez la démo.");
  return res.blob();
}

export async function getDemoHealth(): Promise<DemoHealth> {
  const res = await fetch(`${API}/demo/health`);
  return res.json();
}
