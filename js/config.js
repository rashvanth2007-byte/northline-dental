/* ════════════════════════════════════════════════════════════════════════
   CLIENT CONFIG — edit this file first for every new client.
   Everything here is filled into the page automatically (name, phone,
   WhatsApp, address, hours, map, colours). Longer content such as
   treatments, doctors, fees and FAQs lives in index.html and is marked
   with "EDIT:" comments. Switch claims that don't fit the clinic off
   under "features" below.
   ════════════════════════════════════════════════════════════════════════ */
window.SITE = {
  /* ── Brand ── */
  name: "Northline",                  // short name shown in the logo and the about text
  suffix: "Dental Co.",               // small text after the name
  legalName: "Northline Dental Co.",
  city: "Coimbatore",
  area: "R.S. Puram",

  /* ── Colour theme: "sage" | "clay" | "mist" | "olive" ──
     To use a custom brand colour instead, edit the :root block at the
     top of css/styles.css. */
  theme: "sage",

  /* Shows a small colour picker so you can preview themes live while
     pitching to a client (the colour picked is remembered in that browser).
     Kept on here because this copy is the demo.
     It MUST be false on every live client site. */
  showThemeSwitcher: true,

  /* Lets a link such as index.html?name=Sri+Saai&town=Rasipuram show the
     site with a prospective client's details, for a demo (make these links
     with demo.html). It MUST be false on every live client site, or anyone
     could put another clinic's name on it with a link. */
  demoLinks: true,

  /* ── What the page claims ──
     Turn off anything that isn't true for this clinic. The page then uses
     the alternative wording written next to it in index.html (look for
     data-if="specialists" and so on). For a single-dentist clinic, set
     specialists: false and edit the one remaining doctor card. */
  features: {
    specialists: true,  // a team of MDS specialists; false = one dentist ("Meet your dentist")
    equipment: true,    // named equipment: microscope, 3D/intraoral scans, Class B autoclave, sedation
    prices: false       // true shows published fees: the Fees section, the consultation fee in the FAQs and the "starting fees" line (off by default: no rates on the page)
  },

  /* ── Contact ── */
  phone: "+91 98940 12345",           // shown on the page
  phoneRaw: "+919894012345",          // used for tap-to-call
  whatsapp: "919894012345",           // country code + number, digits only
  whatsappGreeting: "Vanakkam, I would like to book an appointment at the clinic. Please let me know a convenient time.",
  email: "hello@northline.dental",

  /* ── Location ── */
  addressLine1: "14, D.B. Road, R.S. Puram",
  addressLine2: "Coimbatore, Tamil Nadu 641002",
  landmark: "Two doors from the Head Post Office",
  // what Google Maps should search for, e.g. the exact name of the clinic's Google listing.
  // Left as this sample text (or ""), the map uses legalName + the address lines above.
  mapQuery: "D.B. Road, R.S. Puram, Coimbatore",

  /* Time zone the clinic's hours are in, so visitors elsewhere see the right
     "Open now / Closed now" status. Use "" for the visitor's own clock. */
  timeZone: "Asia/Kolkata",

  /* ── Opening hours (24-hour clock "HH:MM", clinic's local time) ──
     Exactly 7 lines, Sunday first. The SAMPLE clinic is open 24/7 (every day
     open "00:00", close "24:00", shown as "Open 24 hours" / "Open 24/7") —
     only keep that if it is true. For normal hours write, for example:
       { day: "Sunday",    closed: true },
       { day: "Monday",    open: "09:00", close: "20:30" },
       …
       { day: "Saturday",  open: "10:00", close: "13:00" }
     Close must be later than open ("24:00" = midnight); hours that run past
     midnight aren't supported (end the day at "24:00", start the next at "00:00").
     If any line is wrong, the open/closed status and timings are hidden and a
     warning appears in the browser console.
     Also update the "Open 24/7" wording written into index.html (look for
     "24/7" there) when the clinic is not open round the clock. */
  hours: [
    { day: "Sunday",    open: "00:00", close: "24:00" },
    { day: "Monday",    open: "00:00", close: "24:00" },
    { day: "Tuesday",   open: "00:00", close: "24:00" },
    { day: "Wednesday", open: "00:00", close: "24:00" },
    { day: "Thursday",  open: "00:00", close: "24:00" },
    { day: "Friday",    open: "00:00", close: "24:00" },
    { day: "Saturday",  open: "00:00", close: "24:00" }
  ],

  /* ── Social links (leave "" to hide an icon) ── */
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    youtube: "",
    google: "https://www.google.com/maps"   // link to the Google Business profile
  },

  /* ── Languages ──
     Adds a language menu to the header (machine translation by Google
     Translate). On a visitor's first visit, if their browser is set to one
     of these languages, the site asks whether they'd like to switch.
     Add or remove lines to suit the client's city. Use [] to turn it off.
     Coimbatore default: Tamil plus Malayalam (Kerala border). For other
     cities add e.g. { code: "te", label: "తెలుగు", prompt: "…" } or
     { code: "kn", label: "ಕನ್ನಡ", prompt: "…" }, or Hindi ("hi").
     Only languages with a "prompt" line can show the first-visit question;
     others still appear in the menu. */
  languages: [
    { code: "ta", label: "தமிழ்",   prompt: "இந்த இணையதளத்தை தமிழில் பார்க்க விரும்புகிறீர்களா?" },
    { code: "ml", label: "മലയാളം", prompt: "ഈ വെബ്സൈറ്റ് മലയാളത്തിൽ കാണണോ?" }
  ],
  offerTranslation: true,   // show the first-visit question

  /* ── Booking form ──
     By default the form opens WhatsApp with the patient's details
     pre-filled, so it works with no backend at all.
     To receive requests by email instead, paste a Formspree (or similar)
     endpoint here, e.g. "https://formspree.io/f/abcdwxyz". */
  formEndpoint: ""
};
