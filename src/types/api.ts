// ─── Core domain types ────────────────────────────────────────────────────────

export type PublicationSource = "hal" | "arxiv" | "direct" | "other";

export type KPTStatus = "active" | "challenged" | "revoked" | "superseded";

// ─── Publication ──────────────────────────────────────────────────────────────

export interface Author {
  name: string;
  orcid?: string;
}

export interface Publication {
  kpt_status: PublicationKPTStatus;
  source_origin: 'hal' | 'editor_partner' | 'direct_deposit';
  hal_id: string | null;
  opted_out_at: string | null;
  id: string;
  title: string;
  abstract: string | null;
  source: PublicationSource | null;
  file_path: string | null;
  file_hash: string | null;
  doi: string | null;
  authors_raw: Author[] | string | null;
  institution_raw: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PublicationList {
  total: number;
  items: Publication[];
}

// ─── KPT ──────────────────────────────────────────────────────────────────────

export interface KPTTrustFields {
  has_doi: boolean;
  has_abstract: boolean;
  has_authors: boolean;
  has_institution: boolean;
  has_dataset: boolean;
}

export interface KPTMetadata {
  publication_id: string;
  title: string;
  source: PublicationSource | null;
  doi: string | null;
  issued_at: string;
  orcid_authors: string[];
  ror_institution: string | null;
  dataset_hashes: string[];
  trust_fields: KPTTrustFields;
}

export interface KPT {
  id: string;
  kpt_id: string;
  publication_id: string;
  content_hash: string;
  version: number;
  status: KPTStatus;
  issued_at: string;
  metadata_json: KPTMetadata | null;
}

export interface KPTVerifyResponse {
  valid: boolean;
  kpt_id: string;
  status: string;
  content_hash: string;
  stored_hash: string;
  message: string;
}

// ─── Trust Score ──────────────────────────────────────────────────────────────

export interface TrustScore {
  id: string;
  publication_id: string;
  score: number;
  source_score: number;
  completeness_score: number;
  freshness_score: number;
  citation_score: number;
  dataset_score: number;
  scoring_version: string;
  scored_at: string;
}

// ─── Query params ─────────────────────────────────────────────────────────────

export interface PublicationQuery {
  skip?: number;
  limit?: number;
  source?: PublicationSource;
  kpt_status?: 'certified' | 'indexed';
}

// ─── API error ────────────────────────────────────────────────────────────────

export interface ApiError {
  detail: string;
  status: number;
}

export type PublicationKPTStatus = 'certified' | 'indexed';
export type SourceOrigin = 'hal' | 'editor_partner' | 'direct_deposit';

export interface PublicationStats {
  total: number;
  certified: number;
  indexed: number;
  avg_score_certified: number | null;
  by_source: Record<string, number>;
}
