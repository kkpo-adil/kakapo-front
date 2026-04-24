import Link from "next/link";
import { getPublications, getTrustScore, getKPTsForPublication } from "@/lib/api";
import { MOCK_PUBLICATIONS, MOCK_TRUST_SCORES, MOCK_KPTS } from "@/lib/mock-data";
import { PublicationCard } from "@/components/publication/PublicationCard";
import type { Publication, TrustScore, KPT } from "@/types/api";

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
  const { recent, scores, kpts, fromMock } = await getHomeData();
  const activeKpts = [...kpts.values()].filter((k) => k.status === "active").length;
  const averageScore = scores.size > 0
    ? Math.round([...scores.values()].reduce((a, s) => a + s.score, 0) / scores.size * 100)
    : null;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-2xs font-mono text-accent uppercase tracking-widest">Scientific Trust Infrastructure</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display text-text-primary leading-tight mb-5 text-balance">
              Kakapo certifie, vérifie et score les publications scientifiques pour les chercheurs, les institutions et les IA.
            </h1>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed mb-8 max-w-2xl">
              Preuve cryptographique d'antériorité, score de fiabilité calculé sur des signaux vérifiables, vérification publique instantanée.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/verify" className="no-underline inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm px-5 py-2.5 rounded transition-colors">
                Vérifier un KPT
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link href="/publications" className="no-underline inline-flex items-center gap-2 bg-surface-3 hover:bg-surface-4 text-text-secondary hover:text-text-primary text-sm px-5 py-2.5 rounded border border-border transition-all">
                Explorer les publications
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex gap-4 opacity-20 pointer-events-none">
          {[0.92, 0.67, 0.41].map((s, i) => (
            <div key={i} className="w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: s > 0.7 ? "#22c55e" : s > 0.4 ? "#f59e0b" : "#ef4444" }}>
              <span className="text-xs font-mono" style={{ color: s > 0.7 ? "#22c55e" : s > 0.4 ? "#f59e0b" : "#ef4444" }}>{Math.round(s * 100)}%</span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b border-border bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-8 items-center">
          {[
            { value: recent.length.toString(), label: "publications indexées" },
            { value: activeKpts.toString(), label: "KPT actifs" },
            { value: averageScore !== null ? `${averageScore}%` : "—", label: "score moyen" },
            { value: "1.0", label: "Trust Engine" },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="text-lg font-mono font-semibold text-text-primary tabular-nums">{value}</span>
              <span className="text-xs text-text-muted">{label}</span>
            </div>
          ))}
          {fromMock && (
            <span className="ml-auto text-2xs font-mono text-trust-mid border border-trust-mid/30 rounded px-2 py-0.5">Données de démonstration</span>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <span className="text-2xs font-mono text-accent uppercase tracking-widest">Les 3 preuves Kakapo</span>
        <h2 className="text-xl font-display text-text-primary mt-2 mb-8">Une publication ne doit plus seulement être accessible. Elle doit être vérifiable.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {[
            { title: "KPT", sub: "Proof of Knowledge Token", desc: "Empreinte cryptographique qui certifie l'antériorité, l'intégrité et le statut d'une publication. Non transférable, horodaté, vérifiable publiquement." },
            { title: "Trust Score", sub: "Score de fiabilité", desc: "Indice de confiance calculé sur des signaux vérifiables : source, complétude, fraîcheur, citations et données associées." },
            { title: "API", sub: "Accès machine", desc: "Interface conçue pour que les IA et systèmes R&D vérifient une source avant de l'exploiter. Pay-per-query, latence < 200ms." },
          ].map((item) => (
            <div key={item.title} className="bg-surface-1 p-6">
              <h3 className="text-base font-display text-text-primary mb-1">{item.title}</h3>
              <p className="text-2xs font-mono text-accent uppercase tracking-widest mb-4">{item.sub}</p>
              <p className="text-xs text-text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <span className="text-2xs font-mono text-accent uppercase tracking-widest">Cas d'usage</span>
          <h2 className="text-xl font-display text-text-primary mt-2 mb-8">Une même infrastructure, trois usages prioritaires.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Chercheur", desc: "Certifier une publication, prouver son antériorité et rendre son travail vérifiable par n'importe quel système.", href: `${process.env.NEXT_PUBLIC_API_URL}/auth/orcid/login`, cta: "Se connecter avec ORCID", external: true },
              { title: "Labo / Université", desc: "Suivre les travaux produits par une équipe et ajouter une couche de traçabilité aux dépôts scientifiques institutionnels.", href: "/publications", cta: "Voir les publications", external: false },
              { title: "IA / API", desc: "Interroger Kakapo pour vérifier une publication, un KPT ou un score de fiabilité avant réutilisation dans un pipeline.", href: "/verify", cta: "Tester une vérification", external: false },
            ].map((item) => (
              item.external ? (
                <a key={item.title} href={item.href} className="no-underline group block border border-border bg-surface-1 hover:bg-surface-3 hover:border-border-strong rounded p-6 transition-all">
                  <h3 className="text-base font-display text-text-primary mb-3">{item.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-5">{item.desc}</p>
                  <span className="text-xs font-mono text-accent group-hover:text-accent-hover">{item.cta} →</span>
                </a>
              ) : (
                <Link key={item.title} href={item.href} className="no-underline group block border border-border bg-surface-1 hover:bg-surface-3 hover:border-border-strong rounded p-6 transition-all">
                  <h3 className="text-base font-display text-text-primary mb-3">{item.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-5">{item.desc}</p>
                  <span className="text-xs font-mono text-accent group-hover:text-accent-hover">{item.cta} →</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <span className="text-2xs font-mono text-accent uppercase tracking-widest">Démonstration vivante</span>
            <h2 className="text-xl font-display text-text-primary mt-2">Publications certifiées récentes</h2>
          </div>
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
      </section>

      <section className="border-t border-border bg-surface-2">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="max-w-3xl">
            <span className="text-2xs font-mono text-accent uppercase tracking-widest">Positionnement</span>
            <h2 className="text-2xl font-display text-text-primary mt-3 mb-4">Kakapo n'est pas une revue, ni un réseau social scientifique.</h2>
            <p className="text-sm text-text-secondary leading-relaxed">C'est une couche de vérification : une infrastructure qui rend les connaissances scientifiques traçables, contrôlables et exploitables par les humains comme par les systèmes d'intelligence artificielle.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
