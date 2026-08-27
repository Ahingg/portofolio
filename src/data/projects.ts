import type { Project } from "./types";

/**
 * Project content.
 *
 * Sourcing rules used when writing this file:
 *  - Descriptions and stacks for Taggo, Chemzy and macnpaint come from each
 *    repo's own README / CLAUDE.md / PROJECT_CONTEXT.md — nothing invented.
 *  - Periods and commit shares come from `git log` on the local clones.
 *  - Ergasia and Starlette are sourced from their own repo READMEs
 *    (memeett/icp and TazkieCT/starlette), which Xaviero supplied.
 */
export const PROJECTS: Project[] = [
    {
        slug: "chemzy",
        name: "Chemzy",
        tagline:
            "AR molecule builder that derives VSEPR geometry instead of looking it up.",
        year: "2026",
        platform: "iPadOS · ARKit",
        kind: "Team project",
        role: "iOS Engineer — chemistry engine & AR rendering",
        period: "Aug 2026",
        status: "In development",
        summary: [
            "Molecular shape is hard to learn from a textbook because the page is flat and the molecule is not. A student can memorise “methane is tetrahedral, 109.5°” without ever seeing why four bonds cannot be spread any other way. Chemzy anchors a workbench to a real table, lets you drop atoms onto it, and works out what you are building — computing the true VSEPR shape as it goes.",
            "The idea the whole app rests on is that no table of molecules and their shapes exists anywhere in the code. Given a handful of atoms the pipeline picks the central atom, solves the Lewis structure, classifies the result as AXₙEₘ, and reads the bond directions for that class. Water comes out bent because oxygen ends up holding two lone pairs — not because anything says water is bent.",
        ],
        highlights: [
            {
                title: "Shape is computed, not stored",
                body: "The `MolekulChemistry` package is pure Swift and declares no dependencies at all, so it cannot import RealityKit even by accident. 38 tests assert the angles a textbook quotes. Adding a molecule is a JSON entry; adding an element adds every molecule that element can form.",
            },
            {
                title: "A build mechanic with nothing to aim at",
                body: "Steering an atom to a point in 3D space with a finger on 2D glass means missing, so the target was removed. Release an atom anywhere and the chemistry decides where it goes. While an atom is held the scene shows the molecule it would produce — the actual solved result, with the un-landed atom drawn translucent.",
            },
            {
                title: "Three stars, three ways of knowing",
                body: "A molecule is not finished when it is assembled. The first star is for building it, the second for reading what the app derived about it, the third for a short quiz. Getting the shape on screen and being able to say why it is that shape are treated as different achievements.",
            },
            {
                title: "Instability you can see",
                body: "An assembly that is not yet a molecule shakes, with amplitude proportional to how much bonding capacity is still unfilled. That is physics rather than decoration: an atom with open valence is a radical, and radicals really are high-energy and short-lived.",
            },
            {
                title: "Sighting along a bond",
                body: "Walk until your eye, the outer atom and the central atom line up, and the rest of the molecule flattens into a disc — for methane, three bonds 120° apart. The app measures the angle between your line of sight and every bond axis each frame. A slider cannot produce this, because the thing that moved is you.",
            },
            {
                title: "A one-way flow between model and scene",
                body: "The renderer is handed a `MoleculeLayout` and nothing else — it never counts an electron. `MoleculeLayout` is an `Equatable` value type and that is load-bearing: the reconciler's first line is `guard layout != applied`, so an unrelated change costs one comparison instead of a scene rebuild.",
            },
        ],
        stack: [
            {
                group: "Platform",
                items: ["Swift", "SwiftUI", "ARKit", "RealityKit", "iOS 26.5"],
            },
            {
                group: "Architecture",
                items: [
                    "MVVM",
                    "Swift Package (zero-dependency domain)",
                    "Reality Composer Pro",
                ],
            },
            { group: "Testing", items: ["38 chemistry unit tests"] },
        ],
        contribution: "86 of 105 commits",
        links: [
            {
                label: "Repository",
                href: "https://github.com/fadhiljr7/Molekul",
            },
        ],
        shots: [
            {
                src: "/screenshots/chemzy/build.jpg",
                device: "ipad",
                caption:
                    "Building H₂O on a real table — the wardrobe dims atoms that lead nowhere",
            },
            {
                src: "/screenshots/chemzy/complete.jpg",
                device: "ipad",
                caption:
                    "Water solved. The 104.5° arc is measured off the model, not written down",
            },
            {
                src: "/screenshots/chemzy/lens-view.jpg",
                device: "ipad",
                caption:
                    "Lens view — the molecule swapped for its real-world visualisation",
            },
            {
                src: "/screenshots/chemzy/info-panel.jpg",
                device: "ipad",
                caption:
                    "Info panel: structure, bonding, applications and facts for the molecule on screen",
            },
            {
                src: "/screenshots/chemzy/quiz-result.jpg",
                device: "ipad",
                caption:
                    "The third star is earned by a quiz, not by building alone",
            },
            {
                src: "/screenshots/chemzy/catalog.jpg",
                device: "ipad",
                caption:
                    "Catalog — ten molecules, three stars each, locked until reachable",
            },
        ],
        featured: true,
    },
    {
        slug: "taggo",
        name: "Taggo",
        tagline:
            "Hardware-free lost & found for commuters: print a QR, a finder scans it, the owner gets a push.",
        year: "2026",
        platform: "iOS · App Clip",
        kind: "Team project",
        role: "iOS Engineer — core business logic (models, services, use cases, view models)",
        period: "Jul 2026",
        status: "Concept / prototype",
        summary: [
            "Taggo is a lost-and-found ecosystem that needs no hardware and no accounts. An owner registers an item and gets a static QR encoding a Universal Link, which they print and attach to the thing itself. A finder scans it — and if they do not have the app, an App Clip launches instead, showing the item's name and photo but never the owner's identity, and lets them file a found report anonymously.",
            "Both entry points call the exact same use case in `SharedCore`, behind a narrow `FoundReportSubmitting` protocol. That matters because App Clips cannot write to CloudKit — the platform's anonymous CloudKit entitlement is read-only — so the Clip submits through an HTTP relay while the main app writes to CloudKit directly. Two completely different write paths, one piece of domain logic.",
        ],
        highlights: [
            {
                title: "One use case, two write paths",
                body: "`ReportFoundItemUseCase` depends only on `CloudKitManaging`/`FoundReportSubmitting` and an image compressor — no identity dependency at all. Main app and App Clip share it despite writing to completely different backends.",
            },
            {
                title: "A schema kept deliberately small",
                body: "Two CloudKit record types, `Item` and `FoundReport`, and nothing else. No `User` record — a static local UUID is enough without login. No `Notification` record — the Inbox is a query over `FoundReport` with an `isRead` flag. No stored QR — it is a deterministic on-device render of the item's ID.",
            },
            {
                title: "Modern concurrency, no Combine",
                body: "Swift 6 with `@Observable` + `@State` only; `ObservableObject`, `@Published` and Combine pipelines are banned by project rule. Structured async/await throughout, with `AsyncStream` for ongoing events instead of delegates or publishers at the view-model boundary.",
            },
            {
                title: "Layers that cannot leak",
                body: "The flow is always View → ViewModel → UseCase → Service protocol → concrete service. Views never fetch, and domain models never leak a `CKRecord` upward past the mapper boundary.",
            },
            {
                title: "Push that is registered with the item",
                body: "A `CKQuerySubscription` on `FoundReport` is registered inside `RegisterItemUseCase`, so registering an item and being notified about it are one atomic action rather than two things that can drift apart.",
            },
        ],
        stack: [
            {
                group: "Platform",
                items: ["Swift 6", "SwiftUI", "iOS 17+", "App Clip"],
            },
            {
                group: "Backend",
                items: [
                    "CloudKit Public Database",
                    "CKQuerySubscription push",
                    "Universal Links",
                ],
            },
            {
                group: "Architecture",
                items: [
                    "MVVM",
                    "Use case layer",
                    "Protocol-based services",
                    "async/await + AsyncStream",
                ],
            },
            {
                group: "Targets",
                items: ["TaggoMain", "TaggoClip", "TaggoTests", "TaggoUITests"],
            },
        ],
        contribution: "61 of 79 commits",
        links: [
            {
                label: "Repository",
                href: "https://github.com/megan0088/urbanan",
            },
        ],
        shots: [
            {
                src: "/screenshots/taggo/main_page_filled.webp",
                device: "iphone",
                caption:
                    "Your Items — every registered thing, each with a tag behind it",
            },
            {
                src: "/screenshots/taggo/registered.jpeg",
                device: "iphone",
                caption:
                    "The QR encodes a Universal Link to the item, rendered on device and ready to print",
            },
            {
                src: "/screenshots/taggo/finder.jpeg",
                device: "iphone",
                caption:
                    "The App Clip's report form. A finder never learns who owns the item",
            },
            {
                src: "/screenshots/taggo/inbox.png",
                device: "iphone",
                caption:
                    "Inbox — one card per found report, grouped by when it arrived",
            },
            {
                src: "/screenshots/taggo/report-detail.png",
                device: "iphone",
                caption:
                    "Report detail: where it was found, when, and a claim action",
            },
            {
                src: "/screenshots/taggo/register-item.png",
                device: "iphone",
                caption:
                    "Registering an item, which also subscribes it to its own found reports",
            },
        ],
        featured: true,
    },
    {
        slug: "macnpaint",
        name: "macnpaint",
        tagline:
            "A native macOS paint app, built because the good ones are paid and the free ones are unpleasant.",
        year: "2026",
        platform: "macOS",
        kind: "Solo project",
        role: "Sole developer",
        period: "Jul 2026",
        summary: [
            "A native drawing app for macOS blending ideas from ibisPaint and Procreate — layers, pressure-sensitive brushes, selection tools and document save/export, with SwiftUI for the interface and AppKit where SwiftUI does not reach.",
            "The core design decision is that interaction and rendering are separate protocols. A `DrawingTool` owns the interaction model; a `StrokeRenderer` is a pure function from input samples to pixels in a `CGContext`. Adding a brush means writing a renderer and registering it — no new tool subclass. Making any brush an eraser needs no code at all: the same renderer runs with a `.clear` blend mode.",
        ],
        highlights: [
            {
                title: "Protocol-first, strategy pattern",
                body: "`BrushTool` composes any `StrokeRenderer` — currently basic line, fade, dip pen and airbrush. A bespoke tool class is only needed when the interaction model itself differs, which so far is just the eyedropper and the selection tool.",
            },
            {
                title: "Three ownership boundaries, kept honest",
                body: "`PaintDocument` holds only what survives a save. `ToolManager` holds transient editing state that resets with a new window. `PaintView` is the AppKit rendering engine, deliberately outside the observation graph, where raw `NSEvent` handling and direct `CGContext` pixel work live.",
            },
            {
                title: "Undo discipline, two patterns that never mix",
                body: "Pixel-mutating operations snapshot the active layer's `CGImage` — never the whole composite. Structural layer operations register an inverse-replay closure instead, which is cheap because `Layer` is a reference type. Pure UI state — switching layers, tools or zoom — is never undoable.",
            },
            {
                title: "Brush maths that had to be right",
                body: "Airbrush jitter samples uniformly in a disk (`r = radius · √random`), because the naive form biases dots toward the centre. Fade and dip-pen taper along cumulative arc length rather than point count, so the effect is independent of how fast the stroke was drawn. Pressure prefers real `NSEvent.pressure` and falls back to local stroke velocity.",
            },
        ],
        stack: [
            {
                group: "Platform",
                items: [
                    "Swift",
                    "SwiftUI",
                    "AppKit",
                    "Core Graphics",
                    "macOS 26",
                ],
            },
            {
                group: "Architecture",
                items: [
                    "Protocol-oriented (DrawingTool / StrokeRenderer)",
                    "ReferenceFileDocument",
                    "NSUndoManager",
                ],
            },
        ],
        contribution: "30 of 30 commits",
        links: [
            {
                label: "Repository",
                href: "https://github.com/Ahingg/macnpaint",
            },
        ],
        shots: [
            {
                src: "/screenshots/macnpaint/canvas.jpg",
                device: "mac",
                caption:
                    "The canvas, the tool bar and the layer stack — SwiftUI around an AppKit rendering view",
            },
            {
                src: "/screenshots/macnpaint/layers.jpg",
                device: "mac",
                caption:
                    "Each layer is its own bitmap, with independent opacity and visibility",
            },
            {
                src: null,
                device: "mac",
                caption: "The four brush renderers side by side",
                todo: "One stroke from each renderer — basic line, fade, dip pen, airbrush — on a single canvas, so the differences in taper and jitter are visible.",
            },
        ],
        featured: true,
    },
    {
        slug: "neptune",
        name: "Neptune",
        tagline:
            "A programming online judge for BINUS, built to replace the one everybody complained about.",
        year: "2025",
        platform: "Web",
        kind: "Research group",
        role: "Full-Stack Developer",
        period: "Feb 2025 – Jul 2025",
        summary: [
            "Neptune came out of a Research Interest Group at the BINUS University Software Laboratory Center. It is a programming online judge modelled on LeetCode, built to improve on the UI/UX and the system dependencies of the judge the university was using at the time.",
            "Submissions are queued rather than executed inline: the Go backend publishes to an AMQP queue and a Judge0 service runs the code, which keeps grading load off the request path. Authentication goes through the university's own Messier service, so students use their existing accounts.",
        ],
        highlights: [
            {
                title: "Queued grading",
                body: "Submissions are handed to an AMQP queue and executed by Judge0 rather than run inline, so a burst of submissions during a contest does not block the API.",
            },
            {
                title: "Contest and class structure",
                body: "The backend models cases, test cases, classes, semesters, contests, leaderboards and languages as first-class resources — the shape a university judge actually needs, not just a problem list.",
            },
            {
                title: "University SSO",
                body: "Authentication proxies BINUS's Messier service, so there is no separate account to create and no separate password to lose.",
            },
        ],
        stack: [
            {
                group: "Frontend",
                items: [
                    "React 19",
                    "TypeScript",
                    "Vite",
                    "Tailwind CSS",
                    "DaisyUI",
                    "Jotai",
                    "React Router",
                    "Axios",
                ],
            },
            { group: "Backend", items: ["Go", "Gin", "PostgreSQL", "JWT"] },
            { group: "Infrastructure", items: ["RabbitMQ (AMQP)", "Judge0"] },
        ],
        links: [
            {
                label: "Backend repository",
                href: "https://github.com/Ahingg/neptune_BE",
            },
            {
                label: "Frontend repository",
                href: "https://github.com/Ahingg/neptune_fe_migrate",
            },
        ],
        logo: "/img/neptune-logo.png",
        shots: [
            {
                src: "/screenshots/neptune/1.png",
                device: "browser",
                caption:
                    "Contest view — the problem, the verdict and the standings on one screen",
            },
            {
                src: "/screenshots/neptune/4.png",
                device: "browser",
                caption:
                    "Assistant view — every submission a student made, with the source behind each verdict",
            },
            {
                src: "/screenshots/neptune/2.png",
                device: "browser",
                caption:
                    "Case management — problems and the test cases uploaded against them",
            },
            {
                src: "/screenshots/neptune/3.png",
                device: "browser",
                caption:
                    "Sign-in through the university's own accounts, so there is no new password",
            },
        ],
        featured: false,
    },
    {
        slug: "ergasia",
        name: "Ergasia",
        tagline:
            "A decentralised freelance marketplace on the Internet Computer, paid in its own token.",
        year: "2025",
        platform: "Web · ICP",
        kind: "Hackathon — Codefeast Hackathon 11",
        role: "Frontend Developer",
        period: "Mar 2025 – Aug 2025",
        summary: [
            "Ergasia connects clients and freelancers without a company in the middle. Clients post and manage jobs, review submitted work and accept or reject it; freelancers search, apply and submit. Everything that would normally sit in a company's database — the jobs, the applications, the messages, the balances — lives in canisters on the Internet Computer instead.",
            "Payment is the part that decides whether a marketplace like this is trustworthy, so it settles on chain: clients pay in the Ergasia token through an ICRC-1 ledger, and identity is handled by Internet Identity rather than an email and a password. I built the frontend — the job board, the client and freelancer flows, the messaging and the wallet screens.",
        ],
        highlights: [
            {
                title: "On-chain payment through an ICRC-1 ledger",
                body: "Job payment runs through the Ergasia token on an ICRC-1 ledger canister rather than a payment processor, so the money moves under the same rules the rest of the platform does.",
            },
            {
                title: "Internet Identity instead of accounts",
                body: "Authentication uses Internet Identity, so there is no password to store and no account table to breach.",
            },
            {
                title: "AI agents on both sides of the market",
                body: "Clients get an agent that finds freelancers; freelancers get one that drafts cover letters and profiles. A separate Python service handles face recognition with DeepFace for identity verification.",
            },
        ],
        stack: [
            {
                group: "Frontend",
                items: [
                    "React",
                    "TypeScript",
                    "Vite",
                    "Ant Design",
                    "Tailwind CSS",
                    "Jotai",
                    "React Router",
                ],
            },
            {
                group: "Chain",
                items: [
                    "Motoko",
                    "Internet Computer",
                    "ICRC-1 ledger",
                    "Internet Identity",
                ],
            },
            {
                group: "AI services",
                items: ["Python", "DeepFace", "Fetch.ai"],
            },
        ],
        links: [
            {
                label: "Repository",
                href: "https://github.com/memeett/icp",
            },
        ],
        logo: "/img/ergasia-logo.png",
        shots: [
            {
                src: "/screenshots/ergasia/1.png",
                device: "browser",
                caption:
                    "The landing page states the escrow flow up front: deposit, hire, submit, release",
            },
            {
                src: "/screenshots/ergasia/3.png",
                device: "browser",
                caption:
                    "Wallet — balance held in Ergn, the platform's own ICRC-1 token",
            },
            {
                src: "/screenshots/ergasia/2.png",
                device: "browser",
                caption:
                    "Inviting a freelancer to a job, addressed by their principal rather than an email",
            },
            {
                src: "/screenshots/ergasia/4.png",
                device: "browser",
                caption:
                    "The AI job advisor, reachable from anywhere in the app",
            },
        ],
        featured: false,
    },
    {
        slug: "starlette",
        name: "Starlette",
        tagline:
            "A 2D escape-room puzzle game that teaches programming logic without ever saying so.",
        year: "2025",
        platform: "Game · Unity",
        kind: "Group project",
        role: "Main Developer · Asset Maker · Project Manager",
        period: "Mar 2025 – Jun 2025",
        summary: [
            "Starlette strands the player aboard a station whose systems have gone down, where the only way through a door is solving the logic puzzle behind it. Each puzzle is a programming construct in disguise — a loop, a conditional, a variable, an operator — assembled through a block-based system rather than typed as code, so a player who has never programmed can still reason their way through.",
            "The design bet is that a game you play for fun teaches better than a tutorial you agree to sit through. Puzzles get harder in the order the concepts build on each other, and the escape-room framing means every solved puzzle opens something rather than just scoring a point.",
        ],
        highlights: [
            {
                title: "Puzzles that are constructs, not quizzes",
                body: "Each room maps onto a real programming idea — loops, conditionals, variables, operators — so solving it is practising the concept rather than recalling its definition.",
            },
            {
                title: "Block-based, so syntax never blocks the lesson",
                body: "Players assemble solutions from blocks in the manner of Scratch. Nothing fails because of a missing semicolon, which keeps the difficulty in the logic where it belongs.",
            },
            {
                title: "Accounts and progress in the cloud",
                body: "Firebase handles authentication and stores progress, so a player's route through the lab survives leaving the game.",
            },
        ],
        stack: [
            { group: "Engine", items: ["Unity", "C#"] },
            { group: "Backend", items: ["Firebase Authentication", "Firebase"] },
            { group: "Design", items: ["Figma", "Canva"] },
        ],
        links: [
            {
                label: "Repository",
                href: "https://github.com/TazkieCT/starlette",
            },
        ],
        logo: "/img/starlette-logo.png",
        shots: [
            {
                src: "/screenshots/starlette/1.jpg",
                device: "browser",
                caption:
                    "The station — rooms open as their puzzles are solved",
            },
            {
                src: "/screenshots/starlette/3.jpg",
                device: "browser",
                caption:
                    "The puzzle itself: assemble the expression from blocks, then submit it",
            },
            {
                src: "/screenshots/starlette/2.jpg",
                device: "browser",
                caption:
                    "Each concept is explained before it is tested — here, operators",
            },
            {
                src: "/screenshots/starlette/4.jpg",
                device: "browser",
                caption:
                    "The opening comic: the systems are down and you are the last chance",
            },
        ],
        featured: false,
    },
];

export function projectBySlug(slug: string): Project | undefined {
    return PROJECTS.find((p) => p.slug === slug);
}
