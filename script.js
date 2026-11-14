/* ==========================================================================
   Dhahab Holdings Limited — behaviour
   Vanilla JavaScript, no dependencies. Every feature is independent and
   degrades gracefully: if this file fails, the page remains fully readable.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---- Footer year ----------------------------------------------------- */
  var yr = $('#dh-year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- Split headlines into masked words ------------------------------- */
  function splitWords(el) {
    var text = el.textContent.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(' ').forEach(function (w, i, arr) {
      var outer = document.createElement('span');
      outer.className = 'dh-word';
      outer.setAttribute('aria-hidden', 'true');
      var inner = document.createElement('span');
      inner.textContent = w;
      inner.style.setProperty('--i', i);
      outer.appendChild(inner);
      el.appendChild(outer);
      if (i < arr.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }
  $$('[data-dh-words]').forEach(splitWords);

  /* ---- Reveal on scroll ------------------------------------------------ */
  var revealTargets = $$('[data-dh-words], .dh-fade, .dh-unveil');
  var heroTargets = revealTargets.filter(function (el) { return el.closest('.dh-hero'); });
  var io = null;

  function reveal(el) { el.classList.add('is-in'); }

  if ('IntersectionObserver' in window && !reduce) {
    // Clipped elements can report as non-intersecting, so "unveil" images are
    // watched through their parent and revealed together.
    var watch = new Map();
    revealTargets.forEach(function (el) {
      if (el.closest('.dh-hero')) return;
      var host = el.classList.contains('dh-unveil') ? el.parentElement : el;
      if (!watch.has(host)) watch.set(host, []);
      watch.get(host).push(el);
    });
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        (watch.get(e.target) || []).forEach(reveal);
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    watch.forEach(function (_, host) { io.observe(host); });
  } else {
    revealTargets.forEach(reveal);
  }

  /* ---- Preloader and page-ready sequence ------------------------------- */
  var pre = $('.dh-preloader');
  var started = Date.now();
  var MIN_MS = 1700;

  function ready() {
    root.classList.add('dh-ready');
    document.body.classList.remove('dh-is-loading');
    // Hero sequence follows the curtain lifting
    setTimeout(function () { heroTargets.forEach(reveal); }, reduce ? 0 : 500);
  }

  if (pre && !reduce) {
    document.body.classList.add('dh-is-loading');
    requestAnimationFrame(function () { pre.classList.add('is-loading'); });
    var finished = false;
    var finish = function () {
      if (finished) return;
      finished = true;
      var wait = Math.max(0, MIN_MS - (Date.now() - started));
      setTimeout(function () { pre.classList.add('is-done'); ready(); }, wait);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish);
    setTimeout(finish, 4500); // never trap the visitor behind the loader
  } else {
    ready();
  }

  /* ---- Header: stuck state, active link ----------- */
  var header = $('#dh-header');
  var navLinks = $$('.dh-nav__link');
  var menuOpen = false;

  function onHeaderScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 40);
  }
  window.addEventListener('scroll', onHeaderScroll, { passive: true });
  onHeaderScroll();

  var sections = navLinks.map(function (a) { return $(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }

  /* ---- Mobile menu ----------------------------------------------------- */
  var burger = $('.dh-burger');
  var nav = $('#dh-nav');
  function setMenu(open) {
    menuOpen = open;
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(!menuOpen); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { if (menuOpen) setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menuOpen) { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 1181px)').addEventListener('change', function (m) { if (m.matches && menuOpen) setMenu(false); });

  /* ---- Image parallax -------------------------------------------------- */
  var pxEls = $$('[data-dh-parallax]');
  var ticking = false;
  function parallax() {
    var vh = window.innerHeight;
    pxEls.forEach(function (el) {
      var host = el.parentElement;
      var r = host.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var strength = parseFloat(el.getAttribute('data-dh-parallax')) || 0.1;
      var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1 … 1
      var shift = Math.max(-1, Math.min(1, progress)) * strength * r.height * 0.5;
      el.style.transform = 'translate3d(0,' + shift.toFixed(1) + 'px,0)';
    });
    ticking = false;
  }
  if (!reduce && pxEls.length) {
    var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } };
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    parallax();
  }

})();
