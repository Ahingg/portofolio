import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { Github, Linkedin, Mail, Instagram, X, Menu } from "lucide-react";
import "./style.css";

// More efficient image imports using import.meta.glob
const projectImages = import.meta.glob("./assets/*.{png,jpg,jpeg}", {
    eager: true,
    as: "url",
});

// Helper function to get images by project name
const getProjectImages = (projectName: string) => {
    const icon =
        projectImages[`./assets/${projectName}_icon.png`] ||
        projectImages[`./assets/${projectName}_logo.png`] ||
        projectImages["./assets/ergn_logo_dark.png"];
    const images = Object.keys(projectImages)
        .filter(
            (path) =>
                path.includes(`${projectName}_`) &&
                !path.includes("_icon") &&
                !path.includes("_logo")
        )
        .sort()
        .map((path) => projectImages[path]);
    return { icon, images };
};

// Profile image
import profile2 from "./assets/profile2.png";

const COLORS = {
    bg: "#0a181c",
    aqua: "#68d8c8",
    aquaSoft: "#9ee4d4",
    text: "#e7fffb",
    gray: "#b7c9c7",
    windowDim: "#4d4327",
    windowGlow: "#ffe066",
};

type Project = {
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
    time: string;
    type: string;
    role: string;
    tech: string[];
};

const PROJECTS: Project[] = [
    {
        title: "Ergasia",
        description:
            "ICP Block Chain based Web App to enhance transaction security between Freelancer and Client",
        thumbnail:
            getProjectImages("ergasia").icon ||
            getProjectImages("ergn_logo_dark").icon,
        images: getProjectImages("ergasia").images,
        time: "Mar 2025 - Aug 2025",
        type: "Hackathon",
        role: "Frontend Developer",
        tech: ["Motoko", "React TS", "Ant Design"],
    },
    {
        title: "Starlette",
        description:
            "Programming-based puzzle game, followed by a multi-ending story to enhance player engagement and increase learning efficiency",
        thumbnail: getProjectImages("starlette").icon,
        images: getProjectImages("starlette").images,
        time: "Mar 2025 - June 2025",
        type: "Group Project",
        role: "Main Developer, Asset Maker, Project Manager",
        tech: ["Unity"],
    },
    {
        title: "Neptune",
        description:
            "Result of Research Interest Group in BINUS University Software Laboratory Center, a Programming Online Judge referenced from LeetCode to enhance the UI/UX and System Dependency from the currently used Online Judge Website.",
        thumbnail: getProjectImages("neptune").icon,
        images: getProjectImages("neptune").images,
        time: "Feb 2025 - July 2025",
        type: "Group",
        role: "Full Stack Developer",
        tech: [
            "React TS",
            "Go + Gin Framework",
            "RabbitMQ",
            "Judge0",
            "Tailwind + Daisy UI",
        ],
    },
];

const NAME = "Xaviero Yamin Loganta";

function useParallaxCursor(elRef: React.RefObject<HTMLElement | null>) {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const onMove = (e: React.MouseEvent) => {
        const rect = (elRef.current as HTMLElement).getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setMouse({ x, y });
    };
    const springX = useSpring(mouse.x, {
        stiffness: 100,
        damping: 20,
        mass: 1,
    });
    const springY = useSpring(mouse.y, {
        stiffness: 100,
        damping: 20,
        mass: 1,
    });
    return { onMove, springX, springY };
}

function IntroCurtain({ done }: { done: boolean }) {
    const layers = [0, 1, 2, 3];
    return (
        <AnimatePresence>
            {!done && (
                <motion.div className="fixed inset-0 z-[200] pointer-events-none">
                    {layers.map((i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 intro-mist-layer"
                            initial={{ opacity: 1, x: 0 }}
                            exit={{
                                x: i % 2 === 0 ? "-100%" : "100%",
                                opacity: 0,
                            }}
                            transition={{
                                duration: 1.5,
                                ease: [0.7, 0, 0.3, 1],
                                delay: i * 0.25,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function MysticNavbar({ show }: { show: boolean }) {
    const [open, setOpen] = useState(true);
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={show ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                delay: show ? 0.4 : 0,
            }}
            className="fixed top-0 left-1/2 -translate-x-1/2 mt-6 z-50"
            aria-label="Site navigation"
        >
            <div className="nav-shell flex items-center gap-2 px-3 py-2 rounded-full">
                <button
                    aria-expanded={open}
                    aria-controls="mystic-nav-menu"
                    onClick={() => setOpen((s) => !s)}
                    className="p-2 text-[#9ee4d4] hover:text-white transition-colors"
                >
                    <Menu size={20} />
                    <span className="sr-only">Toggle navigation</span>
                </button>
                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            id="mystic-nav-menu"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "auto", opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="flex items-center gap-2 pl-1 pr-1">
                                <a
                                    href="#about"
                                    className="nav-item text-sm text-gray-200 px-2 py-1 rounded-md"
                                >
                                    About me
                                </a>
                                <a
                                    href="#projects"
                                    className="nav-item text-sm text-gray-200 px-2 py-1 rounded-md"
                                >
                                    Projects
                                </a>
                                <a
                                    href="#contact"
                                    className="nav-item text-sm text-gray-200 px-2 py-1 rounded-md"
                                >
                                    Contact
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}

function ShootingStars() {
    return <div className="shooting-stars" aria-hidden="true" />;
}

function Pagoda({ small = false }: { small?: boolean }) {
    return (
        <div className="flex flex-col items-center">
            {!small && <div className="pagoda-spire" />}
            <div className={small ? "pagoda-roof-sm" : "pagoda-roof-top"} />
            {!small && <div className="pagoda-roof" />}
            <div className={small ? "pagoda-body-sm" : "pagoda-body"}>
                <div className={small ? "pagoda-window-sm" : "pagoda-window"} />
                {!small && <div className="pagoda-window" />}
            </div>
            {!small && (
                <>
                    <div className="pagoda-roof" />
                    <div className="pagoda-body">
                        <div className="pagoda-window" />
                        <div className="pagoda-window" />
                    </div>
                </>
            )}
            <div className={small ? "pagoda-base-sm" : "pagoda-base"} />
        </div>
    );
}

function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const { onMove, springX } = useParallaxCursor(heroRef);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const cursorMoonX = useTransform(springX, [-1, 1], ["-0.75rem", "0.75rem"]);
    const cursorBackHillsX = useTransform(
        springX,
        [-1, 1],
        ["-0.5rem", "0.5rem"]
    );
    const cursorMidHillsX = useTransform(
        springX,
        [-1, 1],
        ["-0.9375rem", "0.9375rem"]
    );
    const cursorPagodaX = useTransform(
        springX,
        [-1, 1],
        ["-1.5625rem", "1.5625rem"]
    );
    const cursorFogX = useTransform(
        springX,
        [-1, 1],
        ["-2.1875rem", "2.1875rem"]
    );

    const scrollPagodaY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const scrollMidHillsY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "15%"]
    );
    const scrollBackHillsY = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "8%"]
    );
    const scrollMoonY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    const letters = useMemo(() => NAME.split(""), []);

    return (
        <section
            id="hero"
            ref={heroRef}
            onMouseMove={onMove}
            className="h-screen w-full relative flex items-center justify-center text-center overflow-hidden"
            aria-label="Pagoda night scene"
        >
            <div className="parallax-bg" />
            <div className="stars" />
            <ShootingStars />

            <motion.div
                className="moon"
                style={{ y: scrollMoonY, x: cursorMoonX }}
            />

            {/* Clouds between layers */}
            <div className="cloud cloud1" />
            <div className="cloud cloud2" />
            <div className="cloud cloud3" />
            <div className="cloud cloud4" />
            <div className="cloud cloud5" />
            <div className="cloud cloud6" />

            <motion.div
                className="parallax-hills-back"
                style={{ y: scrollBackHillsY, x: cursorBackHillsX }}
            />
            <motion.div
                className="parallax-hills-mid"
                style={{ y: scrollMidHillsY, x: cursorMidHillsX }}
            />

            <motion.div
                className="pagoda-group"
                style={{ y: scrollPagodaY, x: cursorPagodaX }}
            >
                <div className="pagoda main-pagoda">
                    <Pagoda />
                </div>
                <div className="pagoda side-pagoda-left">
                    <Pagoda small />
                </div>
                <div className="pagoda side-pagoda-right">
                    <Pagoda small />
                </div>
                <div className="pagoda far-pagoda-left">
                    <Pagoda small />
                </div>
                <div className="pagoda mid-pagoda-right">
                    <Pagoda small />
                </div>
                <div className="pagoda side-pagoda-2-left">
                    <Pagoda small />
                </div>
                <div className="pagoda far-pagoda-right">
                    <Pagoda small />
                </div>
                <div className="pagoda far-pagoda-deep">
                    <Pagoda small />
                </div>
            </motion.div>

            <motion.div className="foreground-fog" style={{ x: cursorFogX }}>
                <div className="fog-element fog1" />
                <div className="fog-element fog2" />
                <div className="fog-element fog3" />
            </motion.div>

            <motion.div
                initial="hidden"
                animate="visible"
                className="z-10 relative px-4"
                aria-live="polite"
            >
                <motion.h1
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.06,
                                delayChildren: 0.5,
                            },
                        },
                        hidden: {},
                    }}
                    className="text-5xl md:text-7xl font-bold mb-4 font-serif text-shadow"
                >
                    {letters.map((char, i) => (
                        <motion.span
                            key={`${char}-${i}`}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 30,
                                    rotateY: 90,
                                    filter: "blur(12px)",
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    rotateY: 0,
                                    filter: "blur(0px)",
                                },
                            }}
                            transition={{
                                type: "spring",
                                damping: 16,
                                stiffness: 120,
                            }}
                            className="inline-block will-change-transform"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    className="text-xl md:text-2xl text-gray-300"
                >
                    Full-Stack Developer & Software Engineer
                </motion.p>
            </motion.div>
        </section>
    );
}

function SectionMist() {
    // interactive fog mask follows mouse globally
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const fogContainer = document.getElementById("fog-container");
            if (!fogContainer) return;
            fogContainer.style.setProperty("--mouse-x", `${e.clientX / 16}rem`);
            fogContainer.style.setProperty("--mouse-y", `${e.clientY / 16}rem`);
        };
        window.addEventListener("mousemove", handler);
        return () => window.removeEventListener("mousemove", handler);
    }, []);
    return (
        <div
            id="fog-container"
            className="fixed inset-0 z-20 pointer-events-none interactive-fog-mask"
            aria-hidden="true"
        >
            <motion.div className="fog-particle fog-particle-1" />
            <motion.div className="fog-particle fog-particle-2" />
        </div>
    );
}

function About() {
    return (
        <section
            id="about"
            className="py-24 px-6 md:px-12 lg:px-24 relative section-sky section-fog-soft"
        >
            <div className="mystic-bg" />
            <div className="drifting-clouds" aria-hidden="true">
                <div className="drift-cloud drift-1" />
                <div className="drift-cloud drift-2" />
                <div className="drift-cloud drift-3" />
                <div className="drift-cloud drift-4" />
                <div className="drift-cloud drift-5" />
            </div>
            <div className="descending-stars" aria-hidden="true" />
            <div className="descending-stars" aria-hidden="true" />
            <div className="descending-stars" aria-hidden="true" />

            <div className="section-mist-container">
                <div className="dry-ice-mist" />
                <div className="dry-ice-mist" />
                <div className="dry-ice-mist" />
                <div className="dry-ice-mist" />
                <div className="dry-ice-mist" />
                <div className="dry-ice-mist" />
            </div>

            {/* Carry-over pagodas/clouds */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1 }}
                className="absolute -top-12 right-8 z-0"
                aria-hidden="true"
            >
                <div className="pagoda" style={{ transform: "scale(0.5)" }}>
                    <Pagoda small />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 0.7, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute -top-6 left-10 z-0"
                aria-hidden="true"
            >
                <div className="pagoda" style={{ transform: "scale(0.45)" }}>
                    <Pagoda small />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="cloud hover-fade-cloud"
                style={{
                    width: "18rem",
                    height: "6rem",
                    top: "-2rem",
                    left: "25%",
                    position: "absolute",
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-center mb-12 font-serif"
                    style={{ color: COLORS.aquaSoft }}
                >
                    About Me
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2 bento-item bento-item-glow h-[28.125rem]"
                    >
                        <img
                            src={profile2}
                            alt="Portrait of Xaviero in a misty, pagoda-themed style"
                            className="w-full h-full rounded-lg object-cover"
                        />
                    </motion.div>
                    <div className="lg:col-span-3 flex flex-col gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="bento-item bento-item-glow"
                        >
                            <h3
                                className="text-2xl font-semibold mb-4 font-serif"
                                style={{ color: "#e5f9f5" }}
                            >
                                Bio
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                Hello! I’m Xaviero, a developer who blends web
                                technologies and AI with a taste for expressive,
                                atmospheric UX. I love to learn about
                                technologies such as Algorithm, Software
                                Architecture, DevOps, Data Structure, AI,
                                Competitive Programming, and many more!.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bento-item bento-item-glow"
                        >
                            <h3
                                className="text-2xl font-semibold mb-4 font-serif"
                                style={{ color: "#e5f9f5" }}
                            >
                                Core Competencies
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "Algorithm",
                                    "Software Engineering",
                                    "Swift",
                                    "DevOps",
                                    "Mobile Programming",
                                    "Game Programming",
                                ].map((s) => (
                                    <div
                                        key={s}
                                        className="bg-[#142f36]/50 py-1 px-3 rounded-full text-sm border border-transparent hover:border-[#68d8c8] hover:text-[#68d8c8] transition-colors cursor-default"
                                    >
                                        <span className="font-semibold text-gray-300">
                                            {s}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({
    project,
    onOpen,
}: {
    project: Project;
    onOpen: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            onClick={onOpen}
            className="group relative h-[24rem] w-full rounded-xl shadow-xl overflow-hidden cursor-pointer"
            role="button"
            aria-label={`Open details for ${project.title}`}
            tabIndex={0}
            onKeyDown={(e) => (e.key === "Enter" ? onOpen() : null)}
        >
            <img
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                src={project.thumbnail}
                alt={`${project.title} preview`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Fog rise on hover */}
            <div className="card-fog-rise" />

            {/* Subtle radial mist */}
            <div className="absolute inset-0 w-full h-full opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-in-out card-mist-reveal" />

            <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold mb-2 font-serif text-white text-shadow-lg transition-transform duration-500 group-hover:-translate-y-8">
                    {project.title}
                </h3>
                <div className="opacity-0 -translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-200">
                    <div className="bg-[#142f36]/50 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-1 px-3 rounded-full text-xs inline-block">
                        View Details
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProjectModal({
    project,
    onClose,
}: {
    project: Project;
    onClose: () => void;
}) {
    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = "unset";
            };
        }
    }, [project]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4"
                    onClick={onClose}
                    aria-modal="true"
                    role="dialog"
                    aria-label={`${project.title} details`}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    <div className="modal-fog" aria-hidden="true" />
                    <motion.div
                        initial={{ scale: 0.9, y: 30 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 30 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        className="relative bg-[#142f36] text-gray-200 rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 border border-[#2e6b66]/50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>
                        <h2
                            className="text-3xl md:text-4xl font-bold mb-4 font-serif"
                            style={{ color: COLORS.aquaSoft }}
                        >
                            {project.title}
                        </h2>
                        <p className="text-gray-300 mb-4">
                            {project.description}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {/* Show other images */}
                            {project.images.map((src, idx) => (
                                <img
                                    key={idx}
                                    src={src || "/placeholder.svg"}
                                    alt={`${project.title} image ${idx + 1}`}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((t) => (
                                <span
                                    key={t}
                                    className="text-xs py-1 px-2 rounded-full bg-white/10 border border-white/20"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <div className="text-sm text-gray-400 flex flex-wrap gap-4">
                            <span>
                                <strong className="text-gray-300">Time:</strong>{" "}
                                {project.time}
                            </span>
                            <span>
                                <strong className="text-gray-300">Type:</strong>{" "}
                                {project.type}
                            </span>
                            <span>
                                <strong className="text-gray-300">Role:</strong>{" "}
                                {project.role}
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function Projects() {
    const [active, setActive] = useState<Project | null>(null);
    return (
        <section
            id="projects"
            className="py-24 px-6 md:px-12 lg:px-24 relative section-sky section-fog-soft"
        >
            <div className="drifting-clouds" aria-hidden="true">
                <div className="drift-cloud drift-1" />
                <div className="drift-cloud drift-2" />
                <div className="drift-cloud drift-3" />
                <div className="drift-cloud drift-4" />
                <div className="drift-cloud drift-5" />
            </div>
            <div className="descending-stars" aria-hidden="true" />

            <div className="section-mist-container">
                <div className="dry-ice-mist" />
                <div className="dry-ice-mist" />
                <div className="dry-ice-mist" />
                <div className="dry-ice-mist" />
            </div>

            {/* Carry-over cloud for continuity */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.9 }}
                className="cloud"
                style={{
                    width: "20rem",
                    height: "7rem",
                    top: "-1.5rem",
                    left: "60%",
                    position: "absolute",
                }}
                aria-hidden="true"
            />

            {/* Small decorative pagodas for continuity */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 0.6, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9 }}
                className="absolute -top-10 left-6 z-0"
                aria-hidden="true"
            >
                <div className="pagoda" style={{ transform: "scale(0.38)" }}>
                    <Pagoda small />
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 0.55, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="absolute -top-6 right-8 z-0"
                aria-hidden="true"
            >
                <div className="pagoda" style={{ transform: "scale(0.32)" }}>
                    <Pagoda small />
                </div>
            </motion.div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-center mb-16 font-serif"
                    style={{ color: COLORS.aquaSoft }}
                >
                    My Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {PROJECTS.map((p) => (
                        <ProjectCard
                            key={p.title}
                            project={p}
                            onOpen={() => setActive(p)}
                        />
                    ))}
                </div>
            </div>

            <ProjectModal
                project={active as Project}
                onClose={() => setActive(null)}
            />
        </section>
    );
}

function Contact() {
    const items = [
        {
            label: "Email",
            icon: <Mail size={18} />,
            value: "xaviero.yamin28@gmail.com",
            href: "mailto:xaviero.yamin28@gmail.com",
        },
        {
            label: "LinkedIn",
            icon: <Linkedin size={18} />,
            value: "xavieroyamin",
            href: "https://linkedin.com/in/xavieroyamin/",
        },
        {
            label: "GitHub",
            icon: <Github size={18} />,
            value: "github.com/Ahingg",
            href: "https://github.com/Ahingg",
        },
        {
            label: "Instagram",
            icon: <Instagram size={18} />,
            value: "@ahingsiapa",
            href: "https://instagram.com/ahingsiapa",
        },
    ];
    return (
        <footer
            id="contact"
            className="py-20 text-center z-50"
        >
            <div className="container mx-auto max-w-4xl px-6">
                <h2
                    className="text-3xl font-bold mb-8 font-serif"
                    style={{ color: COLORS.aquaSoft }}
                >
                    Know Me More
                </h2>
                <div
                    role="list"
                    className="divide-y divide-white/10 bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                    {items.map((it) => (
                        <a
                            key={it.label}
                            role="listitem"
                            href={it.href}
                            className="flex items-center justify-between px-5 py-4 text-left hover:bg-white/10 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div className="flex items-center gap-3 text-gray-100">
                                <span aria-hidden="true">{it.icon}</span>
                                <span className="font-medium">{it.label}</span>
                            </div>
                            <span className="text-gray-300">{it.value}</span>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default function App() {
    const [introDone, setIntroDone] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setIntroDone(true), 3500);
        return () => clearTimeout(t);
    }, []);
    return (
        <div
            className="font-sans"
            style={{ backgroundColor: COLORS.bg, color: "#dcecec" }}
        >
            <SectionMist />
            <IntroCurtain done={introDone} />
            <MysticNavbar show={introDone} />
            <Hero />
            <main className="relative z-10">
                <About />
                <Projects />
                <Contact />
            </main>
        </div>
    );
}
