import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ConsoleBar } from "./components/ConsoleBar";
import { Skyline } from "./components/Skyline";
import { useHeroRise } from "./hooks/useHeroRise";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";

/**
 * React Router does not restore scroll or honour `#hash` targets on its own.
 * Navigating to `/#work` from a project page has to land on the section, and
 * opening a project has to start at the top.
 */
function ScrollManager() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Wait one frame so the target section exists after a route change.
            const id = hash.slice(1);
            requestAnimationFrame(() => {
                document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
            });
            return;
        }
        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
}

function Layout() {
    const { pathname } = useLocation();
    const reduced = useReducedMotion();

    useHeroRise();

    return (
        // Bottom padding clears the fixed console bar.
        <div className="min-h-screen pb-[var(--console-h)]">
            {/* The town, right way up, rising along the bottom edge as the
                hero's inverted one scrolls away. */}
            <Skyline className="skyline-bottom hidden lg:flex" />

            <main id="main" className="relative z-10">
                <ScrollManager />
                {/* Keyed on the path so each route fades in on arrival. No exit
                    animation: holding the old page back would fight the scroll
                    reset that has to happen at the same moment. */}
                <motion.div
                    key={pathname}
                    initial={reduced ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/projects/:slug"
                            element={<ProjectPage />}
                        />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </motion.div>
            </main>
            <ConsoleBar />
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}
