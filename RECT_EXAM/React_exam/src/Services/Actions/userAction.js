// src/Services/Actions/userAction.js
import axios from "axios";

const API_URL = "http://localhost:3000/users";

// Action creators (names match your reducer)
const loading    = () => ({ type: "LOADING" });
const errorMsg   = (msg) => ({ type: "ERROR", payload: msg });
const loginSuc   = (user) => ({ type: "LOGIN_SUC", payload: user });
const registerSuc= () => ({ type: "REGISTER" });
const logOutSuc  = () => ({ type: "LOGOUT_SUC" });

/** helper: sanitize & persist user without password */
const persistUser = (userObj) => {
  const { password, ...safeUser } = userObj || {};
  sessionStorage.setItem("user", JSON.stringify(safeUser));
  return safeUser;
};

/** helper: normalize email */
const normEmail = (email) => (email || "").trim().toLowerCase();

/* =========================
   REGISTER
   ========================= */
export const registerAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const payload = {
        ...data,
        email: normEmail(data.email),
      };

      // check email uniqueness
      const check = await axios.get(API_URL, {
        params: { email: payload.email },
      });
      if (Array.isArray(check.data) && check.data.length > 0) {
        return dispatch(errorMsg("Email already exists"));
      }

      // create user
      await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      // success flag for UI (navigate to login/show toast etc.)
      dispatch(registerSuc());
    } catch (err) {
      console.error(err);
      dispatch(errorMsg("Registration failed"));
    }
  };
};

/* =========================
   LOGIN
   ========================= */
export const signInAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const email = normEmail(data.email);
      const password = (data.password || "").trim();

      // json-server style query
      const res = await axios.get(API_URL, {
        params: { email, password },
      });

      const list = Array.isArray(res.data) ? res.data : [];
      if (list.length === 0) {
        return dispatch(errorMsg("Invalid credentials"));
      }

      const user = list[0];
      const safeUser = persistUser(user); // store without password
      dispatch(loginSuc(safeUser));
    } catch (err) {
      console.error(err);
      dispatch(errorMsg("Login failed"));
    }
  };
};

/* =========================
   LOGOUT
   ========================= */
export const logOutAsync = () => {
  return async (dispatch) => {
    try {
      sessionStorage.removeItem("user");
      dispatch(logOutSuc());
    } catch (err) {
      console.error(err);
      dispatch(errorMsg("Logout failed"));
    }
  };
};

/* =========================
   RESTORE (on app load/refresh)
   ========================= */
export const restoreSession = () => {
  return (dispatch) => {
    try {
      const raw = sessionStorage.getItem("user");
      const cached = raw ? JSON.parse(raw) : null;
      if (cached) {
        // directly mark as logged in
        dispatch(loginSuc(cached));
      } else {
        // optional: ensure logged out state
        dispatch(logOutSuc());
      }
    } catch (err) {
      console.error(err);
      dispatch(errorMsg("Failed to restore session"));
    }
  };
};
