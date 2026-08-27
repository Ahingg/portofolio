import { Camera } from "lucide-react";
import type { Shot } from "../data/types";

const ASPECT: Record<Shot["device"], string> = {
    iphone: "9 / 19.5",
    ipad: "1.45 / 1",
    mac: "16 / 10",
    browser: "16 / 10",
};

const FRAME_CLASS: Record<Shot["device"], string> = {
    iphone: "frame frame-iphone",
    ipad: "frame frame-ipad",
    mac: "frame frame-mac",
    browser: "frame frame-browser",
};

/**
 * One screenshot in its device frame — or, when `shot.src` is null, a labelled
 * empty slot that says what still needs capturing. Showing the gap is the point:
 * a missing screenshot should look deliberate and actionable, not broken.
 */
export function DeviceFrame({ shot }: { shot: Shot }) {
    if (!shot.src) {
        return (
            <figure className="flex h-full flex-col">
                <div
                    className="slot flex flex-1 flex-col items-center justify-center gap-3 rounded-xl p-6 text-center"
                    style={{ aspectRatio: ASPECT[shot.device] }}
                >
                    <Camera
                        size={20}
                        className="text-faint"
                        aria-hidden="true"
                    />
                    <p className="label">Screenshot pending</p>
                    {shot.todo && (
                        <p className="max-w-[30ch] text-xs leading-relaxed text-faint">
                            {shot.todo}
                        </p>
                    )}
                </div>
                <figcaption className="mt-3 text-sm text-muted">
                    {shot.caption}
                </figcaption>
            </figure>
        );
    }

    return (
        <figure className="flex h-full flex-col">
            <div className={FRAME_CLASS[shot.device]}>
                <img
                    src={shot.src}
                    alt={shot.caption}
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <figcaption className="mt-3 text-sm text-muted">
                {shot.caption}
            </figcaption>
        </figure>
    );
}
