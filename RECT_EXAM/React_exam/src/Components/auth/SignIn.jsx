import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signInAsync } from "../../Services/Actions/userAction";
import "./SignIn.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError } = useSelector((state) => state.authReducer || {});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({ email: false, password: false });


  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const errors = useMemo(() => {
    const e = {};
    const em = email.trim();
    const pw = password;

    if (!em) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(em)) e.email = "Enter a valid email address.";

    if (!pw) e.password = "Password is required.";
    else if (pw.length < 6) e.password = "Minimum 6 characters.";

    return e;
  }, [email, password]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);
  const canSubmit = useMemo(() => !hasErrors && !isLoading, [hasErrors, isLoading]);

  const markTouched = useCallback((name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (hasErrors) {
        setTouched({ email: true, password: true });
        if (errors.email) emailRef.current?.focus();
        else if (errors.password) passwordRef.current?.focus();
        return;
      }

      dispatch(signInAsync({ email: email.trim(), password }));
    },
    [dispatch, email, password, hasErrors, errors]
  );
  

useEffect(() => {
  if (user) {
    navigate("/", { replace: true });
  }
}, [user, navigate]);

  if (isLoading) return <div className="p-4 text-center">Signing you in…</div>;

  return (
    <div className="auth-page">
      <div className="auth-card" role="region" aria-labelledby="signin-title">
        <h1 id="signin-title" className="auth-title">Sign In</h1>
        <p className="auth-subtitle">Welcome back! Please enter your details.</p>

        {isError && <div className="alert alert-danger" role="alert">{isError}</div>}

        <form onSubmit={onSubmit} noValidate>
    
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => markTouched("email")}
              className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
              type="email"
              autoComplete="username"
              required
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            />
            {touched.email && errors.email && (
              <div id="email-error" className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => markTouched("password")}
              className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={touched.password && !!errors.password}
              aria-describedby={touched.password && errors.password ? "password-error" : undefined}
            />
            {touched.password && errors.password && (
              <div id="password-error" className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button className="btn-auth" type="submit" disabled={!canSubmit}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          <Link to="/sign-up" className="btn btn-link ms-2">Create account</Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
