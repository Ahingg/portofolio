import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../data/profile";

const SECTIONS = [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
];

const ICONS = {
    mail: Mail,
    github: Github,
    linkedin: Linkedin,
    instagram: Instagram,
};

/** Tracks which home section is in view, so the rail can mark it. */
function useActiveSection(enabled: boolean) {
    const [active, setActive] = useState<string>("");

    useEffect(() => {
        if (!enabled) {
            setActive("");
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible) setActive(visible.target.id);
            },
            { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
        );

        for (const { id } of SECTIONS) {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, [enabled]);

    return active;
}

/**
 * Persistent navigation. A vertical rail on wide screens — it keeps the name
 * and the contact routes on screen the whole way down without a floating pill
 * over the content — and a compact top bar below `lg`.
 */
export function Rail() {
    const { pathname } = useLocation();
    const onHome = pathname === "/";
    const active = useActiveSection(onHome);

    const navItems = SECTIONS.map(({ id, label }) => (
        <Link
            key={id}
            to={`/#${id}`}
            className={`mono text-[0.8125rem] transition-colors hover:text-fg ${
                active === id ? "text-accent" : "text-muted"
            }`}
        >
            {label}
        </Link>
    ));

    return (
        <>
            {/* Wide screens: fixed left rail */}
            <aside className="fixed top-0 left-0 z-40 hidden h-screen w-56 flex-col justify-between border-r border-line-soft px-7 py-8 lg:flex xl:w-64">
                <div className="flex flex-col gap-10">
                    <Link to="/" className="group block">
                        <span className="block font-display text-lg leading-tight font-semibold">
                            {PROFILE.shortName}
                            <span className="text-accent">.</span>
                        </span>
                        <span className="label mt-1 block">
                            {PROFILE.role.split(" & ")[0]}
                        </span>
                    </Link>

                    <nav
                        aria-label="Sections"
                        className="flex flex-col items-start gap-3"
                    >
                        {navItems}
                    </nav>
                </div>

                <div className="flex flex-col gap-4">
                    <p className="label">Elsewhere</p>
                    <ul className="flex flex-col gap-3">
                        {PROFILE.links.map((link) => {
                            const Icon = ICONS[link.icon];
                            return (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="flex items-center gap-2.5 text-sm text-muted transition-colors hover:text-accent"
                                    >
                                        <Icon size={15} aria-hidden="true" />
                                        {link.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>

            {/* Narrow screens: top bar */}
            <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line-soft bg-ink/85 px-5 py-3.5 backdrop-blur-md lg:hidden">
                <Link
                    to="/"
                    className="font-display text-base font-semibold tracking-tight"
                >
                    {PROFILE.shortName}
                    <span className="text-accent">.</span>
                </Link>
                <nav aria-label="Sections" className="flex items-center gap-5">
                    {navItems}
                </nav>
            </header>
        </>
    );
}
