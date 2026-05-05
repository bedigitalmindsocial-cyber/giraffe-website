# Life with Giraffe

The careers website for Giraffe Partners. Single-page experience with nine sections.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Mocked content layer in `src/lib/mock-data.ts` (CMS to be wired up later)
- Fonts via `next/font/google`: Bebas Neue (display), Fraunces (editorial),
  Inter (sans), VT323 (mono). Switch to the licensed Coolvetica / PP Editorial
  New / Neue Montreal woff2 files when they are licensed by adding @font-face
  blocks to `globals.css` and removing the next/font imports in `layout.tsx`.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
src/
  app/
    globals.css        Design tokens, section padding utilities, animations
    layout.tsx         Root layout, font loading, JSON-LD schema
    page.tsx           Mounts all 9 sections
  components/
    ImagePlaceholder.tsx   Coloured swatch standing in for real photos
    Modal.tsx              Reusable accessible modal (focus trap, ESC, backdrop)
    SectionHeading.tsx     Eyebrow + h2 + optional body
    WindowsFolderIcon.tsx  Inline SVG for the Win-95 folders
  lib/
    applyEvent.ts          Custom event for memo → apply-form role pre-select
    dateRelative.ts        "X days ago" formatting for memos
    mock-data.ts           Roles, gallery, work folders, team, FAQ
    schema.ts              JSON-LD Organization + JobPosting builders
    types.ts               Shared content types
  sections/
    01-hero/               Section 1 — hero
    02-team/               Section 2 — four people grid
    03-week/               Section 3 — three moments alternating
    04-work/               Section 4 — Win-95 folder desktop + modal
    05-roles/              Section 5 — corkboard with pinned memos
    06-gallery/            Section 6 — Pinterest masonry + lightbox
    07-apply/              Section 7 — application form (mock submission)
    08-faq/                Section 8 — FAQ accordion
    09-footer/             Section 9 — footer band
public/
  fonts/                   (Empty) drop licensed woff2 files here when ready
  og-image.png             (Not yet committed) commission separately
```

## Design tokens

All brand tokens live in `tailwind.config.ts` and `src/app/globals.css`. Do
not introduce colours, typefaces, or sizes outside those files.

Colour names: `deep-purple`, `accent-purple`, `mid-purple-1` through
`mid-purple-5`, `ink`, `paper`, `rule`, `cork-base`, `cork-texture`,
`wooden-frame`.

## Mock submission

The application form in section 7 simulates a 900ms submission delay and then
shows the success state. To wire a real backend later:

1. Replace the body of `onSubmit` in `src/sections/07-apply/ApplyForm.tsx`
   with a `fetch('/api/applications', { method: 'POST', body: formData })`
   that includes the file upload.
2. Add a `route.ts` handler under `src/app/api/applications/` that validates,
   stores the file, creates the application record, and sends the
   confirmation + notification emails.

## Inter-section communication

The corkboard memo's "Apply now" button and the empty-state "Say hello anyway"
link both dispatch a `lwg:apply-role` custom event with a role slug (or
"general"). The apply form listens for this event and pre-selects the role
in its dropdown. See `src/lib/applyEvent.ts`.

## Status

All five build milestones are complete. The site renders end-to-end against
mocked content. Next deferred items: licensed font files, real photography,
backend integration for the application form, OG image asset, gallery image
hosting and lazy loading, Lighthouse pass with real assets.
