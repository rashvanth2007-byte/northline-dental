> **Superseded (22 Oct 2026).** This was the shared contract for the earlier sage/Poppins restyle. The site has since been redesigned; follow PRODUCT.md, DESIGN.md and .impeccable/surfaces/index-html.md instead. Kept for history only.

# Northline Dental — restyle contract v2 (shared by all agents)

Site root: `C:\Users\RASHVANTH\Desktop\All websites\northline-dental\`
Plan: `C:\Users\RASHVANTH\.claude\plans\wise-drifting-waterfall.md` (read its "Target look" and "New page structure").

Goal: restyle Northline to look like the highly rated Tamil Nadu clinic sites we reviewed
(Clove Dental, Partha Dental, Apollo Dental, Malligai Dental, Sabka Dentist): white/light
pages, one calm brand colour, Poppins headings, rounded cards, line icons in tinted circles,
quick-action icons, a concern picker, treatment card grid, sticky mobile action bar,
floating WhatsApp. Calm, professional, standard. Borrow PATTERNS only — never their text,
logos, names or brand colours.

Remove everywhere: ALL-CAPS mono labels, DM Mono, Fraunces, "§"/"01 ·" numbering,
hr.rule hairlines, the ticker (+ pause button), aside.index, tx-peek, footer giant word,
dotted price leaders, giant numbers, black outlined square buttons, grayscale photos,
looping decorative animations (breathing blob, Ken Burns, floating card, sparkle).

## File ownership (only edit your own files)
| Agent | Files |
|---|---|
| A markup | `index.html` |
| B styles | `css/styles.css` (rewrite from scratch) |
| C behaviour | `js/main.js` (config.js/demo.js/legal.js only if a hook name forces it) |
| D extras | `privacy.html`, `terms.html`, `demo.html`, `README.md` |

## Fonts (one Google Fonts link in every HTML file — exact URL)
`https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=Noto+Sans+Tamil:wght@400;500;600&display=swap`
- headings / buttons / numbers: "Poppins" 600 (h1 700 allowed), sentence case, letter-spacing -0.01em
- body: "Nunito Sans" 400/600, 16–17px, line-height 1.65
- Tamil `.ta`: "Noto Sans Tamil"

## Tokens (B defines on :root; themes via [data-theme] on <html>)
```
--bg #FFFFFF  --bg-soft #F3F8F6 (brand tint wash)  --bg-sand #FAF6EF
--ink #1E2B27 (headings)  --text #44524D (body)  --muted #66736E (≥4.5:1 on all bgs)
--line #E3E9E6 (very light dividers)
--brand #3E7C6B  --brand-deep #2F6153  --brand-tint #E6F1EC   (white text on --brand ≥4.5:1)
--accent #E8A33D (small warm highlights only, e.g. status/icons; never body text)
--wa #1A9E50  --wa-deep #0E7A3E  --live #1A9E50  --closed #D2453A  --error #B3261E
--r-sm 12px --r-md 18px --r-lg 26px --r-pill 999px
--shadow-1 0 1px 2px rgba(30,43,39,.05), 0 8px 24px -12px rgba(30,43,39,.18)
--shadow-2 0 2px 6px rgba(30,43,39,.06), 0 24px 48px -20px rgba(30,43,39,.28)
themes (brand / brand-deep / brand-tint):
  sage  #3E7C6B / #2F6153 / #E6F1EC (default)
  clay  #A65A38 / #8C4A2D / #F7EAE2
  mist  #3A7891 / #2B5C70 / #E4F0F4
  olive #6B7834 / #525C26 / #EEF0DF
container 1200px, gutter clamp(16px,4vw,40px), section padding clamp(56px,8vw,104px)
h1 clamp(2.1rem,4.6vw,3.5rem); h2 clamp(1.7rem,3.2vw,2.5rem); h3 1.15–1.3rem
```

## Page structure (index.html, in order) — ids/classes binding
Global: `<html lang="en-IN" data-theme="sage">` + inline script adding `.js`; skip link `.skip`; SVG sprite (keep all `i-*` symbols; may add line icons `i-calendar`, `i-help`, `i-emergency`, `i-brush`, `i-users`, `i-heart`, `i-parking`, `i-lang`, `i-wheelchair`, `i-arrow-right` — A defines them). Scripts at end: js/config.js, js/demo.js, js/main.js.

0. `.progress > .progress__bar` (keep).
1. `header.header > .container.header__inner`: `a.logo` (`.logo__mark` = round tooth icon `i-tooth` in brand circle, `.logo__name[data-site=name]`, `.logo__suffix[data-site=suffix]`), `nav.nav#nav` with `a.nav__link` (#about #treatments #doctors #visit #faq #book; doctors label data-if pair), `.lang` block (same markup as now), `a.header__call[data-site-href=phone]` (i-phone + `span[data-site=phone]`), `a.btn.btn--primary.header__cta` href #book "Book appointment", `button.menu-btn` (same aria as now). C keeps `.is-scrolled`, `.is-tucked`, menu-open logic.
2. `section.hero#top > .container.hero__grid`:
   - `.hero__copy`: `p.hero__greet` "Vanakkam · <span class=ta>வணக்கம்</span>", `h1.hero__title` (plain text + `<span class="hl">` around the highlighted words; no .line spans), `p.hero__lede` (keep specialists alt), `.hero__actions` (`a.btn.btn--primary` #book, `a.btn.btn--outline[data-site-href=whatsapp]` with i-whatsapp), `ul.trust-chips` > `li` (svg icon + text): registration (specialists alt), "Open 7 days", location (`[data-site=area]`, `[data-site=city]`), open status (`span.status-dot[data-open-dot]` + `span[data-open-status]`).
   - `figure.hero__media` > `img` (rounded) + `.hero__slot` card ("Next opening" + `strong[data-next-slot]` + `small` "Based on clinic hours · call to confirm").
   - after the grid, inside hero: `a.google-badge[data-site-href=google]` (i-google + "See what patients say on Google" + i-arrow-right) — no star number, no rating.
3. `section.section.quick#quick` > `.container` > `ul.quick-grid` > 4 × `li > a.quick-card` (icon in `.icon-circle`, `strong` title, `span` hint): Book appointment (#book), Call us (`data-site-href=phone`), WhatsApp (`data-site-href=whatsapp`), Get directions (`data-site-href=maps`).
4. `section.section.concerns#concerns` > `.container` > `.section__head` (h2 "How can we help you today?" + `.ta` + p) > `div.concern-chips` > `button.chip[type=button][data-concern="<exact select option text>"]` with icon. Chips: Regular check-up → "Check-up / not sure"; Tooth pain → "Tooth pain / sensitivity"; Teeth cleaning → "Teeth cleaning &amp; gum treatment"; Dental implants → "Dental implants"; Braces &amp; aligners → "Clear aligners"; Kids dentistry → "Kids dentistry"; Emergency → "Emergency visit". A adds options "Tooth pain / sensitivity" and "Emergency visit" to the form select. C: click → set `form.elements.treatment.value`, add `.is-selected` to the chip, smooth-scroll to #book, focus name field.
5. `section.section.section--soft.about#about`: `.section__head`, `.about__grid` (`.about__body` paragraphs with data-if alts, `figure.about__media > img`), `ul.facts` > `li.fact` (`.icon-circle` + `small` label + `strong` value) — same facts as now.
6. `section.section.treatments#treatments`: `.section__head` (intro with prices alt + reviewed-by small), `ul.tx-grid` > 8 × `li.tx-card` (`.icon-circle` with treatment icon, `h3`, `p` with data-if alts, `span.tx-card__price[data-price]` "From <b>₹25,000</b>", `a.tx-card__link` href #book "Enquire" + aria-label).
7. `section.section.section--soft.approach#approach`: head "Why patients choose us" (+ta), `ul.promise-grid` > 4 × `li.promise-card` (`.icon-circle`, h3, p; 4th has specialists/!specialists variants), optional `figure.approach__media`.
8. `section.section.results#results`: head (equipment alt), `.results__grid`: `ul.checks` (li with round check icon) + `figure.results__media`.
9. `section.section.section--sand.fees#fees[data-if=prices]`: head, `.price-card > dl.price-list > div.price-row > dt + dd` (no dots), `p.fees__note`.
10. `section.section.doctors#doctors`: head (specialists alt), `.doctor-grid` (keeps class `contact-sheet` too for JS: `class="doctor-grid contact-sheet"`) > `article.doctor` (`figure.doctor__photo > img` colour, `.doctor__body`: `h3`, `p.doctor__role`, `p.doctor__meta`, `p.doctor__note`; first card keeps data-site=doctorName/doctorQualification/doctorNote; others data-if=specialists).
11. `section.section.section--soft.journey#visit`: head, `ol.steps[data-steps]` (also class `timeline` for JS) > 4 × `li.step` (`span.step__badge` 1–4, h3, p, small) — no `.timeline__fill` needed (C stops setting it if absent; keep CSS var harmless).
12. `section.section.reviews#reviews`: `.review-card` (i-google big, h2 "Read patient reviews on Google", p, `a.btn.btn--primary[data-site-href=google]`).
13. `section.section.faq-section#faq`: head + reviewed-by, `.faq[data-faq]` with same `.faq__item/.faq__q/.faq__icon/.faq__a` markup and ids as now.
14. `section.section.section--soft.book#book`: head, `.book__grid`: `.book__info` (contact cards `ul.contact-list` > li with `.icon-circle` + `small` + link — keep data-site/href/row hooks; `address` block with landmark row; directions link; `.book__hours` h3 with `[data-open-badge]` + `table.hours[data-hours]` + holiday `p`; `ul.pay` chips) and `form.form[data-booking][novalidate]` (same fields/names/ids, `#form-title`, submit `button.btn.btn--primary.btn--block`, `p.form__status#form-status`, `p.form__fine`). `.map[data-map]` below.
15. `footer.footer`: `.footer__top` (4 cols: about+logo, Treatments nav, Clinic nav incl privacy/terms, Contact with `.socials[data-socials]` a[data-social]), `.footer__bottom` (© `[data-year]` `[data-site=legalName]` + "Sample content" note). No footer word.
16. `.mobile-bar` (fixed bottom <900px, 4 cells): Book (#book), Call (`data-site-href=phone`), WhatsApp (`data-site-href=whatsapp`), Directions (`data-site-href=maps`); icon + small label each. C toggles `.is-visible`.
17. `a.wa-float[data-site-href=whatsapp][aria-label="Chat on WhatsApp"]` (desktop ≥900px only, bottom-right round green button). C toggles `.is-visible` after hero.
18. `.themer[data-themer][hidden]` with 4 `button[data-set-theme=sage|clay|mist|olive]` `style="--sw:#hex"` (brand colours above).
19. `#google_translate_element[hidden]`.

Section head pattern: `.section__head` centred: `p.eyebrow` (small brand-colour sentence-case text, e.g. "Our treatments" — optional), `h2` (sentence case) with `<span class="ta" lang="ta" translate="no">` as a block subtitle, optional `p.section__intro` (+ `small` reviewed-by line). B draws a short brand underline under h2 via ::after.

Reveal: `.reveal` → C adds `.is-in` (fade + 16px rise, stagger via `--i`). Lists with `.reveal` get `.reveal--stagger` from C (add `.quick-grid`, `.concern-chips`, `.tx-grid`, `.promise-grid`, `.facts`, `.checks`, `.price-list`, `.faq`, `.pay`, `.contact-list`, `.doctor-grid`, `.steps`).

## Hooks that MUST survive (behaviour as today)
data-if / data-if="!x" (specialists, equipment, prices), data-site, data-site-href (phone|whatsapp|email|maps|google), data-site-row, data-social(s), data-price, data-count (stats now live in `.about` facts or a small `dl.stats` under the hero — A may keep `dl.stats > .stat > dt > span[data-count]` + dd inside #about), data-open-status/-dot/-badge, data-next-slot, data-hours, data-map, data-faq, data-steps, data-booking, data-lang/-current/-menu, data-themer, data-set-theme, data-year, data-site="doctorName|doctorQualification|doctorNote", `.contact-sheet` (doctors--single), `.lang-notice`, `.demo-note`, `.img-failed`.
State classes B styles: is-loaded, is-scrolled, is-tucked, menu-open, nav.is-open, lang.is-open, is-in, is-done, is-visible (mobile-bar, wa-float, lang-notice), is-closed, status-dot--live, is-today, has-error, is-error, doctors--single, is-selected (chip), is-active (nav__link, themer button, step), is-open (faq__item).

Copy rules: factual only; no "best", "painless", "guaranteed", "No.1", testimonials, star ratings, review counts, before/after. Keep all EDIT: comments.
Quality: one h1, visible focus, 44px targets, contrast ≥4.5:1, no horizontal scroll at 320px, prefers-reduced-motion disables reveals/transitions, print styles.
