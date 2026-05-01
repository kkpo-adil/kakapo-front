export type KPTDemoStatus = "certified" | "indexed";

export interface CitedKPT {
  kpt_id: string;
  kpt_status: KPTDemoStatus;
  title: string;
  publisher: string | null;
  publication_date: string;
  doi: string | null;
  hash_kpt: string;
  trust_score: number | null;
  indexation_score: number | null;
  source_label: string;
  url_kakapo: string;
}

export interface DemoResult {
  question: string;
  mode: "kakapo" | "raw";
  answer_text: string;
  cited_kpts: CitedKPT[];
  tool_calls_count: number;
  latency_ms: number;
  estimated_cost_usd: number;
  input_tokens: number;
  output_tokens: number;
  request_id: string;
  timestamp: string;
}

export interface DemoQueryRequest {
  question: string;
  with_kakapo: boolean;
}

export interface DemoHealth {
  anthropic_ok: boolean;
  db_ok: boolean;
  catalog_size: number;
  ready_for_demo: boolean;
}
