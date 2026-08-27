import { useEffect } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Rail } from "./components/Rail";
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

    return (
        <div className="min-h-screen lg:pl-56 xl:pl-64">
            <Rail />
            <main
                id="main"
                className="mx-auto w-full max-w-[68rem] px-5 sm:px-8 lg:px-14"
            >
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
