/* ==========================================================================
   Forex With Ghasif — ambient background effects
   ==========================================================================
   Two small, independent pieces, both behind every page (negative z-index,
   pointer-events: none) and never intercepting clicks or content:

     1. A full-screen drifting gradient: 3 large, heavily-blurred brand-color
        blobs that slowly move via pure CSS animation (see site.css —
        #fwg-bg-gradient). This file only creates the DOM once; the browser
        compositor handles the motion with zero JavaScript per frame, which
        is the lightest possible way to do this (lighter than the previous
        Canvas 2D dot grid or the WebGL shader before that).

     2. A soft cursor-follow glow (desktop only — see below) that eases
        toward the pointer instead of snapping to it, for a subtle trailing
        light effect. This is the one part that genuinely needs a small
        per-frame JS loop, since it has to track a moving pointer.

   Both respect prefers-reduced-motion (handled in CSS for the gradient;
   the glow is skipped entirely here) and both use only existing design
   tokens — no new colors.
   ========================================================================== */
(function () {
  'use strict';

  function boot() {
    var reduceMotionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    var fineHoverQuery = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');
    var reduced = !!(reduceMotionQuery && reduceMotionQuery.matches);

    // ---- 1. Gradient background (always mounted; CSS drives the motion) ----
    if (!document.getElementById('fwg-bg-gradient')) {
      var bg = document.createElement('div');
      bg.id = 'fwg-bg-gradient';
      bg.setAttribute('aria-hidden', 'true');
      bg.innerHTML =
        '<div class="fwg-blob fwg-blob--gold"></div>' +
        '<div class="fwg-blob fwg-blob--emerald"></div>' +
        '<div class="fwg-blob fwg-blob--gold-soft"></div>';
      document.body.insertBefore(bg, document.body.firstChild);
    }

    // ---- 2. Cursor-follow glow (desktop only, skipped if reduced motion) ----
    if (reduced || !(fineHoverQuery && fineHoverQuery.matches)) return;

    var glow = document.createElement('div');
    glow.id = 'fwg-cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    var raw = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var pos = { x: raw.x, y: raw.y };
    var idleT = null;
    var running = true;

    function onMove(e) {
      raw.x = e.clientX; raw.y = e.clientY;
      glow.style.opacity = '1';
      clearTimeout(idleT);
      idleT = setTimeout(function () { glow.style.opacity = '0'; }, 1600);
    }
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', function () { glow.style.opacity = '0'; }, { passive: true });

    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(loop);
    });

    function loop() {
      if (!running) return;
      // Ease toward the raw pointer position — this lag is what creates
      // the "gently trails behind" feel instead of a glow glued to the
      // cursor.
      pos.x += (raw.x - pos.x) * 0.12;
      pos.y += (raw.y - pos.y) * 0.12;
      glow.style.transform = 'translate(' + pos.x + 'px,' + pos.y + 'px)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
