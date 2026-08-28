import { motion, useReducedMotion } from "framer-motion";
import { PROFILE } from "../data/profile";
import { PROJECTS } from "../data/projects";
import { WorkIndex } from "../components/WorkIndex";
import { HeroDevices } from "../components/HeroDevices";
import { Skyline } from "../components/Skyline";
import { Reveal } from "../components/Reveal";
import { Footer } from "../components/Footer";

/**
 * The hero is the one section composed asymmetrically: the name steps down and
 * inward one line at a time, the role and statement indent past it, and the
 * device stack hangs lower than the type block. Everything below keeps the
 * straight editorial column.
 *
 * The console flourishes — prompt glyph, blinking caret, grid sparks, scan
 * line — live here only, so the terminal register stays an accent rather than
 * a costume.
 */
function Hero() {
    const reduced = useReducedMotion();
    const words = PROFILE.name.split(" ");

    return (
        <section
            id="hero"
            className="relative flex min-h-[min(48rem,calc(100svh-var(--console-h)))] items-center overflow-hidden pb-24 py-6"
        >
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-wash" aria-hidden="true" />

            {/* Cells of the background grid lighting up in sequence, and a
                slow scan line drifting down — the digital half of the vibe. */}
            <div aria-hidden="true" className="hidden md:block">
                <span
                    className="grid-spark"
                    style={{ left: "11rem", top: "5.5rem" }}
                />
                <span
                    className="grid-spark"
                    style={{
                        left: "27.5rem",
                        top: "16.5rem",
                        animationDelay: "2.6s",
                    }}
                />
                <span
                    className="grid-spark"
                    style={{
                        left: "49.5rem",
                        top: "11rem",
                        animationDelay: "5.1s",
                    }}
                />
                <span
                    className="grid-spark"
                    style={{
                        left: "16.5rem",
                        top: "27.5rem",
                        animationDelay: "7.3s",
                    }}
                />
            </div>
            <div className="hero-scan" aria-hidden="true" />

            {/* Sakanade: the town overhead, sky beneath it. */}
            <Skyline inverted className="skyline-top hidden lg:flex" />

            <div className="container-page relative">
                <div className="grid gap-y-16 lg:grid-cols-12 lg:items-center lg:gap-x-8">
                    <div className="lg:col-span-12 xl:col-span-7">
                        <motion.p
                            className="label"
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {PROFILE.location}
                        </motion.p>

                        <h1 className="mt-6 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.92] font-medium tracking-[-0.03em]">
                            {words.map((word, i) => (
                                <motion.span
                                    key={word}
                                    /* Each word on its own line, indented one
                                       step further than the last. */
                                    className="block"
                                    style={{ marginLeft: `${i * 1.6}rem` }}
                                    initial={
                                        reduced ? false : { opacity: 0, y: 24 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.08 + i * 0.09,
                                        ease: [0.22, 0.61, 0.36, 1],
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.p
                            className="accent-text mono caret-blink mt-10 text-sm tracking-[0.12em] uppercase sm:ml-[3.2rem]"
                            initial={reduced ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.45 }}
                        >
                            <span className="text-faint" aria-hidden="true">
                                &gt;{" "}
                            </span>
                            {PROFILE.role}
                        </motion.p>

                        <motion.p
                            className="mt-8 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted sm:ml-[3.2rem]"
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            {PROFILE.statement}
                        </motion.p>

                        <motion.dl
                            className="mt-14 flex flex-wrap gap-x-14 gap-y-6"
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.75 }}
                        >
                            <div>
                                <dt className="label">Currently</dt>
                                <dd className="mt-2 text-sm">
                                    {PROFILE.academy.title},{" "}
                                    {PROFILE.academy.org}
                                </dd>
                                <dd className="mono mt-1 text-xs text-faint">
                                    {PROFILE.academy.period}
                                </dd>
                            </div>
                            <div>
                                <dt className="label">Studying</dt>
                                <dd className="mt-2 text-sm">
                                    {PROFILE.education.title},{" "}
                                    {PROFILE.education.org}
                                </dd>
                                <dd className="mono mt-1 text-xs text-faint">
                                    {PROFILE.education.place}
                                </dd>
                            </div>
                        </motion.dl>
                    </div>

                    {/* Hangs lower than the type block rather than centring
                        against it, so the two halves do not read as a pair of
                        matched columns. */}
                    <motion.div
                        className="hidden xl:col-span-5 xl:col-start-8 xl:mt-24 xl:block"
                        initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0.22, 0.61, 0.36, 1],
                        }}
                    >
                        <HeroDevices />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function About() {
    return (
        <section
            id="about"
            className="scroll-mt-8 border-t border-line-soft py-20"
        >
            <div className="container-page">
                <Reveal>
                    <p className="label">About</p>
                </Reveal>

                <div className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
                    <div>
                        <Reveal>
                            <div className="prose-measure text-[1.0625rem] leading-relaxed text-muted">
                                {PROFILE.bio.map((paragraph) => (
                                    <p key={paragraph.slice(0, 24)}>
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </Reveal>

                        <div className="mt-12 flex flex-col gap-8">
                            {PROFILE.skills.map((group, i) => (
                                <Reveal key={group.group} index={i}>
                                    <div>
                                        <p className="label">{group.group}</p>
                                        <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
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

                    <Reveal index={1}>
                        <div className="flex flex-col gap-5">
                            <img
                                src="/img/profile.png"
                                alt={`Portrait of ${PROFILE.name}`}
                                loading="lazy"
                                decoding="async"
                                className="w-full rounded-lg border border-line object-cover"
                            />
                            <div className="rounded-lg border border-line bg-surface p-5">
                                <p className="label">Academy focus</p>
                                <ul className="mt-3 flex flex-col gap-1.5">
                                    {PROFILE.academy.focus.map((item) => (
                                        <li
                                            key={item}
                                            className="text-sm text-muted"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export default function Home() {
    return (
        <>
            <Hero />

            <section
                id="work"
                className="scroll-mt-8 border-t border-line-soft py-20"
            >
                <div className="container-page">
                    <Reveal>
                        <div className="flex flex-wrap items-baseline justify-between gap-4">
                            <p className="label">Selected work</p>
                            <p className="mono text-xs text-faint">
                                {PROJECTS.length} projects
                            </p>
                        </div>
                    </Reveal>
                    <div className="mt-10">
                        <WorkIndex projects={PROJECTS} />
                    </div>
                </div>
            </section>

            <About />
            <Footer />
        </>
    );
}
