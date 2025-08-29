import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsync } from "../../Services/Actions/userAction";
import { useNavigate, Link } from "react-router-dom";
import "./SignIn.css";

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const auth = useSelector((s) => s?.userReducer ?? s?.auth ?? {});
  const error = auth.error ?? "";
  const isCreated = auth.isCreated ?? false;
  const isLoading = auth.isLoading ?? false;

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const markTouched = useCallback((name) => {
    setTouched((t) => ({ ...t, [name]: true }));
  }, []);

  const errors = useMemo(() => {
    const e = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const pw = form.password;

    if (!name) e.name = "Name is required.";
    else if (name.length < 2) e.name = "Minimum 2 characters.";

    if (!email) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email address.";

    if (!pw) e.password = "Password is required.";
    else if (pw.length < 6) e.password = "Minimum 6 characters.";

    return e;
  }, [form]);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);
  const canSubmit = useMemo(() => !hasErrors && !isLoading, [hasErrors, isLoading]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (hasErrors) {
        setTouched({ name: true, email: true, password: true });
        if (errors.name) nameRef.current?.focus();
        else if (errors.email) emailRef.current?.focus();
        else if (errors.password) passwordRef.current?.focus();
        return;
      }
      dispatch(registerAsync({ 
        name: form.name.trim(), 
        email: form.email.trim(), 
        password: form.password 
      }));
    },
    [dispatch, form, hasErrors, errors]
  );

  useEffect(() => {
    if (isCreated) navigate("/sign-in");
  }, [isCreated, navigate]);

  if (isLoading) return <div className="p-4">Creating your account…</div>;

  return (
    <div className="auth-page">
      <div className="auth-card" role="region" aria-labelledby="signup-title">
        <h1 id="signup-title" className="auth-title">Create account</h1>
        <p className="auth-subtitle">Join us in seconds. It’s quick and easy.</p>

        {error ? <div className="alert alert-danger" role="alert">{error}</div> : null}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              id="name"
              name="name"
              ref={nameRef}
              value={form.name}
              onChange={handleChange}
              onBlur={() => markTouched("name")}
              className={`form-control ${touched.name && errors.name ? "is-invalid" : ""}`}
              type="text"
              autoComplete="name"
              required
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={touched.name && errors.name ? "name-error" : undefined}
            />
            {touched.name && errors.name ? (
              <div id="name-error" className="invalid-feedback">{errors.name}</div>
            ) : null}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              ref={emailRef}
              value={form.email}
              onChange={handleChange}
              onBlur={() => markTouched("email")}
              className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`}
              type="email"
              autoComplete="username"
              required
              aria-invalid={touched.email && !!errors.email}
              aria-describedby={touched.email && errors.email ? "email-error" : undefined}
            />
            {touched.email && errors.email ? (
              <div id="email-error" className="invalid-feedback">{errors.email}</div>
            ) : null}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              onBlur={() => markTouched("password")}
              className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
              type="password"
              autoComplete="new-password"
              required
              aria-invalid={touched.password && !!errors.password}
              aria-describedby={touched.password && errors.password ? "password-error" : undefined}
            />
            {touched.password && errors.password ? (
              <div id="password-error" className="invalid-feedback">{errors.password}</div>
            ) : null}
          </div>

          <button className="btn-auth " type="submit" disabled={!canSubmit}>
            {isLoading ? "Creating..." : "Sign Up"}
          </button>
          <Link to="/sign-in" className="btn btn-link ms-2">Already have an account? Sign In</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
