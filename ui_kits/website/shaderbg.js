/* ==========================================================================
   Forex With Ghasif — premium live shader background
   ==========================================================================
   A fixed, full-viewport WebGL backdrop (Three.js + GLSL) composed of three
   layers, all behind every page (z-index: -1, pointer-events: none) and
   never intercepting clicks or covering content:

     1. Background plane (single fragment-shader pass): organic fbm "liquid"
        noise, aurora light bands, soft animated light rays, a cheap
        in-shader bloom approximation, and a cursor ripple/distortion.
     2. Floating glowing particles (THREE.Points + a real PerspectiveCamera):
        genuine depth via perspective, drifting forever on the GPU.
     3. A gentle camera-driven parallax across layers from mouse position on
        desktop and device tilt on mobile, for the "depth illusion."

   Why vanilla Three.js + GLSL (not React Three Fiber, not TypeScript): this
   project ships React via an in-browser Babel <script type="text/babel">
   setup with no bundler/build step. Either would mean introducing a whole
   new build pipeline just for a background effect — disproportionate here.
   Three.js is already loaded once via CDN and reused as-is.

   Why simulated bloom (not a real postprocessing pipeline): a true
   EffectComposer/UnrealBloomPass pipeline needs ~5 more Three.js example
   scripts loaded on every page. The glow here is faked cheaply inside the
   single fragment shader instead — visually close, zero extra requests.

   Resilience: gracefully falls back to a static on-brand CSS gradient when
   WebGL is unavailable, when the user has requested reduced motion, or if
   the GPU context is lost mid-session.

   ---- Customization -------------------------------------------------------
   Everything tunable lives in CONFIG below. Colors are read live from this
   file's CSS custom properties (tokens/colors.css) so the shader always
   matches the design system automatically — change a token there and the
   shader follows, no edits needed here.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     CONFIG — tune the feel here. Nothing else in the file should need to
     change for a simple re-skin (speed, strength, performance budget).
     --------------------------------------------------------------------- */
  var CONFIG = {
    // Idle animation speed (time multiplier). Lower = slower, calmer drift.
    speed: 0.05,
    // How strongly the cursor bends/ripples the noise field.
    distortionStrength: 0.10,
    // Soft gold glow radius (px) that trails the pointer on fine-pointer
    // devices only (desktop mouse) — skipped on touch, see boot().
    cursorGlowSize: 460,
    // Max camera offset (world units) for the mouse/tilt parallax — kept
    // small on purpose ("gentle parallax", never dramatic).
    parallaxStrength: 0.35,
    // Quality tiers, highest first. `octaves` controls fbm detail (GLSL loop
    // length, recompiled per tier), `dprCap` caps devicePixelRatio, and
    // `particles` caps the floating-particle count for that tier.
    qualityTiers: [
      { name: 'high', octaves: 4, dprCap: 1.5, particles: 110 },
      { name: 'medium', octaves: 3, dprCap: 1.0, particles: 60 },
      { name: 'low', octaves: 2, dprCap: 0.75, particles: 24 }
    ],
    // Below this average FPS, sustained for `fpsSampleWindow` frames, step
    // down one quality tier. Never steps back up (avoids visible flicker).
    fpsDowngradeThreshold: 45,
    fpsSampleWindow: 90,
    // CSS custom properties read for brand color (see tokens/colors.css).
    // Values used as fallbacks only if a property can't be resolved.
    colorVars: {
      gold: { name: '--gold-500', fallback: '#C69A2C' },
      emerald: { name: '--emerald-500', fallback: '#13B978' },
      baseDark: { name: '--ink-950', fallback: '#06070A' },
      baseLight: { name: '--ivory-50', fallback: '#FCFAF4' }
    },
    // Large-but-safe wrap for uTime so float32 precision never degrades on
    // very long-running tabs ("infinite seamless looping"). The animation
    // is purely continuous trig/noise (not a sprite loop), so wrapping the
    // clock has no visible seam.
    timeWrap: 6283.184 // 1000 * 2π
  };

  /* ---------------------------------------------------------------------
     Small color helpers: resolve a CSS custom property to a normalized
     [r,g,b] triple (0–1) for use as a shader uniform.
     --------------------------------------------------------------------- */
  function hexToVec3(hex, fallback) {
    var m = /^#?([0-9a-f]{6})$/i.exec((hex || '').trim());
    var n = m ? parseInt(m[1], 16) : parseInt(fallback.replace('#', ''), 16);
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
  }
  function readBrandColor(entry) {
    var raw = getComputedStyle(document.documentElement).getPropertyValue(entry.name);
    return hexToVec3(raw, entry.fallback);
  }

  /* ---------------------------------------------------------------------
     Static fallback: an on-brand CSS gradient (no WebGL, no animation).
     Used when WebGL is unavailable, the GPU context is lost, or the user
     has requested reduced motion. Reads the same live CSS tokens, so it
     stays in sync with theme switches automatically via plain CSS.
     --------------------------------------------------------------------- */
  function mountStaticFallback() {
    if (document.getElementById('fwg-shader-fallback')) return;
    var el = document.createElement('div');
    el.id = 'fwg-shader-fallback';
    el.setAttribute('aria-hidden', 'true');
    Object.assign(el.style, {
      position: 'fixed', inset: '0', zIndex: '-1', pointerEvents: 'none',
      background:
        'radial-gradient(60% 60% at 30% 10%, color-mix(in srgb, var(--gold-500) 14%, transparent) 0%, transparent 70%), ' +
        'radial-gradient(55% 55% at 80% 75%, color-mix(in srgb, var(--emerald-500) 12%, transparent) 0%, transparent 70%), ' +
        'var(--bg-base)'
    });
    document.body.appendChild(el);
  }

  function boot() {
    // Three.js loads from a CDN <script> tag elsewhere on the page; wait
    // for it rather than racing the load order.
    if (!window.THREE) { return setTimeout(boot, 60); }
    var THREE = window.THREE;

    var reduceMotionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    var fineHoverQuery = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)');

    // Requirement: fully disable the animated shader for users who asked
    // for reduced motion — no canvas, no rAF loop, no mouse-driven motion.
    // They get the same calm static gradient as the no-WebGL fallback.
    if (reduceMotionQuery && reduceMotionQuery.matches) {
      mountStaticFallback();
      return;
    }

    var canvas = document.createElement('canvas');
    canvas.id = 'fwg-shader-bg';
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
      position: 'fixed', inset: '0', width: '100%', height: '100%',
      zIndex: '-1', pointerEvents: 'none', display: 'block'
    });

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch {
      mountStaticFallback();
      return;
    }
    document.body.appendChild(canvas);
    renderer.autoClear = false; // we render two scenes (background + particles) into one frame

    var bgScene = new THREE.Scene();
    var bgCamera = new THREE.Camera(); // clip-space trick camera for the full-screen quad

    var particleScene = new THREE.Scene();
    var particleCamera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10);
    particleCamera.position.z = 3;

    function themeVal() { return document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0; }

    // Brand colors are read live from CSS custom properties (single source
    // of truth = tokens/colors.css) rather than duplicated as constants, so
    // a token change is automatically reflected here with no code edits.
    var goldColor = readBrandColor(CONFIG.colorVars.gold);
    var emeraldColor = readBrandColor(CONFIG.colorVars.emerald);
    var baseDark = readBrandColor(CONFIG.colorVars.baseDark);
    var baseLight = readBrandColor(CONFIG.colorVars.baseLight);

    var uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseV: { value: 0 },
      uTheme: { value: themeVal() },
      uDistort: { value: CONFIG.distortionStrength },
      uGold: { value: new THREE.Vector3(goldColor[0], goldColor[1], goldColor[2]) },
      uEmerald: { value: new THREE.Vector3(emeraldColor[0], emeraldColor[1], emeraldColor[2]) },
      uBaseDark: { value: new THREE.Vector3(baseDark[0], baseDark[1], baseDark[2]) },
      uBaseLight: { value: new THREE.Vector3(baseLight[0], baseLight[1], baseLight[2]) }
    };

    var vert = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';

    // fbm octave count is baked into the GLSL loop bound at compile time
    // (cheap to recompile; only happens on a rare quality-tier downgrade,
    // never per-frame) — this is what lets `low` quality cost less GPU time
    // than `high` on the same screen.
    function buildFragmentShader(octaves) {
      return [
        'precision highp float;',
        'varying vec2 vUv;',
        'uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uMouseV; uniform float uTheme; uniform float uDistort;',
        'uniform vec3 uGold; uniform vec3 uEmerald; uniform vec3 uBaseDark; uniform vec3 uBaseLight;',
        // Hash + value-noise + fractal Brownian motion: the organic,
        // flowing "liquid" texture the whole effect is built on.
        'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }',
        'float noise(vec2 p){ vec2 i=floor(p), f=fract(p); float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.)); vec2 u=f*f*(3.-2.*f); return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y; }',
        'float fbm(vec2 p){ float v=0.,a=0.5; for(int i=0;i<' + octaves + ';i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }',
        // Soft horizontal "aurora" light band: a sine-warped ribbon with a
        // smooth vertical falloff, gently animated in phase over time.
        'float auroraBand(vec2 p, float yCenter, float freq, float speed, float thickness){',
        '  float wave = sin(p.x*freq + uTime*speed) * 0.15;',
        '  return smoothstep(thickness, 0.0, abs(p.y - yCenter - wave));',
        '}',
        'void main(){',
        '  vec2 uv=vUv; vec2 asp=vec2(uRes.x/uRes.y,1.0);',
        '  vec2 p=(uv-0.5)*asp; vec2 m=(uMouse-0.5)*asp;',
        // Soft cursor ripple: bends sample-space toward/away from the
        // pointer within a falloff radius — a gentle warp, not a hard
        // displacement, so it reads as "distortion" rather than a glitch.
        '  float md=distance(p,m);',
        '  vec2 dir=normalize(p-m+0.0001);',
        '  float bend=smoothstep(0.7,0.0,md)*(0.03+uMouseV*uDistort);',
        '  p-=dir*bend;',
        '  float t=uTime*1.0;',
        '  vec2 q=vec2(fbm(p*1.1+t), fbm(p*1.1-t+5.2));',
        '  float n=fbm(p*1.25 + q*1.6 + t);',
        '  vec2 g1=vec2(sin(t*1.3)*0.55, 0.35+cos(t*1.1)*0.3);',
        '  vec2 g2=vec2(cos(t*0.8)*0.6, -0.2+sin(t*1.5)*0.4);',
        '  float gold=smoothstep(1.05,0.0,distance(p,g1));',
        '  float em=smoothstep(1.25,0.0,distance(p,g2));',
        '  float glow=pow(max(n,0.0),1.5);',
        '  vec3 base=mix(uBaseDark, uBaseLight, uTheme);',
        '  float gi=mix(0.090,0.060,uTheme); float ei=mix(0.050,0.030,uTheme);',
        '  vec3 col=base;',
        '  col+=uGold*gold*glow*gi;',
        '  col+=uEmerald*em*glow*ei;',
        // Aurora layer: two soft ribbons, colors gently cross-fading.
        '  float a1=auroraBand(p,0.25,2.0,0.06,0.18);',
        '  float a2=auroraBand(p,-0.15,1.4,-0.045,0.22);',
        '  vec3 auroraCol=mix(uGold,uEmerald,0.5+0.5*sin(t*0.3));',
        '  col+=auroraCol*(a1*0.045+a2*0.035)*mix(1.0,0.45,uTheme);',
        // Light rays: faint streaks fanning from a fixed point near the top,
        // sharpened with a high power so they read as thin rays, not bands.
        '  vec2 rayOrigin=vec2(0.0,0.95);',
        '  vec2 toP=p-rayOrigin;',
        '  float ang=atan(toP.x,toP.y);',
        '  float rays=pow(0.5+0.5*sin(ang*7.0+t*0.15),10.0);',
        '  float rayFall=smoothstep(1.7,0.15,length(toP));',
        '  col+=uGold*rays*rayFall*0.05*mix(1.0,0.4,uTheme);',
        // Cheap bloom approximation: a wider, softer halo isolated to the
        // brightest noise peaks — no real blur pass, just an extra additive
        // term with a gentler falloff than the sharp glow above it.
        '  float halo=smoothstep(0.35,1.0,n);',
        '  col+=mix(uGold,uEmerald,0.5)*halo*0.022*mix(1.0,0.5,uTheme);',
        // Gentle light attraction toward the cursor.
        '  float prox=smoothstep(0.30,0.0,md);',
        '  col+=uGold*prox*(0.045+uMouseV*uDistort)*mix(1.0,0.6,uTheme);',
        '  col*=1.0-0.30*length(uv-0.5);', // soft vignette, premium/glass feel
        '  col*=mix(0.82,0.94,uTheme);',
        '  gl_FragColor=vec4(col,1.0);',
        '}'
      ].join('\n');
    }

    var bgMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), null);
    bgScene.add(bgMesh);

    /* ---------------------------------------------------------------------
       Floating glowing particles — THREE.Points with a real perspective
       camera, so near/far particles genuinely parallax differently (the
       "depth illusion"). Motion is computed entirely in the vertex shader
       (GPU-side), so there's no per-frame CPU buffer work.
       --------------------------------------------------------------------- */
    var MAX_PARTICLES = CONFIG.qualityTiers[0].particles;
    var particleGeo = new THREE.BufferGeometry();
    var positions = new Float32Array(MAX_PARTICLES * 3);
    var seeds = new Float32Array(MAX_PARTICLES);
    var sizes = new Float32Array(MAX_PARTICLES);
    var mixes = new Float32Array(MAX_PARTICLES);
    for (var i = 0; i < MAX_PARTICLES; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 3.2; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.2; // y (wrap volume)
      positions[i * 3 + 2] = -Math.random() * 2.2; // z depth, in front of camera
      seeds[i] = Math.random();
      sizes[i] = 14 + Math.random() * 22;
      mixes[i] = Math.random();
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    particleGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute('aMix', new THREE.BufferAttribute(mixes, 1));

    var particleMat = new THREE.ShaderMaterial({
      uniforms: { uTime: uniforms.uTime, uGold: uniforms.uGold, uEmerald: uniforms.uEmerald, uTheme: uniforms.uTheme },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: [
        'attribute float aSeed; attribute float aSize; attribute float aMix;',
        'uniform float uTime;',
        'varying float vMix; varying float vFade;',
        'void main(){',
        '  vMix = aMix;',
        '  vec3 pos = position;',
        // Slow continuous upward drift that wraps seamlessly within a fixed
        // volume height — "infinite seamless looping" with no visible pop,
        // since particles are sparse and randomly distributed.
        '  float boundsH = 2.2;',
        '  float drift = uTime * 0.06 * (0.4 + aSeed * 0.6);',
        '  float y = mod(pos.y + drift + boundsH * 0.5, boundsH) - boundsH * 0.5;',
        '  pos.y = y + sin(uTime * 0.25 + aSeed * 6.2831) * 0.05;',
        '  pos.x += cos(uTime * 0.18 + aSeed * 6.2831) * 0.06;',
        // Fade particles softly near the top/bottom of their wrap volume
        // instead of popping at the seam.
        '  vFade = smoothstep(0.0, 0.12, boundsH * 0.5 - abs(y)) ;',
        '  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);',
        '  gl_PointSize = aSize * (1.0 / -mvPosition.z);',
        '  gl_Position = projectionMatrix * mvPosition;',
        '}'
      ].join('\n'),
      fragmentShader: [
        'uniform vec3 uGold; uniform vec3 uEmerald; uniform float uTheme;',
        'varying float vMix; varying float vFade;',
        'void main(){',
        '  vec2 c = gl_PointCoord - 0.5;',
        '  float d = length(c);',
        '  float a = smoothstep(0.5, 0.0, d); a *= a;', // soft circular glow falloff
        '  vec3 col = mix(uGold, uEmerald, vMix);',
        '  float intensity = mix(0.55, 0.32, uTheme);',
        '  gl_FragColor = vec4(col, a * vFade * intensity);',
        '}'
      ].join('\n')
    });
    var particlePoints = new THREE.Points(particleGeo, particleMat);
    particleScene.add(particlePoints);

    /* ---------------------------------------------------------------------
       Adaptive performance: pick a starting tier from coarse device
       signals, then only ever step DOWN (never up, to avoid visible
       quality flicker) if sustained frame times miss budget.
       --------------------------------------------------------------------- */
    var likelyLowPower =
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
      (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
      !(fineHoverQuery && fineHoverQuery.matches); // coarse/touch primary input
    var tierIndex = likelyLowPower ? 1 : 0;
    var dpr = 1;

    function applyTier() {
      var tier = CONFIG.qualityTiers[tierIndex];
      bgMesh.material = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vert, fragmentShader: buildFragmentShader(tier.octaves) });
      particleGeo.setDrawRange(0, tier.particles);
      dpr = Math.min(window.devicePixelRatio || 1, tier.dprCap);
      renderer.setPixelRatio(dpr);
      resize();
    }

    function resize() {
      var w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w * dpr, h * dpr);
      particleCamera.aspect = w / h;
      particleCamera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    applyTier();

    // ---- eased mouse / touch follow (drives the shader ripple + parallax) ----
    var target = { x: 0.5, y: 0.5 }, cur = { x: 0.5, y: 0.5 }, vel = 0;
    function onMove(cx, cy) { target.x = cx / window.innerWidth; target.y = 1 - cy / window.innerHeight; }
    window.addEventListener('mousemove', function (e) { onMove(e.clientX, e.clientY); }, { passive: true });
    // Touch support: the ripple/distortion responds to a finger drag the
    // same way it responds to a mouse.
    window.addEventListener('touchmove', function (e) { if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });

    // ---- device tilt (mobile parallax) ----
    // iOS requires an explicit user gesture before motion data can be
    // requested, so this is only triggered on the first touch, and only
    // attached at all if permission is granted (or not required).
    var tilt = { x: 0, y: 0 };
    function onOrientation(e) {
      if (typeof e.gamma === 'number') tilt.x = Math.max(-1, Math.min(1, e.gamma / 45));
      if (typeof e.beta === 'number') tilt.y = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
    }
    function requestMotionIfNeeded() {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(function (state) {
          if (state === 'granted') window.addEventListener('deviceorientation', onOrientation, { passive: true });
        }).catch(function () {});
      } else if (typeof DeviceOrientationEvent !== 'undefined') {
        window.addEventListener('deviceorientation', onOrientation, { passive: true });
      }
    }
    window.addEventListener('touchstart', requestMotionIfNeeded, { once: true, passive: true });

    // ---- decorative cursor-glow trail (desktop only) ----
    // Skipped on touch/coarse-pointer devices on purpose: a glow that
    // trails a literal fingertip sits hidden under the finger and adds
    // nothing — the shader's own ripple (above) already covers touch.
    var glow = null, glowMounted = false;
    if (fineHoverQuery && fineHoverQuery.matches) {
      glow = document.createElement('div');
      glow.setAttribute('aria-hidden', 'true');
      var size = CONFIG.cursorGlowSize;
      Object.assign(glow.style, {
        position: 'fixed', top: '0', left: '0', width: size + 'px', height: size + 'px',
        marginLeft: (-size / 2) + 'px', marginTop: (-size / 2) + 'px', borderRadius: '50%', zIndex: '0',
        pointerEvents: 'none', mixBlendMode: 'screen', opacity: '0',
        background: 'radial-gradient(circle, rgba(214,175,67,0.16) 0%, rgba(214,175,67,0.06) 32%, rgba(214,175,67,0) 68%)',
        transition: 'opacity 500ms ease', willChange: 'transform, opacity'
      });
    }
    var gpos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var graw = { x: gpos.x, y: gpos.y };
    var idleT = null;
    function pointer(cx, cy) {
      if (!glow) return;
      graw.x = cx; graw.y = cy;
      if (!glowMounted) { document.body.appendChild(glow); glowMounted = true; }
      glow.style.opacity = '1';
      clearTimeout(idleT);
      idleT = setTimeout(function () { glow.style.opacity = '0'; }, 1600);
    }
    if (glow) {
      window.addEventListener('mousemove', function (e) { pointer(e.clientX, e.clientY); }, { passive: true });
      window.addEventListener('mousedown', function () {
        glow.animate && glow.animate([{ filter: 'brightness(1.8)' }, { filter: 'brightness(1)' }], { duration: 420, easing: 'ease-out' });
      }, { passive: true });
      window.addEventListener('mouseleave', function () { glow.style.opacity = '0'; }, { passive: true });
    }

    // Theme toggle re-tints the base color blend (uTheme); brand accent
    // colors themselves are theme-independent raw tokens, read once above.
    new MutationObserver(function () { uniforms.uTheme.value = themeVal(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Pause entirely when the tab isn't visible.
    var running = true;
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) { last = performance.now(); requestAnimationFrame(loop); }
    });

    // If the OS-level reduced-motion preference changes while the page is
    // open, stop the WebGL loop immediately and swap to the static fallback.
    if (reduceMotionQuery && reduceMotionQuery.addEventListener) {
      reduceMotionQuery.addEventListener('change', function (e) {
        if (e.matches) {
          running = false;
          canvas.remove();
          if (glow) glow.remove();
          mountStaticFallback();
        }
      });
    }

    // GPU context loss (driver crash, tab eviction, etc.) — degrade
    // gracefully instead of leaving a frozen/broken canvas on screen.
    canvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault();
      running = false;
      canvas.remove();
      if (glow) glow.remove();
      mountStaticFallback();
    }, false);

    var last = performance.now();
    // Rolling frame-time sample used purely to decide whether to step down
    // a quality tier; never affects the visuals directly.
    var frameCount = 0, frameTimeSum = 0;
    // Eased camera-parallax position (mouse on desktop, tilt on mobile).
    var camPos = { x: 0, y: 0 };

    function loop(now) {
      if (!running) return;
      var dt = Math.min((now - last) / 1000, 0.05);
      frameTimeSum += (now - last);
      frameCount++;
      last = now;

      // Adaptive downgrade check: auto-reduce quality on slower devices.
      // Only ever steps down, and only after a stable sample window, so a
      // single slow frame can't cause flicker.
      if (frameCount >= CONFIG.fpsSampleWindow) {
        var avgFps = 1000 / (frameTimeSum / frameCount);
        if (avgFps < CONFIG.fpsDowngradeThreshold && tierIndex < CONFIG.qualityTiers.length - 1) {
          tierIndex++;
          applyTier();
        }
        frameCount = 0; frameTimeSum = 0;
      }

      var px = cur.x, py = cur.y;
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      var dv = Math.sqrt((cur.x - px) * (cur.x - px) + (cur.y - py) * (cur.y - py)) / Math.max(dt, 0.001);
      vel += (Math.min(dv, 3) - vel) * 0.1;
      uniforms.uMouse.value.set(cur.x, cur.y);
      uniforms.uMouseV.value = vel;
      uniforms.uTime.value = (uniforms.uTime.value + dt * CONFIG.speed) % CONFIG.timeWrap;

      // Gentle parallax: blend desktop mouse offset and mobile tilt into a
      // single small camera offset, eased for smoothness — the "depth
      // illusion" comes from the particles' real perspective projection.
      var parTargetX = (cur.x - 0.5) * CONFIG.parallaxStrength + tilt.x * (CONFIG.parallaxStrength * 0.6);
      var parTargetY = (cur.y - 0.5) * CONFIG.parallaxStrength + tilt.y * (CONFIG.parallaxStrength * 0.6);
      camPos.x += (parTargetX - camPos.x) * 0.04;
      camPos.y += (parTargetY - camPos.y) * 0.04;
      particleCamera.position.x = camPos.x;
      particleCamera.position.y = camPos.y;
      particleCamera.lookAt(0, 0, -1);

      if (glow) {
        gpos.x += (graw.x - gpos.x) * 0.18;
        gpos.y += (graw.y - gpos.y) * 0.18;
        if (glowMounted) glow.style.transform = 'translate(' + gpos.x + 'px,' + gpos.y + 'px)';
      }

      renderer.clear();
      renderer.render(bgScene, bgCamera);
      renderer.clearDepth();
      renderer.render(particleScene, particleCamera);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
