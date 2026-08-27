import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PROFILE } from "../data/profile";
import { projectBySlug } from "../data/projects";

const SECTIONS = [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
];

/** Which home section is in view, so the bar can mark it. */
function useActiveSection(enabled: boolean) {
    const [active, setActive] = useState("");

    useEffect(() => {
        if (!enabled) {
            setActive("");
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) => b.intersectionRatio - a.intersectionRatio,
                    )[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
        );

        for (const { id } of SECTIONS) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [enabled]);

    return active;
}

/** How far down the document the reader is, 0–1. */
function useScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let frame = 0;

        const measure = () => {
            frame = 0;
            const max =
                document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(measure);
        };

        measure();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return progress;
}

/**
 * The console bar: a fixed strip along the bottom edge carrying the wordmark,
 * numbered section jumps and a status cell.
 *
 * It sits at the bottom rather than the top so it never competes with the
 * page's own headings, and the numbers are the sections' order down the page
 * — the same order the bar reads left to right.
 */
export function ConsoleBar() {
    const { pathname } = useLocation();
    const onHome = pathname === "/";
    const active = useActiveSection(onHome);
    const progress = useScrollProgress();

    const projectSlug = pathname.startsWith("/projects/")
        ? pathname.slice("/projects/".length)
        : undefined;
    const project = projectSlug ? projectBySlug(projectSlug) : undefined;

    return (
        <nav className="console" aria-label="Site">
            <div
                className="console-progress"
                style={{ width: `${progress * 100}%` }}
                aria-hidden="true"
            />

            <div className="console-cell">
                <Link
                    to="/"
                    className="mono text-xs tracking-[0.08em] whitespace-nowrap uppercase transition-colors hover:[color:var(--accent)]"
                >
                    <span className="sm:hidden">{PROFILE.shortName}</span>
                    <span className="hidden sm:inline">{PROFILE.name}</span>
                </Link>
            </div>

            {project ? (
                <>
                    <div className="console-cell">
                        <Link to="/#work" className="console-link">
                            <ArrowLeft size={13} aria-hidden="true" />
                            All work
                        </Link>
                    </div>
                    <div className="console-cell min-w-0 flex-1">
                        <span className="accent-text mono truncate text-xs">
                            {project.name}
                        </span>
                    </div>
                    <div className="console-cell hidden border-r-0 sm:flex">
                        <span className="label">{project.platform}</span>
                    </div>
                </>
            ) : (
                <>
                    <div className="console-cell flex-1 gap-6 overflow-x-auto sm:gap-8">
                        {SECTIONS.map((section, i) => (
                            <Link
                                key={section.id}
                                to={`/#${section.id}`}
                                className="console-link"
                                data-active={active === section.id}
                            >
                                <span className="console-index mono">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                {section.label}
                            </Link>
                        ))}
                    </div>
                    <div className="console-cell hidden border-r-0 gap-2.5 lg:flex">
                        <span
                            className="accent-dot h-1.5 w-1.5 rounded-full"
                            aria-hidden="true"
                        />
                        <span className="label">Open to work</span>
                    </div>
                </>
            )}
        </nav>
    );
}
