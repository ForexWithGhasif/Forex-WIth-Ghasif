/* Forex With Ghasif — premium interactive shader wallpaper.
   Fixed full-viewport WebGL backdrop: obsidian base with soft gold/emerald
   glows, organic idle motion, and eased mouse interaction. Theme-aware.
   Loads behind all content (z-index:-1) and degrades gracefully if WebGL
   or THREE is unavailable (html keeps its solid --bg-base fallback). */
(function () {
  function boot() {
    if (!window.THREE) { return setTimeout(boot, 60); }
    var THREE = window.THREE;

    var canvas = document.createElement('canvas');
    canvas.id = 'fwg-shader-bg';
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
      position: 'fixed', inset: '0', width: '100%', height: '100%',
      zIndex: '-1', pointerEvents: 'none', display: 'block'
    });
    document.body.appendChild(canvas);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    } catch (_e) { canvas.remove(); return; }
    var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(DPR);

    var scene = new THREE.Scene();
    var camera = new THREE.Camera();

    function themeVal() { return document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0; }

    var uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseV: { value: 0 },
      uTheme: { value: themeVal() }
    };

    var vert = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
    var frag = [
      'precision highp float;',
      'varying vec2 vUv;',
      'uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uMouseV; uniform float uTheme;',
      'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }',
      'float noise(vec2 p){ vec2 i=floor(p), f=fract(p); float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.)); vec2 u=f*f*(3.-2.*f); return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y; }',
      'float fbm(vec2 p){ float v=0.,a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }',
      'void main(){',
      '  vec2 uv=vUv; vec2 asp=vec2(uRes.x/uRes.y,1.0);',
      '  vec2 p=(uv-0.5)*asp; vec2 m=(uMouse-0.5)*asp;',
      '  float md=distance(p,m);',
      '  vec2 dir=normalize(p-m+0.0001);',
      '  float bend=smoothstep(0.7,0.0,md)*(0.03+uMouseV*0.10);',
      '  p-=dir*bend;',
      '  float t=uTime*0.05;',
      '  vec2 q=vec2(fbm(p*1.1+t), fbm(p*1.1-t+5.2));',
      '  float n=fbm(p*1.25 + q*1.6 + t);',
      '  vec2 g1=vec2(sin(t*1.3)*0.55, 0.35+cos(t*1.1)*0.3);',
      '  vec2 g2=vec2(cos(t*0.8)*0.6, -0.2+sin(t*1.5)*0.4);',
      '  float gold=smoothstep(1.05,0.0,distance(p,g1));',
      '  float em=smoothstep(1.25,0.0,distance(p,g2));',
      '  float glow=pow(max(n,0.0),1.5);',
      '  vec3 base=mix(vec3(0.020,0.024,0.032), vec3(0.972,0.957,0.918), uTheme);',
      '  vec3 goldC=vec3(0.84,0.69,0.27); vec3 emC=vec3(0.07,0.55,0.40);',
      '  float gi=mix(0.090,0.060,uTheme); float ei=mix(0.050,0.030,uTheme);',
      '  vec3 col=base;',
      '  col+=goldC*gold*glow*gi;',
      '  col+=emC*em*glow*ei;',
      '  float prox=smoothstep(0.30,0.0,md);',
      '  col+=goldC*prox*(0.045+uMouseV*0.10)*mix(1.0,0.6,uTheme);',
      '  col*=1.0-0.30*length(uv-0.5);',
      '  col*=mix(0.82,0.94,uTheme);',
      '  gl_FragColor=vec4(col,1.0);',
      '}'
    ].join('\n');

    var mat = new THREE.ShaderMaterial({ uniforms: uniforms, vertexShader: vert, fragmentShader: frag });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    function resize() {
      var w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w * DPR, h * DPR);
    }
    window.addEventListener('resize', resize);
    resize();

    // eased mouse follow
    var target = { x: 0.5, y: 0.5 }, cur = { x: 0.5, y: 0.5 }, vel = 0;
    function onMove(cx, cy) { target.x = cx / window.innerWidth; target.y = 1 - cy / window.innerHeight; }
    window.addEventListener('mousemove', function (e) { onMove(e.clientX, e.clientY); }, { passive: true });
    window.addEventListener('touchmove', function (e) { if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });

    // Soft gold cursor glow that trails the pointer and fades when idle.
    var glow = document.createElement('div');
    glow.setAttribute('aria-hidden', 'true');
    Object.assign(glow.style, {
      position: 'fixed', top: '0', left: '0', width: '460px', height: '460px',
      marginLeft: '-230px', marginTop: '-230px', borderRadius: '50%', zIndex: '0',
      pointerEvents: 'none', mixBlendMode: 'screen', opacity: '0',
      background: 'radial-gradient(circle, rgba(214,175,67,0.16) 0%, rgba(214,175,67,0.06) 32%, rgba(214,175,67,0) 68%)',
      transition: 'opacity 500ms ease', willChange: 'transform, opacity'
    });
    var glowMounted = false;
    var gpos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var graw = { x: gpos.x, y: gpos.y };
    var idleT = null;
    function pointer(cx, cy) {
      graw.x = cx; graw.y = cy;
      if (!glowMounted) { document.body.appendChild(glow); glowMounted = true; }
      glow.style.opacity = '1';
      clearTimeout(idleT);
      idleT = setTimeout(function () { glow.style.opacity = '0'; }, 1600);
    }
    window.addEventListener('mousemove', function (e) { pointer(e.clientX, e.clientY); }, { passive: true });
    window.addEventListener('mousedown', function () { glow.style.transform += ''; glow.animate && glow.animate([{ filter: 'brightness(1.8)' }, { filter: 'brightness(1)' }], { duration: 420, easing: 'ease-out' }); }, { passive: true });
    window.addEventListener('mouseleave', function () { glow.style.opacity = '0'; }, { passive: true });

    new MutationObserver(function () { uniforms.uTheme.value = themeVal(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    var running = true;
    document.addEventListener('visibilitychange', function () { running = !document.hidden; if (running) requestAnimationFrame(loop); });

    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var last = performance.now();
    function loop(now) {
      if (!running) return;
      var dt = Math.min((now - last) / 1000, 0.05); last = now;
      var px = cur.x, py = cur.y;
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      var dv = Math.sqrt((cur.x - px) * (cur.x - px) + (cur.y - py) * (cur.y - py)) / Math.max(dt, 0.001);
      vel += (Math.min(dv, 3) - vel) * 0.1;
      uniforms.uMouse.value.set(cur.x, cur.y);
      uniforms.uMouseV.value = vel;
      uniforms.uTime.value += reduce ? 0.0 : dt;
      // ease the cursor glow toward the raw pointer
      gpos.x += (graw.x - gpos.x) * 0.18;
      gpos.y += (graw.y - gpos.y) * 0.18;
      if (glowMounted) glow.style.transform = 'translate(' + gpos.x + 'px,' + gpos.y + 'px)';
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
