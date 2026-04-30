import Link from "next/link";
import { getPublications, getTrustScore, getKPTsForPublication } from "@/lib/api";
import { MOCK_PUBLICATIONS, MOCK_TRUST_SCORES, MOCK_KPTS } from "@/lib/mock-data";
import { PublicationCard } from "@/components/publication/PublicationCard";
import type { Publication, TrustScore, KPT, PublicationStats } from "@/types/api";

async function getStats(): Promise<PublicationStats | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/publications/summary/stats`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getHomeData(): Promise<{
  recent: Publication[];
  scores: Map<string, TrustScore>;
  kpts: Map<string, KPT>;
  fromMock: boolean;
}> {
  try {
    const list = await getPublications({ limit: 6, skip: 0 });
    const pubs = list.items;
    const [scoresArr, kptsArr] = await Promise.all([
      Promise.all(pubs.map((p) => getTrustScore(p.id).catch(() => null))),
      Promise.all(pubs.map((p) => getKPTsForPublication(p.id).catch(() => []))),
    ]);
    const scores = new Map<string, TrustScore>();
    const kpts = new Map<string, KPT>();
    pubs.forEach((p, i) => {
      const s = scoresArr[i];
      if (s) scores.set(p.id, s);
      const k = kptsArr[i];
      const active = k.find((x) => x.status === "active") ?? k[0];
      if (active) kpts.set(p.id, active);
    });
    return { recent: pubs, scores, kpts, fromMock: false };
  } catch {
    const scores = new Map<string, TrustScore>(MOCK_TRUST_SCORES.map((s) => [s.publication_id, s]));
    const kpts = new Map<string, KPT>(MOCK_KPTS.map((k) => [k.publication_id, k]));
    return { recent: MOCK_PUBLICATIONS, scores, kpts, fromMock: true };
  }
}

export default async function HomePage() {
  const [{ recent, scores, kpts, fromMock }, stats] = await Promise.all([
    getHomeData(),
    getStats(),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-surface-2">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded-full px-4 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-2xs font-mono text-accent uppercase tracking-widest">Scientific Trust Infrastructure</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display text-text-primary leading-tight mb-5 text-balance">
              Kakapo certifie, vérifie et score les publications scientifiques pour les chercheurs, les institutions et les IA.
            </h1>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
              Preuve cryptographique d&apos;antériorité, score de fiabilité calculé sur des signaux vérifiables, vérification publique instantanée.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/verify" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
                Vérifier un KPT →
              </Link>
              <Link href="/publications" className="no-underline inline-flex items-center gap-2 bg-surface-2 hover:bg-surface-3 text-text-secondary hover:text-text-primary text-sm px-5 py-2.5 rounded border border-border transition-all">
                Explorer les publications
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-surface-3">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
            {stats ? (
              <>
                <div className="bg-surface-3 px-5 py-3">
                  <p className="text-xl font-mono font-bold text-amber-600 tabular-nums">{stats.certified}</p>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-0.5">KPT certifiés</p>
                </div>
                <div className="bg-surface-3 px-5 py-3">
                  <p className="text-xl font-mono font-semibold text-accent tabular-nums">{stats.indexed.toLocaleString("fr-FR")}</p>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-0.5">i-KPT indexés</p>
                </div>
                <div className="bg-surface-3 px-5 py-3">
                  <p className="text-xl font-mono font-semibold text-trust-high tabular-nums">
                    {stats.avg_score_certified ? `${Math.round(stats.avg_score_certified * 100)}%` : "—"}
                  </p>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-0.5">Score moyen certifiés</p>
                </div>
                <div className="bg-surface-3 px-5 py-3">
                  <p className="text-xl font-mono font-semibold text-text-primary tabular-nums">3.0</p>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-0.5">Trust Engine</p>
                </div>
              </>
            ) : (
              [
                { value: recent.length.toString(), label: "publications indexées" },
                { value: "—", label: "KPT certifiés" },
                { value: "—", label: "score moyen" },
                { value: "3.0", label: "Trust Engine" },
              ].map(({ value, label }) => (
                <div key={label} className="bg-surface-3 px-5 py-3">
                  <p className="text-xl font-mono font-semibold text-text-primary tabular-nums">{value}</p>
                  <p className="text-2xs font-mono text-text-muted uppercase tracking-widest mt-0.5">{label}</p>
                </div>
              ))
            )}
          </div>
          {fromMock && (
            <p className="text-2xs font-mono text-trust-mid mt-2">Données de démonstration</p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden">
          {[
            { href: "/about/kpt", title: "KPT", sub: "Proof of Knowledge Token", desc: "Empreinte cryptographique qui certifie l'antériorité, l'intégrité et le statut d'une publication. Non transférable, horodaté, vérifiable publiquement." },
            { href: "/about/ikpt", title: "i-KPT", sub: "Indexed Knowledge Provenance Token", desc: "Token d'indexation généré depuis les métadonnées publiques (HAL, CrossRef). Traçable et scoré, convertible en KPT certifié si l'éditeur signe." },
            { href: "/about/trust-score", title: "Trust Score", sub: "Score de fiabilité", desc: "Indice de confiance calculé sur des signaux vérifiables : source, données, fraîcheur, citations et cohérence structurelle." },
            { href: "/about/api", title: "API", sub: "Accès machine", desc: "Interface conçue pour que les IA et systèmes R&D vérifient une source avant de l'exploiter. Vérification par Verified Operation, latence < 200ms." },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="no-underline group block bg-surface-2 hover:bg-surface-3 p-6 transition-all">
              <h3 className="text-base font-display text-text-primary mb-1 group-hover:text-accent transition-colors">{item.title}</h3>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">{item.sub}</p>
              <p className="text-xs text-text-muted leading-relaxed mb-4">{item.desc}</p>
              <span className="text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">En savoir plus →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-b border-border bg-surface-3">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xl font-display text-text-primary">Publications récentes</h2>
            <Link href="/publications" className="text-xs font-mono text-accent hover:text-accent-hover">Tout voir →</Link>
          </div>
          {recent.length === 0 ? (
            <div className="text-center py-16 text-text-muted text-sm">Aucune publication disponible.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {recent.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} trustScore={scores.get(pub.id)} kpt={kpts.get(pub.id)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <h2 className="text-2xl font-display text-text-primary mb-4 max-w-2xl leading-snug">
          Kakapo n&apos;est pas une revue, ni un réseau social scientifique.
        </h2>
        <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
          C&apos;est une couche de vérification : une infrastructure qui rend les connaissances scientifiques traçables, contrôlables et exploitables par les humains comme par les systèmes d&apos;intelligence artificielle.
        </p>
      </section>
    </div>
  );
}
