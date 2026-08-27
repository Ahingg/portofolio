import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PROJECTS, projectBySlug } from "../data/projects";
import { DeviceFrame } from "../components/DeviceFrame";
import { Reveal } from "../components/Reveal";
import { useAccent } from "../hooks/useAccent";
import { RichText } from "../components/RichText";
import { Footer } from "../components/Footer";

/** Key/value row in the spec table. */
function Spec({ term, children }: { term: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1 border-b border-line-soft py-3.5 sm:flex-row sm:gap-6 sm:py-3">
            <dt className="label shrink-0 sm:w-32 sm:pt-0.5">{term}</dt>
            <dd className="text-sm text-muted">{children}</dd>
        </div>
    );
}

export default function ProjectPage() {
    const { slug } = useParams<{ slug: string }>();
    const project = slug ? projectBySlug(slug) : undefined;

    // Takes over the root variable, so the console bar shifts with the page.
    useAccent(project?.accent);

    if (!project) {
        return <Navigate to="/" replace />;
    }

    const index = PROJECTS.findIndex((p) => p.slug === project.slug);
    const next = PROJECTS[(index + 1) % PROJECTS.length];
    const gallery = project.shots;
    /** Phone shots read better in a tighter grid than tablet or desktop ones. */
    const galleryCols =
        gallery[0]?.device === "iphone"
            ? "sm:grid-cols-2 lg:grid-cols-3"
            : "lg:grid-cols-2";

    return (
        <>
            <div className="container-page py-10">
                <Link
                    to="/#work"
                    className="mono inline-flex items-center gap-2 text-xs text-muted transition-colors hover:[color:var(--accent)]"
                >
                    <ArrowLeft size={14} aria-hidden="true" />
                    All work
                </Link>

                <header className="mt-10">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="accent-text mono text-sm">
                            {project.year}
                        </span>
                        <span className="label">{project.platform}</span>
                        {project.status && (
                            <span className="accent-text accent-ring mono rounded-full border px-2.5 py-0.5 text-[0.6875rem]">
                                {project.status}
                            </span>
                        )}
                    </div>

                    <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,4.5rem)] leading-[0.95] font-semibold">
                        {project.name}
                    </h1>
                    <p className="prose-measure mt-5 text-lg leading-relaxed text-muted">
                        {project.tagline}
                    </p>

                    {project.links.length > 0 && (
                        <div className="mt-8 flex flex-wrap gap-3">
                            {project.links.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm transition-colors hover:[border-color:color-mix(in_oklab,var(--accent)_55%,transparent)] hover:[color:var(--accent)]"
                                >
                                    {link.label}
                                    <ArrowUpRight
                                        size={15}
                                        aria-hidden="true"
                                        className="text-faint transition-colors group-hover:[color:var(--accent)]"
                                    />
                                </a>
                            ))}
                        </div>
                    )}
                </header>
            </div>

            {/* Spec table + overview */}
            <section className="border-t border-line-soft py-14">
                <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
                    <Reveal>
                        <div className="prose-measure text-[1.0625rem] leading-relaxed text-muted">
                            {project.summary.map((paragraph) => (
                                <p key={paragraph.slice(0, 24)}>
                                    <RichText text={paragraph} />
                                </p>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal index={1}>
                        <dl className="border-t border-line-soft">
                            <Spec term="Role">{project.role}</Spec>
                            <Spec term="Type">{project.kind}</Spec>
                            <Spec term="Period">
                                <span className="mono">{project.period}</span>
                            </Spec>
                            {project.contribution && (
                                <Spec term="Contribution">
                                    <span className="mono">
                                        {project.contribution}
                                    </span>
                                </Spec>
                            )}
                        </dl>
                    </Reveal>
                </div>
            </section>

            {/* Gallery */}
            <section className="border-t border-line-soft py-14">
                <div className="container-page">
                    <Reveal>
                        <p className="label">Screens</p>
                    </Reveal>
                    <div className={`mt-8 grid gap-8 ${galleryCols}`}>
                        {gallery.map((shot, i) => (
                            <Reveal key={shot.caption + i} index={i}>
                                <DeviceFrame shot={shot} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights */}
            {project.highlights.length > 0 && (
                <section className="border-t border-line-soft py-14">
                    <div className="container-page">
                        <Reveal>
                            <p className="label">How it works</p>
                        </Reveal>
                        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
                            {project.highlights.map((highlight, i) => (
                                <article
                                    key={highlight.title}
                                    /* An odd final card spans the row so the grid
                                   never leaves a bare cell showing through. */
                                    className={`flex flex-col gap-3 bg-ink p-6 ${
                                        i === project.highlights.length - 1 &&
                                        project.highlights.length % 2 === 1
                                            ? "md:col-span-2"
                                            : ""
                                    }`}
                                >
                                    <Reveal index={i}>
                                        <h2 className="font-display text-lg font-semibold">
                                            {highlight.title}
                                        </h2>
                                        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted">
                                            <RichText text={highlight.body} />
                                        </p>
                                    </Reveal>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Stack */}
            <section className="border-t border-line-soft py-14">
                <div className="container-page">
                    <Reveal>
                        <p className="label">Stack</p>
                    </Reveal>
                    <div className="mt-8 flex flex-col gap-7">
                        {project.stack.map((group, i) => (
                            <Reveal key={group.group} index={i}>
                                <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                                    <p className="mono shrink-0 text-sm text-faint sm:w-36 sm:pt-1">
                                        {group.group}
                                    </p>
                                    <ul className="flex flex-wrap gap-2">
                                        {group.items.map((item) => (
                                            <li
                                                key={item}
                                                className="rounded-full border border-line bg-surface px-3 py-1 text-[0.8125rem] text-muted"
                                            >
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Next */}
            <section className="border-t border-line-soft py-14">
                <Link
                    to={`/projects/${next.slug}`}
                    className="container-page group flex items-center justify-between gap-6"
                >
                    <span>
                        <span className="label">Next project</span>
                        <span className="mt-2 block font-display text-3xl font-semibold transition-colors group-hover:[color:var(--accent)] sm:text-4xl">
                            {next.name}
                        </span>
                    </span>
                    <ArrowUpRight
                        size={28}
                        aria-hidden="true"
                        className="shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:[color:var(--accent)]"
                    />
                </Link>
            </section>

            <Footer />
        </>
    );
}
