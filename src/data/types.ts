/**
 * Shared shapes for the content layer.
 *
 * Everything the site renders comes from `src/data/*`. Presentation components
 * never hardcode copy — adding or updating a project means editing `projects.ts`
 * only.
 */

/** Which frame a screenshot is drawn inside. */
export type DeviceKind = "iphone" | "ipad" | "mac" | "browser";

/**
 * One screenshot slot.
 *
 * `src: null` is deliberate, not missing data: it renders a labelled empty slot
 * describing what still needs to be captured. That keeps the gap visible in the
 * UI instead of silently shipping a half-filled gallery.
 */
export type Shot = {
    src: string | null;
    caption: string;
    device: DeviceKind;
    /** Shown inside the placeholder — what to drop in here. */
    todo?: string;
};

export type StackGroup = {
    group: string;
    items: string[];
};

export type Highlight = {
    title: string;
    body: string;
};

export type ProjectLink = {
    label: string;
    href: string;
};

export type Project = {
    slug: string;
    name: string;
    /** One scannable line for the work index. */
    tagline: string;
    /** Mono column in the index — real data, not decoration. */
    year: string;
    platform: string;
    kind: string;
    role: string;
    period: string;
    status?: string;
    /** Body copy for the case study, one string per paragraph. */
    summary: string[];
    highlights: Highlight[];
    stack: StackGroup[];
    /** Measured contribution, e.g. commit share. Omit when unknown. */
    contribution?: string;
    links: ProjectLink[];
    shots: Shot[];
    /** Small mark shown in the index and on the detail header. */
    logo?: string;
    featured: boolean;
};
