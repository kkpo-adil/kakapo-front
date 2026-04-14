import type { Publication } from "@/types/api";
import { formatDate, getSourceLabel, parseAuthors } from "@/lib/utils";

interface PublicationMetaProps {
  publication: Publication;
}

export function PublicationMeta({ publication }: PublicationMetaProps) {
  const authors = parseAuthors(publication.authors_raw);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">

      <div>
        <p className="field-label">Source</p>
        <p className="text-sm text-text-primary">{getSourceLabel(publication.source)}</p>
      </div>

      <div>
        <p className="field-label">Date de soumission</p>
        <p className="text-sm text-text-primary font-mono">
          {formatDate(publication.submitted_at ?? publication.created_at)}
        </p>
      </div>

      {publication.doi && (
        <div className="sm:col-span-2">
          <p className="field-label">DOI</p>
          <a
            href={`https://doi.org/${publication.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono text-accent hover:text-accent-hover break-all"
          >
            {publication.doi}
          </a>
        </div>
      )}

      {authors.length > 0 && (
        <div className="sm:col-span-2">
          <p className="field-label">Auteurs</p>
          <div className="flex flex-wrap gap-2">
            {authors.map((author, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 text-xs bg-surface-3 border border-border rounded px-2 py-1"
              >
                <span className="text-text-primary">{author.name}</span>
                {author.orcid && (
                  <a
                    href={`https://orcid.org/${author.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xs font-mono text-accent hover:text-accent-hover"
                    title={`ORCID: ${author.orcid}`}
                  >
                    ORCID ↗
                  </a>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {publication.institution_raw && (
        <div className="sm:col-span-2">
          <p className="field-label">Institution</p>
          <p className="text-sm text-text-primary">{publication.institution_raw}</p>
        </div>
      )}

      {publication.file_hash && (
        <div className="sm:col-span-2">
          <p className="field-label">Hash SHA-256</p>
          <span className="hash-display text-2xs">{publication.file_hash}</span>
        </div>
      )}
    </div>
  );
}
