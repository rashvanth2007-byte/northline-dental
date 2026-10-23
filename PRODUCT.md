# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary for this redesign: dentists in Tamil Nadu who are being sold a website.** Rashvanth Web Studio sends them a demo link (often on WhatsApp, opened on a phone) that shows the template with their own clinic name, town and phone. In a few seconds the site has to look clearly more premium and more considered than what their competitors have, so they want to buy it.
- **End users: patients and families in Tamil Nadu towns** (Coimbatore is the sample city), including parents booking for children and adults booking for elderly parents. Mostly on phones. Their job is to call, WhatsApp, book, or find directions quickly, and to trust that the clinic is careful and honest.

## Product Purpose

Northline is a one-page dental clinic website template that the studio customises and resells to clinics. Success means a dentist opens the demo link and says yes, and a patient on the live site books or calls without hunting.

## Positioning

A clinic site written for Tamil Nadu families (Vanakkam greeting, short Tamil labels, local landmarks, WhatsApp booking, festival-hours notes) that follows Indian dental advertising ethics strictly, with no testimonials, ratings, "best" claims or before/after photos, while still feeling premium. Demo links let a prospective client see their own name on it without any file edits.

## Operating Context

- The studio edits `js/config.js` (name, phone, WhatsApp, address, hours, theme, feature switches) and the `EDIT:` blocks in `index.html` for each client, then uploads the static folder to any host (GitHub Pages for demos).
- `demo.html` builds demo links and QR codes for sales conversations.
- Bookings go to WhatsApp with the form details pre-filled, or to a Formspree endpoint.
- Google Translate handles Tamil and Malayalam on request, so words like "WhatsApp" and the clinic name are marked `translate="no"`.

## Capabilities and Constraints

- Plain HTML, CSS and JavaScript, no build step. Small libraries from a CDN are fine.
- Feature switches must keep working: `specialists`, `equipment`, `prices` (`data-if` / `data-if="!x"`), themes (`sage`, `clay`, `mist`, `olive` plus the demo theme switcher), demo-link fields (`data-site`, `data-site-href`, `data-sample`), live open/closed status, hours table, next-slot card, concern chips that preselect the booking form, FAQ accordion, language menu and first-visit language prompt, mobile action bar, floating WhatsApp button.
- Sample clinic is open 24/7. The copy must stay honest about what the clinic can promise.
- All page content stays (every section, fact and feature). Layout, order and grouping may change.

## Brand Commitments

- Studio: Rashvanth Web Studio. Template name: Northline. Sample clinic: "Northline Dental Co.", R.S. Puram, Coimbatore.
- Tone: warm, respectful, plain professional English with light Tamil touches (`.ta` labels in bold Baloo Thambi 2, `translate="no"`). No slang or jokes.
- Must not look AI-generated, like a tech startup (neon, glass, dark), or foreign (Western spa or boutique look that Tamil Nadu patients would not relate to).
- **Standing preference, refined (22 Oct 2026): clean and simple, but clearly different from the studio's earlier templates (Ivory Lane, the first Northline): a hand-designed look with a friendly colour palette, simple shapes (circles, arches, squiggles) and lively but tasteful animation, as a web designer would build by hand.** It still follows the familiar layout of leading Tamil Nadu clinic websites (reviewed: Partha Dental, Sabka Dentist, Balaji Dental, Crown Dental Coimbatore, SRM Dental Madurai). White pages, one calm brand colour, plain sans-serif type, clear sections, smooth but calm motion. The user rejected a bold themed direction (Athangudi tile floor) in favour of this. Borrow layout patterns only, never text, logos or brand colours.

## Evidence on Hand

- No real clinic content: doctors, fees, statistics, phone numbers and photos are samples. Photos are Unsplash stock marked "(sample photo)".
- No testimonials, star ratings, review counts or before/after photos, by design (Dentists (Code of Ethics) Regulations 2014; National Dental Commission warning, October 2026). Reviews only link out to Google. Never add or fabricate these.
- Registration numbers are placeholders ("TNDC Reg. No. 0000") inside `data-sample` spans that demo links strip.

## Product Principles

1. The demo has to sell in one viewport on a phone: premium and specific to Tamil Nadu, never generic.
2. Patients act fast: call, WhatsApp, book and directions are always one tap away.
3. Honest before impressive: only factual claims, with serious symptoms pointed to a hospital.
4. One file to customise: anything that repeats is driven from `js/config.js`, so a new client takes minutes.

## Accessibility & Inclusion

Readers include grandparents and first-time smartphone users: large tap targets (44px), body text 16px or larger, contrast at least 4.5:1, visible focus, no horizontal scroll at 320px, and no motion for visitors who prefer reduced motion. Budget Android phones on 4G are common, so the page must stay light.
