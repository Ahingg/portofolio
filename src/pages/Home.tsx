import { motion, useReducedMotion } from "framer-motion";
import { PROFILE } from "../data/profile";
import { PROJECTS } from "../data/projects";
import { WorkIndex } from "../components/WorkIndex";
import { HeroDevices } from "../components/HeroDevices";
import { Skyline } from "../components/Skyline";
import { Reveal } from "../components/Reveal";
import { Footer } from "../components/Footer";

function Hero() {
    const reduced = useReducedMotion();
    const words = PROFILE.name.split(" ");

    return (
        <section
            id="hero"
            className="relative flex min-h-[min(46rem,calc(100svh-var(--console-h)))] items-center overflow-hidden py-20"
        >
            {/* Full-bleed because the section is full width — no cut-off band
                on wide screens the way a container-width wash left behind. */}
            <div className="hero-grid" aria-hidden="true" />
            <div className="hero-wash" aria-hidden="true" />

            {/* Sakanade: the town overhead, sky beneath it. The profile dips
                through the middle so the reading column stays clear. */}
            <Skyline inverted className="skyline-top hidden lg:flex" />

            <div className="container-page relative">
                <div className="grid items-center gap-16 xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-20">
                    <div>
                        <motion.p
                            className="label"
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {PROFILE.location}
                        </motion.p>

                        <h1 className="mt-5 font-display text-[clamp(2.75rem,7.5vw,5.25rem)] leading-[0.95] font-semibold">
                            {words.map((word, i) => (
                                <motion.span
                                    key={word}
                                    className="mr-[0.25em] inline-block"
                                    initial={
                                        reduced ? false : { opacity: 0, y: 18 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.55,
                                        delay: 0.08 + i * 0.07,
                                        ease: [0.22, 0.61, 0.36, 1],
                                    }}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>

                        <motion.p
                            className="accent-text mt-6 font-display text-xl sm:text-2xl"
                            initial={reduced ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            {PROFILE.role}
                        </motion.p>

                        <motion.p
                            className="prose-measure mt-7 text-[1.0625rem] leading-relaxed text-muted"
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.55 }}
                        >
                            {PROFILE.statement}
                        </motion.p>

                        <motion.dl
                            className="mt-12 flex flex-wrap gap-x-12 gap-y-6"
                            initial={reduced ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            <div>
                                <dt className="label">Currently</dt>
                                <dd className="mt-1.5 text-sm">
                                    {PROFILE.academy.title},{" "}
                                    {PROFILE.academy.org}
                                </dd>
                                <dd className="mono mt-0.5 text-xs text-faint">
                                    {PROFILE.academy.period}
                                </dd>
                            </div>
                            <div>
                                <dt className="label">Studying</dt>
                                <dd className="mt-1.5 text-sm">
                                    {PROFILE.education.title},{" "}
                                    {PROFILE.education.org}
                                </dd>
                                <dd className="mono mt-0.5 text-xs text-faint">
                                    {PROFILE.education.place}
                                </dd>
                            </div>
                        </motion.dl>
                    </div>

                    {/* Only worth its weight where there is width to spare. */}
                    <motion.div
                        className="hidden xl:block"
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
