// src/Services/Reducers/userReducer.js

const savedUser = JSON.parse(sessionStorage.getItem("user") || "null");

const initialState = {
  user: savedUser,               // null | { ... }
  isAuthenticated: !!savedUser,  // ✅ easy selector for route guards
  isCreated: false,              // for register success UI
  isLoading: false,
  error: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        isLoading: true,
        error: "",
        // keep isCreated false while loading (esp. for register)
        isCreated: false,
      };

    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload || "Something went wrong",
        // a failed op shouldn't mark created
        isCreated: false,
      };

    case "REGISTER":
      return {
        ...state,
        isLoading: false,
        error: "",
        isCreated: true,          // ✅ register success flag
      };

    case "LOGIN_SUC":
      return {
        ...state,
        isLoading: false,
        error: "",
        isCreated: false,
        user: action.payload || null,
        isAuthenticated: !!action.payload,   // ✅ now true
      };

    case "LOGOUT_SUC":
      return {
        ...state,
        isLoading: false,
        error: "",
        isCreated: false,
        user: null,
        isAuthenticated: false,   // ✅ back to false
      };

    // (optional) restore session explicitly if you dispatch it
    case "RESTORE_SESSION":
      return {
        ...state,
        user: action.payload || null,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: "",
      };

    default:
      return state;
  }
};
