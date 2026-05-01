import type { DemoResult } from "@/types/demo";

export const DEMO_FALLBACK: DemoResult[] = [
  {
    question: "Quels sont les apports du Transformer dans le traitement du langage naturel ?",
    mode: "kakapo",
    answer_text: "L'architecture Transformer, introduite par Vaswani et al. en 2017, a révolutionné le NLP en remplaçant les réseaux récurrents par un mécanisme d'auto-attention (self-attention). Cette innovation permet de capturer les relations entre les mots quelle que soit leur distance.\n\n**Contributions majeures :**\n\nPremièrement, BERT [KPT-11111111-v1] a démontré que le pré-entraînement bidirectionnel sur de larges corpus améliore significativement les performances sur des tâches en aval. RoBERTa [KPT-11111111-v1] a ensuite montré que l'optimisation des hyperparamètres de BERT conduit à des gains substantiels.\n\nDeuxièmement, GPT-3 [KPT-11111111-v1] a établi que les modèles de langage à grande échelle sont des apprenants à quelques exemples (few-shot learners), capables de généraliser sans fine-tuning.\n\nTroisièmement, T5 [KPT-11111111-v1] a unifié toutes les tâches NLP dans un cadre texte-à-texte, simplifiant l'architecture globale.\n\nNote : Ces résultats proviennent de publications certifiées KAKAPO. Les décisions critiques doivent s'appuyer sur une expertise spécialisée.",
    cited_kpts: [
      {
        kpt_id: "KPT-11111111-v1",
        kpt_status: "certified",
        title: "BERT: Pre-training of Deep Bidirectional Transformers",
        publisher: "Google AI Language",
        publication_date: "2018-10-11",
        doi: "10.48550/arXiv.1810.04805",
        hash_kpt: "certified-10.48550-arXiv.1810.04805",
        trust_score: 78,
        indexation_score: null,
        source_label: "KAKAPO certified",
        url_kakapo: "https://kakapo-front.vercel.app/publications/11111111-0002-0002-0002-000000000002"
      }
    ],
    tool_calls_count: 1,
    latency_ms: 2340,
    estimated_cost_usd: 0.0042,
    input_tokens: 850,
    output_tokens: 420,
    request_id: "fallback-001",
    timestamp: "2026-05-01T10:00:00Z"
  },
  {
    question: "Quels sont les apports du Transformer dans le traitement du langage naturel ?",
    mode: "raw",
    answer_text: "Le Transformer est une architecture de réseau de neurones introduite en 2017 qui a révolutionné le traitement du langage naturel. Son principal apport est le mécanisme d'attention qui permet de traiter les relations entre les mots en parallèle, contrairement aux réseaux récurrents.\n\nParmi les modèles dérivés, on peut citer BERT, GPT, T5 et de nombreux autres qui ont établi de nouveaux records sur les benchmarks NLP.\n\nNote : Cette réponse est basée sur la connaissance générale de Claude. Aucune source vérifiable n'a été citée.",
    cited_kpts: [],
    tool_calls_count: 0,
    latency_ms: 1200,
    estimated_cost_usd: 0.0018,
    input_tokens: 420,
    output_tokens: 180,
    request_id: "fallback-002",
    timestamp: "2026-05-01T10:00:00Z"
  },
  {
    question: "Comment les réseaux de neurones résiduels ont-ils amélioré la reconnaissance d'images ?",
    mode: "kakapo",
    answer_text: "Les réseaux résiduels (ResNet), introduits par He et al. en 2015 [KPT-11111111-v1], ont résolu le problème de la dégradation du gradient dans les réseaux profonds grâce aux connexions résiduelles (skip connections).\n\n**Impact majeur :**\nResNet a permis d'entraîner des réseaux de plus de 150 couches, là où les architectures précédentes (VGG [KPT-11111111-v1]) ne dépassaient pas 19 couches efficacement. Cette percée a conduit à des gains significatifs sur ImageNet [KPT-11111111-v1] et a inspiré YOLO [KPT-11111111-v1] pour la détection d'objets en temps réel.\n\nNote : Sources certifiées KAKAPO. Décisions critiques à valider avec des experts.",
    cited_kpts: [
      {
        kpt_id: "KPT-11111111-v1",
        kpt_status: "certified",
        title: "Deep Residual Learning for Image Recognition",
        publisher: "Microsoft Research",
        publication_date: "2015-12-10",
        doi: "10.48550/arXiv.1512.03385",
        hash_kpt: "certified-10.48550-arXiv.1512.03385",
        trust_score: 82,
        indexation_score: null,
        source_label: "KAKAPO certified",
        url_kakapo: "https://kakapo-front.vercel.app/publications/11111111-0003-0003-0003-000000000003"
      }
    ],
    tool_calls_count: 1,
    latency_ms: 2100,
    estimated_cost_usd: 0.0038,
    input_tokens: 780,
    output_tokens: 390,
    request_id: "fallback-003",
    timestamp: "2026-05-01T10:00:00Z"
  }
];
