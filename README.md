# Northline — dental clinic template for Tamil Nadu

A one-page, mobile-first website for dental clinics in India, written for families in Tamil Nadu. It looks hand-designed rather than templated: a white page with one action colour per theme, three friendly shape colours (marigold, coral, sky), and simple shapes (circles, half-circles, arches, rings, dot patches, small squiggles) placed around the photos and sections. Headings are rounded and friendly, the text is plain and clear, and a few handwritten notes and the Tamil subtitles add a personal touch. The layout follows the patterns patients already know from well-reviewed Tamil Nadu clinic websites (quick actions, a concern picker, treatment cards, a sticky mobile action bar, a floating WhatsApp button, a map), but no text, logos, names or brand colours from those sites are used. The wording is written the way a clinic team talks: warm, short and plain Indian English.

Plain HTML, CSS and JavaScript: no build step, no frameworks. Open `index.html` to preview, upload the folder to any host to go live.

"Northline Dental Co." and everything on the page (doctors, prices, numbers) is **sample content** so the demo looks like a finished site. Replace it with the client's real details before launch.

### Page sections

- **Header**: round tooth logo (with a small marigold dot), navigation (Treatments, About Us, Doctors, First Visit, Find Us, FAQs), language menu, a phone icon and a pill "Book Appointment" button.
- **Hero**: a handwritten "Vanakkam! வணக்கம்", the headline, Book and WhatsApp buttons and three trust lines (registration, area and landmark, a link to Google reviews). On the right, the photo sits in an arch with a marigold circle, a coral half-circle, a sky ring, a dot patch and a plus sign around it, and a white **Open Now** pill overlaps its foot: a clock circle, the live open/closed status worked out from `hours` in `js/config.js` ("Open Now · 24 Hours", "Open Now · Closes 8:30 PM", "Closed · Opens 9:00 AM tomorrow") and a Call link with the clinic's number.
- **Quick actions**: a white strip overlapping the hero's lower edge: Book Appointment, Call Us, WhatsApp, Get Directions.
- **Treatments band**: a tilted brand-coloured band of treatment names that slides sideways as you scroll (it never moves on its own). Keep its list in step with the treatment cards.
- **Emergency strip** (`#urgent`): "Tooth Pain or a Dental Emergency?" with a Tamil subtitle, Call Now and WhatsApp Us, and the hospital note for facial swelling, fever or trouble swallowing or breathing. The sample clinic is open 24/7; reword it for normal hours.
- **"What Brings You In Today?"**: concern chips. Tapping one picks the matching treatment in the booking form and goes to the form. A handwritten note suggests Regular Check-up if unsure.
- **Our Treatments**: an open two-column list of eight treatments, each with a coloured icon circle, the name and a short note (no rates). The rows slide in from their own side as you scroll.
- **About Us**: the photo with one big rounded corner, a sky circle and a dot patch behind it, the about text, and an open list of clinic facts with icons (the year, specialist and room numbers count up).
- **Take a Look Inside** (`#gallery`): clinic photos in a row with alternating corner shapes. On wide screens the section holds still while the row slides sideways as you scroll; on phones it can be swiped.
- **Care You Can Count On**: four promises in an open list with coloured icon circles, and an arch-topped photo.
- **Fees** (only while `prices` is on): a fee card with a marigold half-circle tab at the top and a handwritten "no surprises at the billing counter".
- **Doctors**: round portraits on a coloured circle, name, role, degree, Tamil Nadu Dental Council line and special interest. With `specialists: false` it becomes one larger card.
- **Your First Visit**: four step cards with coloured number circles. As you scroll, each card slides up and stacks over the one before.
- **Reviews**: a link-only Google card (no ratings or counts).
- **FAQ**: rounded accordion cards.
- **Book an Appointment** (`#book`): the booking form (who it's for, treatment, preferred date and time, message), contact details, the clinic timings table (today highlighted) and payment chips.
- **How to Find Us** (`#location`): a large Google Map beside an address card with the clinic name, address, the landmark as a handwritten note, today's hours with the open badge, parking and access lines, and Get Directions / Call for Directions buttons. The map loads only when the visitor scrolls near it.
- **Footer**: navy, with a marigold circle and a coral half-circle at the edges; logo, treatments, clinic links (including How to Find Us, privacy and terms), contact and social icons.
- **Mobile**: a rounded 4-icon bar floating at the bottom (Book · Call · WhatsApp · Directions). **Desktop**: a round floating WhatsApp button after the hero.

### Motion

Smooth and lively, but calm: Lenis smooth scrolling on mouse and trackpad (phones keep native scrolling), and GSAP ScrollTrigger for the rest.

- **First screen**: the photo rises out of its arch, the shapes pop in around it, the greeting, headline and buttons follow, and the Open Now pill swings into place. Afterwards the shapes float gently (paused when the hero is off screen) and lean slightly away from the mouse.
- **Scrolling**: the little squiggle under each section heading draws itself; treatment rows slide in from their side, chips slide in as a row, doctors' portraits pop into their circles; the treatments band slides; the gallery row slides sideways; the first-visit cards stack; the about and promise photos drift slightly inside their frames; numbers count up.
- **Buttons**: the main Book buttons lean towards the pointer; cards lift on hover.
- Content is visible by default: if the animation scripts fail to load, or a scroll trigger is ever missed, everything still shows (a safety check reveals anything left hidden after a moment). Visitors who prefer reduced motion get no movement at all.

### Fonts

Loaded from Google Fonts with one link in the `<head>` of every page:

- **Baloo Thambi 2** (500–800) for headings, numbers and the logo: rounded and friendly, made by an Indian type foundry, and it covers Tamil too. Headings, buttons and card titles use Title Case (as on well-reviewed Tamil Nadu clinic sites); body text and FAQ questions use sentence case.
- **Figtree** (400–700) for body text, buttons and forms: clear at small sizes, so older patients can read it easily.
- **Kalam** for the handwritten notes in English (`.note`, the greeting, the step labels).
- The Tamil subtitles (`.ta`) use **Baloo Thambi 2** Bold too, so they read clearly and match the headings (no extra font to load).

## Customising for a client

### 1. `js/config.js` (5 minutes)

One file controls everything that repeats across the page:

| Setting | What it changes |
|---|---|
| `name`, `suffix`, `legalName` | Logo, page title, copyright line |
| `theme` | Colour scheme: `sage`, `clay`, `mist` or `olive` (see "Colours" below) |
| `showThemeSwitcher` | The small colour picker for live demos. **Set to `false` before going live.** |
| `demoLinks` | Lets demo links fill in a prospective client's details (see "Demo links" below). **Set to `false` before going live.** |
| `features` | Switch the page's claims on or off: `specialists` (a team of MDS specialists; `false` = one dentist), `equipment` (microscope, 3D scans, Class B autoclave, sedation) and `prices` (off by default: no rates anywhere; turn it on to show the Fees section, the consultation fee in the FAQs and the "starting fees" line). See "Fitting the clinic" below. |
| `phone`, `phoneRaw`, `whatsapp`, `email` | Every call, WhatsApp and email link, including the quick actions, the mobile bar and the floating WhatsApp button |
| `addressLine1/2`, `landmark`, `mapQuery` | The "How to Find Us" card and map, the footer address, every "Get Directions" link |
| `hours` | Hours table (days with the same hours share a line, e.g. "Every day · Open 24 hours"), the live "Open now / Closed now" status, "Today: …" on the location card and the hero's Open Now pill. The sample clinic is open 24/7: every day is `open: "00:00", close: "24:00"`. For normal hours, enter the real times (e.g. `"09:00"`–`"20:30"`) and everything switches automatically |
| `social` | Footer icons (leave a link empty to hide its icon); `google` is also the Google trust badge and the "Read Reviews on Google" button |
| `languages`, `offerTranslation` | Header language menu and the first-visit "view in your language?" question (see below) |
| `formEndpoint` | Leave empty to send bookings to WhatsApp, or paste a Formspree URL to receive them by email |

### 2. `index.html` (content)

Search for `EDIT:` to jump to each block:

- Page title, meta description and the Google business details in `<head>`. The JSON-LD clinic block keeps its name, phone, email, street, city, map link, hours and social links in step with `js/config.js` automatically, and the FAQ answers are added as an `FAQPage` from the page itself (so they always match the feature switches). Edit by hand: `url`, `image`, `geo` (the clinic's latitude and longitude from Google Maps), `postalCode`, `foundingDate`, languages and the list of services. Never add ratings or reviews.
- Hero headline (the words inside `<span class="hl">` are shown in the action colour), lede, photo and trust lines
- The handwritten notes (`<p class="note …">`): the "Vanakkam! வணக்கம்" greeting beside the hero photo, "tap a time, we'll fill the form for you", "not sure? pick Regular Check-up", "no surprises at the billing counter" and the step labels. Keep them short and true for the clinic; delete any you don't want
- The treatments band (keep its names in step with the treatment cards)
- The emergency strip wording (keep it honest: "we will try", never "guaranteed" or "within 15 minutes")
- About text and the clinic facts list, including the numbers (`data-count` is the value that counts up)
- The "How to Find Us" card: parking and access lines (the address, landmark and today's hours fill in from `js/config.js`)
- The "Take a Look Inside" gallery photos, alt text and captions
- The eight treatment cards: icon, name and note
- The concern chips (see "Treatment icons and concern chips" below)
- The Fees price list
- The four commitments, the first-visit steps, FAQs and payment options (UPI apps, cards, cash)
- Clinic facts: languages spoken (sample: Tamil, English, Malayalam), wheelchair access and parking
- The note under the clinic hours (sample: open 24 hours, Sundays and holidays too; call first on Pongal and Deepavali). If the clinic is **not** open round the clock, also reword the 24/7 lines in the emergency strip, first-visit step ("at any hour"), emergency FAQ, hours note, meta and `og:description` (search for "24" and "any hour"), and remove the "Night (After 8:30)" Preferred Time option if the clinic is closed then. The JSON-LD opening hours follow `js/config.js` on their own
- Doctors: photo, name, degrees, speciality, years, Tamil Nadu Dental Council registration number (sample "TNDC Reg. No. 0000"), memberships and a factual special-interest line
- The "Information reviewed by …" lines under the treatments intro and the FAQ intro (dentist's name, degree, registration number and date). The name follows `doctorName` in demo links automatically; ", MDS" shows only while `specialists` is on.
- The "In Practice For 14+ years" fact (`data-count` is the number that counts up), kept in step with `foundingDate` in the JSON-LD and the first doctor's years

### Treatment icons and concern chips

The icons are line drawings in the SVG sprite at the top of `index.html` (each a `<symbol id="i-…">`). A card or chip uses one with `<svg><use href="#i-tooth"/></svg>`. To change an icon, point the `href` at another symbol, or add a new `<symbol>` (24 × 24 viewBox, `fill="none" stroke="currentColor"`, stroke width about 1.6) and use its id. The soft circle behind it (`.icon-dot`) takes the theme's colours automatically, cycling through the action colour and the three shape colours. The hand-drawn arrow used by the notes is `i-hand-arrow`.

Each concern chip is a `<button class="chip" data-concern="…">`. The `data-concern` value must match the `value` of an `<option>` in the booking form's treatment list **exactly** (for example `data-concern="Tooth pain / sensitivity"`). To add a chip, copy one, change its icon, label and `data-concern`, and make sure the form has an option with the same value. To remove one, delete the button (the option can stay).

Every `<option>` in the booking form has an explicit English `value="…"` equal to its English text. Keep it that way when you add options: Google Translate changes the visible text of options, and the `value` keeps what is sent to the clinic on WhatsApp in English.

### Fitting the clinic: specialists, equipment and prices

The sample describes a larger clinic with MDS specialists, advanced equipment and published fees. For a smaller clinic, turn off whatever isn't true in `features` in `js/config.js`:

```js
features: { specialists: false, equipment: false, prices: false }
```

- **`specialists: false`** (single-dentist clinic): the hero's specialist wording becomes plain, personal wording, the registration chip reads "Qualified Dental Surgeon", the doctors section becomes "Meet Your Dentist" with only the first card, the nav says "Our Dentist", the specialist numbers are replaced with "1 Dentist Who Sees You Every Visit" and "30 Minutes for Your First Consultation", and the fourth commitment becomes "The Same Dentist Every Visit".
- **`equipment: false`**: mentions of the dental microscope, digital and 3D scans, computer-controlled anaesthesia, sedation and the Class B autoclave are taken out or replaced with plain wording (in the about text, treatment notes, the commitments, the first-visit steps and the FAQs), and the "X-ray room" gallery photo is hidden.
- **`prices: false`** (the default): no rates show anywhere. The Fees section and the consultation-fee FAQ are removed, the treatments intro says the estimate comes after the consultation, and the EMI answer drops its amount. The payment options in the booking section stay. Set `prices: true` only for a clinic that wants its fees published; then fill in the Fees list with its real starting fees.

In `index.html`, wording marked `data-if="specialists"` shows only while that switch is on, and `data-if="!specialists"` is the wording used when it is off (the same for `equipment` and `prices`). Edit both versions, or delete the one you don't need.

### Demo links: show a clinic its own name

While `demoLinks` is `true`, adding details to the address shows the site with a prospective client's name, without editing any file:

```
https://rashvanth2007-byte.github.io/northline-dental/?name=Sree's+Smile+Care&town=Pollachi&phone=9876543210&specialists=0
```

The easy way is **`demo.html`** (for example `https://rashvanth2007-byte.github.io/northline-dental/demo.html`): type the clinic's name, town and phone, choose single dentist or specialists, equipment, prices and a colour (sage, clay, mist or olive), then open the demo, copy the link, send it on WhatsApp, or let the doctor scan the QR code.

The links and QR code always point at the live site, even when `demo.html` is opened from your own computer, so they open on any phone. If the template moves to another address, change `LIVE_SITE` near the end of `demo.html`. The QR code is drawn by a copy of qrcode-generator in `js/vendor/`, so it doesn't depend on another server.

Lines marked `data-sample` (each doctor's "TNDC Reg. No. 0000 · Member, Indian Dental Association" line and the registration number in the two "Information reviewed by" lines) are removed automatically in demo links, so a prospective client never sees a made-up registration number under their own name. On the client's live site, put the real numbers inside those spans (the `data-sample` attribute can then be deleted).

A demo link changes the logo, page title, copyright, privacy and terms pages, the clinic name in the about text, the hero location, the address block and the map (which searches for the clinic on Google Maps), and the Google trust badge and reviews button. With a phone number, the Call and WhatsApp buttons (including the quick actions, the mobile bar and the floating WhatsApp button) and the booking form reach the clinic itself, so the doctor can try them. The sample email and landmark are hidden. With a dentist's name, the first doctor card shows that name and their qualification (if given), and the sample "special interest" line is removed.

Photos, the other doctors, fees and numbers stay as samples, so the demo shows a small "Preview for … · sample photos and details" strip at the top and asks search engines not to index it. Say clearly that it is a sample when you show it.

All the link options (`name`, `sub`, `town`, `area`, `address`, `phone`, `wa`, `doctor`, `qual`, `photo`, `theme`, `specialists`, `equipment`, `prices`) are listed at the top of `js/demo.js`.

### 3. Photos

The demo uses free Unsplash stock photos loaded by URL. For a client, put their photos in `assets/img/` and change each `src`, for example `src="assets/img/hero.jpg"`. If a photo fails to load, the page shows a plain "Photo" box instead of a broken image.

| Slot | Suggested size |
|---|---|
| Hero | 1000 × 1250 (portrait) |
| About (the clinic) | 1400 × 900 (landscape) |
| Why Choose Us (optional) | 1400 × 800 |
| Take a Look Inside (gallery) | 800 × 600 each (landscape) |
| Doctors | 700 × 880 each |

**Gallery photo checklist** (ask the clinic for these; daylight, tidy rooms, no patients' faces):

- [ ] Building front / entrance with the signboard visible (helps patients find it)
- [ ] Reception and waiting area
- [ ] Treatment room with the dental chair
- [ ] Sterilisation area (autoclave, sealed pouches)
- [ ] Kids corner or the room used for children (or delete that photo)
- [ ] X-ray / scan room (only if the clinic has one; shows while `equipment` is on)

Replace each `src`, describe the real room in the `alt` text and caption, and remove "(sample photo)" from the alt text. Delete a whole `<li>` to drop a photo.

The template has no before/after photo comparison on purpose: the dental code of ethics and the National Dental Commission advise against patient before/after photos in advertising. (The earlier "Smile design" section was removed to keep the page shorter; smile designing is described in its treatment card.)

### 4. Colours

Each theme has one **action colour** (buttons, links, the open status) with a darker shade and a light tint, plus three **shape colours** for the circles, soft panels and icon backgrounds. White text on the action colour meets 4.5:1 contrast. The shape colours are for decoration and soft panels only, never for body text.

| Theme | Action colour | Darker | Tint | Shape colours |
|---|---|---|---|---|
| `sage` (default) | `#1F7A5C` leaf green | `#165C45` | `#E2F3EB` | marigold `#F6A623`, coral `#F26B5B`, sky `#2D9CDB` |
| `clay` | `#B4532F` terracotta | `#8E3F22` | `#FAE9E1` | marigold, teal `#2A9D8F`, pink `#E9688F` |
| `mist` | `#2468A8` blue | `#1A4F82` | `#E3EEF9` | marigold, coral, leaf `#3AAA6B` |
| `olive` | `#5E6B1F` olive | `#475117` | `#EEF1DC` | marigold, coral, sky |

To match a client's logo, edit `--brand`, `--brand-deep`, `--brand-tint` and `--soft` for a theme in `css/styles.css` (keep white text on `--brand` at 4.5:1 or more). Each shape colour has a fill, a soft panel and an icon ink (`--s1`, `--s1-soft`, `--s1-ink` and so on). The ink colour (`--ink`, deep navy), body text, muted text and lines are in the `:root` block. The privacy and terms pages pick up the same colours.
### 5. Languages

A website cannot trigger the browser's own "Translate this page?" popup; the browser decides that. The template does the same job itself:

- A globe menu in the header lists English plus the languages in `languages` in `js/config.js`.
- On a first visit, if the visitor's browser lists one of those languages, a bar asks in that language whether to switch. The choice is remembered on that device.
- To preview the question, add `?lang=ta` (or `ml`) to the address.
- The Coimbatore sample lists only Tamil and Malayalam (the languages its patients are most likely to use). For a clinic elsewhere, add Telugu (`te`), Kannada (`kn`) or Hindi (`hi`) lines as noted in `js/config.js`.
- Words that must not be translated carry `translate="no"`: every "WhatsApp" (Google Translate otherwise turns it into odd phrases in Tamil), the clinic name, the email address and the Tamil labels.

Translation is done by Google Translate, so it is machine quality and needs an internet connection. The clinic name is never translated. For a client who wants polished wording in one language, translate the text in `index.html` by hand instead.

### 6. Tamil labels and tone

The main copy is in English. A few short Tamil labels are added by hand, each in `<span class="ta" lang="ta" translate="no">…</span>` (set in bold Baloo Thambi 2; `translate="no"` stops Google Translate changing them):

- the hero greeting beside the photo, `<p class="note note--hello">Vanakkam! <span class="ta">வணக்கம்</span></p>`
- the subtitle under each section heading, e.g. "Dental Treatments We Offer" with எங்கள் சிகிச்சைகள் beneath
- the footer "Contact Us" heading (தொடர்புக்கு)

To change a label, edit the Tamil text inside the span. To remove one, delete the whole `<span class="ta" …>…</span>`; to drop the greeting, delete the `<p class="note note--hello">`. Have a Tamil speaker check any new wording.

Keep new wording in the same tone: warm, respectful and plain (write for parents and grandparents as well as young adults), no slang or jokes, and only factual claims (see "Advertising rules" below).

### 7. Honest promises

Patients remember a broken promise more than a modest one. Write only what the front desk can keep on a busy day:

- Replies: "as soon as we can", not "within 15 minutes".
- Emergencies: "we will try to see you as soon as possible", not "within a few hours". Claim "open 24/7" only if a dentist is genuinely available round the clock; otherwise use the clinic's real hours and "we will reply when the clinic opens".
- Always point serious symptoms (facial swelling, fever, difficulty swallowing or breathing) to a hospital emergency department.
- Fees: say what a starting fee does not include (for example "A crown, if needed, is charged separately" on root canal treatment) and offer "EMI options on request" without naming finance partners unless the clinic has confirmed them.
- No "best", "painless", "guaranteed" or "No. 1".

## Before going live

- [ ] `showThemeSwitcher: false` and `demoLinks: false` in `js/config.js` (with demo links on, anyone could make a link that shows a different phone number on the clinic's own site)
- [ ] `features` in `js/config.js` matches the clinic (specialists, equipment, prices), and `demo.html` deleted from the client's copy
- [ ] `social.google` in `js/config.js` points at the clinic's Google Business profile (the trust badge and reviews card link there instead of showing testimonials or ratings)
- [ ] Sample doctors, prices (treatment cards and the Fees list), statistics and the "In Practice For" years replaced (consistent with `foundingDate` in the JSON-LD); doctors' degrees shown exactly as awarded, and "Specialist" / "Orthodontist" used only for dentists with that MDS
- [ ] Each dentist's real Tamil Nadu Dental Council registration number in place of "TNDC Reg. No. 0000" inside the `data-sample` spans (doctor cards and the two "Information reviewed by" lines), and memberships listed only if current
- [ ] Emergency strip, booking intro and emergency FAQ checked with the clinic (what it can really promise for same-day visits and replies)
- [ ] Gallery photos replaced with the clinic's own (see the photo checklist), with "(sample photo)" removed from the alt text
- [ ] Treatment cards and concern chips list only treatments the clinic actually offers, and every chip's `data-concern` matches a booking-form option
- [ ] Hours in `js/config.js` are the clinic's real hours (the sample is 24/7), and every "24/7" line on the page is true for this clinic
- [ ] Languages spoken, access, parking, payment options and the festival note match the clinic
- [ ] Alt texts and captions describe the clinic's own rooms once the stock photos are replaced (until then the alt texts end in "(sample photo)" or "(illustrative image)")
- [ ] All stock photos replaced with the client's own
- [ ] Title, meta description, sharing tags (canonical, `og:url`, `og:image`) and the JSON-LD block in `<head>` updated (`url`, `image`, `geo`, `postalCode`, services)
- [ ] `sitemap.xml` and `robots.txt` remade for the clinic's own domain (see "Sitemap and robots.txt" below)
- [ ] The map in "How to Find Us" shows the clinic itself (set `mapQuery` to the exact name of its Google listing if it doesn't), and the parking and access lines are true
- [ ] A building-front photo with the signboard added as the first gallery photo
- [ ] The handwritten notes still say things that are true for this clinic (languages, fees, booking)
- [ ] `timeZone` in `js/config.js` set if the clinic is outside India
- [ ] `privacy.html` and `terms.html` reviewed by the clinic (they are samples) and their "Last updated" dates set
- [ ] Booking form tested on a phone (it should open WhatsApp with the details filled in, including "Appointment for"), plus the mobile bar, a concern chip and the emergency strip's Call and WhatsApp buttons

### Sitemap and robots.txt

The site ships with a `sitemap.xml` and `robots.txt` made for the template's demo address. For each client, remake both for the clinic's own domain with the studio's sitemap tool (it works for any of the studio's sites):

```
python ~/.claude/skills/tn-dental-clinic-site/scripts/make_sitemap.py <client-folder> https://www.clinic-domain.in/
```

It lists every page that should appear in Google (the privacy and terms pages are marked `noindex`, so they stay out, and `demo.html` is always left out), dates each one from the file, and writes a `robots.txt` that blocks `demo.html` and points to the sitemap. Run it again after adding a page or moving domains, then submit the sitemap in Google Search Console. Crawlers only read `robots.txt` at the root of a domain, so on a GitHub Pages project address (`user.github.io/repo/`) the sitemap has to be submitted in Search Console by hand.

### Advertising rules for dentists

The copy follows the Dentists (Code of Ethics) Regulations, 2014 (still in force under the National Dental Commission): factual information, qualifications, fees and timings are allowed. Claims of being the "best", "No. 1", "painless" or guaranteed results, and boasting about case numbers, are not. Use only recognised degree and speciality names (for example "MDS (Paediatric and Preventive Dentistry)"). In October 2026 the National Dental Commission warned dentists against patient testimonials and before/after photos in online advertising ([news report](https://medicaldialogues.in/news/health/doctors/national-dental-commission-warns-dentists-against-unethical-social-media-advertising-181335)).

That is why the Google trust badge and the Reviews card only **link out** to the clinic's Google reviews: a star rating or review count shown on the clinic's own site works as a testimonial in advertising, so neither is shown. Many large chains display "Rated 4.9/5"; this template does not copy that. Registration is held by each dentist, not by the clinic, so the site says "Our dentists are registered with the Tamil Nadu Dental Council" and shows each registration number. Keep the client's wording factual and ask them to confirm anything they are unsure of with the Tamil Nadu Dental Council. This is guidance, not legal advice.

## Files

```
index.html        page structure and content
css/styles.css    design tokens, themes, layout and motion
js/config.js      client details (edit this first)
js/main.js        behaviour (rarely needs editing)
js/demo.js        demo links (only while demoLinks is true)
js/legal.js       fills clinic details and theme into the two legal pages
demo.html         demo link maker, for you (not linked from the site)
js/vendor/        QR code library used by demo.html (MIT licence)
privacy.html      sample privacy policy
terms.html        sample terms of use
assets/img/       put client photos here
sitemap.xml       pages for search engines (remake per client with make_sitemap.py)
robots.txt        crawler rules: blocks demo.html, points to the sitemap
PRODUCT.md        who the template is for and the rules it keeps (for design work)
DESIGN.md         the design system: colours, type, shapes, components, motion
reports/          page-quality report and the SEO topic plan (first pages for a client)
```

Smooth scrolling and the scroll animations use GSAP, ScrollTrigger and Lenis from public CDNs (cdnjs and jsDelivr). If they can't load, the page still works and shows everything, just without the motion.

To preview locally: `python -m http.server 8770 --bind 127.0.0.1`, then open `http://127.0.0.1:8770/` (or just open `index.html` directly).
