/* FWG, Client Area — Sign Up / Sign In. Both post to the backend's
   cookie-based session endpoints (httpOnly, never localStorage) and redirect
   to /client/dashboard on success. Client-side checks here are convenience
   only; the real enforcement is server-side (bcrypt hashing, JWT session
   cookie, /api/auth/me required on every client-area page). */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function AuthShell({ title, lead, children }) {
  return (
    <section style={{position:'relative',overflow:'hidden',padding:'calc(var(--space-9) + 12px) var(--gutter) var(--space-10)',minHeight:'70vh',display:'flex',alignItems:'center'}}>
      <div style={{position:'absolute',inset:0,background:'var(--hero-glow)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',backgroundSize:'64px 64px',maskImage:'radial-gradient(60% 70% at 50% 0%, #000, transparent 75%)',WebkitMaskImage:'radial-gradient(60% 70% at 50% 0%, #000, transparent 75%)',opacity:0.5,pointerEvents:'none'}}/>
      <div style={{position:'relative',width:'min(440px,100%)',margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:'28px'}}>
          <KitBadge tone="gold" dot style={{width:'fit-content',margin:'0 auto 16px'}}>Client Area</KitBadge>
          <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-3xl)',lineHeight:1.06,letterSpacing:'var(--ls-tighter)',margin:'0 0 10px'}}>{title}</h1>
          <p style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',margin:0}}>{lead}</p>
        </div>
        <KitCard>{children}</KitCard>
      </div>
    </section>
  );
}

function AuthField({ label, icon, error, ...rest }) {
  const [show, setShow] = React.useState(false);
  const isPassword = rest.type === 'password';
  return (
    <div>
      <label style={{fontSize:'var(--text-xs)',fontWeight:600,letterSpacing:'var(--ls-wide)',textTransform:'uppercase',color:'var(--text-tertiary)',marginBottom:'8px',display:'block'}}>{label}</label>
      <div style={{position:'relative',display:'flex',alignItems:'center'}}>
        <span style={{position:'absolute',left:'14px',display:'inline-flex',color:'var(--text-tertiary)',pointerEvents:'none'}}><Icon name={icon} size={17}/></span>
        <input {...rest} type={isPassword && show ? 'text' : rest.type}
          style={{width:'100%',background:'var(--surface-inset)',border:`1px solid ${error?'var(--bearish)':'var(--border-default)'}`,borderRadius:'var(--radius-md)',
            padding:'13px 14px 13px 42px',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',color:'var(--text-primary)',outline:'none'}}/>
        {isPassword && (
          <button type="button" onClick={()=>setShow(s=>!s)} aria-label={show?'Hide password':'Show password'}
            style={{position:'absolute',right:'12px',background:'none',border:'none',cursor:'pointer',color:'var(--text-tertiary)',display:'inline-flex'}}>
            <Icon name={show?'eye-off':'eye'} size={17}/>
          </button>
        )}
      </div>
      {error && <div style={{fontSize:'var(--text-xs)',color:'var(--bearish)',marginTop:'6px'}}>{error}</div>}
    </div>
  );
}

function AuthErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'13px 16px',borderRadius:'var(--radius-md)',background:'var(--bearish-bg)',border:'1px solid rgba(228,71,74,0.32)'}}>
      <Icon name="alert-triangle" size={17} color="var(--bearish)" style={{flexShrink:0,marginTop:'2px'}}/>
      <span style={{fontSize:'var(--text-xs)',lineHeight:1.6,color:'var(--text-secondary)'}}>{message}</span>
    </div>
  );
}

function SignUpPage() {
  const [f, setF] = React.useState({ fullName:'', email:'', password:'', confirmPassword:'' });
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [formError, setFormError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!f.fullName.trim()) errs.fullName = 'Full name is required.';
    if (!f.email.trim() || !EMAIL_RE.test(f.email.trim())) errs.email = 'Enter a valid email address.';
    if (!f.password || f.password.length < 8) errs.password = 'Must be at least 8 characters.';
    if (f.confirmPassword !== f.password) errs.confirmPassword = 'Passwords do not match.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const errs = validate();
    setFieldErrors(errs);
    setFormError('');
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) { setFormError(data.message || 'Something went wrong. Please try again.'); return; }
      window.location.href = '/client/dashboard';
    } catch (err) {
      setFormError("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return <AuthShell title="Create your account" lead="Join the client area to track your journey with us.">
    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
      <AuthField label="Full name" icon="user" type="text" autoComplete="name" placeholder="Your full name" value={f.fullName} onChange={set('fullName')} error={fieldErrors.fullName}/>
      <AuthField label="Email" icon="mail" type="email" autoComplete="email" placeholder="you@email.com" value={f.email} onChange={set('email')} error={fieldErrors.email}/>
      <AuthField label="Password" icon="lock" type="password" autoComplete="new-password" placeholder="At least 8 characters" value={f.password} onChange={set('password')} error={fieldErrors.password}/>
      <AuthField label="Confirm password" icon="lock" type="password" autoComplete="new-password" placeholder="Re-enter your password" value={f.confirmPassword} onChange={set('confirmPassword')} error={fieldErrors.confirmPassword}/>
      <AuthErrorBanner message={formError}/>
      <KitButton as="button" type="submit" variant="primary" size="lg" fullWidth disabled={submitting} iconRight={<Icon name="arrow-right" size={17}/>}>
        {submitting ? 'Creating account…' : 'Create account'}
      </KitButton>
      <p style={{textAlign:'center',fontSize:'var(--text-xs)',color:'var(--text-tertiary)',margin:0}}>
        Already have an account? <a href="/signin" style={{color:'var(--text-gold)',fontWeight:700,textDecoration:'underline'}}>Sign in</a>
      </p>
    </form>
  </AuthShell>;
}

function SignInPage() {
  const [f, setF] = React.useState({ email:'', password:'' });
  const [fieldErrors, setFieldErrors] = React.useState({});
  const [formError, setFormError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!f.email.trim() || !EMAIL_RE.test(f.email.trim())) errs.email = 'Enter a valid email address.';
    if (!f.password) errs.password = 'Password is required.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    const errs = validate();
    setFieldErrors(errs);
    setFormError('');
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/auth/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) { setFormError(data.message || 'Something went wrong. Please try again.'); return; }
      window.location.href = '/client/dashboard';
    } catch (err) {
      setFormError("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return <AuthShell title="Welcome back" lead="Sign in to your client area.">
    <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
      <AuthField label="Email" icon="mail" type="email" autoComplete="email" placeholder="you@email.com" value={f.email} onChange={set('email')} error={fieldErrors.email}/>
      <AuthField label="Password" icon="lock" type="password" autoComplete="current-password" placeholder="Your password" value={f.password} onChange={set('password')} error={fieldErrors.password}/>
      <AuthErrorBanner message={formError}/>
      <KitButton as="button" type="submit" variant="primary" size="lg" fullWidth disabled={submitting} iconRight={<Icon name="arrow-right" size={17}/>}>
        {submitting ? 'Signing in…' : 'Sign in'}
      </KitButton>
      <p style={{textAlign:'center',fontSize:'var(--text-xs)',color:'var(--text-tertiary)',margin:0}}>
        Don't have an account? <a href="/signup" style={{color:'var(--text-gold)',fontWeight:700,textDecoration:'underline'}}>Create one</a>
      </p>
    </form>
  </AuthShell>;
}

Object.assign(window,{SignUpPage,SignInPage});
