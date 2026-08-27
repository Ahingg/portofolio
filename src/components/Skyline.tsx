import { Fragment } from "react";

/**
 * One silhouette in the skyline.
 *
 * `h` is a multiplier on the skyline's base height, `w` the eave width in rem,
 * `tiers` the number of roofed storeys, and `back` puts it in the far layer,
 * which is drawn smaller, dimmer and cooler — atmospheric perspective, so the
 * row reads as a town with depth rather than a picket fence.
 */
type Tower = { h: number; w: number; tiers: number; back?: boolean };

/**
 * A valley profile: tall towers at the edges, low roofs through the middle.
 *
 * That shape is doing real work — it keeps the silhouette out from behind the
 * reading column while still filling the side gutters, which is exactly where
 * the page has width to spare.
 */
const PROFILE: Tower[] = [
    { h: 1.0, w: 9.5, tiers: 6 },
    { h: 0.66, w: 7, tiers: 4, back: true },
    { h: 0.84, w: 8, tiers: 5 },
    { h: 0.44, w: 5.5, tiers: 3, back: true },
    { h: 0.34, w: 6, tiers: 2 },
    { h: 0.26, w: 4.5, tiers: 2, back: true },
    { h: 0.3, w: 5, tiers: 2 },
    { h: 0.42, w: 5.5, tiers: 3, back: true },
    { h: 0.5, w: 6.5, tiers: 3 },
    { h: 0.78, w: 7.5, tiers: 5, back: true },
    { h: 0.92, w: 8.5, tiers: 5 },
    { h: 1.0, w: 10, tiers: 6 },
];

function Tower({ tower }: { tower: Tower }) {
    const { w, tiers, back } = tower;

    return (
        <div className={`tower ${back ? "tower--back" : ""}`}>
            <span className="tower-spire" />
            {Array.from({ length: tiers }, (_, i) => {
                const t = tiers > 1 ? i / (tiers - 1) : 1;
                const roof = w * (0.5 + t * 0.5);
                const body = roof * 0.6;
                return (
                    <Fragment key={i}>
                        <span
                            className="tower-roof"
                            style={{
                                width: `${roof}rem`,
                                height: `${roof * 0.2}rem`,
                            }}
                        />
                        <span
                            className="tower-storey"
                            style={{
                                width: `${body}rem`,
                                height: `${roof * 0.34}rem`,
                            }}
                        >
                            {!back && (
                                <>
                                    <i
                                        className="tower-lamp"
                                        style={{
                                            animationDelay: `${(i * 2.3 + w) % 11}s`,
                                        }}
                                    />
                                    <i
                                        className="tower-lamp"
                                        style={{
                                            animationDelay: `${(i * 2.3 + w + 5.5) % 11}s`,
                                        }}
                                    />
                                </>
                            )}
                        </span>
                    </Fragment>
                );
            })}
            <span className="tower-base" style={{ width: `${w * 1.15}rem` }} />
        </div>
    );
}

/**
 * A row of pagodas spanning the full width.
 *
 * The page shows this twice: hanging from the top of the hero, and standing
 * along the bottom of everything below it. Same town, two orientations — the
 * upside-down world righting itself as you read down the page.
 */
export function Skyline({
    inverted = false,
    className = "",
}: {
    inverted?: boolean;
    className?: string;
}) {
    return (
        <div
            className={`skyline ${inverted ? "skyline--inverted" : ""} ${className}`}
            aria-hidden="true"
        >
            {PROFILE.map((tower, i) => (
                <Tower key={i} tower={tower} />
            ))}
        </div>
    );
}
