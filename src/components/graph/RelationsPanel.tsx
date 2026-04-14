"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Publication, TrustScore } from "@/types/api";
import { getTrustColor, formatScore, getSourceLabel, formatAuthors } from "@/lib/utils";

interface Node {
  id: string;
  title: string;
  score: number;
  source: string | null;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface RelationsPanelProps {
  publications: Publication[];
  scores: TrustScore[];
}

const W = 800;
const H = 480;
const NODE_R = 18;
const CENTER_X = W / 2;
const CENTER_Y = H / 2;

function initNodes(publications: Publication[], scores: TrustScore[]): Node[] {
  // P0: guard against empty array (division by zero in angle calc)
  if (publications.length === 0) return [];

  const scoreMap = new Map(scores.map((s) => [s.publication_id, s.score]));

  return publications.map((pub, i) => {
    const count  = publications.length;
    const angle  = (2 * Math.PI * i) / count - Math.PI / 2;
    const radius = count === 1 ? 0 : 160;
    return {
      id:     pub.id,
      title:  pub.title,
      score:  scoreMap.get(pub.id) ?? 0,
      source: pub.source,
      x:      CENTER_X + radius * Math.cos(angle),
      y:      CENTER_Y + radius * Math.sin(angle),
      vx:     0,
      vy:     0,
    };
  });
}

export function RelationsPanel({ publications, scores }: RelationsPanelProps) {
  const [nodes, setNodes]       = useState<Node[]>(() => initNodes(publications, scores));
  const [selected, setSelected] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const svgRef                  = useRef<SVGSVGElement>(null);
  const rafRef                  = useRef<number>(0);

  // Simple repulsion + centering force — stops after 3 s to save CPU
  const tick = useCallback(() => {
    setNodes((prev) => {
      const next = prev.map((n) => ({ ...n }));
      for (const a of next) {
        let fx = (CENTER_X - a.x) * 0.01;
        let fy = (CENTER_Y - a.y) * 0.01;
        for (const b of next) {
          if (a.id === b.id) continue;
          const dx   = a.x - b.x;
          const dy   = a.y - b.y;
          const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const force = 2400 / (dist * dist);
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }
        a.vx = (a.vx + fx) * 0.6;
        a.vy = (a.vy + fy) * 0.6;
        a.x  = Math.max(NODE_R + 2, Math.min(W - NODE_R - 2, a.x + a.vx));
        a.y  = Math.max(NODE_R + 2, Math.min(H - NODE_R - 2, a.y + a.vy));
      }
      return next;
    });
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (nodes.length === 0) return;
    rafRef.current = requestAnimationFrame(tick);
    const stop = setTimeout(() => cancelAnimationFrame(rafRef.current), 3000);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(stop);
    };
  }, [tick, nodes.length]);

  function handleMouseDown(id: string) {
    setDragging(id);
    setSelected(id);
    cancelAnimationFrame(rafRef.current);
  }

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!dragging || !svgRef.current) return;
    const rect   = svgRef.current.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const x      = (e.clientX - rect.left) * scaleX;
    const y      = (e.clientY - rect.top)  * scaleY;
    setNodes((prev) =>
      prev.map((n) => n.id === dragging ? { ...n, x, y, vx: 0, vy: 0 } : n)
    );
  }

  function handleMouseUp() {
    setDragging(null);
  }

  const selectedPub  = publications.find((p) => p.id === selected);
  const selectedNode = nodes.find((n) => n.id === selected);

  if (publications.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 border border-border rounded-md bg-surface-0">
        <p className="text-sm text-text-muted font-mono">Aucune publication à afficher.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-start">
        {/* SVG Graph */}
        <div className="flex-1 border border-border rounded-md bg-surface-0 overflow-hidden">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            className="w-full select-none"
            style={{ cursor: dragging ? "grabbing" : "default" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e2535" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width={W} height={H} fill="url(#grid)" />

            {/* Edges from center hub to each node */}
            {nodes.map((n) => (
              <line
                key={`edge-${n.id}`}
                x1={CENTER_X} y1={CENTER_Y}
                x2={n.x}      y2={n.y}
                stroke="#2a3349"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Central hub */}
            <circle cx={CENTER_X} cy={CENTER_Y} r={6} fill="#3b6fd4" opacity={0.5} />

            {/* Nodes */}
            {nodes.map((node) => {
              const color      = getTrustColor(node.score);
              const isSelected = node.id === selected;
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x},${node.y})`}
                  style={{ cursor: "grab" }}
                  onMouseDown={() => handleMouseDown(node.id)}
                >
                  {isSelected && (
                    <circle r={NODE_R + 5} fill="none" stroke={color} strokeWidth="1" opacity={0.4} />
                  )}
                  <circle
                    r={NODE_R}
                    fill="#161b27"
                    stroke={color}
                    strokeWidth={isSelected ? 2 : 1.5}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="8"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="500"
                    fill={color}
                  >
                    {formatScore(node.score)}
                  </text>
                  <text
                    y={NODE_R + 10}
                    textAnchor="middle"
                    fontSize="7"
                    fontFamily="JetBrains Mono, monospace"
                    fill="#4a5568"
                  >
                    {getSourceLabel(node.source as Parameters<typeof getSourceLabel>[0])}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div className="w-64 flex-shrink-0 hidden lg:block">
          {selectedPub && selectedNode ? (
            <div className="border border-border rounded-md bg-surface-2 p-4 space-y-3 animate-fade-in">
              <div>
                <p className="field-label">Publication</p>
                <Link
                  href={`/publications/${selectedPub.id}`}
                  className="text-xs text-text-primary hover:text-accent leading-snug line-clamp-3"
                >
                  {selectedPub.title}
                </Link>
              </div>
              <div>
                <p className="field-label">Score</p>
                <span className="text-sm font-mono" style={{ color: getTrustColor(selectedNode.score) }}>
                  {formatScore(selectedNode.score)}
                </span>
              </div>
              <div>
                <p className="field-label">Source</p>
                <span className="text-xs text-text-secondary">
                  {getSourceLabel(selectedPub.source)}
                </span>
              </div>
              <div>
                <p className="field-label">Auteurs</p>
                <span className="text-xs text-text-secondary">
                  {formatAuthors(selectedPub.authors_raw)}
                </span>
              </div>
              <Link
                href={`/publications/${selectedPub.id}`}
                className="block text-center text-2xs font-mono border border-accent/30 rounded px-3 py-1.5 text-accent hover:bg-accent/10 transition-colors mt-2 no-underline"
              >
                Voir la fiche →
              </Link>
            </div>
          ) : (
            <div className="border border-border rounded-md bg-surface-2 p-4 flex items-center justify-center h-32">
              <p className="text-2xs font-mono text-text-muted text-center">
                Cliquez sur un nœud pour voir les détails
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 flex-wrap px-1">
        <p className="text-2xs font-mono text-text-muted">Score de fiabilité :</p>
        {[
          { color: "#22c55e", label: "≥ 70% — Élevée" },
          { color: "#f59e0b", label: "40–70% — Modérée" },
          { color: "#ef4444", label: "< 40% — Faible" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-2xs font-mono text-text-muted">{label}</span>
          </div>
        ))}
        <p className="text-2xs font-mono text-text-muted ml-auto hidden sm:block">
          Glisser les nœuds pour réorganiser
        </p>
      </div>
    </div>
  );
}
