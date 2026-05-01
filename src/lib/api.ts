import { apiFetch } from "@/lib/api-client";
import type {
  Publication,
  PublicationList,
  PublicationQuery,
  KPT,
  KPTVerifyResponse,
  TrustScore,
} from "@/types/api";

// ─── Publications ─────────────────────────────────────────────────────────────

export async function getPublications(
  query: PublicationQuery = {}
): Promise<PublicationList> {
  return apiFetch<PublicationList>("/publications/", {
    params: {
      skip: query.skip ?? 0,
      limit: query.limit ?? 20,
      source: query.source,
      kpt_status: query.kpt_status,
    },
    next: { revalidate: 60 },
  });
}

export async function getPublication(id: string): Promise<Publication> {
  return apiFetch<Publication>(`/publications/${id}`, {
    next: { revalidate: 60 },
  });
}

// ─── KPT ──────────────────────────────────────────────────────────────────────

export async function getKPT(kptId: string): Promise<KPT> {
  return apiFetch<KPT>(`/kpt/${kptId}`, {
    next: { revalidate: 60 },
  });
}

export async function getKPTsForPublication(
  publicationId: string
): Promise<KPT[]> {
  return apiFetch<KPT[]>(`/kpt/publication/${publicationId}`, {
    next: { revalidate: 60 },
  });
}

export async function verifyKPT(
  kptId: string,
  verifyFile = false
): Promise<KPTVerifyResponse> {
  return apiFetch<KPTVerifyResponse>(
    `/kpt/${kptId}/verify?verify_file=${verifyFile}`,
    { method: "POST", cache: "no-store" }
  );
}

// ─── Trust Score ──────────────────────────────────────────────────────────────

export async function getTrustScore(
  publicationId: string
): Promise<TrustScore> {
  return apiFetch<TrustScore>(`/trust/score/${publicationId}`, {
    next: { revalidate: 60 },
  });
}

export async function getTrustScoreHistory(
  publicationId: string
): Promise<TrustScore[]> {
  return apiFetch<TrustScore[]>(`/trust/history/${publicationId}`, {
    next: { revalidate: 60 },
  });
}
