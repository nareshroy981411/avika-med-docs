
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