import { Fragment } from "react";

/**
 * Renders `backtick-quoted` spans as inline code.
 *
 * The project copy names real types and files, and those read better set in the
 * mono face than as literal backticks. This is deliberately the only markup the
 * content layer supports — anything richer belongs in a real renderer.
 */
export function RichText({ text }: { text: string }) {
    const parts = text.split("`");

    return (
        <>
            {parts.map((part, i) =>
                i % 2 === 1 ? (
                    <code
                        key={i}
                        className="mono rounded bg-surface-2 px-1.5 py-0.5 text-[0.875em] text-accent"
                    >
                        {part}
                    </code>
                ) : (
                    <Fragment key={i}>{part}</Fragment>
                ),
            )}
        </>
    );
}
