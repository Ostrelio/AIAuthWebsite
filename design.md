# Boundary Color System

**Status:** Official  
**Product:** Boundary  
**Scope:** Public website  
**Source of truth:** [`app/globals.css`](app/globals.css)  
**Last verified:** 2026-10-03

## 1. Color direction

Boundary uses a warm, paper-like neutral foundation with near-black typography and structural rules. Electric blue identifies the product and interactive emphasis. Green, amber, and red are reserved for authorization outcomes. Dark product surfaces invert the neutral system without changing the meaning of the semantic colors.

The palette should feel precise, editorial, and operational. Color is used sparingly; hierarchy should come primarily from typography, spacing, rules, and contrast.

## 2. Canonical tokens

These tokens are the approved starting point for all new website work. Use the CSS variable rather than copying its hex value.

| Swatch | Token | Value | Role |
| --- | --- | --- | --- |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#f2f0e9;border:1px solid #cbc9bf"></span> | `--paper` | `#F2F0E9` | Primary page background |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#121311;border:1px solid #121311"></span> | `--ink` | `#121311` | Primary text, marks, and solid controls |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#686961;border:1px solid #686961"></span> | `--muted` | `#686961` | Secondary text |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#cbc9bf;border:1px solid #cbc9bf"></span> | `--line` | `#CBC9BF` | Rules, borders, and input outlines on light surfaces |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#343630;border:1px solid #343630"></span> | `--line-dark` | `#343630` | Rules and borders on dark surfaces |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#1647e8;border:1px solid #1647e8"></span> | `--accent` | `#1647E8` | Brand emphasis, focus ring, active flow, and human action |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#14734f;border:1px solid #14734f"></span> | `--allow` | `#14734F` | Allowed, approved, healthy, and successful states |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#b96d08;border:1px solid #b96d08"></span> | `--approval` | `#B96D08` | Review or approval-required states |
| <span style="display:inline-block;width:2.5rem;height:1rem;background:#c53627;border:1px solid #c53627"></span> | `--deny` | `#C53627` | Denied, blocked, destructive, and error states |

### Framework aliases

| Alias | Resolves to |
| --- | --- |
| `--background` | `--paper` |
| `--foreground` | `--ink` |
| `--primary` | `--ink` |
| `--primary-foreground` | `#FFFFFF` |
| `--secondary` | `#E8E6DE` |
| `--secondary-foreground` | `--ink` |
| `--border` / `--input` | `--line` |
| `--ring` | `--accent` |

## 3. Supporting palette

Supporting colors already used by the website may be reused only for the same visual role. They are not substitutes for canonical tokens.

### Light surfaces and structure

| Value | Current use |
| --- | --- |
| `#FAF9F4` | Elevated task card |
| `#F8F7F2` | Approval and policy panels |
| `#F7F6F1` | Tables, comparison panels, and identity panels |
| `#F5F4EE` | Form fields |
| `#F4F3ED` | Context layer |
| `#F1F0EA` | Light text on dark sections |
| `#EEEDE8` | Primary content on dark product surfaces |
| `#EEECE4` | Context-result surface |
| `#EAE8E0` | System-section background |
| `#E9E7DF` | Policy, audit, and final CTA section background |
| `#E8EBF9` | Blue-tinted Boundary identity panel |
| `#D8D6CE` | Table row divider |
| `#CCCBC2` | Final CTA construction lines |

### Dark surfaces and structure

| Value | Current use |
| --- | --- |
| `#10120F` | Opening curtain |
| `#121411` | Full-width dark sections and footer |
| `#171916` | Runtime, control-plane, and integration panels |
| `#191B18` | Hard-policy and code panels |
| `#232620` | Active code tab |
| `#343730`–`#3E423A` | Dark dividers, rails, and borders |

### Brand blue variants

| Value | Current use |
| --- | --- |
| `#5275F6` | Opening headline emphasis |
| `#6E8DFF` | Animated seam and scroll cue |
| `#7693FF` | Dark-surface headings, active indicators, and flow nodes |
| `#89A4FF` | Code keyword highlight |

### Authorization states

| State | Light-surface color | Dark-surface color | Supporting fill or border |
| --- | --- | --- | --- |
| Allow / success | `#14734F` | `#61BD91` or `#6EBF98` | `#DCEBE4`, `#A8C8B7` |
| Approval required | `#925706` text, `#E09A1B` marker | `#E6A939` | `#F1E8D6`, `#E6A128`, `#F0A822` |
| Deny / blocked | `#C53627` | `#ED7366` or `#EF7D70` | `#291714`, `#351A16`, `#63342E`, `#90453C` |
| Form error | `#9A2828` | Not defined | None |

### Code syntax accents

These colors belong only inside code examples on a dark surface.

| Value | Role |
| --- | --- |
| `#89A4FF` | Keywords and API names |
| `#E7B869` | Strings |
| `#C398EF` | Purple syntax accent |
| `#74AEDB` | Blue syntax accent |
| `#C2C6BD` | Primary code text |
| `#A8ADA3` | Default code text |

## 4. Usage rules

1. Use `--paper` and `--ink` as the default light theme pair.
2. Use `--accent` for product identity, focus, active flow, and deliberate emphasis. Do not use it as decoration across large areas.
3. Preserve semantic meaning: green means allow/success, amber means approval or caution, and red means deny/error. Never interchange these colors for visual variety.
4. On dark surfaces, use the lighter semantic variants listed above; the canonical light-surface state colors are too subdued there.
5. Use `--line` and `--line-dark` for structure, not body text. Fine rules may be low contrast because they are decorative, but controls must remain identifiable without relying on those rules alone.
6. Use warm neutrals. Do not introduce cool gray or pure black surfaces unless a new system token is approved.
7. New recurring colors must be promoted to a named token in `:root` and added to this document. Avoid adding another near-duplicate gray.

## 5. Accessibility

The approved primary pairs meet WCAG AA for normal text:

| Foreground | Background | Contrast |
| --- | --- | ---: |
| `#121311` | `#F2F0E9` | `16.34:1` |
| `#686961` | `#F2F0E9` | `4.87:1` |
| `#1647E8` | `#F2F0E9` | `5.94:1` |
| `#14734F` | `#F2F0E9` | `5.12:1` |
| `#C53627` | `#F2F0E9` | `4.68:1` |
| `#EEEDE8` | `#121411` | `15.80:1` |
| `#7693FF` | `#121411` | `6.52:1` |

`--approval` (`#B96D08`) on `--paper` is `3.51:1`; reserve that pair for large or bold text and non-text indicators. For normal-size approval copy, use `#925706`, which is the website's darker approval text color. Color must never be the only way an authorization state is communicated; retain the label, icon, or shape used by the component.

## 6. Effects and overlays

- Light grid lines use ink at `4%`–`5.5%` opacity.
- Light elevation shadows use ink at `5%`–`9%` opacity.
- The opening seam uses accent blue at `18%` and `38%` for glow, with `rgb(67 108 255 / 56%)` for its line.
- The runtime shell uses `rgba(246, 245, 240, 0.96)`.
- Gradients are structural only: grid construction lines and the radial paper fade. Do not add decorative multicolor gradients.

## 7. Implementation

```css
color: var(--ink);
background: var(--paper);
border-color: var(--line);

/* Authorization outcome */
color: var(--allow); /* or --approval / --deny */

/* Product emphasis and keyboard focus */
color: var(--accent);
outline-color: var(--ring);
```

When the implementation and this document differ, `app/globals.css` is authoritative. Update both in the same change so the official specification stays synchronized with the product.
