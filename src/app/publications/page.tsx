"use client";

import { useState, useEffect, useCallback } from "react";
import { PublicationCard } from "@/components/publication/PublicationCard";
import type { Publication, TrustScore, KPT } from "@/types/api";

const PAGE_SIZE = 12;

const SOURCES = [
  { value: "", label: "Toutes sources" },
  { value: "arxiv", label: "arXiv" },
  { value: "hal", label: "HAL" },
  { value: "direct", label: "Dépôt direct" },
  { value: "nature", label: "Nature" },
  { value: "pubmed", label: "PubMed" },
];

interface PubData {
  pubs: Publication[];
  total: number;
  scores: Record<string, TrustScore>;
  kpts: Record<string, KPT>;
}

export default function PublicationsPage() {
  const [source, setSource] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PubData>({ pubs: [], total: 0, scores: {}, kpts: {} });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<{ total: number; certified: number; indexed: number } | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications/stats`)
      .then(r => r.json())
      .then(d => setStats(d))
      .catch(() => null);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        skip: String((page - 1) * PAGE_SIZE),
        limit: String(PAGE_SIZE),
      });
      if (source) params.set("source", source);
      if (search) params.set("search", search);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/publications/?${params}`);
      const list = await res.json();
      const pubs: Publication[] = list.items || list || [];
      const total: number = list.total ?? pubs.length;

      const [scoresArr, kptsArr] = await Promise.all([
        Promise.all(pubs.map(p =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/trust/score/${p.id}`)
            .then(r => r.ok ? r.json() : null).catch(() => null)
        )),
        Promise.all(pubs.map(p =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/kpt/publication/${p.id}`)
            .then(r => r.ok ? r.json() : null).catch(() => null)
        )),
      ]);

      const scores: Record<string, TrustScore> = {};
      const kpts: Record<string, KPT> = {};
      pubs.forEach((p, i) => {
        if (scoresArr[i]) scores[p.id] = scoresArr[i];
        const k = kptsArr[i];
        if (k) {
          const active = Array.isArray(k) ? (k.find((x: KPT) => x.status === "active") ?? k[0]) : k;
          if (active) kpts[p.id] = active;
        }
      });

      setData({ pubs, total, scores, kpts });
    } catch {
      setData({ pubs: [], total: 0, scores: {}, kpts: {} });
    } finally {
      setLoading(false);
    }
  }, [page, source, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  }

  function handleSource(val: string) {
    setSource(val);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-2">Index KAKAPO</p>
        <div className="flex items-baseline justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-display text-text-primary">Publications certifiées</h1>
          {stats && (
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-text-muted">{stats.total} publications</span>
              <span className="text-xs font-mono text-trust-high">{stats.certified} certifiées</span>
              <span className="text-xs font-mono text-accent">{stats.indexed} indexées</span>
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Rechercher par titre, auteur, DOI..."
            className="flex-1 bg-surface-2 border border-border rounded px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
          <button type="submit" className="bg-accent hover:bg-accent-hover text-white text-sm font-mono px-5 py-2.5 rounded transition-colors cursor-pointer">
            Rechercher
          </button>
          {search && (
            <button type="button" onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }}
              className="border border-border text-text-muted hover:text-text-primary text-sm font-mono px-4 py-2.5 rounded transition-colors bg-transparent cursor-pointer">
              ✕
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mb-8">
        {SOURCES.map(s => (
          <button
            key={s.value}
            onClick={() => handleSource(s.value)}
            className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors cursor-pointer ${
              source === s.value
                ? "bg-accent text-white border-accent"
                : "border-border text-text-secondary hover:border-accent hover:text-accent"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="text-xs font-mono text-text-muted animate-pulse">Chargement...</div>
        </div>
      ) : data.pubs.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-sm text-text-muted">Aucune publication trouvée.</p>
          {(search || source) && (
            <button onClick={() => { setSearch(""); setSearchInput(""); setSource(""); setPage(1); }}
              className="mt-4 text-xs font-mono text-accent hover:text-accent-hover bg-transparent border-0 cursor-pointer">
              Réinitialiser les filtres
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
            {data.pubs.map(pub => (
              <PublicationCard
                key={pub.id}
                publication={pub}
                trustScore={data.scores[pub.id]}
                kpt={data.kpts[pub.id]}
              />
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-6">
            <p className="text-xs font-mono text-text-muted">
              {data.total} résultat{data.total > 1 ? "s" : ""}
              {search && ` pour "${search}"`}
              {source && ` — source : ${source}`}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="text-xs font-mono px-3 py-1.5 border border-border rounded disabled:opacity-40 hover:border-accent hover:text-accent transition-colors bg-transparent cursor-pointer text-text-secondary"
              >
                ←
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let p: number;
                  if (totalPages <= 7) p = i + 1;
                  else if (page <= 4) p = i + 1;
                  else if (page >= totalPages - 3) p = totalPages - 6 + i;
                  else p = page - 3 + i;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`text-xs font-mono w-8 h-8 rounded border transition-colors cursor-pointer ${
                        p === page
                          ? "bg-accent text-white border-accent"
                          : "border-border text-text-secondary hover:border-accent hover:text-accent bg-transparent"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="text-xs font-mono px-3 py-1.5 border border-border rounded disabled:opacity-40 hover:border-accent hover:text-accent transition-colors bg-transparent cursor-pointer text-text-secondary"
              >
                →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
