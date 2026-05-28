Oparence

Infrastructure de provenance scientifique certifiée pour les IA en secteurs régulés.
Phase actuelle : pré-amorçage. Système en production, premier pitch investisseur en cours.


Table des matières

Identité du projet
Architecture & topologie
Souveraineté & roadmap d'infrastructure
Accès opérationnels
Stack technique
Concepts produit
Schéma de données & catalog
Scripts d'ingestion et d'audit
Runbooks opérationnels
État du système — horodaté
Journal des sessions de travail
Backlog et priorités
Glossaire pour tiers
Convention de mise à jour de ce document
Contact


1. Identité du projet
Nom commercial : Oparence
Nom de code interne : kakapo (historique, voir migration commit 8f94ede, 20 mai 2026)
Mission : certifier l'origine et l'intégrité de chaque source scientifique utilisée par une IA, pour que cette IA puisse opérer en secteur régulé (santé, finance, légal, pharma) face aux obligations de traçabilité — EU AI Act (2 août 2026), Chine (en vigueur depuis septembre 2025), USA (FDA / SEC / HIPAA, 2026-2027).
Stade : produit en production, premier pitch investisseur en cours, pré-amorçage.

2. Architecture & topologie
┌─────────────────────────────────────────────────────────────────────┐
│  POSTE DE DÉVELOPPEMENT (Mac)                                       │
│   - Travail sur le frontend Next.js (~/kakapo/kakapo-front/)        │
│   - git push origin main → trigger auto-deploy Vercel               │
│   - Accès AWS Console pour EC2 Instance Connect                     │
│   - Aucun secret de production stocké en local                      │
└─────────────────────────────────────────────────────────────────────┘
                            │
                            │ SSH (via AWS Console)        git push
                            ▼                              ▼
┌──────────────────────────────────────────┐    ┌────────────────────┐
│  EC2 t3.2xlarge — Région eu-west-1       │    │  GitHub            │
│  Hôte : ip-172-31-29-156                 │    │  kkpo-adil/        │
│  Utilisateur : ubuntu                    │    │  ├── kakapo-back   │
│  /home/ubuntu/                           │    │  └── kakapo-front  │
│   ├── kakapo/      (repo backend)        │    └────────────────────┘
│   ├── venv/        (Python virtualenv)   │             │
│   └── *.py         (scripts d'ingestion) │             │ auto-deploy
│                                          │             ▼
│  Rôles :                                 │    ┌────────────────────┐
│   - ingestion massive en arrière-plan    │    │  Vercel            │
│     (nohup + & survivent à la            │    │  Frontend Next.js  │
│      déconnexion)                        │    │  Région : iad1     │
│   - backfills d'intégrité                │    │  Build : turbopack │
│   - scripts d'audit                      │    │  Node : 24.x       │
└──────────────────────────────────────────┘    └────────────────────┘
                            │                            │
                            │ écriture                   │ fetch API
                            ▼                            ▼
                ┌────────────────────────────────────────────┐
                │  PostgreSQL + API FastAPI — Railway         │
                │  DATABASE_URL en .env (jamais commit)       │
                │  API : kakapo-back-production.up.railway   │
                │        .app                                 │
                │  Auto-deploy depuis kkpo-adil/kakapo-back   │
                └────────────────────────────────────────────┘
Points critiques :

L'ingestion de catalog tourne en continu sur EC2 (3M+ publications atteint, croissance ~quelques centaines / jour).
Les fingerprints multi-zone sont calculés au moment de l'ingestion et stockés en base. La table kpts est l'index public.
La base et l'API tournent sur Railway pour profiter de l'auto-scaling et du déploiement Git natif.
Le frontend Vercel ne fait aucun calcul lourd — il consomme les endpoints /demo/* du backend Railway.


3. Souveraineté & roadmap d'infrastructure
État actuel — à assumer franchement :
ComposantHébergeurPays opérationnelSouverain UEFrontendVercelUSA (région iad1 = Virginie)NonBackend APIRailwayUSANonBase de donnéesRailway PostgreSQLUSANonIngestion / scriptsAWS EC2 (eu-west-1, Irlande)UEUE physiquement, mais AWS = juridiction US (CLOUD Act)Repos codeGitHubUSANon
À documenter dans le pitch et auprès des prospects régulés : l'infrastructure de production actuelle est non-souveraine. C'est cohérent pour la phase actuelle (vélocité de développement, coût marginal nul), mais incohérent à terme avec le positionnement "infrastructure de conformité européenne".
Migration prévue — séquencée après premier client signé :
ComposantCibleJustificationCompute & ingestionOVH (ou Scaleway) — UEDatacenter UE, opérateur juridiction françaiseBase de donnéesOVH Managed PostgreSQLIdemFrontendOVH Web Cloud ou Vercel EU dédiéÀ évaluer selon performancesStockage objetOVH Object StorageIdemRepos codeGitLab self-hosted ou Forgejo sur OVHOptionnel, à arbitrer
Déclencheur de migration : premier client signé en secteur régulé UE qui demande des garanties de souveraineté contractuelles. Tant que ce déclencheur n'est pas atteint, la migration n'est pas prioritaire — elle bloquerait la vélocité produit.

4. Accès opérationnels
4.1 EC2 (backend, ingestion, scripts)
Connexion :

Console AWS → région eu-west-1 (Irlande) → EC2 → instance ip-172-31-29-156
Bouton "Connect" → onglet "EC2 Instance Connect" → "Connect"
Pas de clé SSH locale requise — l'authentification passe par les credentials AWS Console

Caractéristiques :

Type : t3.2xlarge
OS : Ubuntu 24.04.1 LTS
Région : eu-west-1
Stockage : volume EBS (taille à vérifier en console)
Note : *** System restart required *** en attente (142 updates). À planifier sur un créneau calme — surtout pas pendant une ingestion active ou avant une démo.

Configuration de session :
bashsource ~/venv/bin/activate
# OU utiliser directement
~/venv/bin/python3 <script>.py
Le venv contient : sqlalchemy, anthropic, httpx, python-dotenv, plus quelques autres. Volontairement absent : fastapi (le backend FastAPI tourne sur Railway, pas en local EC2), requests (on utilise httpx partout).
Variables d'environnement :

Fichier : /home/ubuntu/kakapo/.env
Variables clés : DATABASE_URL, ANTHROPIC_API_KEY, clés API d'ingestion
Ne jamais commit : le .gitignore du repo backend exclut .env. Vérifier régulièrement avec git status que .env n'apparaît pas comme suivi.

4.2 Railway (DB + API)
Tableau de bord : https://railway.app
Projet : kakapo-back-production
URL API publique : https://kakapo-back-production.up.railway.app
URL base de données : extraite de DATABASE_URL dans .env (host : shinkansen.proxy.rlwy.net:46821, db : railway)
Déclencheur de déploiement : push sur main du repo kkpo-adil/kakapo-back → build et déploiement automatiques (2-3 minutes)
4.3 Vercel (frontend)
Tableau de bord : https://vercel.com/kkpo-adils-projects
Team ID : team_mlX0NPUpUzXYxRIiSeTEjiVw
Slug team : kkpo-adils-projects
Projet en production :

Nom : oparence-site
Project ID : prj_CXtGQozH8IPtNTn87VaqAA20fRnp
URL publique : https://oparence-site.vercel.app
Aliases : oparence-site-kkpo-adils-projects.vercel.app
Framework : Next.js, build avec turbopack, Node 24.x
Région : iad1 (Virginie)
Repo lié : kkpo-adil/kakapo-front, branche main

Projet historique (ne plus toucher) :

Nom : kakapo-front
Project ID : prj_AntccT5cvhoyZGnDhCyMJXa74gQm
C'est le projet original avant le rebrand. Conservé pour archivage.

Déclencheur de déploiement : push sur main du repo kkpo-adil/kakapo-front → build et déploiement automatiques (2-3 minutes)
Note sur l'authentification MCP : si Claude ne peut pas accéder à Vercel via ses outils MCP, vérifier dans l'application Claude → Settings → Connectors → Vercel que la connexion est active. Au besoin, cliquer "Reconnect" et autoriser le scope kkpo-adils-projects.
4.4 GitHub

Backend : https://github.com/kkpo-adil/kakapo-back (privé)
Frontend : https://github.com/kkpo-adil/kakapo-front (privé)
Aucun token long-lived stocké en clair. L'authentification se fait par SSH (Mac) ou par token GitHub CLI (EC2).


5. Stack technique
Backend (kakapo-back)
ComposantVersion / précisionPython3.12 (venv /home/ubuntu/venv/)Framework HTTPFastAPIORMSQLAlchemy 2.0ValidationPydantic v2Client HTTPhttpx (jamais requests)ConteneurisationDocker Compose disponible mais non utilisé en production RailwayBase de donnéesPostgreSQL (Railway), SQLite pour tests (factory dialect-aware)MigrationsÀ documenter (présence d'Alembic à vérifier)Testspytest
Frontend (kakapo-front)
ComposantVersion / précisionFrameworkNext.js 15.3 (App Router)LangageTypeScriptReact18.3.1CSSTailwind CSS (config dark mode)BuildturbopackNode24.x (côté Vercel)PolicesDM Sans + JetBrains Mono (Google Fonts)EsthétiqueSombre, références : Google Scholar, GitHub, Bloomberg Terminal, Neo4j Explorer
API externes consommées

Anthropic (Claude) pour la démo Q&R
ClinicalTrials.gov API (ingestion essais)
PubMed E-utilities (ingestion publications)
EuropePMC REST API
OpenAlex API
HAL API (Open Archive française)
Crossref (à confirmer si actif)


6. Concepts produit
6.1 KPT — Knowledge Provenance Token
Certificat cryptographique attaché à chaque source scientifique. Prouve l'origine (d'où vient la source) et l'intégrité (la source n'a pas été altérée depuis l'émission du certificat).
Format d'identifiant : KPT-{8 hex}-{préfixe source}-{external_id}
Exemples :

KPT-070B9862-OA-W2982580298 (OpenAlex)
KPT-41B85BDE-EPMC-PMC12881615 (EuropePMC)
KPT-95491A1B-EPMC-PMC12955129

Préfixes de source : PMC, EPMC, OA, arXiv, CT, IKPT, HAL.
6.2 i-KPT — Indexed KPT
Variante pour publications indexées via canaux non-éditoriaux (préprints, archives ouvertes). Distinction nécessaire car le niveau d'opposabilité diffère d'un KPT éditorial certifié.
6.3 Fingerprint multi-zone
Plutôt qu'un hash unique sur le document entier, chaque source est scellée sur plusieurs zones distinctes — permettant de détecter où une altération a eu lieu, pas seulement qu'elle a eu lieu :
ZoneCouvrefp_identityMétadonnées : titre, auteurs, datefp_protocolContenu structuré (essais cliniques : interventions, outcomes)fp_outcomesRésultats / outcomesfp_narrativeRésumé / descriptionfp_canonicalEmpreinte agrégée du document
Algorithme : SHA-256, encodage UTF-8 canonique, normalisation des espaces.
6.4 Verified Operation (VO)
Unité de facturation. Pas la requête. Pas la source. L'émission d'une preuve opposable — un certificat horodaté, vérifiable, utilisable en dossier de conformité.
Justification du choix : découple Oparence du coût d'inférence. Un client ne paie pas son volume d'appels au LLM ; il paie son volume de risque réglementaire couvert.
6.5 Périmètre — ce que Oparence certifie ou non
Certifie :

Provenance (origine vérifiable de la source)
Intégrité (la source n'a pas été altérée depuis émission du KPT)
Versioning et propagation des rétractations (couche KPL)

Ne certifie pas :

La qualité du raisonnement de l'IA cliente
L'absence d'hallucination dans la réponse
La validité scientifique intrinsèque de la source

Pourquoi ce périmètre net est stratégique : ce qui se promet ici se livre. Une boîte qui promet "supprimer les hallucinations" se fait démonter sur la première erreur. Une boîte qui promet "preuve cryptographique de provenance" livre exactement ça — défendable devant un régulateur.
6.6 Business model — modèle C, option D
Phase 1 (vendable aujourd'hui) :

Corpus ouvert (PubMed, ClinicalTrials.gov, EuropePMC, OpenAlex, HAL) certifié et indexé
Zéro royalty à reverser, zéro accord éditeur nécessaire
Cible : consommateurs industriels (LLM, pharma, legal, finance), jamais les producteurs de savoir

Phase 2 (post-traction) :

Signature d'éditeurs propriétaires (Elsevier, Springer, Wiley, T&F)
Agrégation cross-éditeurs + redistribution de royalties (modèle "Spotify de la science")
Mécanique exacte de redistribution non figée — session dédiée requise

Facturation à deux étages :

Licence annuelle par périmètre (verticales, volume de catalogue, droit d'usage régulé) — récurrente, prévisible
Métrage à la Verified Operation — découplé de l'inférence

Métaphores stratégiques :

Notaire pour le positionnement confiance (vs Crossref = annuaire)
Spotify pour le business model phase 2 (catalog + streams + royalties)


7. Schéma de données & catalog
7.1 Tables principales
TableRôleVolume au 28 mai 2026publicationsCatalog d'articles ingérés3 052 047clinical_trialsEssais cliniques ingérés (ClinicalTrials.gov)153 379kptsIndex des KPT émis (1 par source)3 052 048alterationsJournal des altérations détectées19 (dont ~19 artefacts de test à purger)integrity_checksHistorique des vérifications d'intégrité—query_logsJournal des requêtes démo Q&R—
7.2 Sources d'ingestion
SourcePréfixe KPTVolumePubMed(PubMed direct)~3 MEuropePMCEPMC~27 KOpenAlexOA~6 KHALHAL~1,9 KarXiv / direct depositarXiv~31 (marginal)ClinicalTrials.govCT153 K
Sur le site public, on parle de 5 bases (PubMed, ClinicalTrials.gov, EuropePMC, OpenAlex, HAL — arXiv marginal absorbé).

8. Scripts d'ingestion et d'audit
Localisation : /home/ubuntu/ sur EC2.
ScriptRôleIdempotent ?ingest_ct_full.pyIngestion ClinicalTrials.gov (full)Oui (skip si déjà présent)ingest_pmc_bulk.pyIngestion PMC en bulkOuiingest_pmc_s3_parallel.pyIngestion PMC depuis S3 en parallèle (le plus rapide)Ouiingest_parallel.pyIngestion parallélisée multi-sourceOuiingest_new.pyIngestion d'éléments nouveauxOuiingest_ct.pyIngestion CT simple (legacy)Ouibackfill_fingerprints_ct.pyRecalcul fp_canonical des essais cliniquesOui (WHERE fp_canonical IS NULL)backfill_pub_fingerprints.pyRecalcul fingerprints des publicationsOui (WHERE fp_canonical IS NULL)backfill_fp_parallel.pyVersion parallélisée du précédentOuirefetch_ct_interventions.pyRe-fetch des essais avec interventions tronquées (PATCH 3)Une seule fois, sur liste fixekakapo_search_new.pyOutil de recherche dans le catalog (CLI)N/Adelete_indexed_batches.pyPurge de batches d'indexationDestructif — à utiliser avec prudence
Tous les scripts utilisent :

~/venv/bin/python3 (jamais le python3 système)
DATABASE_URL chargée via python-dotenv depuis /home/ubuntu/kakapo/.env
sqlalchemy + httpx


9. Runbooks opérationnels
9.1 Vérifier que le système tourne
bashcurl -s https://kakapo-back-production.up.railway.app/demo/health | jq .
# Attendu : {"anthropic_ok":true,"db_ok":true,"catalog_size":N,"clinical_trials_size":M,...,"ready_for_demo":true}
bash# Stats DB en direct (depuis EC2)
~/venv/bin/python3 -c "
import os, sys; sys.path.insert(0, '/home/ubuntu/kakapo')
from dotenv import load_dotenv; load_dotenv('/home/ubuntu/kakapo/.env')
from sqlalchemy import create_engine, text
e = create_engine(os.environ['DATABASE_URL'])
with e.connect() as c:
    for t in ['publications','clinical_trials','kpts','alterations']:
        print(t, c.execute(text(f'SELECT COUNT(*) FROM {t}')).scalar())
"
9.2 Relancer un backfill
bash# 1) Vérifier l'état actuel
ps aux | grep backfill_pub | grep -v grep && echo "--- TOURNE ENCORE ---" || echo "--- ARRETE ---"
tail -3 ~/backfill_pub.log

# 2) Si ARRETE, relancer en tâche de fond (survit à la fermeture de session)
nohup ~/venv/bin/python3 ~/backfill_pub_fingerprints.py > ~/backfill_pub.log 2>&1 &

# Note : le script reprend automatiquement où il en était (WHERE fp_canonical IS NULL).
#        Aucun risque de doublon ni de retraitement.
Même logique pour backfill_fingerprints_ct.py.
9.3 Recalculer les fingerprints d'un sous-ensemble ciblé (cas PATCH 3)
bash# Cas : on a re-fetché un lot de NCT via refetch_ct_interventions.py et on veut
# recalculer LEURS fingerprints UNIQUEMENT, sans toucher au reste.

# 1) Extraire la liste des NCT du log de re-fetch
grep -oE "NCT[0-9]+" ~/refetch_ct.log | sort -u > ~/refetched_ncts.txt
wc -l ~/refetched_ncts.txt

# 2) Charger la liste dans une table temp et remettre fp_canonical à NULL pour ces NCT
~/venv/bin/python3 << 'PYEOF'
import os, sys; sys.path.insert(0, '/home/ubuntu/kakapo')
from dotenv import load_dotenv; load_dotenv('/home/ubuntu/kakapo/.env')
from sqlalchemy import create_engine, text
e = create_engine(os.environ['DATABASE_URL'])
with open('/home/ubuntu/refetched_ncts.txt') as f:
    ncts = [l.strip() for l in f if l.strip()]
with e.begin() as c:
    c.execute(text("CREATE TEMP TABLE tmp_ncts (nct_id TEXT PRIMARY KEY)"))
    c.execute(text("INSERT INTO tmp_ncts (nct_id) VALUES " + ",".join(f"('{n}')" for n in ncts)))
    n = c.execute(text("UPDATE clinical_trials SET fp_canonical=NULL WHERE nct_id IN (SELECT nct_id FROM tmp_ncts)")).rowcount
    print(f"fp_canonical reset on {n} rows")
PYEOF

# 3) Relancer le backfill qui ne traitera que les rows à fp_canonical=NULL
nohup ~/venv/bin/python3 ~/backfill_fingerprints_ct.py > ~/backfill_fp_ct.log 2>&1 &
tail -f ~/backfill_fp_ct.log
9.4 Déployer le frontend
bash# Sur Mac, dans ~/kakapo
cd ~/kakapo
git status                          # vérifier les modifications
git add <fichiers spécifiques>      # JAMAIS git add -A si .env.local est modifié
git commit -m "<message>"
git push origin main                # Vercel auto-deploy après ce push (2-3 min)

# Suivre le déploiement
# → vercel.com/kkpo-adils-projects/oparence-site
9.5 Déployer le backend
bash# Sur EC2, dans ~/kakapo
cd ~/kakapo
git status
git add <fichiers>
git commit -m "<message>"
git push origin main                # Railway auto-deploy après ce push (2-3 min)

# Suivre le déploiement
# → railway.app dashboard
9.6 Configurer git correctement sur EC2
Actuellement, les commits faits depuis EC2 apparaissent comme ubuntu@ip-172-31-29-156 — pas idéal pour la traçabilité. À configurer une fois :
bashgit config --global user.name "Oparence Backend"
git config --global user.email "backend@oparence.io"
9.7 Préparer la migration OVH (à faire au déclencheur défini en section 3)
Procédure à formaliser une fois le déclencheur atteint. Grandes étapes prévues :

Provisionner instance OVH (VPS ou Bare Metal selon volume)
Migrer la base PostgreSQL via pg_dump / pg_restore
Migrer les scripts d'ingestion (rsync /home/ubuntu/ → OVH)
Reconfigurer les DNS pour pointer vers OVH
Conserver EC2 en backup pendant 1-2 semaines avant arrêt


10. État du système — horodaté
Mise à jour : 28 mai 2026
ComposantÉtatDétailVérifié leBackend RailwayOK/demo/health répond 200 avec ready_for_demo: true27 mai 2026 22:31 UTCFrontend VercelOKDéploiement dpl_HC2EzpGKtLWd5GWPupNzpw3aFmFH (READY, 25 mai 2026) sur oparence-site.vercel.app28 mai 2026 00:30 UTCDernier deploy frontERRORPush CLI raté le 25 mai (dpl_HDoWeCGrF8KsNHQBiHKoZyaFW3jf) — aucun impact prod, déploiement précédent toujours actif28 mai 2026Base de données RailwayOK3 052 047 publications, 153 379 essais cliniques, 3 052 048 KPT27 mai 2026 22:31 UTCIngestion EC2EN COURSCatalog croît de quelques centaines de publications par jour27 mai 2026PATCH 3 (intégrité CT)COMPLET13 655 essais re-fetchés, fingerprints recalculés, fix integrity_checker.py poussé Railway (commit 3b1b26f)25 mai 2026Repo backendOKkkpo-adil/kakapo-back, branche main, dernier commit 3b1b26f28 mai 2026Repo frontendOKkkpo-adil/kakapo-front, branche main, dernier commit c18529f "vocabulaire Spotify"28 mai 2026Branche backupCONSERVÉEbackup-c73c3fe-pre-reset (fork local avant alignement sur origin/main)28 mai 2026Document pitchVALIDÉAccroche + wedge + ask + Q&A 10 questions, prêt à présenter27 mai 2026Vercel MCP authACTIVEReconnexion effectuée 28 mai 2026 ~00:35 UTC, scope kkpo-adils-projects accessible28 mai 2026Système EC2RESTART REQUIS142 updates + 1 sécurité ESM en attente, restart à planifier hors fenêtre d'ingestion/démo27 mai 2026Souveraineté infraNON-SOUVERAINAWS + Railway + Vercel + GitHub = juridiction US. Migration OVH planifiée post-premier client UE—

11. Journal des sessions de travail
Convention : chaque session de travail majeure (> 1h ou validation de step important) est consignée ici dans l'ordre chronologique inverse (le plus récent en haut). Format : date + durée + sujet + livrables + commits associés.
2026-05-28 — Session nuit : connexion Vercel + refonte README handover
Durée : ~3 h (00:00 → 03:00 CEST)
Sujet : finaliser la session pitch précédente, débloquer l'accès Vercel pour Claude (MCP), livrer un README de niveau handover industriel.
Méthode : diagnostic Git de l'état réel des branches locales vs distantes (résolution d'une confusion entre travail local non poussé et version distante avancée). Reconnexion Vercel MCP côté compte. Audit en direct du HTML servi par oparence-site.vercel.app via web_fetch_vercel_url. Refonte du README.
Livrables :

Diagnostic confirmé que le site live est sur c18529f (version "vocabulaire Spotify") — le travail local de la session précédente était obsolète, abandonné via git reset --hard origin/main avec branche backup conservée.
Vercel MCP authentifié, scope kkpo-adils-projects accessible.
3 défauts cosmétiques résiduels identifiés sur le site (voir backlog section 12).
README refondu (version actuelle de ce document).
Commits : aucun (session de diagnostic et documentation, le commit du README sera fait en suivant).

2026-05-25 — Session PATCH 3 : correction intégrité essais cliniques
Durée : ~5 h
Sujet : éliminer 13 655 faux positifs "altered" sur les essais cliniques, causés par une troncature à 500 caractères dans ingest_ct_full.py.
Méthode :

Étape 1 — retirer la troncature [:500] dans ingest_ct_full.py (toute future ingestion = contenu complet)
Étape 2 — refetch_ct_interventions.py : re-fetch des 13 655 NCT depuis ClinicalTrials.gov (0 erreur, 0 not_found)
Étape 3 — extraction des NCT depuis ~/refetch_ct.log, création table temp, UPDATE clinical_trials SET fp_canonical=NULL WHERE nct_id IN (...), relance de backfill_fingerprints_ct.py (qui ne traite que les rows à fp_canonical IS NULL)
Étape 5 — correction de app/services/integrity_checker.py : _verify_ct_canonical reconstruit maintenant les interventions / primary_outcomes / secondary_outcomes comme objets complets {type, name, description} au lieu de simples noms
Livrables :


0 fingerprint NULL en base
Commit Railway 3b1b26f déployé en production
Reste à faire (PATCH 3 cleanup) : voir backlog section 12.

2026-05-25 — Session pitch : préparation Jean / Mistral
Durée : ~6 h
Sujet : structurer le pitch Oparence en mode "sparring Jean" (Jean de La Rochebrochard, Kima Ventures), avec re-vérification systématique des faits à la source.
Méthode : par sections, avec re-formulation jusqu'à validation. Tous les chiffres re-cherchés sur sources primaires (TechCrunch, Reuters, GVR, MaM, Precedence, Commission européenne, CAC chinois).
Livrables :

Accroche verrouillée mot-à-mot (focus 2 août 2026 + EU AI Act)
Wedge structuré fait / conséquence / preuve OpenEvidence / positionnement HTTPS
Business model en deux étages (licence + Verified Operation), corpus ouvert en phase 1, expansion éditeurs en phase 2
Ask 1 M€ / 18 mois / 3 recrutements, avec justification "pourquoi pas plus" (dilution minimale, R&D faite, Go-To-Market à financer)
Q&A : 10 questions critiques avec réponses verrouillées
Faits du wedge : OpenEvidence 12 Mds USD, retrait UE 30 avril 2026, 40 % médecins US ; EU AI Act 2 août 2026 ; Chine sept. 2025
Métaphore stratégique : "notaire" (confiance) + "Spotify" (business model)
Argument anti-éditeurs : "juge et partie, structurel"
Décisions enregistrées :
Abandonner l'agrégat "331 Mds USD" — partout, sans exception
Garder verticales chiffrées séparément (187,7 / 41 / 11 / 12, sources GVR/MaM/Precedence 2025)
Toute mention de "fenêtre 12 mois" remplacée par "à partir du 2 août 2026"
Périmètre Layer 1 (provenance ≠ raisonnement) explicité dans le pitch

2026-05-20 — Session refonte frontend niveau 3
Durée : ~4 h
Sujet : refonte complète de la home (dark mode, ticker live, 7 sections, page démo avec fallback Railway-down), rebrand KAKAPO → Oparence partout dans le front.
Commit : 8f94ede "feat(oparence): refonte complète niveau 3"
Sessions antérieures (à reconstituer si besoin)

2026-05-19 et avant : développement initial du backend (FastAPI + SQLAlchemy + PostgreSQL), du frontend (Next.js + Tailwind), de l'ingestion (5 sources), de l'algorithme de fingerprint multi-zone. Voir l'historique git pour le détail commit par commit.


12. Backlog et priorités
Priorité critique (avant tout pitch sérieux à un investisseur ou client régulé)
#SujetDétailEstimé1Session phase 2 business modelMécanique exacte de redistribution éditeurs : revenue per corpus, part éditeur, "pourquoi l'éditeur signe". Aujourd'hui non figé. Réponse de repli pour pitch : "cadré dans son principe, pas dans sa mécanique de redistribution — négocier sans clients = erreur que je refuse de faire".1 session ~3 h2Session eIDAS / horodatage qualifiéIntégrer un QTSP (Universign, Lex Persona, DigiCert) pour transformer le KPT de "preuve technique" en "preuve juridiquement opposable" (cadre eIDAS). Roadmap conformité V2 post-seed.1 session ~3 h3Discovery commercialConversations avec IP directors / quality managers en CRO et labos privés pour valider willingness-to-pay avant scaling sales. Pas de levée sans validation commerciale en amont.Variable
Priorité haute (court terme, audit cleanup)
#SujetDétailEstimé4Purger les 19 fausses "altered"Artefacts de tests d'audit dans la table alterations. À nettoyer pour avoir un état propre.30 min5Re-tester les 8 KPT CT identifiés "altered"Maintenant que PATCH 3 est complet et le fix integrity_checker.py en prod, viser 8/8 verified.30 min6Investiguer la publication avec 2 KPTRelation 1:1 attendue entre publication et KPT. À comprendre puis corriger.1 h7kpts.metadata_json vide partoutColonne vide {} sur 3M lignes. Soit l'enrichir, soit la supprimer. À arbitrer.1 h8publications.submitted_at futuresCertaines dates de soumission semblent dans le futur. À investiguer.30 min
Priorité moyenne (frontend, polissage avant pitch)
#SujetDétailEstimé9Wedge section 01 — retirer "explosent" et "12 mois"Aligner sur le pitch oral. Garder l'ancrage dur 2 août 2026, pas un chiffre arbitraire.15 min10Liste "Aujourd'hui sans Oparence" — retirer "Hallucinations bloquantes"Contradictoire avec le positionnement Layer 1 (provenance ≠ raisonnement).5 min11Carte régulateur Chine — corriger "Actif depuis 2023" → "septembre 2025"Fait vérifié à la source (CAC, GB 45438-2025).5 min
Priorité basse (infra, organisation)
#SujetDétailEstimé12Configurer git correctement sur EC2git config --global user.name / user.email (sinon commits = ubuntu@ip-...)5 min13Planifier le restart système EC2142 updates + 1 ESM en attente. Hors fenêtre d'ingestion/démo.30 min14Documentation OpenAPI/Swagger du backendVérifier que /docs du backend est complet et propre, accessible publiquement ou non selon politique.1 h15Préparer la migration OVHÉtude technique, devis, plan de migration. Déclencheur = premier client UE signé avec exigence souveraineté.1 jour étude

13. Glossaire pour tiers
TermeDéfinition courteOparenceNom commercial du projet. Infrastructure de provenance scientifique pour les IA en secteurs régulés.kakapoNom de code interne historique (avant rebrand mai 2026). Encore visible dans certains noms de repo et chemins de dossiers.KPTKnowledge Provenance Token. Certificat cryptographique attestant l'origine et l'intégrité d'une source scientifique.i-KPTKPT indexé (vs éditorial certifié). Préfixe pour publications issues de canaux non-éditoriaux.KPLKnowledge Provenance Layer. Couche de versioning et de propagation des rétractations.VOVerified Operation. Unité de facturation = émission d'une preuve opposable.Fingerprint multi-zoneHash SHA-256 par zone (identity, protocol, outcomes, narrative, canonical) plutôt qu'un hash unique. Permet de localiser une altération.Layer 1Périmètre de certification d'Oparence : provenance et intégrité. Exclut explicitement le raisonnement de l'IA.BackfillRecalcul d'une propriété (typiquement un fingerprint) sur des rows existantes, idempotent via WHERE ... IS NULL.EU AI ActRèglement européen sur l'IA. Obligations sur IA à haut risque (dont traçabilité des sources) en vigueur le 2 août 2026.eIDASRèglement européen sur l'identification électronique et les services de confiance. Cadre des prestataires de service de confiance qualifiés (QTSP).QTSPQualified Trust Service Provider. Organisme habilité à fournir des horodatages qualifiés au sens eIDAS.

14. Convention de mise à jour de ce document
Règle : à chaque session de travail terminée OU à chaque step important validé, mettre à jour ce README. Sans exception.
Procédure :

Ouvrir README.md à la racine du repo kkpo-adil/kakapo-front — c'est ici que vit le README maître.
Ajouter une entrée datée en haut de la section 11. Journal des sessions de travail, avec : date + durée + sujet + méthode + livrables + commits associés.
Mettre à jour la section 10. État du système — horodaté : nouvelles dates de vérification, nouveaux chiffres, nouveaux statuts.
Mettre à jour la section 12. Backlog et priorités : marquer comme faits les items terminés, ajouter de nouveaux items s'il y en a.
Commit + push :

bash   cd ~/kakapo
   git add README.md
   git commit -m "docs: update README — session <YYYY-MM-DD> <sujet>"
   git push origin main
Pourquoi c'est non-négociable : ce projet est piloté par une IA (Claude) dont la mémoire est non-persistante entre sessions. Sans journal écrit en clair dans le repo, la mémoire institutionnelle disparaît à chaque reset. Le README EST la mémoire institutionnelle.
Format imposé pour chaque nouvelle entrée du journal :
markdown### YYYY-MM-DD — <sujet court>

**Durée** : ~Xh
**Sujet** : <description en 1-2 phrases>
**Méthode** : <approche utilisée, outils, références sources>
**Livrables :**
- <bullet 1>
- <bullet 2>
**Commits** : <SHA + message court>, OU "aucun (session de diagnostic)"
**Reste à faire** : <bullet, OU "rien" si la session est entièrement bouclée>

15. Contact
Pour toute question opérationnelle, technique, ou commerciale, contacter le founder via les canaux internes du repo.
Identifiants détaillés et coordonnées personnelles : volontairement non listés ici pour permettre le partage du document avec des tiers (prospects, futurs développeurs, partenaires) sans exposer le profil du founder.

Document maintenu manuellement. Dernière mise à jour : 28 mai 2026, ~03:00 CEST. Voir section 11 pour le journal complet.