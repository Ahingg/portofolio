import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ImageOff } from "lucide-react";
import type { Project } from "../data/types";
import { Reveal } from "./Reveal";

/** Flattened stack list, capped so a row stays scannable. */
function topStack(project: Project, limit = 5): string[] {
  return project.stack.flatMap((g) => g.items).slice(0, limit);
}

function firstImage(project: Project): string | null {
  return project.shots.find((s) => s.src)?.src ?? project.logo ?? null;
}

function IndexRow({ project, index }: { project: Project; index: number }) {
  const thumb = firstImage(project);

  return (
    <Reveal index={index}>
      <Link
        to={`/projects/${project.slug}`}
        /* Scoped, not global: the row tints itself on hover without
                   the whole page flickering as the cursor crosses the list. */
        style={{ "--accent": project.accent } as CSSProperties}
        className="index-row group grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-4 px-1 py-7 sm:px-3 md:grid-cols-[7rem_1fr_auto] md:gap-x-8 md:py-8 lg:grid-cols-[8rem_1fr_7rem_auto]"
      >
        {/* Metadata column — real data, which is what gets scanned first. */}
        <div className="order-2 flex flex-row items-center gap-3 md:order-1 md:flex-col md:items-start md:gap-1.5 md:pt-1">
          <span className="accent-text mono text-sm">{project.year}</span>
          <span className="label md:leading-relaxed">{project.platform}</span>
        </div>

        <div className="order-1 min-w-0 md:order-2">
          <h3 className="font-display text-2xl leading-tight font-semibold transition-colors group-hover:[color:var(--accent)] md:text-[1.75rem]">
            {project.name}
          </h3>
          <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
            {project.tagline}
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
            {topStack(project).map((item) => (
              <li
                key={item}
                className="mono rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] text-faint"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Thumbnail — hidden on small screens where it would crowd the row. */}
        <div className="order-3 hidden lg:block">
          {thumb ? (
            <img
              src={thumb}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-24 w-full rounded-md border border-line bg-surface object-cover object-center opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            />
          ) : (
            <div className="slot flex h-24 w-full items-center justify-center rounded-md">
              <ImageOff size={16} className="text-faint" aria-hidden="true" />
            </div>
          )}
        </div>

        <ArrowUpRight
          size={20}
          aria-hidden="true"
          className="order-4 mt-1 hidden shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:[color:var(--accent)] md:block"
        />
      </Link>
    </Reveal>
  );
}

/**
 * The work index. Presented as a list rather than a card grid: a recruiter
 * scanning for "has this person shipped iOS" reads a column of years and
 * platforms far faster than a wall of thumbnails.
 */
export function WorkIndex({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="flex flex-col">
      <div className="border-b border-line-soft">
        {featured.map((project, i) => (
          <IndexRow key={project.slug} project={project} index={i} />
        ))}
      </div>

      {rest.length > 0 && (
        <>
          <Reveal>
            <p className="label pt-12 pb-1">
              Earlier work — web, backend and games
            </p>
          </Reveal>
          {/* No closing rule: the next section's own top border
                        would double up with it. */}
          <div>
            {rest.map((project, i) => (
              <IndexRow key={project.slug} project={project} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
