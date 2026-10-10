---
# ─────────────────────────────────────────────────────────────
# Boundary · frame.md — video-first companion to design.md
# Atoms are sacred · composition is free · numbers come from the script.
# ─────────────────────────────────────────────────────────────

colors:
  # Canonical (verbatim from design.md §2)
  paper:       "#F2F0E9"   # primary page background
  ink:         "#121311"   # primary text / marks / solid controls
  muted:       "#686961"   # secondary text
  line:        "#CBC9BF"   # rules / borders / input outlines on light
  line-dark:   "#343630"   # rules / borders on dark
  accent:      "#1647E8"   # brand emphasis / focus / active flow
  allow:       "#14734F"   # allowed / healthy / success
  approval:    "#B96D08"   # review / approval-required
  deny:        "#C53627"   # denied / blocked / destructive

  # Framework aliases (verbatim §2)
  background:         "{colors.paper}"
  foreground:         "{colors.ink}"
  primary:            "{colors.ink}"
  primary-foreground: "#FFFFFF"
  secondary:          "#E8E6DE"
  border:             "{colors.line}"
  ring:               "{colors.accent}"

  # Supporting · light surfaces (verbatim §3)
  surface-elevated:  "#FAF9F4"   # elevated task card
  surface-panel:     "#F8F7F2"   # approval / policy panels
  surface-table:     "#F7F6F1"   # tables / comparison / identity
  surface-field:     "#F5F4EE"   # form fields
  surface-context:   "#F4F3ED"   # context layer
  surface-cta:       "#E9E7DF"   # policy / audit / final CTA ground
  surface-identity:  "#E8EBF9"   # blue-tinted identity panel
  divider-row:       "#D8D6CE"   # table row divider
  construction:      "#CCCBC2"   # final-CTA construction lines

  # Supporting · dark surfaces (verbatim §3)
  curtain:           "#10120F"   # opening curtain
  dark-field:        "#121411"   # full-width dark sections / footer
  dark-panel:        "#171916"   # runtime / control-plane / integration
  dark-code:         "#191B18"   # hard-policy / code panels
  dark-tab:          "#232620"   # active code tab
  dark-rail:         "#3E423A"   # dark dividers / rails

  # Brand blue variants (verbatim §3)
  accent-headline:   "#5275F6"   # opening headline emphasis
  accent-seam:       "#6E8DFF"   # animated seam / scroll cue
  accent-dark-head:  "#7693FF"   # dark-surface headings / active indicators
  accent-code-kw:    "#89A4FF"   # code keyword highlight

  # Authorization — dark-surface variants (verbatim §3)
  allow-dark:        "#61BD91"
  approval-dark:     "#E6A939"
  deny-dark:         "#ED7366"
  approval-text:     "#925706"   # for normal-size approval copy on paper

typography:
  # Fonts — not fixed by design.md; derived substitute stacks noted in Known Gaps.
  families:
    sans: '"Neue Haas Grotesk", "Inter", -apple-system, "Helvetica Neue", Arial, sans-serif'
    mono: '"Berkeley Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace'

  # Reading ramp (web-compatible, px + cqw @ 1920)
  reading:
    micro:   { fontSize: 12px,  cqw: 0.63cqw, weight: 500, tracking: 0.06em,  lineHeight: 1.2 }  # chrome only
    small:   { fontSize: 14px,  cqw: 0.73cqw, weight: 400, tracking: 0,       lineHeight: 1.45 }
    body:    { fontSize: 18px,  cqw: 0.94cqw, weight: 400, tracking: 0,       lineHeight: 1.5 }
    lead:    { fontSize: 24px,  cqw: 1.25cqw, weight: 400, tracking: -0.005em, lineHeight: 1.4 }
    h3:      { fontSize: 32px,  cqw: 1.67cqw, weight: 500, tracking: -0.01em,  lineHeight: 1.2 }
    h2:      { fontSize: 48px,  cqw: 2.50cqw, weight: 500, tracking: -0.015em, lineHeight: 1.1 }
    h1:      { fontSize: 72px,  cqw: 3.75cqw, weight: 500, tracking: -0.02em,  lineHeight: 1.05 }

  # Hero / display ramp (frame-native, cqw @ 1920)
  display:
    wordmark-mega:    { fontSize: 24cqw, weight: 500, lineHeight: 0.84, tracking: -0.03em }
    display-hero:     { fontSize: 12cqw, weight: 500, lineHeight: 0.92, tracking: -0.025em }
    editorial-claim:  { fontSize:  7cqw, weight: 400, lineHeight: 1.02, tracking: -0.015em }
    section-head:     { fontSize: 4.2cqw, weight: 500, lineHeight: 1.05, tracking: -0.015em }
    stat-mega:        { fontSize: 18cqw, weight: 400, lineHeight: 0.86, tracking: -0.03em }
    stat-figure:      { fontSize:  9cqw, weight: 400, lineHeight: 0.9,  tracking: -0.02em }
    stat-ledger:     { fontSize: 2.4cqw, weight: 500, tracking: 0, feature: "tabular-nums" }
    code-line:       { fontSize: 2.0cqw, weight: 400, lineHeight: 1.4, family: "{typography.families.mono}" }
    eyebrow:         { fontSize: 1.4cqw, weight: 500, tracking: 0.14em, upper: true }   # at the floor
    rail-index:      { fontSize: 1.4cqw, weight: 500, tracking: 0,     feature: "tabular-nums" }
    caption:         { fontSize: 1.5cqw, weight: 400, lineHeight: 1.4 }

  legibility-floor: 1.4cqw   # ≈27px @ 1920 — any load-bearing line must sit at or above

rounded:
  hairline: 0            # structural rules are square-ended
  xs:       2px          # 0.10cqw — chrome chips
  sm:       4px          # 0.21cqw — default control radius
  md:       8px          # 0.42cqw — cards / cells
  pill:     999px        # giant pills, state badges

spacing:
  # Frame scale
  frame-pad:        5cqw     # safe-area inset on 16:9
  frame-pad-short:  5.5cqw   # safe-area inset on short edge for 9:16 / 1:1
  gutter-sm:        1.5cqw
  gutter-md:        3cqw
  gutter-lg:        6cqw
  rule-weight:      2px      # hairline rule weight; thickens to 4px for display dividers
  rule-weight-display: 4px

components:
  # ─ Marks & chrome ─────────────────────────────────────────
  wordmark:
    typography:     "{typography.display.wordmark-mega}"
    textColor:      "{colors.ink}"
    letterSpacing:  "-0.03em"

  rail-index:
    typography:     "{typography.display.rail-index}"
    textColor:      "{colors.muted}"
    # Placed in top-left or bottom-left margin as "01 / 08"

  eyebrow:
    typography:     "{typography.display.eyebrow}"
    textColor:      "{colors.muted}"
    textTransform:  "uppercase"
    # Thin horizontal rule in {colors.line} precedes the label; keep nowrap.

  rule-hairline-light:
    backgroundColor: "{colors.line}"
    height:          "{spacing.rule-weight}"

  rule-hairline-dark:
    backgroundColor: "{colors.line-dark}"
    height:          "{spacing.rule-weight}"

  rule-display:
    backgroundColor: "{colors.ink}"
    height:          "{spacing.rule-weight-display}"
    # Heavy rule beneath section-head and editorial-claim

  # ─ Buttons & pills ────────────────────────────────────────
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor:       "{colors.primary-foreground}"
    typography:      "{typography.reading.body}"
    rounded:         "{rounded.sm}"
    padding:         "14px 22px"

  button-primary-giant:
    backgroundColor: "{colors.ink}"
    textColor:       "{colors.primary-foreground}"
    typography:      "{typography.display.section-head}"
    rounded:         "{rounded.pill}"
    padding:         "1.4cqw 3.4cqw"

  button-accent-giant:
    backgroundColor: "{colors.accent}"
    textColor:       "{colors.primary-foreground}"
    typography:      "{typography.display.section-head}"
    rounded:         "{rounded.pill}"
    padding:         "1.4cqw 3.4cqw"

  # ─ State pills (authorization semantics — never interchange) ─
  state-pill-allow:
    backgroundColor: "transparent"
    textColor:       "{colors.allow}"
    typography:      "{typography.display.eyebrow}"
    rounded:         "{rounded.pill}"
    padding:         "0.5cqw 1.2cqw"
    border:          "{spacing.rule-weight} solid {colors.allow}"

  state-pill-approval:
    backgroundColor: "transparent"
    textColor:       "{colors.approval-text}"       # normal-size uses darker text (§5)
    typography:      "{typography.display.eyebrow}"
    rounded:         "{rounded.pill}"
    padding:         "0.5cqw 1.2cqw"
    border:          "{spacing.rule-weight} solid {colors.approval}"

  state-pill-deny:
    backgroundColor: "transparent"
    textColor:       "{colors.deny}"
    typography:      "{typography.display.eyebrow}"
    rounded:         "{rounded.pill}"
    padding:         "0.5cqw 1.2cqw"
    border:          "{spacing.rule-weight} solid {colors.deny}"

  state-pill-accent:
    backgroundColor: "transparent"
    textColor:       "{colors.accent}"
    typography:      "{typography.display.eyebrow}"
    rounded:         "{rounded.pill}"
    padding:         "0.5cqw 1.2cqw"
    border:          "{spacing.rule-weight} solid {colors.accent}"

  # ─ Policy / ledger cell ───────────────────────────────────
  policy-cell:
    backgroundColor: "{colors.surface-elevated}"
    textColor:       "{colors.ink}"
    rounded:         "{rounded.md}"
    padding:         "2.2cqw 2.6cqw"
    border:          "{spacing.rule-weight} solid {colors.line}"
    # Interior: subject · action · resource rail (mono {typography.display.code-line})
    # topped by a state-pill-* and separated by rule-hairline-light.

  ledger-row:
    backgroundColor: "transparent"
    textColor:       "{colors.ink}"
    typography:      "{typography.display.stat-ledger}"
    padding:         "1.2cqw 0"
    borderBottom:    "{spacing.rule-weight} solid {colors.divider-row}"
    # Columns: index · subject (mono) · action · resource (mono) · state-pill-* (right)

  # ─ Code specimen (dark panel) ─────────────────────────────
  code-panel:
    backgroundColor: "{colors.dark-code}"
    textColor:       "#C2C6BD"       # primary code text (verbatim §3)
    typography:      "{typography.display.code-line}"
    rounded:         "{rounded.md}"
    padding:         "3cqw 3.4cqw"
    border:          "{spacing.rule-weight} solid {colors.dark-rail}"

  code-tab:
    backgroundColor: "{colors.dark-tab}"
    textColor:       "#A8ADA3"
    typography:      "{typography.display.eyebrow}"
    rounded:         "{rounded.sm} {rounded.sm} 0 0"
    padding:         "0.8cqw 1.6cqw"

  # ─ Stat / figure block ────────────────────────────────────
  stat-mega-block:
    backgroundColor: "transparent"
    textColor:       "{colors.ink}"
    typography:      "{typography.display.stat-mega}"
    # Caption below set in {typography.display.caption}, {colors.muted}.

  stat-figure-block:
    backgroundColor: "transparent"
    textColor:       "{colors.ink}"
    typography:      "{typography.display.stat-figure}"

  # ─ Grounds (used by Frame Treatments) ─────────────────────
  ground-paper:
    backgroundColor: "{colors.paper}"
  ground-ink:
    backgroundColor: "{colors.dark-field}"
  ground-curtain:
    backgroundColor: "{colors.curtain}"
  ground-identity:
    backgroundColor: "{colors.surface-identity}"
  ground-cta:
    backgroundColor: "{colors.surface-cta}"
---

# frame.md — Boundary at frame scale

> **Atoms are sacred · composition is free · numbers come from the script.**

This companion sits beside `design.md`. The web source is color-only; typography, components,
spacing, and frame behavior are **derived here** against Boundary's stated register — precise,
editorial, operational — and remain subservient to the canonical color tokens, their roles, and
the authorization-semantic rules. Every hex, every alias, every authorization pairing is carried
over verbatim. Nothing new has been introduced to the palette.

## Overview

Boundary is an **authorization product** shown in an **editorial, operational** register. On
paper (`{colors.paper}`), near-black ink (`{colors.ink}`) and structural hairlines
(`{colors.line}`) do the work; electric blue (`{colors.accent}`) is the single voltage. The
semantic triad — `{colors.allow}` · `{colors.approval}` · `{colors.deny}` — carries meaning,
never decoration. Dark surfaces (`{colors.dark-field}`, `{colors.dark-code}`) invert the system
without changing what any color means. The frame is a **page from an operations manual**, not a
screen; it should read like a specimen, not a slide.

### Frame Craft Bar
- **Squint** — exactly one element dominates at **3–6×** its nearest neighbor (the wordmark, the
  claim, the single policy cell, the mega figure). A chasm, not a ramp.
- **Silence** — sparse archetypes (cover, claim, focal-artifact, stat, closer) read **55–75%
  empty**. The paper is the brand's confidence. The **ledger/catalog** plate is the one named
  density exception.
- **Restraint** — `{colors.accent}` fires **once per frame** at full strength. The semantic
  triad appears together only in a state-grid plate; everywhere else, one state leads. The
  wordmark is never set beside the accent at full strength on the same frame.
- **Reference bar** — aim at a *Pentagram/MIT Press/Stripe-docs* specimen: ink on paper,
  measured rules, numerals as evidence. Failure looks like a generic SaaS feature grid: three
  equal icon-headline-blurb columns, product shot parked right, cookie-banner footer.

## Colors

Full-frame grounds — never mixed in the same frame:
- `{components.ground-paper}` — the default. Hosts identity, editorial, focal, ledger, closer.
- `{components.ground-ink}` — inversion. Hosts a stat, a code specimen, or a closer with accent
  CTA. Headings use `{colors.accent-dark-head}` (`#7693FF`) per §5.
- `{components.ground-curtain}` — the opening-curtain register (`{colors.curtain}`), reserved
  for a single establishing frame.
- `{components.ground-identity}` — blue-tinted `{colors.surface-identity}` for an identity
  plate only.
- `{components.ground-cta}` — warm `{colors.surface-cta}` for a closer when paper feels thin.

Accent rules carry over §4 exactly:
- `{colors.accent}` is for product identity, focus, and deliberate emphasis. **Not** large-area
  decoration.
- Semantic colors retain meaning: `{colors.allow}` = allow, `{colors.approval}` = approval,
  `{colors.deny}` = deny. Never swapped for visual variety.
- On dark surfaces use the dark variants (`{colors.allow-dark}`, `{colors.approval-dark}`,
  `{colors.deny-dark}`). The light-surface state colors are too subdued there.
- `{colors.line}` and `{colors.line-dark}` are **structural**, never body text.
- Color is never the only cue for an authorization state: pair with a label and the state pill
  shape.

## Typography

Two ramps carried in frontmatter:

**Reading ramp** — the familiar web hierarchy, each row given its `cqw` equivalent so a frame
inheriting web type sits honestly in-frame. `body` (0.94cqw) and below are **not load-bearing in
frames**; they belong to captions, chrome, and the colophon.

**Display / hero ramp** — frame-native sizes for identity, claim, stat, and ledger moves.
`wordmark-mega` (24cqw) is the identity move; `display-hero` (12cqw) is a one-word claim;
`editorial-claim` (7cqw) is a two-line claim at fit-to-measure; `stat-mega` (18cqw) and
`stat-figure` (9cqw) carry a single numeral.

**Fit-to-measure headlines** — the hero ramp is stepped by **word count**:
≤ 3 words → `{typography.display.display-hero}` (12cqw);
4–6 words → `{typography.display.editorial-claim}` (7cqw);
7+ words → `{typography.display.section-head}` (4.2cqw).
Headline text block never exceeds **78cqw wide** and never touches the safe margin.

**Legibility floor** — any load-bearing line is **≥ 1.4cqw** (≈27px @ 1920). `micro` (0.63cqw)
and `small` (0.73cqw) are chrome only; they may index or label but may never carry a beat's
meaning. Numerals in `{components.ledger-row}` use `tabular-nums`.

## Layout — The Frame

- **Primary frame:** 1920 × 1080 (16:9). Secondary: 1080 × 1920 (9:16). Square: 1080 × 1080.
- **Safe area:** `{spacing.frame-pad}` (5cqw) on 16:9; `{spacing.frame-pad-short}` (5.5cqw) on
  the short edge for 9:16 and 1:1. Nothing load-bearing crosses the safe line.
- **The vw/cqw law.** Display sizes, gaps, and padding use **`cqw` against the frame**
  (1px @ 1920 → `0.0521cqw`). Fixed px is reserved for chrome atoms the brand defines in px:
  hairline weights (2px), control radii (4px/8px), micro labels.
- **cqw note.** `cqw` resolves against a container with `container-type: size`. The showcase
  renders each frame with that container so a 24cqw wordmark sits at true frame proportions
  even in a small contact-sheet tile — not against the viewport.

## Elevation & Depth

The depth ceiling is low. Boundary's surfaces are **flat paper and flat ink**. Permitted:
- A **single lift** on `{components.policy-cell}` using ink at 5–9% opacity (per §6), ≤ 24px
  blur, no colored shadow.
- **Hairlines** (`{components.rule-hairline-light}`, `{components.rule-hairline-dark}`,
  `{components.rule-display}`) are the primary separator.

Banned at frame scale: multicolor gradients, drop-shadows on type, glass/blur chrome, decorative
blur backdrops. The opening seam (accent at 18%/38% + `rgb(67 108 255 / 56%)` line) from §6 is
the *only* permitted decorative accent, and only on the curtain frame.

## Shapes

- `{rounded.hairline}` (0) — structural rules.
- `{rounded.xs}` (2px) — chips.
- `{rounded.sm}` (4px) — default control radius; buttons and inputs.
- `{rounded.md}` (8px) — cards and ledger cells.
- `{rounded.pill}` (999px) — state pills and giant pill CTAs.

CTA geometry rule: giant pill CTAs (`{components.button-primary-giant}`,
`{components.button-accent-giant}`) are the only place `{rounded.pill}` scales up. The square
rules and 4/8px chrome radii never change.

## Components

Every buildable unit is defined as a frontmatter token. Prose here is intent and construction
notes only — never resolved values.

- **`{components.wordmark}`** — the identity move. Set BOUNDARY in `{typography.display.wordmark-mega}`,
  tracked tight. Appears once per sequence, never crowded.
- **`{components.rail-index}`** — margin indexing (`01 / 08`) in `{typography.display.rail-index}`,
  `{colors.muted}`. Placed in a corner of the safe area; carries sequence location.
- **`{components.eyebrow}`** — the editorial kicker. **Rationed** — not on every frame; preceded
  by a short `{components.rule-hairline-light}` (≈6cqw wide) above the label.
- **`{components.rule-hairline-light}` / `{components.rule-hairline-dark}`** — 2px structural
  rules. Full-bleed under section heads, short under eyebrows.
- **`{components.rule-display}`** — 4px heavy rule beneath editorial claims and section heads.
- **`{components.button-primary}` / `{components.button-primary-giant}`** — ink pill actions.
- **`{components.button-accent-giant}`** — the one-per-sequence accent CTA. Reserved for the
  closer.
- **`{components.state-pill-allow}` / `-approval}` / `-deny}` / `-accent}`** — bordered pills.
  Border + text are the same semantic color (approval text uses `{colors.approval-text}` per
  §5 for small sizes). Always paired with a text label; never color-alone.
- **`{components.policy-cell}`** — the focal artifact: a single authorization decision on an
  elevated surface. Interior reads *subject → action → resource* in mono, topped by a state
  pill, with a `{components.rule-hairline-light}` separating header from body.
- **`{components.ledger-row}`** — the catalog unit: `index · subject · action · resource ·
  state`. Columns in `{typography.display.stat-ledger}` with `tabular-nums`; the right-most
  state cell carries the pill.
- **`{components.code-panel}` + `{components.code-tab}`** — the specimen panel on
  `{colors.dark-code}`. Keywords use `{colors.accent-code-kw}`, strings `#E7B869` (§3). Code
  colors live only on dark.
- **`{components.stat-mega-block}` / `{components.stat-figure-block}`** — single-numeral
  evidence. Caption below in `{typography.display.caption}` + `{colors.muted}`.
- **Grounds** (`{components.ground-paper}` / `-ink}` / `-curtain}` / `-identity}` / `-cta}`)
  are chosen first; everything else composes on top.

## Motion & Timing

Boundary's cut grammar is **operational and quiet**, not animated. Derived from the brand's
precise/editorial register:
- **Cuts, not transitions.** Hard cuts between frames. No slide, no fade longer than 80ms.
- **One permitted motion:** the opening-seam line (`rgb(67 108 255 / 56%)`) may draw once on
  the curtain frame; nothing else animates.
- **Must-not-animate:** the wordmark, state pills, ledger rows, policy cells, headlines, rules.
  Numerals never count up; pills never fade in; type never slides.
- **Dwell** is a function of density, not instruction: sparse frames (cover, claim, stat) hold
  briefly; the ledger frame holds longer so a reader can scan rows. Pace in each treatment
  below reflects this ratio.
- **Export:** 1920×1080 at 30fps, static end-state captures. Each frame must be legible as a
  still.

## Frame Treatments

Every treatment composes frontmatter components. No treatment invents a size in prose.

### 1 · Identity Cover  (identity · move: wordmark takes the frame)
**Ground** `{components.ground-paper}`, padding `{spacing.frame-pad}`.
**Container** flex column, justify end, align start; one line.
**Composes** `{components.wordmark}`, `{components.rail-index}`, `{components.eyebrow}`.
**Focal** `{components.wordmark}` set "BOUNDARY" at `{typography.display.wordmark-mega}`,
anchored centered horizontally, sitting on an invisible baseline at ~78% of frame height.
**Chrome** `{components.rail-index}` top-left ("01 / 08"); `{components.eyebrow}` bottom-left
("Authorization, inspected"), above a 6cqw `{components.rule-hairline-light}`.
**Accent** none — the wordmark is the voltage.
**Silence** ~70% empty (the top of the frame is paper).
**Fixed** wordmark glyph, ink color, baseline anchor.  **Free** eyebrow string, rail index.
**Density** sparse.

### 2 · Oversized Claim  (editorial · move: fit-to-measure headline + heavy rule)
**Ground** `{components.ground-paper}`, padding `{spacing.frame-pad}`.
**Container** flex column, justify center, align center; max text-block 78cqw.
**Composes** `{components.rule-display}`, `{components.eyebrow}` (optional).
**Focal** headline in `{typography.display.editorial-claim}` (4–6 words) or
`{typography.display.display-hero}` (≤3 words); centered; the word carrying the beat may be set
in `{colors.accent}` for a single-word emphasis.
**Chrome** `{components.rule-display}` 32cqw wide, centered 3cqw below the headline.
**Accent** at most one word in `{colors.accent}`; if used, no accent pill elsewhere on frame.
**Silence** ~65% empty.
**Fixed** ramp step chosen by word count; centered anchor.  **Free** the words.
**Density** sparse.

### 3 · Focal Artifact — Policy Cell  (focal-artifact · move: single decision, centered)
**Ground** `{components.ground-paper}`, padding `{spacing.frame-pad}`.
**Container** flex column, justify center, align center; cell width 46cqw.
**Composes** `{components.policy-cell}`, `{components.state-pill-allow}` (or `-approval`/`-deny`
per script), `{components.rule-hairline-light}`, `{components.eyebrow}`.
**Focal** `{components.policy-cell}` centered. Interior: one state pill (top-left of cell),
subject line in mono, action in `{typography.display.section-head}` as the local focal
("ALLOW" / "DENY" / "REVIEW"), resource line in mono below a hairline.
**Chrome** `{components.eyebrow}` top-left of frame ("Decision"), with 6cqw hairline.
**Accent** none — the state color is the evidence.
**Silence** ~60% empty.
**Fixed** cell geometry, pill construction.  **Free** state, subject, action, resource strings.
**Density** sparse.

### 4 · Authorization Ledger  (data/ledger · move: catalog of decisions — density exception)
**Ground** `{components.ground-paper}`, padding `{spacing.frame-pad}`.
**Container** CSS grid, 1 column; `{components.ledger-row}` × 7–9, separated by their own
bottom rules.
**Composes** `{components.ledger-row}`, `{components.state-pill-allow}`,
`{components.state-pill-approval}`, `{components.state-pill-deny}`,
`{components.rule-display}`, `{components.eyebrow}`.
**Focal** the column of state pills on the right — the eye runs down a stripe of semantic
colors. Section head above ("Last 09:42–09:48") in `{typography.display.section-head}` with a
`{components.rule-display}` beneath.
**Chrome** `{components.rail-index}` top-right ("04 / 08"); `{components.eyebrow}` top-left
("Ledger").
**Accent** none; the semantic triad already carries weight.
**Silence** **tight by design — the density exception.**
**Fixed** row grammar (index · subject · action · resource · state), tabular-nums.
**Free** per-row strings and state mix.
**Density** dense-exception.

### 5 · Mega Figure  (stat · move: one numeral as evidence)
**Ground** `{components.ground-ink}`, padding `{spacing.frame-pad}`.
**Container** flex column, justify center, align center.
**Composes** `{components.stat-mega-block}`, `{components.eyebrow}`,
`{components.rule-hairline-dark}`.
**Focal** the numeral in `{typography.display.stat-mega}` (18cqw), color
`{colors.primary-foreground}` on ink; the unit character (`%`, `ms`) in
`{colors.accent-dark-head}` (`#7693FF`) at the same size.
**Chrome** `{components.eyebrow}` above, `{colors.accent-dark-head}`, preceded by a 6cqw
`{components.rule-hairline-dark}`; caption below in `{typography.display.caption}`,
`#EEEDE8` (verbatim §3 "Primary content on dark").
**Accent** the unit character only.
**Silence** ~68% empty.
**Fixed** stat ramp, dark ground, unit-color rule.  **Free** numeral, unit, caption.
**Density** sparse.

### 6 · Code Specimen  (brand-signature · move: a policy rule on dark)
**Ground** `{components.ground-ink}`, padding `{spacing.frame-pad}`.
**Container** flex column, align start; panel width 70cqw, centered.
**Composes** `{components.code-panel}`, `{components.code-tab}`,
`{components.state-pill-accent}`, `{components.eyebrow}`.
**Focal** `{components.code-panel}` centered on frame; interior holds 4–6 mono lines in
`{typography.display.code-line}`, syntax-colored per §3 (keywords `{colors.accent-code-kw}`,
strings `#E7B869`, default `#A8ADA3`).
**Chrome** `{components.code-tab}` top-left of panel ("policy.rego"); `{components.eyebrow}`
above panel ("Rule"), 6cqw `{components.rule-hairline-dark}` beneath; a
`{components.state-pill-accent}` sits inline with the eyebrow carrying the result ("ALLOW IF").
**Accent** the pill — once.
**Silence** ~55% empty.
**Fixed** panel chrome, syntax palette.  **Free** rule body, tab name, result pill text.
**Density** standard.

### 7 · State Grid  (chrome/catalog · move: the semantic triad shown together, once)
**Ground** `{components.ground-paper}`, padding `{spacing.frame-pad}`.
**Container** CSS grid, 3 columns, gap `{spacing.gutter-md}`; each column a slim
`{components.policy-cell}` holding only a state pill + one-word verdict.
**Composes** `{components.policy-cell}`, `{components.state-pill-allow}`,
`{components.state-pill-approval}`, `{components.state-pill-deny}`,
`{components.rule-display}`, `{components.eyebrow}`.
**Focal** the triad read left-to-right. The one-word verdict ("ALLOW" · "REVIEW" · "DENY")
in `{typography.display.section-head}`, each in its own semantic color.
**Chrome** section head above the grid ("Three outcomes"), `{components.rule-display}` beneath.
**Accent** none — this is the one plate where the triad fires at equal strength.
**Silence** ~45% empty (dense for Boundary; still airy).
**Fixed** three cells, semantic order, one word per cell.  **Free** section head wording.
**Density** standard.

### 8 · Closer  (closer · move: accent CTA pill on warm ground)
**Ground** `{components.ground-cta}`, padding `{spacing.frame-pad}`.
**Container** flex column, justify center, align center; stacked.
**Composes** `{components.button-accent-giant}`, `{components.eyebrow}`,
`{components.rule-hairline-light}`, `{components.rail-index}`.
**Focal** `{components.button-accent-giant}` centered, carrying a 1–3 word action.
**Chrome** short `{components.eyebrow}` above the pill with a 6cqw hairline; wordmark BOUNDARY
set small (`{typography.reading.lead}`, `{colors.ink}`) at bottom-center; rail index top-right.
**Accent** the pill — the one-per-sequence accent voltage.
**Silence** ~70% empty.
**Fixed** pill geometry, accent color, bottom wordmark.  **Free** pill text, eyebrow string.
**Density** sparse.

## Do's and Don'ts

**Do**
- Lean centered. Identity, claim, focal-artifact, state-grid, and closer center their focal
  element. Ledger and code use left-anchored editorial rhythm. No more than ~2 consecutive
  frames share an anchor.
- One idea per frame. ≤ 2–3 distinct elements (focal + at most a kicker and one support).
  When a frame wants to say two things, make it two frames.
- Vary the axis between consecutive frames. If frame N is centered, frame N+1 is left-anchored
  ledger or right-weighted artifact.
- Full-bleed grounds on cadence (every 3–4 frames), not by default. The ink stat is a full-bleed
  beat; the paper claim is not.
- Ration the eyebrow. Use on a minority of frames, not all.
- Fit-to-measure the headline by word count.
- Keep decorative elements out of the headline bounding box and off the eyebrow rail (≥ 2cqw
  keep-out).

**Don't**
- Don't park a headline left and a graphic right every frame — that's the slide tell.
- Don't fire `{colors.accent}` twice at full strength on one frame.
- Don't swap the semantic triad for visual variety (allow is green, approval is amber, deny is
  red — always).
- Don't let `{colors.line}` or `{colors.line-dark}` carry body text.
- Don't put code colors on paper. Code lives on `{colors.dark-code}`.
- Don't animate the wordmark, pills, cells, rows, or headlines.
- Don't introduce a hex not in §2 or §3.

## Aspect-Ratio Behavior

The same frontmatter sizes apply across ratios; what changes is container shape and anchor.

| Treatment | 16:9 (primary) | 9:16 | 1:1 |
|---|---|---|---|
| 1 Identity Cover | Wordmark centered, baseline 78% | Wordmark stacks "BOUND / ARY" at 36cqw, baseline 70% | Wordmark single line 32cqw, centered |
| 2 Oversized Claim | Centered claim, 78cqw block | Claim at `{typography.display.editorial-claim}` capped at 86cqw, 2–3 lines | Centered at `{typography.display.section-head}` × 1.3 |
| 3 Focal Artifact | Cell 46cqw centered | Cell 82cqw centered, header rail stacks above pill | Cell 64cqw centered |
| 4 Ledger | 7–9 rows, right-column pill stripe | 5–6 rows, resource column drops to second line under subject | 5 rows, action+resource merge to one line |
| 5 Mega Figure | Numeral 18cqw, caption below | Numeral 28cqw, caption fixed to short-edge safe | Numeral 22cqw, caption below |
| 6 Code Specimen | Panel 70cqw centered | Panel 86cqw; code lines wrap, max 4 lines | Panel 76cqw |
| 7 State Grid | 3 columns horizontal | Stacks to 3 rows (allow / review / deny top-to-bottom) | 3 columns, cells square-ish |
| 8 Closer | Giant pill centered | Pill 86cqw wide, line-breaks allowed | Pill centered, wordmark baseline fixed |

Safe area recomputes against the shorter edge for 9:16 and 1:1. No treatment reflow may drop a
load-bearing line below `{typography.legibility-floor}`.

## Approved Real Entities & Numerals

Boundary's `design.md` does not provide product entities, customer names, or figures. Treatments
therefore use **placeholder tokens** for volatile content — never invented statistics or company
names. Approved placeholders:

- Policy subjects: `{subject}` (e.g. a role or service name supplied by the script).
- Actions: `{action}` drawn from the verb list `read`, `write`, `delete`, `admin`, `impersonate`.
- Resources: `{resource}` set in mono; dotted path form (`service.resource.id`).
- Numerals in `{components.stat-mega-block}`: `{figure}` — never fabricated; must come from the
  script or the underlying data source.
- Timestamps: `{hh:mm}` 24-hour.

The one real entity is the brand mark **BOUNDARY** and the authorization vocabulary
(`ALLOW` / `REVIEW` / `DENY`).

## Pre-Render Self-Audit

Run before any frame is final:

- [ ] **Squint** — one element dominates at 3–6×.
- [ ] **Silence** — sparse plates read 55–75% empty; the ledger is the only density exception.
- [ ] **Restraint** — `{colors.accent}` fires once at full strength; semantic triad is paired
      only in the state-grid plate.
- [ ] **Weight** — type weights match the ramps; no weight introduced outside 400/500.
- [ ] **Depth** — only `{components.policy-cell}` lift is permitted; no multicolor gradients,
      no shadows on type, no glass.
- [ ] **Geometry** — radii from `{rounded.*}` only; rules at 2px or 4px only.
- [ ] **Anchor** — leans centered; anchor varied vs. previous frame; no more than ~2
      consecutive frames share one anchor.
- [ ] **Element count** — ≤ 2–3 distinct elements per frame; if two things, two frames.
- [ ] **Floor** — every load-bearing line ≥ 1.4cqw; `micro`/`small` carry no beat meaning.
- [ ] **Fidelity** — every size/color/radius traces to a frontmatter token; nothing invented
      in prose.
- [ ] **Semantics** — `allow`=green, `approval`=amber, `deny`=red; a label accompanies every
      state pill; code colors appear only on dark.

## Known Gaps

- **Typography not fixed by `design.md`.** Families, ramps, and the hero scale are **derived**
  here (`sans: Neue Haas Grotesk → Inter → system`; `mono: Berkeley Mono → JetBrains Mono →
  ui-monospace`). When Boundary promotes an official type token to `app/globals.css`, update
  `typography.families` and `typography.reading` to match and re-render the showcase.
- **Spacing scale derived.** `design.md` does not define a spacing scale; `spacing.*` here is
  derived from the frame-pad convention. Promote if the product scale is specified later.
- **`cqw` is a frame extension.** The DESIGN.md spec stores unknown units as strings; this
  frontmatter keeps `cqw` values as strings (e.g. `"24cqw"`) so spec consumers can round-trip.
- **Aspect-ratio reflow is guidance.** The 9:16 and 1:1 behaviors above are intent, not
  measured plates; verify in the showcase before export.
- **No real figures.** Treatments use `{figure}` / `{subject}` placeholders; the brand's spec
  contains no numerals to publish.
