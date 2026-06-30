/* ==========================================================================
   Forex With Ghasif — dotted background animation
   ==========================================================================
   A fixed, full-viewport Canvas 2D backdrop: an evenly spaced grid of small
   dots that drift with a slow organic float, gently pulse in opacity/size,
   and ease away from the cursor (or a touch) before smoothly settling back
   into place. It sits behind every page (z-index: -1, pointer-events: none)
   and never intercepts clicks or covers content.

   Dots alternate between the two brand accent colors (gold + emerald) in a
   checkerboard pattern across the grid. Every other part of this file —
   spacing, float, pulse, and the cursor/touch repel physics — is byte-for-
   byte the same as the original single-color version; only the color
   assignment and the draw loop's color-batching changed.

   Why plain Canvas 2D, not Three.js/WebGL: a flat grid of circles needs no
   3D, no shaders, and no GPU pipeline — Canvas 2D draws thousands of dots
   per frame cheaply with a plain loop.

   ---- Customization -------------------------------------------------------
   Everything tunable lives in CONFIG below. Colors are read live from this
   file's CSS custom properties (tokens/colors.css) so the dots always match
   the design system automatically — change a token there and the
   background follows, no edits needed here.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     CONFIG — tune the feel here. Nothing else in the file should need to
     change for a simple re-skin (spacing, speed, strength).
     --------------------------------------------------------------------- */
  var CONFIG = {
    // Distance (css px) between dots on a desktop-density grid. Larger
    // spacing = fewer dots = cheaper to animate.
    spacingDesktop: 42,
    spacingMobile: 56, // sparser on small/low-power devices — see boot()
    dotRadius: 1.6,
    baseOpacity: 0.34,
    // Floating drift: small, slow, per-dot-phased so dots don't move in
    // lockstep (that would read as a rigid pattern, not "alive").
    floatAmplitude: 5, // px
    floatSpeed: 0.18, // radians/sec
    // Opacity + scale pulse, same per-dot phase as the float so it feels
    // like one coherent organic motion rather than two separate effects.
    pulseSpeed: 0.22,
    pulseOpacityRange: 0.28, // +/- fraction of baseOpacity
    pulseScaleRange: 0.18, // +/- fraction of dotRadius
    // Cursor/touch repel: dots within this radius (px) are gently pushed
    // away, then ease back to their grid position once the pointer moves on.
    repelRadius: 110,
    repelStrength: 22, // max push distance, px
    repelEase: 0.12, // how quickly dots react to the pointer (0-1/frame)
    returnEase: 0.06, // how quickly dots relax back once unrepelled
    // Max devicePixelRatio used for crisp-but-cheap rendering.
    dprCap: 1.5,
    // Below this average FPS, sustained for `fpsSampleWindow` frames,
    // widen dot spacing (fewer dots) once. Never tightens back up, to
    // avoid visible flicker between densities.
    fpsDowngradeThreshold: 45,
    fpsSampleWindow: 90,
    spacingStepUp: 1.6, // multiplier applied to spacing on a downgrade
    // CSS custom properties the dots are tinted from (see tokens/colors.css)
    // — dots alternate between these two in a checkerboard pattern.
    colorVars: [
      { name: '--gold-400', fallback: '#D6AF43' },
      { name: '--emerald-400', fallback: '#2FD08A' }
    ]
  };

  /* ---------------------------------------------------------------------
     Resolve a CSS custom property to an "r, g, b" string usable inside an
     rgba() color, so the dots always match the live design-system token.
     --------------------------------------------------------------------- */
  function readBrandRgb(entry) {
    var raw = (getComputedStyle(document.documentElement).getPropertyValue(entry.name) || '').trim();
    var m = /^#?([0-9a-f]{6})$/i.exec(raw || entry.fallback);
    var hex = m ? m[1] : entry.fallback.replace('#', '');
    var n = parseInt(hex, 16);
    return ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255);
  }

  function boot() {
    var reduceMotionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    var coarsePointerQuery = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');

    var canvas = document.createElement('canvas');
    canvas.id = 'fwg-dot-bg';
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
      position: 'fixed', inset: '0', width: '100%', height: '100%',
      zIndex: '-1', pointerEvents: 'none', display: 'block'
    });

    var ctx = canvas.getContext && canvas.getContext('2d');
    if (!ctx) return; // Canvas 2D is effectively universal; no-op if truly absent.
    document.body.appendChild(canvas);

    var dotRgb = [readBrandRgb(CONFIG.colorVars[0]), readBrandRgb(CONFIG.colorVars[1])];
    var reduced = !!(reduceMotionQuery && reduceMotionQuery.matches);
    var likelyLowPower =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      !(coarsePointerQuery && coarsePointerQuery.matches); // touch/coarse-pointer primary input
    var spacing = likelyLowPower ? CONFIG.spacingMobile : CONFIG.spacingDesktop;
    var dpr = Math.min(window.devicePixelRatio || 1, CONFIG.dprCap);

    var dots = []; // each: {bx, by, phase, rx, ry, color} — base pos, phase seed, repel offset, color index
    var w = 0, h = 0;

    function buildGrid() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      var cols = Math.ceil(w / spacing) + 1;
      var rows = Math.ceil(h / spacing) + 1;
      // Centered grid so dots are evenly inset from the edges rather than
      // starting flush at (0,0).
      var offX = (w - (cols - 1) * spacing) / 2;
      var offY = (h - (rows - 1) * spacing) / 2;
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          dots.push({
            bx: offX + c * spacing,
            by: offY + r * spacing,
            phase: Math.random() * Math.PI * 2,
            rx: 0, ry: 0, // current eased repel offset
            color: (r + c) % 2 // checkerboard gold/emerald
          });
        }
      }
    }

    var resizeT = null;
    function onResize() {
      clearTimeout(resizeT);
      resizeT = setTimeout(buildGrid, 120); // debounced — resize fires rapidly while dragging
    }
    window.addEventListener('resize', onResize);
    buildGrid();

    // ---- pointer tracking (mouse desktop, touch mobile) ----
    var pointer = { x: -9999, y: -9999, active: false };
    function setPointer(x, y) { pointer.x = x; pointer.y = y; pointer.active = true; }
    function clearPointer() { pointer.active = false; }
    window.addEventListener('mousemove', function (e) { setPointer(e.clientX, e.clientY); }, { passive: true });
    window.addEventListener('mouseleave', clearPointer, { passive: true });
    window.addEventListener('touchmove', function (e) { if (e.touches[0]) setPointer(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
    window.addEventListener('touchend', clearPointer, { passive: true });

    /* ---------------------------------------------------------------------
       Draw one frame. `t` is the animation clock in seconds; for the
       reduced-motion static frame this is just called once with t = 0 and
       the pointer treated as inactive, so dots render at their resting
       grid position with no float/pulse/repel. Two passes (one per color)
       so each only needs a single ctx.fillStyle change instead of one per
       dot — the per-dot float/pulse/repel math itself is unchanged from
       the original single-color version.
       --------------------------------------------------------------------- */
    function drawFrame(t, animated) {
      ctx.clearRect(0, 0, w, h);
      for (var ci = 0; ci < 2; ci++) {
        ctx.fillStyle = 'rgba(' + dotRgb[ci] + ',1)';
        for (var i = 0; i < dots.length; i++) {
          var d = dots[i];
          if (d.color !== ci) continue;
          var fx = 0, fy = 0, pulse = 0;
          if (animated) {
            fx = Math.sin(t * CONFIG.floatSpeed + d.phase) * CONFIG.floatAmplitude;
            fy = Math.cos(t * CONFIG.floatSpeed * 0.8 + d.phase * 1.3) * CONFIG.floatAmplitude;
            pulse = Math.sin(t * CONFIG.pulseSpeed + d.phase);

            // Ease the repel offset toward the pointer's push vector (or
            // back toward zero once the pointer is far away/inactive) —
            // this is what makes dots "gently move away and smoothly
            // return" instead of snapping.
            var targetRx = 0, targetRy = 0;
            if (pointer.active) {
              var dx = (d.bx + fx) - pointer.x;
              var dy = (d.by + fy) - pointer.y;
              var dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < CONFIG.repelRadius && dist > 0.001) {
                var push = (1 - dist / CONFIG.repelRadius) * CONFIG.repelStrength;
                targetRx = (dx / dist) * push;
                targetRy = (dy / dist) * push;
              }
            }
            var ease = (targetRx !== 0 || targetRy !== 0) ? CONFIG.repelEase : CONFIG.returnEase;
            d.rx += (targetRx - d.rx) * ease;
            d.ry += (targetRy - d.ry) * ease;
          }

          var x = d.bx + fx + d.rx;
          var y = d.by + fy + d.ry;
          var opacity = CONFIG.baseOpacity * (1 + pulse * CONFIG.pulseOpacityRange);
          var radius = CONFIG.dotRadius * (1 + pulse * CONFIG.pulseScaleRange);

          ctx.globalAlpha = Math.max(0, opacity);
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.4, radius), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    // Fully respect reduced motion: render one calm static frame and stop
    // — no rAF loop, no pointer-driven motion at all.
    if (reduced) {
      drawFrame(0, false);
      return;
    }

    // If the OS-level reduced-motion preference changes mid-session, drop
    // straight to the static frame.
    if (reduceMotionQuery && reduceMotionQuery.addEventListener) {
      reduceMotionQuery.addEventListener('change', function (e) {
        if (e.matches) { running = false; drawFrame(0, false); }
      });
    }

    var running = true;
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) { last = performance.now(); requestAnimationFrame(loop); }
    });

    var start = performance.now();
    var last = start;
    var frameCount = 0, frameTimeSum = 0;
    var downgraded = false;

    function loop(now) {
      if (!running) return;
      frameTimeSum += (now - last);
      frameCount++;
      last = now;

      // Adaptive downgrade: if frames are consistently slow, widen the
      // grid spacing once (fewer dots) and rebuild. Only ever loosens,
      // never tightens, so density never visibly flickers back and forth.
      if (!downgraded && frameCount >= CONFIG.fpsSampleWindow) {
        var avgFps = 1000 / (frameTimeSum / frameCount);
        if (avgFps < CONFIG.fpsDowngradeThreshold) {
          spacing *= CONFIG.spacingStepUp;
          buildGrid();
          downgraded = true;
        }
        frameCount = 0; frameTimeSum = 0;
      }

      drawFrame((now - start) / 1000, true);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
