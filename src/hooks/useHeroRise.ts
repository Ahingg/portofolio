import { useEffect } from "react";

/**
 * Publishes how far the reader has left the hero behind, as `--rise` on the
 * root element: 0 while the hero fills the screen, 1 once it is gone.
 *
 * A number rather than a boolean, because the bottom skyline rides it — the
 * town should come up with the scroll, not switch on at a threshold.
 */
export function useHeroRise() {
    useEffect(() => {
        const root = document.documentElement;
        let frame = 0;

        const measure = () => {
            frame = 0;
            const span = window.innerHeight * 0.8;
            const rise = Math.min(Math.max(window.scrollY / span, 0), 1);
            root.style.setProperty("--rise", rise.toFixed(3));
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
            root.style.removeProperty("--rise");
        };
    }, []);
}
