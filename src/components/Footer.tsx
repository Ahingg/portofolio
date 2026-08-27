import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../data/profile";

const ICONS = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

export function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-8 border-t border-line-soft pt-16 pb-14"
    >
      <div className="container-page">
        <p className="label">Contact</p>
        <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-semibold sm:text-4xl">
          Open to iOS and software engineering roles.
        </h2>
        <p className="prose-measure mt-4 text-muted">
          Currently at the Apple Developer Academy through December 2026, and
          available for internships, part-time work and collaboration alongside
          it.
        </p>

        <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {PROFILE.links.map((link) => {
            const Icon = ICONS[link.icon];
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center justify-between gap-4 bg-ink px-5 py-4 transition-colors hover:bg-surface"
                >
                  <span className="flex items-center gap-3">
                    <Icon
                      size={16}
                      aria-hidden="true"
                      className="text-faint transition-colors group-hover:[color:var(--accent)]"
                    />
                    <span className="text-sm font-medium">{link.label}</span>
                  </span>
                  <span className="mono truncate text-xs text-muted">
                    {link.value}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p className="mono mt-12 text-xs text-faint">
          © {new Date().getFullYear()} {PROFILE.name} · Built with React,
          TypeScript and Vite
        </p>
      </div>
    </footer>
  );
}
