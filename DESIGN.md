---
name: Northline
description: A hand-designed family dental clinic site for Tamil Nadu, white and navy with a friendly full palette and simple shapes.
colors:
  canvas: "#FFFFFF"
  navy-ink: "#172033"
  body-slate: "#3D4656"
  muted-slate: "#5C6577"
  hairline: "#E4E7EE"
  hairline-strong: "#CBD0DA"
  sage-brand: "#1F7A5C"
  sage-brand-deep: "#165C45"
  sage-tint: "#E2F3EB"
  sage-wash: "#F4F9F6"
  clay-brand: "#B4532F"
  clay-brand-deep: "#8E3F22"
  clay-tint: "#FAE9E1"
  clay-wash: "#FCF7F3"
  mist-brand: "#2468A8"
  mist-brand-deep: "#1A4F82"
  mist-tint: "#E3EEF9"
  mist-wash: "#F4F8FC"
  olive-brand: "#5E6B1F"
  olive-brand-deep: "#475117"
  olive-tint: "#EEF1DC"
  olive-wash: "#F8F9F1"
  marigold: "#F6A623"
  marigold-soft: "#FFF2D9"
  marigold-ink: "#8A5300"
  coral: "#F26B5B"
  coral-soft: "#FFE8E4"
  coral-ink: "#A3382A"
  sky: "#2D9CDB"
  sky-soft: "#E2F2FB"
  sky-ink: "#1B6693"
  teal: "#2A9D8F"
  teal-soft: "#DFF3F0"
  teal-ink: "#1D6E64"
  pink: "#E9688F"
  pink-soft: "#FCE6EE"
  pink-ink: "#A3375A"
  leaf: "#3AAA6B"
  leaf-soft: "#E1F4E9"
  leaf-ink: "#1F7343"
  open-green: "#1A9E50"
  whatsapp-deep: "#0E7A3E"
  closed-red: "#C8412F"
  error-red: "#B3261E"
typography:
  display:
    fontFamily: "Baloo Thambi 2, Figtree, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, min(9.6vw, 4.7vw + 1rem), 4.1rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Baloo Thambi 2, Figtree, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.6vw, 2.9rem)"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Baloo Thambi 2, Figtree, system-ui, sans-serif"
    fontSize: "1.28rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  tamil-subtitle:
    fontFamily: "Baloo Thambi 2, Noto Sans Tamil, Nirmala UI, sans-serif"
    fontSize: "clamp(1.05rem, 1.4vw, 1.22rem)"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0"
  body:
    fontFamily: "Figtree, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Figtree, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 600
    lineHeight: 1.4
  note:
    fontFamily: "Kalam, Segoe Print, cursive"
    fontSize: "1.12rem"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  sm: "12px"
  field: "16px"
  md: "22px"
  lg: "30px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  section: "clamp(64px, 8vw, 112px)"
  tap: "48px"
  container: "1200px"
components:
  button-primary:
    backgroundColor: "{colors.sage-brand}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.sage-brand-deep}"
    textColor: "{colors.canvas}"
  button-outline:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.pill}"
    padding: "0 24px"
    height: "50px"
  chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.pill}"
    padding: "0 22px 0 8px"
    height: "52px"
  chip-selected:
    backgroundColor: "{colors.sage-brand}"
    textColor: "{colors.canvas}"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.field}"
    padding: "12px 16px"
    height: "52px"
  nav-link-active:
    backgroundColor: "{colors.sage-tint}"
    textColor: "{colors.sage-brand-deep}"
    rounded: "{rounded.pill}"
    padding: "0 14px"
    height: "44px"
  card:
    backgroundColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "clamp(22px, 3vw, 32px)"
  slot:
    backgroundColor: "{colors.sage-wash}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
  slot-selected:
    backgroundColor: "{colors.sage-brand}"
    textColor: "{colors.canvas}"
---

# Design System: Northline

## Overview

**Creative North Star: "The Hand-Cut Clinic"**

Northline is the familiar Tamil Nadu clinic page (header with a Book button, hero with photo, quick actions, treatments, doctors, booking, map) made by hand. White pages and deep navy text keep it calm and trustworthy. On top of that sits a friendly full palette: one action colour per clinic theme, and three shape colours used for circles, half-circles, arches, rings, dot patches and squiggles placed around photos and section corners, like paper shapes cut out and laid on the page.

The density is relaxed. Sections breathe, type is large and rounded, every tap target is at least 44px. Colour does the decorating; the text itself stays navy and slate, so the page reads clearly for grandparents on budget phones. Motion is lively but kind: shapes pop in and float, section squiggles draw themselves, and everything is switched off for visitors who prefer reduced motion.

This is a reusable template. A new clinic changes the theme (sage, clay, mist or olive) and its content in `js/config.js`; the shapes, type and layout stay the same. It refuses the flat one-colour template look of the studio's earlier sites, the dark or glassy tech-startup look, and Western spa styling.

**Key Characteristics:**
- White canvas, navy ink (#172033), one action colour per theme
- Three decorative shape colours with soft panel and icon-ink variants
- Simple geometric shapes: circles, half-circles, arches, rings, dots, squiggles
- Rounded Baloo Thambi 2 headings, bold Tamil subtitles under each section heading
- Short handwritten English notes in Kalam with a hand-drawn arrow
- Pill buttons and chips, 22 to 30px card corners, arch and circle photo frames
- Open lists with dashed dividers; cards only where a block is a real object
- Lenis smooth scroll with GSAP; nothing moves for reduced-motion visitors

## Colors

A white and navy base with one calm action colour per theme and three cheerful shape colours kept for decoration.

### Primary
- **Action colour (theme)**: the only colour for primary buttons, selected chips and slots, active nav, links on hover, the open FAQ ring, focus outlines and the treatments band. Each theme sets four values: the action colour, a deeper shade for hover and coloured text, a pale tint for icon circles and active states, and a very pale wash for soft sections.
  - **Sage Leaf Green** (default): `sage-brand`, `sage-brand-deep`, `sage-tint`, `sage-wash`.
  - **Clay Terracotta**: `clay-brand`, `clay-brand-deep`, `clay-tint`, `clay-wash`.
  - **Mist Blue**: `mist-brand`, `mist-brand-deep`, `mist-tint`, `mist-wash`.
  - **Olive**: `olive-brand`, `olive-brand-deep`, `olive-tint`, `olive-wash`.

### Secondary
- **Shape colours** (three slots, each with a full colour, a `-soft` panel colour and an `-ink` icon colour that reads at 4.5:1 on its soft panel):
  - **Slot 1, Marigold** in every theme: the hero sun circle, the squiggle under section headings, the logo dot, the price card tab, the footer circle, text selection.
  - **Slot 2, Coral** (sage, mist, olive) or **Teal** (clay): the half-circle shapes, the handwritten note arrows, dot patches, the emergency squiggle.
  - **Slot 3, Sky** (sage, olive), **Pink** (clay) or **Leaf** (mist): rings, the about-photo circle, the reviews panel.

### Neutral
- **Canvas White** (`canvas`): the page and every card.
- **Navy Ink** (`navy-ink`): headings, labels, the footer and the demo note band.
- **Body Slate** (`body-slate`): running text.
- **Muted Slate** (`muted-slate`): small print and meta lines; still 4.5:1 on white and on soft panels.
- **Hairline** (`hairline`) and **Strong Hairline** (`hairline-strong`): card outlines, dashed list dividers, outline buttons and input borders.

### Status
- **Open Green** (`open-green`) for the live status dot and the WhatsApp icon, **WhatsApp Deep** (`whatsapp-deep`) for its hover, **Closed Red** (`closed-red`) and **Error Red** (`error-red`) for closed status and form errors.

### Named Rules
**The One Action Colour Rule.** Only the theme's action colour marks things you can press or have chosen. Shape colours never fill a button.

**The Decoration-Only Rule.** Shape colours are for shapes, soft panels and icon circles, never for body text. Text on a soft panel uses the matching `-ink` shade or navy.

**The Theme Swap Rule.** A new clinic changes colours only through the theme blocks. White text on the action colour must stay at 4.5:1 or more.

## Typography

**Display Font:** Baloo Thambi 2 (with Figtree, system-ui)
**Body Font:** Figtree (with Segoe UI, system-ui)
**Handwritten Font:** Kalam (with Segoe Print, cursive)

**Character:** Baloo Thambi 2 is round, warm and covers both English and Tamil, so headings and Tamil subtitles share one voice. Figtree keeps the reading text plain and clear. Kalam adds a few short handwritten touches.

### Hierarchy
- **Display** (800, clamp up to 4.1rem, 1.04): the hero headline only. Its last words take the action colour.
- **Headline** (800, clamp(2rem, 3.6vw, 2.9rem), 1.12): every section heading.
- **Tamil Subtitle** (Baloo Thambi 2 700, about 1.05 to 1.22rem, 1.5): a short Tamil line set as a block under each section heading, in the deep action colour, with the marigold squiggle above it.
- **Title** (700, 1.18 to 1.5rem, 1.2): card, list-row, step and FAQ titles.
- **Body** (400, 1.0625rem / 17px, 1.65): all running text; intros run to 64ch.
- **Label** (600 to 650, 0.86 to 0.98rem): nav links, chip text, field labels, meta lines. Sentence case, no tracking.
- **Note** (Kalam 400, 1.1 to 1.4rem, 1.25): short handwritten English notes, with a hand-drawn arrow in the slot 2 colour.

### Named Rules
**The Squiggle Rule.** Every section heading carries its Tamil subtitle and a 92px marigold squiggle drawn in as the heading comes into view. The hero headline has none.

**The Handwriting Is English Rule.** Kalam is only for short English notes (one line or two). Tamil is always set in bold Baloo Thambi 2, never in a handwriting face.

**The Body Floor Rule.** Running text never goes below 16px; small print stays at least 0.8rem and muted slate.

## Layout

Content sits in a 1200px container with a fluid gutter (16 to 40px). Sections are separated by generous fluid padding (64 to 112px) and alternate between white and the theme's wash. Section heads are left-aligned at up to 720px, centred for some lists, or split into a heading-left, intro-right row on wide screens.

Most sections are two columns with uneven weights (5:7, 7:5, 8:4) that stack to one column below 960px. Lists use 2 or 4 columns that drop to 2 and then 1. The hero puts copy left and the arch photo right; a white quick-action strip overlaps the hero's lower edge, followed by a slightly tilted band of treatment names in the action colour. On phones the header shrinks to 64px, the menu becomes a full-screen panel of large pill links tinted in the shape colours, doctors become a sideways snap row, and a pill action bar sits at the bottom of the screen.

Decorative shapes sit behind content at section edges (quarter-circles, half-pills, rings) and never cover text or controls.

## Elevation & Depth

Mostly flat, with soft navy-tinted shadows for things that float above the page: the hero photo, the slots card, the quick-action strip, cards, menus and the booking form. Shadows always pair with a 1px hairline ring, so edges stay crisp on white. Depth also comes from overlap: the slots card over the photo's foot, the quick strip over the hero, the address card over the map.

### Shadow Vocabulary
- **Low** (`box-shadow: 0 1px 2px rgba(23,32,51,.05), 0 12px 30px -18px rgba(23,32,51,.22)`): doctor cards, gallery photos, the price card, the map, the greeting note.
- **High** (`box-shadow: 0 2px 6px rgba(23,32,51,.06), 0 30px 60px -30px rgba(23,32,51,.34)`): hero and about photos, slots card, quick strip, step cards, form, menus.
- **Button glow** (`box-shadow: 0 10px 22px -12px` in the deep action colour): primary buttons only.

### Named Rules
**The Soft Navy Shadow Rule.** Shadows are wide, soft and tinted with navy ink, never black and never hard-edged or offset.

## Shapes

Round everywhere. Buttons, chips, nav links, badges and the mobile bar are full pills (999px). Cards use 22px or 30px corners, inputs and slot buttons 16px, small menus 18px. Photos get shaped frames: the hero and why-us photos are arches (full round top, 30px bottom), the about photo has one big 180px corner, gallery photos alternate one 120px corner, doctor portraits are circles with a white ring over an offset tinted circle. Icons sit in soft circles (44, 52 or 64px) tinted in the action colour or a shape colour, cycling in order down a list.

The decorative set is fixed: filled circles, half-circles, rings (12 to 18px stroke), dot patches (18px grid), a plus mark, and the squiggle. Lists use 2px dashed hairline dividers.

## Components

### Buttons
Friendly, solid and big enough for any thumb.
- **Shape:** full pill (999px), 50px tall (56px large), 20px icons.
- **Primary:** action colour with white text and a soft glow in the deep shade; hover switches to the deep shade.
- **Outline:** white with navy text and a 2px strong-hairline inner ring; hover turns the ring navy. The WhatsApp button is an outline with a green icon.
- **Press:** nudges down 1px and scales to 0.98.
- **Focus:** 3px outline in the action colour, 3px offset.

### Chips
- **Style:** white pill, 52px tall, 2px hairline ring, navy text, with a 36px icon circle at the left tinted in rotating shape colours.
- **State:** hover lifts 2px with a navy ring and tilts the icon; selected fills with the action colour and white text. Concern chips preselect the booking form.

### Cards / Containers
Cards are kept for real objects: doctors, first-visit steps, the slots card, the booking form and contact panel, the price card, the address card.
- **Corner Style:** 22px (doctors) or 30px (steps, form, panels).
- **Background:** white, or the theme wash for the address card; the reviews panel uses the slot 3 soft colour, the emergency panel a pale coral.
- **Shadow Strategy:** hairline ring plus Low or High shadow (see Elevation).
- **Internal Padding:** about 22 to 40px, fluid.

### Open Lists
Treatments, clinic facts and promises are open lists, not cards: each row is an icon circle, a title and a short line, separated by 2px dashed hairlines. Treatments are two columns, facts four, promises two.

### Inputs / Fields
- **Style:** white, 52px tall, 16px corners, 2px strong-hairline border, navy text, 600 to 650 weight labels above.
- **Focus:** border turns the action colour with a 4px tint halo.
- **Error:** error-red border and label with a faint red halo. Fields filled from a chip or slot get the marigold soft background and border.

### Navigation
- **Desktop:** white translucent header (76px) with logo (circle mark with a marigold dot), pill nav links (hover in the wash, active in the tint with deep text), language menu, call link and a primary Book button. Hides on scroll down, returns on scroll up; a thin action-to-marigold progress line runs along the top.
- **Mobile:** two-line menu button opens a full-screen panel of 58px pill links in Baloo Thambi 2, tinted in rotation; a bottom pill bar holds Book (filled), Call, WhatsApp and Directions.

### Next Free Slots Card
A white 24px card overlapping the hero photo's foot, with a live dot, a title and three slot buttons (wash, marigold soft, slot 3 soft). Hover lifts a slot and rings it in the action colour; selected fills with the action colour and pre-fills the form. A handwritten note sits under it.

### Handwritten Note
A Kalam line in the deep action colour with a curved arrow in the slot 2 colour. The hero greeting is the one boxed version: a white tilted speech-bubble with a Tamil word in Baloo Thambi 2.

### Section Squiggle
A 92 by 12px marigold squiggle (a mask, so any colour works) above the Tamil subtitle, revealed left to right over 0.9s as the heading enters. The emergency section uses coral.

### Motion
Lenis smooth scroll (desktop pointers only) with GSAP ScrollTrigger. Content eases with an exponential ease-out (`cubic-bezier(.16,1,.3,1)`, GSAP `expo.out`); shapes and portraits pop with `back.out`. Hero shapes float gently and lean away from the pointer; the treatments band moves only with scroll; the gallery slides sideways while pinned; step cards stack. Loops pause offscreen. With reduced motion, none of this runs and transitions are near-instant.

## Do's and Don'ts

### Do:
- **Do** keep text navy (#172033) or slate on white or soft panels; use `-ink` shades on shape-colour panels.
- **Do** use the theme's action colour for every primary action and chosen state, and nothing else.
- **Do** put the Tamil subtitle and the marigold squiggle under every section heading.
- **Do** frame hero and feature photos as arches and portraits as circles.
- **Do** cycle icon circles through brand tint, slot 1, slot 2, slot 3 down a list.
- **Do** use open lists with 2px dashed dividers for treatments, facts and promises.
- **Do** keep tap targets at 44px or more and pair every shadow with a hairline ring.
- **Do** give every animation a reduced-motion path where nothing moves.

### Don't:
- **Don't** set body text in a shape colour or put white text on marigold, coral or sky.
- **Don't** add a second action colour or fill buttons with shape colours.
- **Don't** set Tamil in a handwriting face, or use Kalam for anything longer than a short note.
- **Don't** wrap treatments, facts or promises back into a grid of cards.
- **Don't** add small labels or eyebrows above headings; greetings and asides go in handwritten notes.
- **Don't** let decorative shapes cover text, photos' subjects or controls.
- **Don't** use hard offset shadows, black shadows, dark mode or glass effects.
- **Don't** add testimonials, star ratings or before-and-after imagery to any layout.
- **Don't** make anything move on its own without scroll or pointer input, except the gentle shape float and the live dot.
