// import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   error: null,
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN_SUCCESS:
//       return {
//         ...state,
//         isAuthenticated: true,
//         user: action.payload,
//         error: null,
//       };
//     case LOGIN_FAILURE:
//       return {
//         ...state,
//         isAuthenticated: false,
//         user: null,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default authReducer;


const initialState = {
  loginData: {},
  error: {},
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return { ...state, loading: true };

    case "LOGIN_SUCCESS":
      return { ...state, loginData: action.payload, error: [], loading: false };

    case "LOGIN_FAILED":
      return { ...state, error: action.payload, loginData: [], loading: false };

    case "LOGOUT":
      return { ...state, loginData: {}, error: {}, loading: false };

    default:
      return state;
  }
};