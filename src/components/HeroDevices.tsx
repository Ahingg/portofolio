import { PROJECTS } from "../data/projects";

/**
 * The hero's right-hand column on wide screens: the actual work, in the frames
 * it runs in.
 *
 * On a laptop the type column only wants ~62 characters, which used to leave a
 * third of the viewport empty. Filling it with real screenshots says what the
 * paragraph says, faster.
 */
export function HeroDevices() {
    const chemzy = PROJECTS.find((p) => p.slug === "chemzy");
    const taggo = PROJECTS.find((p) => p.slug === "taggo");

    const tablet = chemzy?.shots.find((s) => s.src);
    const phone = taggo?.shots.find((s) => s.src);
    if (!tablet?.src || !phone?.src) return null;

    return (
        <div
            className="relative ml-auto aspect-[4/5] w-full max-w-[26rem]"
            aria-hidden="true"
        >
            {/* Accent bloom behind the stack, following the live accent. */}
            <div
                className="absolute inset-[8%] rounded-full opacity-30 blur-3xl transition-colors duration-500"
                style={{ backgroundColor: "var(--accent)" }}
            />

            <div className="frame frame-ipad absolute top-[6%] right-0 w-[86%] rotate-[-3deg] shadow-2xl shadow-black/50">
                <img
                    src={tablet.src}
                    alt=""
                    loading="eager"
                    decoding="async"
                />
            </div>

            <div className="frame frame-iphone absolute bottom-0 left-0 w-[38%] rotate-[4deg] shadow-2xl shadow-black/60">
                <img
                    src={phone.src}
                    alt=""
                    loading="eager"
                    decoding="async"
                />
            </div>
        </div>
    );
}
