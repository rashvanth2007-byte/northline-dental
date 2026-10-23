/* ════════════════════════════════════════════════════════════════════════
   Site behaviour. You normally don't need to edit this file —
   client details live in js/config.js.
   ════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var SITE = window.SITE || {};
  var root = document.documentElement;
  var mq = function (q) { return window.matchMedia ? window.matchMedia(q) : { matches: false }; };
  var reduceMotion = mq('(prefers-reduced-motion: reduce)').matches;
  // GSAP, ScrollTrigger and Lenis come from a CDN and load after this file (deferred), so the clinic's
  // details and switches are in place before anything shows; motion starts once they arrive (section 17)
  var gsap = null, ScrollTrigger = null;
  var lenis = null; // smooth scrolling (section 17)
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function onMedia(list, fn) {
    if (!list || !list.addEventListener && !list.addListener) return;
    if (list.addEventListener) list.addEventListener('change', fn); else list.addListener(fn);
  }

  /* ── 1. What the page claims: "features" in config.js ───────────────── */
  // data-if="prices" stays only while that switch is on, data-if="!prices" only while it's off
  var features = SITE.features || {};
  $$('[data-if]').forEach(function (el) {
    var rule = el.getAttribute('data-if');
    var wanted = rule.charAt(0) !== '!';
    if ((features[rule.replace('!', '')] !== false) === wanted) el.removeAttribute('data-if');
    else el.remove();
  });
  if (features.prices === false) $$('[data-price]').forEach(function (el) { el.textContent = 'Ask About Fees'; });
  var sheet = $('.contact-sheet');
  if (sheet) sheet.classList.toggle('doctors--single', $$('.doctor', sheet).length === 1);
  // a lone dentist's photo shows larger (up to 260px), so the browser should pick the bigger file
  if (sheet && sheet.classList.contains('doctors--single')) $$('.doctor__photo img', sheet).forEach(function (img) { img.sizes = '260px'; });

  /* ── 2. Fill in client details from config.js ───────────────────────── */
  var waNumber = String(SITE.whatsapp || '').replace(/\D/g, ''); // "+91 98940 12345" → "919894012345"
  function waLink(text) {
    return 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(text || SITE.whatsappGreeting || '');
  }
  // Google Maps search text. By default it is the clinic's name and full address, so
  // "Get directions" finds the clinic itself rather than just the street. A mapQuery set
  // in js/config.js (other than the template's sample street) overrides it, e.g. the
  // exact name of the clinic's Google Business listing.
  var SAMPLE_MAP_QUERY = 'D.B. Road, R.S. Puram, Coimbatore';
  var mapQuery = SITE.mapQuery && SITE.mapQuery !== SAMPLE_MAP_QUERY ? SITE.mapQuery
    : [SITE.legalName || SITE.name, SITE.addressLine1, SITE.addressLine2].filter(Boolean).join(', ');
  var mapsLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mapQuery);

  // a setting that is present but left empty ("") removes what shows it, instead of
  // leaving the sample clinic's details on the page; a [data-site-row] wrapper goes with it
  function isBlank(key) { return Object.prototype.hasOwnProperty.call(SITE, key) && (SITE[key] === '' || SITE[key] == null); }
  function drop(el) { (el.closest('[data-site-row]') || el).remove(); }

  $$('[data-site]').forEach(function (el) {
    var key = el.getAttribute('data-site');
    if (SITE[key]) el.textContent = SITE[key];
    else if (isBlank(key)) drop(el);
  });

  var hrefs = {
    phone: { blank: isBlank('phoneRaw'), url: SITE.phoneRaw && 'tel:' + SITE.phoneRaw },
    whatsapp: { blank: isBlank('whatsapp'), url: waNumber && waLink() },
    email: { blank: isBlank('email'), url: SITE.email && 'mailto:' + SITE.email },
    maps: { blank: !mapQuery, url: mapQuery && mapsLink } // quick card, mobile bar, directions link
  };
  $$('[data-site-href]').forEach(function (el) {
    var h = hrefs[el.getAttribute('data-site-href')];
    if (!h) return;
    if (h.url) el.setAttribute('href', h.url);
    else if (h.blank) drop(el);
  });

  // demo links can name the first doctor and pick their sample photo
  var doctorImg = $('.doctor img');
  if (doctorImg && SITE.doctorPhoto) doctorImg.setAttribute('src', SITE.doctorPhoto);
  if (doctorImg && SITE.doctorName) doctorImg.setAttribute('alt', 'Portrait of ' + SITE.doctorName);

  var social = SITE.social || {};
  $$('[data-social]').forEach(function (el) {
    var url = social[el.getAttribute('data-social')];
    if (url) el.setAttribute('href', url); else el.remove();
  });
  $$('[data-socials]').forEach(function (box) { if (!$('[data-social]', box)) box.hidden = true; });
  // the Google badge / reviews button links to the Google profile; without one it stays as plain text
  $$('[data-site-href="google"]').forEach(function (el) {
    if (social.google) el.setAttribute('href', social.google);
    else if (social.google === '') { el.removeAttribute('href'); el.removeAttribute('target'); }
  });

  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ── 3. Theme ───────────────────────────────────────────────────────── */
  var THEMES = ['sage', 'clay', 'mist', 'olive'];
  var LEGACY = { lagoon: 'sage', sapphire: 'clay', plum: 'mist', forest: 'olive' }; // Ivory Lane names
  var favicon = $('link[rel="icon"]');
  function setTheme(name) {
    name = String(name || '').toLowerCase();
    name = LEGACY[name] || name;
    if (THEMES.indexOf(name) < 0) {
      if (name) console.warn('Unknown theme "' + name + '" in js/config.js; using "sage".');
      name = 'sage';
    }
    root.setAttribute('data-theme', name);
    $$('[data-set-theme]').forEach(function (b) {
      var on = b.getAttribute('data-set-theme') === name;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    // the favicon tile follows the theme's brand colour
    var css = getComputedStyle(root);
    var colour = (css.getPropertyValue('--brand') || css.getPropertyValue('--accent')).trim();
    var href = favicon && favicon.getAttribute('href');
    if (href && /^#[0-9a-f]{3,8}$/i.test(colour)) {
      favicon.setAttribute('href', href.replace(/fill='(%23|#)[0-9a-fA-F]{3,8}'/, "fill='%23" + colour.slice(1) + "'"));
    }
  }
  // while the theme switcher is on (demo copies only), the last colour picked is remembered
  // across reloads and on the privacy and terms pages; a ?theme= demo link still wins
  var pickedTheme = SITE.showThemeSwitcher && !/[?&]theme=/.test(window.location.search) ? store.get('site-theme') : null;
  setTheme(pickedTheme && (THEMES.indexOf(pickedTheme) >= 0) ? pickedTheme : SITE.theme);
  var themer = $('[data-themer]');
  if (themer && SITE.showThemeSwitcher) {
    themer.hidden = false;
    // on phones the picker folds into one small button so it doesn't cover the page
    var themerToggle = null;
    var themerNarrow = null;
    var setThemerOpen = function (open) {
      themer.classList.toggle('is-collapsed', !open);
      if (themerToggle) themerToggle.setAttribute('aria-expanded', String(open));
    };
    var fitThemer = function () {
      var narrow = window.innerWidth < 900;
      if (narrow === themerNarrow) return; // only act when crossing the breakpoint
      themerNarrow = narrow;
      if (narrow && !themerToggle) {
        themerToggle = document.createElement('button');
        themerToggle.type = 'button';
        themerToggle.className = 'themer__toggle';
        themerToggle.setAttribute('aria-label', 'Change colour theme');
        themerToggle.setAttribute('aria-expanded', 'false');
        themer.insertBefore(themerToggle, themer.firstChild);
      }
      if (themerToggle) themerToggle.hidden = !narrow;
      setThemerOpen(!narrow);
    };
    fitThemer();
    window.addEventListener('resize', fitThemer);
    themer.addEventListener('click', function (e) {
      if (themerToggle && e.target.closest('.themer__toggle')) {
        setThemerOpen(themer.classList.contains('is-collapsed'));
        return;
      }
      var b = e.target.closest('[data-set-theme]');
      if (!b) return;
      setTheme(b.getAttribute('data-set-theme'));
      store.set('site-theme', root.getAttribute('data-theme'));
      if (themerNarrow && themerToggle) {
        setThemerOpen(false);
        themerToggle.focus(); // the swatch that had focus is now folded away
      }
    });
    document.addEventListener('keydown', function (e) {
      if ((e.key !== 'Escape' && e.key !== 'Esc') || !themerNarrow || !themerToggle || themer.classList.contains('is-collapsed')) return;
      setThemerOpen(false);
      themerToggle.focus();
    });
  }

  /* ── 4. Languages: header menu + first-visit translate prompt ───────── */
  (function () {
    var langs = SITE.languages || [];
    var box = $('[data-lang]');
    if (!box || !langs.length) return;

    var menu = $('[data-lang-menu]', box);
    var btn = $('.lang__btn', box);
    var currentLabel = $('[data-lang-current]', box);
    if (!menu || !btn) return;
    var all = [{ code: 'en', label: 'English' }].concat(langs);
    var active = 'en';
    var widget = null; // promise for Google's hidden language <select>
    var dismissOffer = function () {};

    function loadWidget() {
      if (widget) return widget;
      widget = new Promise(function (resolve, reject) {
        window.googleTranslateElementInit = function () {
          new window.google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: langs.map(function (l) { return l.code; }).join(','),
            autoDisplay: false
          }, 'google_translate_element');
          var tries = 0;
          (function waitForSelect() {
            var select = $('#google_translate_element select');
            if (select && select.options.length > 1) return resolve(select);
            if (++tries > 100) return reject(new Error('Translate widget did not load'));
            setTimeout(waitForSelect, 100);
          })();
        };
        var script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.onerror = function () { reject(new Error('Translate script blocked')); };
        document.head.appendChild(script);
      });
      return widget;
    }

    // a short message under the header (used when translation can't load)
    function notice(text) {
      var n = document.createElement('div');
      n.className = 'lang-notice is-visible notranslate';
      n.setAttribute('role', 'status');
      var p = document.createElement('p');
      p.textContent = text;
      n.appendChild(p);
      var head = $('.header');
      document.body.insertBefore(n, head ? head.nextSibling : document.body.firstChild);
      setTimeout(function () { n.classList.remove('is-visible'); setTimeout(function () { n.remove(); }, 700); }, 4000);
    }

    function mark(code) {
      active = code;
      all.forEach(function (l) {
        if (l.code !== code) return;
        if (currentLabel) currentLabel.textContent = l.label;
        btn.setAttribute('aria-label', 'Language: ' + l.label);
      });
      $$('button', menu).forEach(function (b) {
        b.setAttribute('aria-current', String(b.getAttribute('data-code') === code));
      });
    }

    function setLanguage(code) {
      dismissOffer();
      if (code === active) return;
      if (code === 'en') {
        // going back to the original text is most reliable with a clean reload
        store.del('site-lang');
        // Google keeps the chosen language in a "googtrans" cookie; clear it so the page stays English
        var expire = '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        document.cookie = 'googtrans' + expire;
        document.cookie = 'googtrans' + expire + '; domain=' + window.location.hostname;
        document.cookie = 'googtrans' + expire + '; domain=.' + window.location.hostname;
        window.location.reload();
        return;
      }
      store.set('site-lang', code);
      mark(code);
      loadWidget().then(function (select) {
        select.value = code;
        select.dispatchEvent(new Event('change'));
      }).catch(function () {
        widget = null; // allow a later retry
        store.del('site-lang');
        mark('en');
        notice('Translation is not available right now. Please check your connection and try again.');
      });
    }

    menu.innerHTML = '';
    all.forEach(function (l) {
      var li = document.createElement('li');
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('data-code', l.code);
      b.setAttribute('lang', l.code);
      b.textContent = l.label;
      li.appendChild(b); menu.appendChild(li);
    });
    box.hidden = false;
    mark('en');

    function toggle(open) {
      box.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    }
    btn.addEventListener('click', function () { toggle(!box.classList.contains('is-open')); });
    menu.addEventListener('click', function (e) {
      var b = e.target.closest('[data-code]');
      if (!b) return;
      toggle(false);
      setLanguage(b.getAttribute('data-code'));
    });
    document.addEventListener('click', function (e) { if (!box.contains(e.target)) toggle(false); });
    box.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !box.contains(e.relatedTarget)) toggle(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !box.classList.contains('is-open')) return;
      toggle(false);
      btn.focus(); // don't leave focus on a menu item that is now hidden
    });

    // returning visitor who already chose a language
    var saved = store.get('site-lang');
    if (saved && langs.some(function (l) { return l.code === saved; })) { setLanguage(saved); return; }

    // first visit: offer the visitor's own language if their browser lists one we support
    // adding ?lang=ta (or hi, te …) to the address previews the question for that language
    var preview = (window.location.search.match(/[?&]lang=([a-z]{2})/i) || [])[1];
    if (!preview && (!SITE.offerTranslation || store.get('site-lang-asked'))) return;
    var prefs = (preview ? [preview] : navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en'])
      .map(function (l) { return String(l).toLowerCase().split('-')[0]; });
    var match = null;
    prefs.some(function (p) {
      match = langs.filter(function (l) { return l.code === p && l.prompt; })[0] || null;
      return !!match;
    });
    if (!match) return;

    var offer = document.createElement('div');
    offer.className = 'lang-notice notranslate';
    offer.setAttribute('role', 'dialog');
    offer.setAttribute('aria-label', 'Translate this website');
    var text = document.createElement('p');
    text.textContent = match.prompt;
    text.setAttribute('lang', match.code);
    var yes = document.createElement('button');
    yes.type = 'button';
    yes.className = 'btn btn--primary lang-notice__yes';
    yes.setAttribute('lang', match.code);
    yes.textContent = match.label;
    var no = document.createElement('button');
    no.type = 'button';
    no.className = 'lang-notice__no';
    no.textContent = 'English';
    offer.appendChild(text); offer.appendChild(yes); offer.appendChild(no);

    dismissOffer = function () {
      store.set('site-lang-asked', '1');
      offer.classList.remove('is-visible');
      setTimeout(function () { offer.remove(); }, 700);
      dismissOffer = function () {};
    };
    yes.addEventListener('click', function () { setLanguage(match.code); });
    no.addEventListener('click', function () { dismissOffer(); });
    // right after the header in the page, so keyboard users reach it where it appears
    setTimeout(function () {
      if (active !== 'en' || (!preview && store.get('site-lang-asked'))) return;
      var head = $('.header');
      document.body.insertBefore(offer, head ? head.nextSibling : document.body.firstChild);
      requestAnimationFrame(function () { offer.classList.add('is-visible'); });
    }, 1800);
  })();

  /* ── 5. Opening hours + live "open now" status ──────────────────────── */
  function fmt(t) {
    var p = t.split(':'), h = +p[0] % 24, m = p[1]; // "24:00" (closing at midnight) reads 12:00 AM
    return ((h % 12) || 12) + ':' + m + ' ' + (h < 12 ? 'AM' : 'PM');
  }
  function mins(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }
  // a day set to open "00:00" and close "24:00" is open round the clock
  function allDay(d) { return !!d && !d.closed && d.open === '00:00' && d.close === '24:00'; }
  function dayRange(d) { return d.closed ? 'Closed' : allDay(d) ? 'Open 24 hours' : fmt(d.open) + ' – ' + fmt(d.close); }

  // the clinic's own day and time, so visitors in other time zones see the right status
  function clockIn(zone, d) {
    var parts = new Intl.DateTimeFormat('en-GB', { timeZone: zone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(d);
    var get = function (type) { return (parts.filter(function (p) { return p.type === type; })[0] || {}).value; };
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    var h = +get('hour') % 24, m = +get('minute');
    return day >= 0 && !isNaN(h) && !isNaN(m) ? { day: day, mins: h * 60 + m } : null;
  }
  function clinicClock() {
    var d = new Date();
    var zone = SITE.timeZone === undefined ? 'Asia/Kolkata' : SITE.timeZone;
    if (zone) {
      try { var c = clockIn(zone, d); if (c) return c; }
      catch (e) {
        console.warn('Unknown timeZone "' + zone + '" in js/config.js; using Asia/Kolkata.');
        try { var k = clockIn('Asia/Kolkata', d); if (k) return k; } catch (e2) {}
      }
    }
    return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
  }
  // today's date at the clinic as "YYYY-MM-DD" (the booking form's earliest date)
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function clinicToday() {
    var d = new Date();
    var zone = SITE.timeZone === undefined ? 'Asia/Kolkata' : SITE.timeZone;
    var zones = zone ? [zone, 'Asia/Kolkata'] : [];
    for (var z = 0; z < zones.length; z++) {
      try {
        var parts = new Intl.DateTimeFormat('en-GB', { timeZone: zones[z], year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d);
        var get = function (type) { return (parts.filter(function (p) { return p.type === type; })[0] || {}).value; };
        if (get('year') && get('month') && get('day')) return get('year') + '-' + get('month') + '-' + get('day');
      } catch (e) {}
    }
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  var SHORT_DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // each day needs closed: true, or "HH:MM" open and close times with close after open
  // ("24:00" = midnight). Hours that run past midnight aren't supported: end the day at
  // "24:00" and start the next at "00:00" instead.
  var TIME = /^([01]?\d|2[0-3]):[0-5]\d$|^24:00$/;
  function badDay(d, i) {
    if (!d || typeof d !== 'object') return 'entry ' + i + ' is missing';
    if (d.closed) return '';
    if (!TIME.test(String(d.open)) || !TIME.test(String(d.close))) return (d.day || 'entry ' + i) + ' needs open and close times like "09:00" and "20:30"';
    if (mins(d.close) <= mins(d.open)) return (d.day || 'entry ' + i) + ' closes before it opens (hours past midnight are not supported)';
    return '';
  }
  var hoursProblem = !SITE.hours ? 'missing' : !SITE.hours.length || SITE.hours.length !== 7 ? 'needs exactly 7 entries, Sunday first'
    : SITE.hours.map(badDay).filter(Boolean)[0] || '';

  if (!hoursProblem) {
    var clock = clinicClock();
    var todayIndex = clock.day;
    var today = SITE.hours[todayIndex];
    var nowMins = clock.mins;
    var isOpen = !today.closed && nowMins >= mins(today.open) && nowMins < mins(today.close);

    // hours table, Monday first: days in a row with the same hours share one line
    // ("Every day · Open 24 hours", "Monday – Saturday · 9:00 AM – 8:30 PM"); today's line is marked
    var table = $('[data-hours]');
    if (table) {
      var body = table.tagName === 'TABLE' ? (table.tBodies[0] || table.appendChild(document.createElement('tbody'))) : table;
      body.innerHTML = '';
      var groups = [];
      [1, 2, 3, 4, 5, 6, 0].forEach(function (i) {
        var range = dayRange(SITE.hours[i]);
        var last = groups[groups.length - 1];
        if (last && last.range === range) last.days.push(i); else groups.push({ range: range, days: [i] });
      });
      groups.forEach(function (g) {
        var first = SITE.hours[g.days[0]].day, lastDay = SITE.hours[g.days[g.days.length - 1]].day;
        var tr = document.createElement('tr');
        var th = document.createElement('th'); th.scope = 'row';
        th.textContent = g.days.length === 7 ? 'Every day' : g.days.length === 1 ? first : first + ' – ' + lastDay;
        var td = document.createElement('td'); td.textContent = g.range;
        if (g.days.indexOf(todayIndex) >= 0) { tr.className = 'is-today'; tr.setAttribute('aria-current', 'date'); }
        tr.appendChild(th); tr.appendChild(td); body.appendChild(tr);
      });
    }

    var statusText;
    if (isOpen && allDay(today)) statusText = 'Open Now · 24 Hours';
    else if (isOpen) statusText = 'Open Now · Closes ' + (today.close === '24:00' ? 'at Midnight' : fmt(today.close));
    else if (!today.closed && nowMins < mins(today.open)) statusText = 'Closed · Opens ' + fmt(today.open) + ' today';
    else {
      statusText = 'Closed';
      // the next day the clinic opens, even if that is several days away
      for (var n = 1; n <= 7; n++) {
        var nextIndex = (todayIndex + n) % 7;
        var next = SITE.hours[nextIndex];
        if (next.closed) continue;
        statusText += ' · Opens ' + fmt(next.open) + ' ' + (n === 1 ? 'tomorrow' : SHORT_DAY[nextIndex]);
        break;
      }
    }
    $$('[data-open-status]').forEach(function (el) { el.textContent = statusText; });
    $$('[data-open-dot]').forEach(function (el) {
      el.classList.toggle('is-closed', !isOpen);
      el.classList.toggle('status-dot--live', isOpen);
    });
    $$('[data-open-badge]').forEach(function (el) {
      el.textContent = isOpen ? 'Open Now' : 'Closed Now';
      el.classList.toggle('is-closed', !isOpen);
    });
    // "Today: …" on the location card
    $$('[data-today-hours]').forEach(function (el) { el.textContent = dayRange(today); });

    // one-line summary, Monday first, days with the same hours grouped:
    // "Mon–Sat 9:00 AM–8:30 PM · Sun 10:00 AM–1:00 PM"; a day off reads "Closed Tue";
    // a clinic open round the clock every day reads "Open 24/7"
    var summaryEls = $$('[data-hours-summary]');
    if (summaryEls.length && SITE.hours.every(allDay)) {
      summaryEls.forEach(function (el) { el.textContent = 'Open 24/7'; });
    } else if (summaryEls.length) {
      var runs = [];
      [1, 2, 3, 4, 5, 6, 0].forEach(function (i) {
        var d = SITE.hours[i] || {};
        var key = d.closed || !d.open || !d.close ? 'closed' : allDay(d) ? '24 hours' : fmt(d.open) + '–' + fmt(d.close);
        var last = runs[runs.length - 1];
        if (last && last.key === key) last.to = i;
        else runs.push({ key: key, from: i, to: i });
      });
      var summary = runs.map(function (r) {
        var days = SHORT_DAY[r.from] + (r.to !== r.from ? '–' + SHORT_DAY[r.to] : '');
        return r.key === 'closed' ? 'Closed ' + days : days + ' ' + r.key;
      }).join(' · ');
      summaryEls.forEach(function (el) { el.textContent = summary; });
    }
  } else {
    // without a full week of hours the live status can't be worked out, so hide the sample text
    if (SITE.hours) console.warn('js/config.js: "hours" ' + hoursProblem + '; the opening-hours details are hidden.');
    $$('[data-open-dot], [data-open-badge], .hours').forEach(function (el) { el.style.display = 'none'; });
    // a chip or fact that only holds the status or summary goes with it
    $$('[data-open-status], [data-hours-summary], [data-today-hours]').forEach(function (el) { (el.closest('li') || el).style.display = 'none'; });
    $$('[data-open-card]').forEach(function (el) { el.hidden = true; });
  }

  /* ── 6. Image fallback ──────────────────────────────────────────────── */
  $$('img').forEach(function (img) {
    function failed() { if (img.parentElement) img.parentElement.classList.add('img-failed'); }
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) failed();
    img.addEventListener('error', failed);
  });

  /* ── 7. Page-load state ─────────────────────────────────────────────── */
  var loadedAt = 0; // when the page was first shown (counters wait for it)
  function markLoaded() {
    if (loadedAt) return;
    loadedAt = Date.now();
    document.body.classList.add('is-loaded');
  }
  requestAnimationFrame(function () { requestAnimationFrame(markLoaded); });
  // rAF doesn't run in a background tab, so make sure the page is never left hidden
  setTimeout(markLoaded, 1500);

  /* ── 8. Mobile menu ─────────────────────────────────────────────────── */
  var header = $('.header');
  var menuBtn = $('.menu-btn');
  var nav = $('#nav');
  var menuOpen = false;
  function navFocusables() {
    return $$('a[href], button:not([disabled])', nav).filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
  }
  function toggleMenu(open, returnFocus) {
    if (!menuBtn || !nav) return;
    menuOpen = open;
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (lenis) { if (open) lenis.stop(); else lenis.start(); } // the page behind the open menu stays put
    if (open) {
      if (header) header.classList.remove('is-tucked');
      // the links come before the button in the page, so move keyboard focus into the menu
      var first = $('a', nav);
      if (first) setTimeout(function () { if (menuOpen) first.focus({ preventScroll: true }); }, 30);
    } else if (returnFocus) {
      menuBtn.focus();
    }
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () { toggleMenu(!menuOpen); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) toggleMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (!menuOpen) return;
      if (e.key === 'Escape' || e.key === 'Esc') { toggleMenu(false, true); return; }
      if (e.key !== 'Tab') return;
      // keep keyboard focus inside the open menu: its links, then the close button
      var items = navFocusables().concat(menuBtn);
      var first = items[0], last = items[items.length - 1];
      var i = items.indexOf(document.activeElement);
      if (e.shiftKey && (i <= 0)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (i === items.length - 1 || i < 0)) { e.preventDefault(); first.focus(); }
    });
    // growing to the desktop layout closes the mobile menu
    onMedia(mq('(min-width: 1024px)'), function (e) { if (e.matches && menuOpen) toggleMenu(false); });
  }

  /* ── 9. Scroll: progress line, header, mobile bar, WhatsApp button, steps ── */
  var progressBar = $('.progress__bar');
  var mobileBars = $$('.mobile-bar');
  var waFloats = $$('.wa-float');
  var hero = $('.hero');
  var bookSection = $('#book');
  var stepList = $('[data-steps]');
  var stepEls = stepList ? $$('.step', stepList) : [];
  var lastY = window.pageYOffset || 0;
  var ticking = false;
  // keyboard focus (not a mouse click) is inside el
  function keyboardFocusIn(el) {
    var a = document.activeElement;
    if (!a || a === document.body || !el.contains(a)) return false;
    try { return a.matches(':focus-visible'); } catch (e) { return true; }
  }

  function onScroll() {
    // read every measurement first, then write, so the browser lays out the page once per frame
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    var vh = window.innerHeight;
    var max = document.documentElement.scrollHeight - vh;
    var headerH = header ? header.offsetHeight : 0;
    var hr = hero ? hero.getBoundingClientRect() : null;
    var br = bookSection ? bookSection.getBoundingClientRect() : null;
    var stepTops = stepEls.map(function (s) { return s.getBoundingClientRect().top; });

    if (progressBar) progressBar.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0).toFixed(4) + ')';

    var pastHero = hr ? hr.bottom < headerH + 40 : y > vh;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
      // tuck away while scrolling down past the hero, come back on any scroll up
      // (never while keyboard focus is in the header, or the focused link would be off screen)
      if (menuOpen || !pastHero || y < lastY - 4 || keyboardFocusIn(header)) header.classList.remove('is-tucked');
      else if (y > lastY + 4) header.classList.add('is-tucked');
    }
    if (Math.abs(y - lastY) > 4) lastY = y;

    // the phone action bar shows from the start; the desktop WhatsApp button appears once
    // the hero is half gone. The booking section has its own call, WhatsApp and form, so
    // both step aside there
    var atBooking = br ? br.top < vh - 120 && br.bottom > headerH + 160 : false;
    var showWa = (hr ? hr.bottom < vh * 0.5 : y > vh * 0.6) && !atBooking;
    mobileBars.forEach(function (el) { el.classList.toggle('is-visible', !atBooking); });
    waFloats.forEach(function (el) { el.classList.toggle('is-visible', showWa); });

    // first-visit steps light up as they reach the middle of the screen
    stepEls.forEach(function (step, i) { step.classList.toggle('is-active', stepTops[i] < vh * 0.62); });
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  if (header) header.addEventListener('focusin', function () { if (keyboardFocusIn(header)) header.classList.remove('is-tucked'); });
  onScroll();

  /* ── 10. Logo (and any other link to #top) scrolls back to the very top ── */
  // smooth scrolling goes through Lenis when it is running, so the two never fight
  function scrollToY(y) {
    if (lenis) lenis.scrollTo(Math.max(0, y));
    else window.scrollTo({ top: Math.max(0, y), behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  $$('a[href="#top"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      if (menuOpen) toggleMenu(false);
      scrollToY(0);
      // drop the old #section from the address bar and the menu highlight
      if (window.location.hash && history.replaceState) history.replaceState(null, '', window.location.pathname + window.location.search);
      $$('.nav__link.is-active').forEach(function (l) { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
      // keyboard users continue from the top of the page, not from the footer
      var topLogo = $('.header .logo');
      if (topLogo && a !== topLogo) topLogo.focus({ preventScroll: true });
    });
  });

  /* ── 11. Active nav link (the scroll animations are in section 18) ──── */
  if ('IntersectionObserver' in window) {
    var links = $$('a.nav__link[href^="#"]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        links.forEach(function (a) {
          var on = a.getAttribute('href') === id;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    if (links.length) $$('section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ── 12. Count-up numbers ───────────────────────────────────────────── */
  function show(el, value) {
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN');
  }
  function runCounter(el, delay) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var start = null, duration = 1600 + Math.min(target, 40) * 10;
    function frame(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      show(el, target * (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))); // ease-out expo: quick start, soft landing
      if (t < 1) requestAnimationFrame(frame);
    }
    setTimeout(function () { requestAnimationFrame(frame); }, delay || 0);
  }
  var counters = $$('[data-count]');
  if ('IntersectionObserver' in window && !reduceMotion) {
    // each group of numbers starts counting together, as its row comes into view
    // (the real numbers stay in the HTML, so the page reads correctly without JavaScript)
    var groups = [];
    counters.forEach(function (el) {
      var g = el.closest('.stats, .facts') || el;
      if (groups.indexOf(g) < 0) groups.push(g);
    });
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var els = entry.target.hasAttribute('data-count') ? [entry.target] : $$('[data-count]', entry.target);
        // numbers near the top wait until the page has faded in
        var wait = loadedAt ? Math.max(0, loadedAt + 900 - Date.now()) : 1100;
        els.forEach(function (el, i) { runCounter(el, wait + i * 140); });
        cio.unobserve(entry.target);
      });
    }, { threshold: 0.35, rootMargin: '0px 0px -6% 0px' });
    counters.forEach(function (el) { show(el, 0); });
    groups.forEach(function (g) { cio.observe(g); });
  } else {
    counters.forEach(function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      if (!isNaN(target)) show(el, target);
    });
  }

  /* ── 13. FAQ accordion ──────────────────────────────────────────────── */
  $$('[data-faq]').forEach(function (faq) {
    // closed answers are only collapsed visually, so keep screen readers out of them too
    function sync(item) {
      var a = $('.faq__a', item);
      if (a) a.inert = !item.classList.contains('is-open');
    }
    $$('.faq__item', faq).forEach(sync);
    faq.addEventListener('click', function (e) {
      var q = e.target.closest('.faq__q');
      if (!q) return;
      var item = q.closest('.faq__item');
      if (!item) return;
      var open = !item.classList.contains('is-open');
      $$('.faq__item', faq).forEach(function (other) {
        other.classList.remove('is-open');
        var oq = $('.faq__q', other);
        if (oq) oq.setAttribute('aria-expanded', 'false');
        sync(other);
      });
      item.classList.toggle('is-open', open);
      q.setAttribute('aria-expanded', String(open));
      sync(item);
    });
  });

  /* ── 14. Booking form → WhatsApp (or a form endpoint) ───────────────── */
  var form = $('[data-booking]');
  var status = form && ($('.form__status', form) || $('#form-status'));
  var submitBtn = form && $('button[type="submit"]', form);
  if (form && status && submitBtn && form.elements.name && form.elements.phone) {
    var dateInput = form.elements.date;
    function setMinDate() {
      if (dateInput) dateInput.min = clinicToday(); // the clinic's today, wherever the visitor is
    }
    setMinDate();
    if (SITE.formEndpoint) submitBtn.textContent = 'Request an Appointment';

    // an Indian mobile (6–9 then 9 digits) or a landline with its STD code,
    // with or without +91 / 0, spaces, dashes or brackets
    function validPhone(value) {
      if (!/^\+?[0-9\s()-]+$/.test(value)) return false;
      var d = value.replace(/\D/g, '');
      if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
      else if (d.length === 11 && d.charAt(0) === '0') d = d.slice(1);
      return d.length === 10 && !/^(\d)\1{9}$/.test(d) && (/^[6-9]/.test(d) || /^[1-5]/.test(d));
    }
    // marks a field wrong (or right again); any hint the field already points to is kept
    function flag(input, valid) {
      var field = input.closest('.field');
      if (field) field.classList.toggle('has-error', !valid);
      var ids = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(function (id) { return id && id !== status.id; });
      if (valid) input.removeAttribute('aria-invalid');
      else { input.setAttribute('aria-invalid', 'true'); if (status.id) ids.push(status.id); }
      if (ids.length) input.setAttribute('aria-describedby', ids.join(' ')); else input.removeAttribute('aria-describedby');
    }
    var busy = false;      // a request is on its way
    var lastOpened = 0;    // when WhatsApp was last opened, so a double tap opens it once
    function setBusy(on) {
      busy = on;
      // aria-disabled rather than disabled, so keyboard focus stays on the button
      if (on) submitBtn.setAttribute('aria-disabled', 'true'); else submitBtn.removeAttribute('aria-disabled');
      form.classList.toggle('is-busy', on);
    }
    function joinAnd(parts) {
      return parts.length > 1 ? parts.slice(0, -1).join(', ') + ', and ' + parts[parts.length - 1] : parts[0];
    }
    function val(el) { return el ? el.value : ''; }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy || submitBtn.disabled || Date.now() - lastOpened < 2000) return;
      setMinDate(); // the page may have been open since yesterday
      var name = form.elements.name, phone = form.elements.phone, date = dateInput;
      var nameOk = name.value.trim() !== '';
      var phoneOk = validPhone(phone.value.trim());
      // a half-typed date reads as "" but is flagged as bad input by the browser
      var dateOk = !date || (!(date.validity && date.validity.badInput) && (!date.value || !date.min || date.value >= date.min));
      flag(name, nameOk); flag(phone, phoneOk); if (date) flag(date, dateOk);
      var problems = [];
      if (!nameOk && !phoneOk) problems.push('enter your name and a valid mobile number');
      else if (!nameOk) problems.push('enter your name');
      else if (!phoneOk) problems.push('enter a valid mobile number');
      if (!dateOk) problems.push('choose today or a later date');
      status.classList.toggle('is-error', problems.length > 0);
      if (problems.length) {
        // write the message first so screen readers hear it along with the field
        status.textContent = 'Please ' + joinAnd(problems) + '.';
        (!nameOk ? name : !phoneOk ? phone : date).focus();
        return;
      }

      var data = {
        name: name.value.trim(),
        phone: phone.value.trim(),
        // "Appointment for": the select's English value, so the message stays English
        // even when the page has been machine-translated
        for: val(form.elements['for']),
        treatment: val(form.elements.treatment),
        date: date ? date.value : '',
        time: val(form.elements.time),
        message: val(form.elements.message).trim()
      };

      if (SITE.formEndpoint) {
        status.textContent = 'Sending…';
        setBusy(true); // one request per tap
        if (!window.fetch) {
          setBusy(false);
          status.classList.add('is-error');
          status.textContent = 'Sorry, this browser cannot send the form. Please call us on ' + (SITE.phone || 'the clinic number') + '.';
          return;
        }
        fetch(SITE.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data)
        }).then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          syncChips('');
          status.textContent = 'Thank you, ' + data.name + '. We will contact you shortly to confirm your appointment.';
        }).catch(function () {
          status.classList.add('is-error');
          status.textContent = 'Sorry, your request could not be sent. Please call us on ' + (SITE.phone || 'the clinic number') + '.';
        }).then(function () { setBusy(false); });
        return;
      }

      if (!waNumber) {
        status.classList.add('is-error');
        status.textContent = 'Online booking is not set up yet. Please call us on ' + (SITE.phone || 'the clinic number') + '.';
        return;
      }

      var picked = data.date ? new Date(data.date + 'T00:00') : null;
      if (picked && isNaN(picked.getTime())) picked = null;
      var dateOpts = { weekday: 'short', day: 'numeric', month: 'short' };
      if (picked && String(picked.getFullYear()) !== clinicToday().slice(0, 4)) dateOpts.year = 'numeric';
      var niceDate = picked ? picked.toLocaleDateString('en-IN', dateOpts) : 'Earliest available';
      var lines = [
        'Vanakkam ' + (SITE.legalName || SITE.name || '') + ', I would like to book an appointment.',
        '',
        'Name: ' + data.name,
        'Mobile: ' + data.phone
      ];
      if (data['for']) lines.push('For: ' + data['for']);
      lines.push(
        'Treatment: ' + data.treatment,
        'Preferred date: ' + niceDate,
        'Preferred time: ' + data.time
      );
      if (data.message) lines.push('Note: ' + data.message);

      status.textContent = 'Opening WhatsApp with your details…';
      lastOpened = Date.now();
      var url = waLink(lines.join('\n'));
      // ('noopener' would make window.open return null, so the opener link is cut by hand)
      var win = null;
      try { win = window.open(url, '_blank'); } catch (err) {}
      if (win) { try { win.opener = null; } catch (err2) {} }
      else window.location.href = url; // pop-up blocked: open WhatsApp in this tab instead
    });

    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field && field.classList.contains('has-error')) {
        field.classList.remove('has-error');
        var input = $('input, select, textarea', field);
        if (input) flag(input, true);
      }
      // once nothing is marked wrong any more, clear the red message too
      if (status.classList.contains('is-error') && !$('.has-error', form)) {
        status.classList.remove('is-error');
        status.textContent = '';
      }
    });
  }

  /* ── 15. Concern picker + "Enquire" links pre-fill the booking form ──── */
  var treatmentSelect = form && form.elements.treatment && form.elements.treatment.tagName === 'SELECT' ? form.elements.treatment : null;
  var chips = $$('.concern-chips button.chip[data-concern]');
  function norm(s) { return String(s || '').toLowerCase().replace(/&/g, 'and').replace(/\s+/g, ' ').trim(); }
  function optionList() { return treatmentSelect ? Array.prototype.slice.call(treatmentSelect.options) : []; }
  // exact match on the option's text or value
  function exactOption(text) {
    var t = norm(text);
    return optionList().filter(function (o) { return norm(o.text) === t || norm(o.value) === t; })[0] || null;
  }
  // closest option for a card title: exact, then starts-with, then contains (either way round)
  function closestOption(text) {
    var t = norm(text);
    if (!t) return null;
    var opts = optionList();
    var tests = [
      function (o) { return o === t; },
      function (o) { return o.indexOf(t) === 0 || t.indexOf(o) === 0; },
      function (o) { return o.indexOf(t) >= 0 || t.indexOf(o) >= 0; }
    ];
    // the option values stay English when the page is machine-translated, so they are checked first
    for (var i = 0; i < tests.length; i++) {
      var hit = opts.filter(function (o) { return tests[i](norm(o.value)); })[0] ||
        opts.filter(function (o) { return tests[i](norm(o.text)); })[0];
      if (hit) return hit;
    }
    return exactOption(text);
  }
  function pickOption(opt) {
    if (!treatmentSelect || !opt) return;
    treatmentSelect.value = opt.value;
    syncChips(opt.value);
  }
  // the chip whose concern matches the chosen treatment shows as selected
  function syncChips(value, chosen) {
    var v = norm(value);
    chips.forEach(function (c) {
      var on = chosen ? c === chosen : !!v && norm(c.getAttribute('data-concern')) === v;
      c.classList.toggle('is-selected', on);
      c.setAttribute('aria-pressed', String(on));
    });
  }
  chips.forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
  // scroll to the form itself (not the section heading) and put the cursor in the name field
  function goToForm() {
    var target = form || $('#book');
    if (!target) return;
    // worked out here (not scrollIntoView) so the form lands just below the fixed header
    // whatever scroll-margin / scroll-padding the stylesheet sets
    var headerH = header ? header.offsetHeight : 0;
    var top = target.getBoundingClientRect().top + (window.pageYOffset || 0) - headerH - 16;
    scrollToY(top);
    var nameField = form && form.elements.name;
    if (nameField && nameField.focus) {
      try { nameField.focus({ preventScroll: true }); } catch (err) { nameField.focus(); }
    }
  }
  $$('.concern-chips').forEach(function (box) {
    box.addEventListener('click', function (e) {
      var chip = e.target.closest('button.chip[data-concern]');
      if (!chip || !box.contains(chip)) return;
      var concern = chip.getAttribute('data-concern') || '';
      if (treatmentSelect) {
        var opt = exactOption(concern);
        if (opt) {
          treatmentSelect.value = opt.value;
        } else {
          // no matching treatment: fall back to a check-up and note the concern
          var fallback = exactOption('Check-up / not sure') || closestOption('Check-up');
          if (fallback) treatmentSelect.value = fallback.value;
          var msg = form.elements.message;
          if (msg && !msg.value.trim()) msg.value = concern;
        }
      }
      syncChips('', chip);
      goToForm();
    });
  });

  // "Enquire" on a treatment card picks that treatment and goes straight to the form
  $$('.tx-card__link').forEach(function (link) {
    // read the card's title now, while it is still English (Google Translate rewrites it later)
    var card = link.closest('.tx-card');
    var title = card && $('h3', card);
    var titleText = title ? title.textContent : '';
    link.addEventListener('click', function (e) {
      if (titleText) pickOption(closestOption(titleText));
      if (form) { e.preventDefault(); goToForm(); }
    });
  });
  if (treatmentSelect) treatmentSelect.addEventListener('change', function () { syncChips(treatmentSelect.value); });

  /* ── 16. Map: the Google Map loads only when the visitor gets near it ── */
  var map = $('[data-map]');
  if (map && !mapQuery) {
    (map.closest('.map') || map).remove();
  } else if (map) {
    var mapSrc = 'https://www.google.com/maps?q=' + encodeURIComponent(mapQuery) + '&output=embed';
    var injectMap = function () {
      if (map.tagName === 'IFRAME') { if (map.getAttribute('src') !== mapSrc) map.setAttribute('src', mapSrc); return; }
      if ($('iframe', map)) return;
      var frame = document.createElement('iframe');
      frame.src = mapSrc;
      frame.title = 'Clinic location on Google Maps';
      frame.setAttribute('loading', 'lazy');
      frame.setAttribute('allowfullscreen', '');
      frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      map.appendChild(frame);
    };
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (entries) {
        if (!entries.some(function (en) { return en.isIntersecting; })) return;
        mio.disconnect();
        injectMap();
      }, { rootMargin: '600px 0px' });
      mio.observe(map);
    } else {
      injectMap();
    }
  }

  /* ── 16b. Structured data for Google, kept in step with config.js and the page ── */
  (function () {
    // the clinic block in <head>: name, phone, email, street, city, map, hours and social links follow config.js
    var tag = $('script[type="application/ld+json"][data-schema="clinic"]');
    var clinic = null;
    try { clinic = tag ? JSON.parse(tag.textContent) : null; } catch (e) { clinic = null; }
    if (clinic) {
      if (SITE.legalName) clinic.name = SITE.legalName;
      if (SITE.phoneRaw) clinic.telephone = SITE.phoneRaw;
      if (SITE.email) clinic.email = SITE.email; else if (isBlank('email')) delete clinic.email;
      clinic.address = clinic.address || { '@type': 'PostalAddress' };
      if (SITE.addressLine1) clinic.address.streetAddress = SITE.addressLine1;
      if (SITE.city) clinic.address.addressLocality = SITE.city;
      if (mapQuery) clinic.hasMap = mapsLink;
      if (!hoursProblem) {
        clinic.openingHoursSpecification = SITE.hours.filter(function (d) { return !d.closed; }).map(function (d) {
          return { '@type': 'OpeningHoursSpecification', dayOfWeek: d.day, opens: d.open, closes: d.close === '24:00' ? '23:59' : d.close };
        });
      }
      // only real profile links (not the bare sample domains) count as sameAs
      var profiles = ['instagram', 'facebook', 'youtube'].map(function (k) { return social[k]; })
        .filter(function (u) { return u && !/^https?:\/\/(www\.)?(instagram|facebook|youtube)\.com\/?$/i.test(u); });
      if (profiles.length) clinic.sameAs = profiles; else delete clinic.sameAs;
      tag.textContent = JSON.stringify(clinic);
    }
    // the FAQ answers exactly as they show after the feature switches, as an FAQPage
    var items = $$('.faq__item');
    if (!items.length) return;
    var faq = {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: items.map(function (item) {
        var q = $('.faq__q', item), a = $('.faq__a', item);
        return { '@type': 'Question', name: (q ? q.textContent : '').trim(), acceptedAnswer: { '@type': 'Answer', text: (a ? a.textContent : '').replace(/\s+/g, ' ').trim() } };
      })
    };
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(faq);
    document.head.appendChild(s);
  })();

  /* ── 17. Motion: smooth scrolling, soft reveals, the photo row, the step cards ── */
  // Everything below needs GSAP + ScrollTrigger and is skipped for visitors who prefer reduced motion.
  // Content is visible without it; each animation starts from a hidden state it sets itself.
  // It runs at DOMContentLoaded, by which time the deferred CDN scripts have run (or failed).
  function startMotion() {
    gsap = window.gsap; ScrollTrigger = window.ScrollTrigger;
    if (!gsap || !ScrollTrigger || reduceMotion) { root.classList.remove('motion'); return; }
    gsap.registerPlugin(ScrollTrigger);
    var coarse = mq('(pointer: coarse)').matches;
    var EASE = 'expo.out';
    function visible(el) { return !el.hidden && el.offsetParent !== null; }

    // smooth scrolling for mouse and trackpad (touch screens keep their own native scrolling)
    if (window.Lenis && !mq('(pointer: coarse)').matches) {
      lenis = new window.Lenis({ duration: 1.1, easing: function (x) { return Math.min(1, 1.001 - Math.pow(2, -10 * x)); } });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      // in-page links glide to their section and land just below the header
      document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#"]');
        if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
        var id = a.getAttribute('href');
        if (id.length < 2 || id === '#top' || id === '#main') return;
        var target = null;
        try { target = document.querySelector(id); } catch (err) { return; }
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -((header ? header.offsetHeight : 0) + 12) });
        if (history.replaceState) history.replaceState(null, '', id);
        // keyboard users carry on from the section they jumped to
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        try { target.focus({ preventScroll: true }); } catch (err2) {}
      });
    }

    // the first screen's intro and the shapes' gentle float are pure CSS (section 25 of styles.css):
    // the intro starts with the first paint, and the float runs off the main thread on phones.
    // Here the float pauses while the hero is off screen, and on a mouse the shapes lean away
    // from the pointer through the separate "translate" property, so it never fights the float.
    var shapes = $$('.hero .shape');
    if (hero && shapes.length) {
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { hero.classList.toggle('is-offscreen', !en[0].isIntersecting); }).observe(hero);
      }
      leanShapes();
    }
    function leanShapes() {
      if (!mq('(hover: hover) and (pointer: fine)').matches) return;
      // the pointer moves the shapes through the separate CSS "translate" property, so it never fights the float
      var depth = shapes.map(function (s, i) { return 12 + (i % 3) * 9; });
      var pos = shapes.map(function () { return { x: 0, y: 0 }; });
      hero.addEventListener('pointermove', function (e) {
        var b = hero.getBoundingClientRect();
        var nx = (e.clientX - b.left) / b.width - .5, ny = (e.clientY - b.top) / b.height - .5;
        shapes.forEach(function (s, i) {
          gsap.to(pos[i], {
            x: -nx * depth[i], y: -ny * depth[i], duration: .9, ease: 'power3.out', overwrite: true,
            onUpdate: function () { s.style.translate = pos[i].x.toFixed(1) + 'px ' + pos[i].y.toFixed(1) + 'px'; }
          });
        });
      });
    }

    // the treatments band slides sideways as you scroll past it (it never moves on its own)
    var bandTrack = $('.marquee__track');
    if (bandTrack) {
      gsap.fromTo(bandTrack, { xPercent: 0 }, { xPercent: -22, ease: 'none', scrollTrigger: { trigger: bandTrack.parentNode, start: 'top bottom', end: 'bottom top', scrub: .6 } });
    }

    // the little squiggle under each section heading draws itself as the heading comes into view
    var headings = $$('h2');
    if ('IntersectionObserver' in window) {
      var drawIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-drawn');
          drawIO.unobserve(en.target);
        });
      }, { rootMargin: '0px 0px -12% 0px' });
      headings.forEach(function (h2) { drawIO.observe(h2); });
    } else {
      headings.forEach(function (h2) { h2.classList.add('is-drawn'); });
    }

    // Each section gets its own small moment rather than one entrance everywhere; the rest of
    // the page is simply there when you arrive.
    // treatment rows slide in from their own side of the two-column list, one after another
    var dealt = $$('.tx-card').filter(visible);
    if (dealt.length) {
      gsap.set(dealt, { opacity: 0, x: function (i) { return i % 2 ? 28 : -28; } });
      ScrollTrigger.batch(dealt, {
        start: 'top bottom-=10', once: true,
        onEnter: function (batch) { gsap.to(batch, { opacity: 1, x: 0, duration: .8, ease: EASE, stagger: .07, overwrite: true, clearProps: 'transform,opacity' }); }
      });
    }
    // the concern chips slide in from the left, quickly, as a row
    var chipRow = $$('.concern-chips .chip');
    if (chipRow.length) {
      gsap.fromTo(chipRow, { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: .5, ease: 'power3.out', stagger: .04, clearProps: 'transform,opacity', scrollTrigger: { trigger: chipRow[0].parentNode, start: 'top bottom-=10', once: true } });
    }
    // the doctors' portraits pop into their coloured circles
    var portraits = $$('.doctor__photo img').filter(visible);
    if (portraits.length) {
      gsap.set(portraits, { scale: .55, opacity: 0 });
      ScrollTrigger.batch(portraits, {
        start: 'top bottom-=10', once: true,
        onEnter: function (batch) { gsap.to(batch, { scale: 1, opacity: 1, duration: .8, ease: 'back.out(1.7)', stagger: .1, overwrite: true, clearProps: 'transform,opacity' }); }
      });
    }

    // the clinic photos slide sideways while the section holds still (wide screens);
    // phones keep the swipeable row
    var rail = $('[data-rail]');
    var track = rail && $('.gallery-grid', rail);
    if (rail && track && mq('(min-width: 900px)').matches) {
      var gallery = rail.closest('section');
      var distance = function () {
        var cs = getComputedStyle(rail);
        var inner = rail.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        return Math.max(0, track.scrollWidth - inner);
      };
      if (gallery && distance() > 40) {
        gallery.classList.add('is-pinned');
        gsap.to(track, {
          x: function () { return -distance(); }, ease: 'none',
          scrollTrigger: { trigger: gallery, start: 'top top', end: function () { return '+=' + distance(); }, pin: true, scrub: .8, invalidateOnRefresh: true, anticipatePin: 1 }
        });
      }
    }

    // first-visit steps: each card slides up over the one before, which eases back a little
    // (touch screens skip the scaling and the photo drift below: on budget phones these two
    // scroll-linked effects cost the most frames, and the cards still stack without them)
    var stepCards = coarse ? [] : $$('[data-steps] .step');
    stepCards.forEach(function (step, i) {
      var next = stepCards[i + 1];
      if (!next) return;
      gsap.to(step, {
        scale: .95, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: function () { return 'top ' + (parseFloat(getComputedStyle(next).top) || 0) + 'px'; }, scrub: true, invalidateOnRefresh: true }
      });
    });

    // the about and "why choose us" photos drift gently inside their frames
    if (!coarse) $$('.about__media img, .approach__media img').forEach(function (img) {
      gsap.fromTo(img, { yPercent: -5, scale: 1.12 }, { yPercent: 5, scale: 1.12, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // the main buttons lean slightly towards the pointer
    if (mq('(hover: hover) and (pointer: fine)').matches) {
      $$('.btn--magnetic').forEach(function (btn) {
        var xTo = gsap.quickTo(btn, 'x', { duration: .5, ease: 'power3.out' });
        var yTo = gsap.quickTo(btn, 'y', { duration: .5, ease: 'power3.out' });
        btn.addEventListener('pointermove', function (e) {
          var b = btn.getBoundingClientRect();
          xTo((e.clientX - b.left - b.width / 2) * .2);
          yTo((e.clientY - b.top - b.height / 2) * .3);
        });
        btn.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
      });
    }

    // late-loading images and fonts change heights: re-measure the scroll positions once everything is in
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });

    // safety net: anything that has been on screen for a moment but is still hidden is shown at once,
    // so a missed scroll trigger can never leave a blank gap
    if ('IntersectionObserver' in window) {
      var watched = dealt.concat(chipRow, portraits);
      var guard = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          setTimeout(function () {
            if (parseFloat(getComputedStyle(el).opacity) >= .5 || gsap.isTweening(el)) return;
            // drop its waiting reveal too, so it doesn't jump back to hidden when the trigger fires later
            gsap.getTweensOf(el).forEach(function (tw) { if (tw.scrollTrigger) tw.scrollTrigger.kill(); tw.kill(); });
            gsap.set(el, { opacity: 1, y: 0, clearProps: 'transform,opacity' });
          }, 1400);
          guard.unobserve(el);
        });
      });
      watched.forEach(function (el) { guard.observe(el); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startMotion);
  else startMotion();
})();
