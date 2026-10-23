# Web Page Quality Report

**Target**: Direct input (local files, site not online)
- Main page: `northline-dental/index.html`
- Site info: `northline-dental/privacy.html`, `northline-dental/terms.html`
- Clinic details: `northline-dental/js/config.js` (values filled into the page at runtime)

**Date**: 21 October 2026
**Page type**: Commercial / local service (healthcare clinic home page with booking)
**YMYL**: Clear YMYL (Health: dental treatment, fees and medical advice)
**Method**: Google Search Quality Rater Guidelines (QRG) page-quality check, 6 categories (A–F), YMYL weights

---

## Context for this assessment

- **This is a website template with sample content.** "Northline Dental Co.", Coimbatore, the four doctors, the fees, the phone/e-mail and all photos (Unsplash stock) are placeholders. The page itself says so in the footer: "Sample content — doctors, fees and photos are placeholders." The privacy and terms pages also carry a "sample policy/terms" notice.
- **No testimonials, star ratings or before/after photos — by design.** Indian dental advertising rules (Dentists (Code of Ethics) Regulations 2014 / National Dental Commission guidance) forbid them. The Reviews section links out to Google instead. This report does **not** penalise their absence and does **not** recommend adding them.
- **Reputation (Category E) cannot be verified.** There is no live URL and the clinic is fictional, so per the skill's rule for text input, E is scored at the conservative "cannot be verified" level (35). No web search was done.
- Scores reflect **what is on the page today**. A separate section ("Recommendations for the clinic owner") explains how to raise the grade when real content is filled in.

---

## Overall grade: B (60.1/100)

```
0         20        40        60        80        100
|---------|---------|---------|---------|---------|
██████████████████████████████░░░░░░░░░░░░░░░░░░░░ 60/100
                              ^
                        current position
```

Equivalent: Google QRG **Medium**.

**Grade bands:**

- 90-100 (S): Highest — unique value, top-level E-E-A-T for the field
- 75-89 (A): High — sufficient E-E-A-T and satisfying MC
- 55-74 (B): Medium — achieves its purpose, but there is considerable room to improve ← **this page**
- 35-54 (C): Low — E-E-A-T is lacking and the MC needs work
- 0-34 (D): Lowest — harmful, untrustworthy or spam signals

**Instant-D triggers checked**: A = 0 (no) · C = 0 with YMYL (no) · E ≤ 10 (no) · F = 0 (no). **No trigger fired.**

---

## Score summary

| Category | Weight (YMYL) | Score | Weighted | Status |
|---------|-------|------|---------|------|
| A. Page purpose & harm | 15% | 90/100 | 13.50 | Excellent |
| B. MC quality | 22% | 60/100 | 13.20 | Average |
| C. Site / author info | 13% | 70/100 | 9.10 | Average |
| D. E-E-A-T | 28% | 45/100 | 12.60 | Weak |
| E. Reputation | 12% | 35/100 | 4.20 | Weak |
| F. Spam / abuse | 10% | 75/100 | 7.50 | Good |
| **Overall** | **100%** | | **60.1** | **Average (B)** |

**Status bands:** 0-34 Critical / 35-54 Weak / 55-74 Average / 75-89 Good / 90-100 Excellent

---

## Category details

### A. Page purpose & harm — 90/100 Excellent

> Checks why the page exists, whether that purpose helps users, and whether it is deceptive or harmful.

| Item | Result | Detail |
|------|------|------|
| A1. Clear purpose | ✅ | The purpose is obvious at once: a local dental clinic home page for booking a visit. Title, H1, hero lede and "Book a visit" CTA all say so. |
| A2. Beneficial purpose | ✅ | Gives services, indicative fees, hours, address, what to expect at a first visit and FAQs. Useful to a patient choosing a clinic. |
| A3. Not deceptive | ⚠️ | The page presents named doctors, a founding year and clinic photos, which are fictional or stock. The footer discloses "Sample content … placeholders", so this is not hidden deception, but a visitor reading only the top of the page would take them as real. |
| A4. No harmful content | ✅ | No dangerous health advice. FAQ answers are cautious ("Your dentist will explain what to expect in your case"); the terms page states the content is not medical advice. |
| A5. Title matches MC | ✅ | "Dental clinic in R.S. Puram, Coimbatore" is exactly what the page delivers. No clickbait. |

**Scoring basis**:
- ✅ A1, A2, A4, A5
- ⚠️ A3 −10: placeholder doctors/photos presented as real above the fold; disclosed only in the footer
- Calculation: 100 − 10 = **90**

### B. MC (main content) quality — 60/100 Average

> MC (Main Content) is the content that directly achieves the page's purpose: text, images, video and functions such as the booking form. Navigation, sidebars and ads are not MC. This category checks how much effort, originality, skill and accuracy the MC shows.

| Item | Result | Detail |
|------|------|------|
| B1. Effort | ✅ | Hand-written, coherent copy across 11 sections, a working WhatsApp booking form, live hours table, map and 7 specific FAQs. Clear human effort. |
| B2. Originality | ⚠️ | Copy is original, but all 10+ images are Unsplash stock (some reused 2–3 times across sections), and treatment descriptions are generic one-liners any clinic could use. |
| B3. Talent / skill | ✅ | Well-structured, accessible (skip link, ARIA on FAQ and form, table caption), mobile action bar, LocalBusiness/Dentist JSON-LD. |
| B4. Accuracy | ⚠️ | Clinical statements match expert consensus (RCT under local anaesthesia; first child visit around first birthday; implant crowns may need replacing). But: no sources cited; "13+ years" vs "Est. 2012" in 2026 is inconsistent; the facts list says the *clinic* is "Registered: Tamil Nadu Dental Council" (dentists, not clinics, register with the Council). |
| B5. Appropriate MC amount | ⚠️ | For YMYL treatments, each treatment gets one sentence and a price. Nothing on risks, alternatives, number of sittings, recovery or suitability. No dedicated treatment pages. |
| B6. No filler | ✅ | Tight copy; no keyword stuffing or padding. The repeated ticker is decorative and `aria-hidden`. |
| B7. Title-MC match | ✅ | Every section delivers on its heading (Fees shows fees, First visit shows the four steps, etc.). |

**Scoring basis**:
- ✅ B1, B3, B6, B7
- ⚠️ B2 (originality) −15: stock imagery, generic treatment blurbs
- ⚠️ B4 (accuracy) −10: no citations; year and "registered" wording inconsistencies (YMYL: B4 weighted)
- ⚠️ B5 (MC amount) −15: thin treatment information for a health topic
- Calculation: 100 − 15 − 10 − 15 = **60**

### C. Site / author info — 70/100 Average

> Checks who made the content, who runs the site, and how to reach them if something goes wrong. YMYL health + service: strictest deduction table.

| Item | Result | Detail |
|------|------|------|
| C1. Operator identified | ⚠️ | Legal name, full street address, landmark, map, hours and a DPDP Act 2023 privacy policy and Indian-law terms page are present. Missing: clinic establishment registration, legal entity type, and a named grievance/data contact. |
| C2. Author info | ⚠️ | Four doctors with names, degrees (BDS, MDS + speciality), years and special interests. But no Dental Council registration numbers, no individual profiles, and no doctor is credited as author/reviewer of the FAQ or treatment content. |
| C3. Contact info | ✅ | Phone, WhatsApp, e-mail, street address, Google Maps directions, opening hours, booking form; repeated in footer and mobile bar. |
| C4. No conflict of interest | ✅ | No undisclosed sponsorship or affiliate content. (Minor: EMI "finance partners" are unnamed.) |

**Scoring basis**:
- ✅ C3, C4
- ⚠️ C1 −10: no establishment registration / entity / grievance contact
- ⚠️ C2 −15: credentials stated but not verifiable (no registration numbers), no content author/reviewer
- Calculation: 100 − 10 − 15 = 75 → Devil's-advocate adjustment to **70** (all identity details are explicitly placeholders, so nothing can be checked against a register)

### D. E-E-A-T — 45/100 Weak

> E-E-A-T is Google's core quality framework: Experience (first-hand), Expertise (knowledge/qualifications), Authoritativeness (recognised in the field) and Trust (accurate, honest, safe). Trust matters most.

| Item | Result | Evidence |
|------|------|------|
| D1. Experience | ❌ | No first-hand evidence. All photos are stock, yet two are captioned as the clinic itself ("Fig. 01 — Treatment room, D.B. Road", "Fig. 02 — Treatment room"). No real team, premises or equipment photos; no clinician-written explanations from practice. |
| D2. Expertise | ⚠️ | Explicit qualifications (e.g. "BDS, MDS (Conservative Dentistry and Endodontics) · 13 years") and speciality-to-treatment mapping (endodontist for RCT, orthodontist for aligners). Not verifiable: no registration numbers; the FAQ advice is not attributed to a qualified reviewer. |
| D3. Authoritativeness | ⚠️ | No professional memberships (e.g. Indian Dental Association), teaching posts, publications, CDE credits or institutional affiliations shown. "Attends continuing dental education every year" is an unsupported claim. |
| D4. Trust | ⚠️ | Strong positives: written estimates and published fees, sterilisation process described, no testimonials (ethics-compliant), "not medical advice" disclaimer, DPDP privacy policy, "No advance payment". Negatives: the "Next available · Today, 4:30 PM" box with a live pulsing dot is calculated from opening hours, not a real diary; stock photos captioned as the clinic. |

**Scoring basis**:
- ❌ D1 (experience) −20: no first-hand evidence; stock images captioned as the clinic → category cap 70
- ⚠️ D2 (expertise) −10: credentials stated but unverifiable, no medical reviewer
- ⚠️ D3 (authority) −15: no memberships/affiliations/recognition
- ⚠️ D4 (trust) −10: synthetic "next available" slot, mis-captioned photos
- Calculation: 100 − 20 − 10 − 15 − 10 = **45**

> **D2 note**: The YMYL D2 cap of 40 applies when author credentials are *not stated*. Here they are stated (BDS/MDS per doctor), so the cap was not applied; the deduction reflects that they cannot be verified and are not tied to the health content.

### E. Reputation — 35/100 Weak

> Checks how the site and its authors are seen by independent outside sources (news, Wikipedia, professional bodies, detailed reviews). The site's own claims do not count.

| Item | Result | Detail |
|------|------|------|
| E1. External reputation verifiable | ❌ | Cannot be verified: local files only, no live URL, fictional clinic. Not web-searched by design. |
| E2. Positive reputation | ⚠️ | No third-party recognition on or off the page. The "Read reviews on Google" button points at the generic `https://www.google.com/maps`, not a real Business Profile. |
| E3. No negative reputation | ⚠️ | Cannot be checked. No negative signals in the content itself. |
| E4. Author reputation | ⚠️ | Doctors cannot be checked against the Dental Council register (no numbers given, names are placeholders). |

**Scoring basis**:
- Skill rule for text input: reputation "cannot be verified" → **35** (conservative, not neutral 50)
- No E3 fraud signal, so no instant-D trigger

### F. Spam / abuse detection — 75/100 Good

> Checks for copied or mass-produced content, deceptive design, and ads that get in the way of the main content.

| Item | Result | Detail |
|------|------|------|
| F1. Not copied | ✅ | Copy reads as original, written for this page. Stock photos are licensed, not scraped MC. |
| F2. Not scaled/AI mass-produced | ⚠️ | The page itself is careful work, but it is a reusable template with "demo links" (`?name=…&town=…`) designed to be deployed for many clinics. If the same copy ships on many domains unchanged, it becomes near-duplicate, scaled content. |
| F3. No site-reputation abuse | ✅ | No unrelated third-party or sponsored content. |
| F4. No expired-domain abuse | ✅ | Placeholder domain (`northline.dental`) matches the topic. |
| F5. No hacking / spam | ✅ | No injected content, comment spam or hidden links. |
| F6. No deceptive design | ⚠️ | The "Next available" box with a "live" status dot suggests real-time diary availability but is computed from opening hours. Theme switcher and demo-link mode are switched on (`showThemeSwitcher: true`, `demoLinks: true`), which would let anyone render the site under another clinic's name via URL. |
| F7. Ads don't obstruct MC | ✅ | No ads. |

**Scoring basis**:
- ✅ F1, F3, F4, F5, F7
- ⚠️ F2 −15: template copy at risk of cross-domain duplication
- ⚠️ F6 −10: synthetic "next available" indicator; demo/theme tools left on
- Calculation: 100 − 15 − 10 = **75**

---

## Improvement action plan

### 🔴 Fix immediately (high impact, low effort)

| # | Action | Related items | Expected effect |
|---|----------|----------|----------|
| 1 | Before go-live: set `demoLinks: false` and `showThemeSwitcher: false` in `js/config.js`; remove the "Sample content" footer line only once every placeholder is replaced; point `social.google` at the clinic's real Google Business Profile. | F6, E2, A3 | F +10, A +10 |
| 2 | Make "Next available" honest: connect it to the real appointment diary, or relabel it "Earliest slot we can usually offer — confirmed on WhatsApp" and drop the pulsing "live" dot. | F6, D4 | D +5, F +5 |
| 3 | Fix factual wording: "Registered with the Tamil Nadu Dental Council" belongs to each dentist, not the clinic; make "13+ years" match the founding year (2012 → 14 in 2026) or compute it automatically. | B4, D4 | B +5 |

### 🟡 Medium term (high impact, moderate effort)

| # | Action | Related items | Expected effect |
|---|----------|----------|----------|
| 4 | Real doctor cards: actual names, photos, degrees with college and year, **State Dental Council registration number** for each dentist, CDE and professional memberships. | C2, D2, D3, E4 | C +15, D +15 |
| 5 | Replace every stock image with real photos of the clinic: reception, treatment rooms, sterilisation area, equipment, team. Caption them accurately. Never use patient before/after photos. | D1, B2, D4 | D +15, B +10 |
| 6 | Add "Medically reviewed by Dr. ___, MDS, Reg. No. ___ · Last reviewed: date" to the FAQ and treatment content. | D2, D4, C2 | D +10 |
| 7 | Clinic identity block: establishment registration (Tamil Nadu clinical establishment registration if applicable), legal entity, GSTIN if any, named grievance officer for DPDP requests; name the EMI finance partners. | C1, C4 | C +10 |

### 🟢 Strategic (long-term)

| # | Action | Related items | Expected effect |
|---|----------|----------|----------|
| 8 | One page per major treatment (implants, RCT, aligners, kids, gum care): what it involves, number of sittings, recovery, risks, alternatives, who is suitable, aftercare, with citations to IDA, DCI/NDC, WHO or peer-reviewed sources. | B4, B5, D2 | B +15 |
| 9 | Rewrite the template copy per client (clinic history, local details, the doctors' own approach) so no two deployed sites share identical text. | F2, B2 | F +15, B +5 |
| 10 | Build earned, independent reputation: a complete Google Business Profile, IDA branch membership, CDE talks, local-press or community health camps, factual listings on professional directories. | E1–E4, D3 | E +25 |

---

## Recommendations for the clinic owner (within dental ethics rules)

These are concrete steps to take when replacing the sample content. All of them stay within the Dentists (Code of Ethics) Regulations 2014 / National Dental Commission guidance: factual information about qualifications, services, fees, hours and location is allowed; testimonials, ratings, before/after photos, self-praise and inducements are not.

**1. Doctors (biggest single gain: C2, D2, D3)**
- For each dentist: full name, real photo, BDS/MDS with college and year, speciality, **Tamil Nadu Dental Council registration number**, years of practice.
- Factual extras: IDA membership, teaching appointments, CDE hours, conference presentations or publications (titles only, no claims of being "the best").
- Use "Orthodontist", "Endodontist" etc. only for dentists holding that MDS. "Implantologist" is not a separate MDS speciality; prefer "Prosthodontist with special interest in implants" plus any certified implant training.

**2. Content review and sources (B4, B5, D2, D4)**
- Put a reviewer line on the FAQ and any treatment text: "Reviewed by Dr. ___, MDS (___), TNDC Reg. No. ___, on [date]."
- Link factual health statements to authoritative sources (e.g. Indian Dental Association patient information, WHO oral-health facts, peer-reviewed guidelines).
- Add short "What to expect" pages per treatment: steps, sittings, recovery, risks, alternatives, aftercare. This is education, not advertising, and is what Google values most for health topics.

**3. Real, first-hand evidence (D1, B2)**
- Photograph the actual clinic, sterilisation set-up (autoclave, sealed pouches), equipment named on the page (microscope, intraoral scanner) and the team at work.
- Only claim equipment that the clinic really has. If not, set `equipment: false` in `js/config.js` so the page switches to neutral wording.
- A short clinic-tour video or a dentist explaining a procedure (no patient faces or results) adds experience signals without breaching ethics rules.

**4. Clinic identity and trust (C1, C4, D4)**
- Add a small "Clinic details" block: registered name, establishment registration number, GSTIN if applicable, and a named contact for privacy requests.
- Keep the written-estimate promise and published fee list (real fees). Name EMI partners and their terms.
- Keep wording factual and neutral. Lines like "Eight things we do well" or "Honest dentistry" can read as self-praise; consider "Treatments we offer" and "Every step explained before it happens".

**5. Reputation without testimonials (E, D3)**
- Keep linking out to the clinic's own Google Business Profile for reviews (as now). Do not copy reviews or star ratings onto the site.
- Earn independent mentions: IDA branch activity, free school or community dental camps reported by local media, guest lectures at dental colleges. These are what QRG raters find when they search the clinic's name.

**6. Technical trust signals**
- Add `canonical`, `og:url` and `og:image` (already prepared as comments in `index.html`).
- Extend the JSON-LD: a `Dentist` entry per doctor (name, `medicalSpecialty`, `hasCredential`, registration identifier) and `sameAs` links to the Google Business Profile and social pages.
- Before go-live: `demoLinks: false`, `showThemeSwitcher: false`, real `social.google` link, and remove the sample-content notice from footer, privacy and terms pages after a lawyer or the clinic has reviewed them.

---

## Expected improvement

If all recommendations are applied (with real, verifiable content and a live site):

| Category | Current | Expected | Change |
|---------|------|------|-------|
| A. Purpose & harm | 90 | 100 | +10 |
| B. MC quality | 60 | 80 | +20 |
| C. Site / author info | 70 | 95 | +25 |
| D. E-E-A-T | 45 | 75 | +30 |
| E. Reputation | 35 | 60 | +25 |
| F. Spam / abuse | 75 | 95 | +20 |
| **Overall** | **60.1** | **82.7** | **+22.6 (B → A)** |

Expected overall: 100×0.15 + 80×0.22 + 95×0.13 + 75×0.28 + 60×0.12 + 95×0.10 = 15 + 17.6 + 12.35 + 21 + 7.2 + 9.5 = **82.65 ≈ 83 (A, High)**. Reputation is the slowest lever; it depends on real external evidence, which only time and a live site can build.

---

## Devil's Advocate check

| Check | Result |
|----------|----------|
| Is there enough explicit evidence for every category ≥ 75? | **A (90)**: purpose, harmlessness and title match are all explicit in the HTML; A3 already lowered for placeholder content. Kept. **F (75)**: absence of ads, injected content and copied text is directly checkable in the source. Kept. **C** was 75 before review → lowered to **70**: every identity detail is a declared placeholder and no registration number exists to check. |
| Any ✅ based on inference? | D2 had been considered ✅ for stated MDS degrees; it is a claim, not verifiable evidence → kept at ⚠️. C3 ✅ is explicit (phone, e-mail, address all present). A4 ✅ is explicit (FAQ text reviewed line by line). |
| Would a competing clinic site get the same score? | Yes. A typical well-built local Indian dental site with named doctors but stock photos, no reviewer, and no registration numbers would land in the same 55–65 range. |
| Would a QRG rater accept this grade? | Yes. Raters would see a clear, helpful, non-deceptive local-service page with good contact info (Medium), but YMYL health content without verifiable expertise, first-hand evidence or reputation keeps it from High. |

**Score before adjustment**: 60.75 → **Score after adjustment**: 60.1 (C 75 → 70)

---

## Key conclusion

The page is a clear, well-built and ethics-compliant clinic home page with excellent contact information, published fees and a transparent first-visit process, which earns a solid **Medium (B, 60.1)**. Its main weaknesses are E-E-A-T for a YMYL health topic: no first-hand evidence (stock photos captioned as the clinic) and doctor credentials and health content that cannot be verified or are not attributed to a reviewer. Filling in real doctors with registration numbers, real clinic photos, reviewed treatment content and an earned Google profile should lift it to **A (about 83)**.
