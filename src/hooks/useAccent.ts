import { useEffect } from "react";

/**
 * Hands the page's accent to the root element for as long as the caller is
 * mounted, then restores the site default.
 *
 * It goes on `:root` rather than a wrapper because the console bar lives
 * outside the routed subtree — a project's colour has to reach it too, which is
 * the whole point of tinting per project.
 */
export function useAccent(color?: string) {
    useEffect(() => {
        const root = document.documentElement;

        if (!color) {
            root.style.removeProperty("--accent");
            return undefined;
        }

        root.style.setProperty("--accent", color);
        return () => {
            root.style.removeProperty("--accent");
        };
    }, [color]);
}
