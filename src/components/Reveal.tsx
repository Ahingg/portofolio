import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
    children: ReactNode;
    /** Stagger position — multiplied into the delay. */
    index?: number;
    className?: string;
};

/**
 * Scroll reveal — deliberately small: 12px of travel and a short fade, once per
 * element. Anything larger reads as an effect rather than as the page settling.
 *
 * This drives its own IntersectionObserver rather than using Framer Motion's
 * `whileInView`, which left elements that were already on screen at mount stuck
 * at their initial opacity. An observer reports intersecting targets on its
 * first callback, so content above the fold reveals as reliably as content
 * below it.
 */
export function Reveal({ children, index = 0, className }: Props) {
    const reduced = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Bail out of observing entirely when motion is not wanted.
        if (reduced) {
            setShown(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setShown(true);
                        observer.disconnect();
                    }
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [reduced]);

    const delay = Math.min(index * 0.06, 0.3);

    return (
        <div
            ref={ref}
            className={className}
            style={
                reduced
                    ? undefined
                    : {
                          opacity: shown ? 1 : 0,
                          transform: shown ? "none" : "translateY(12px)",
                          transition: `opacity 500ms cubic-bezier(0.22,0.61,0.36,1) ${delay}s, transform 500ms cubic-bezier(0.22,0.61,0.36,1) ${delay}s`,
                      }
            }
        >
            {children}
        </div>
    );
}
