const initialState = {
  loginData: {},
  error: {},
  loading: false,
  getAllDocumentRecords: [],
  patientDetails: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action?.type) {
    //login
    case "LOGIN_REQUEST":
      return { ...state, loading: true };

    case "LOGIN_SUCCESS":
      return { ...state, loginData: action?.payload, error: [], loading: false };

    case "LOGIN_FAILED":
      return { ...state, error: action?.payload, loginData: [], loading: false };

    case "LOGOUT":
      return { ...state, loginData: {}, error: {}, loading: false };

    //records
    case "GET_DOCUMENTS_SUCCESS":
      return { ...state, getAllDocumentRecords: action?.payload, error: null, loading: false  };

    case "GET_DOCUMENTS_FAILURE":
      return { ...state, error: action?.payload, getAllDocumentRecords: [], loading: false  };

    //get a single doc record
    case "GET_PATIENT_DETAILS_SUCCESS":
      return { ...state, patientDetails: action?.payload, error: null, loading: false };

    case "GET_PATIENT_DETAILS_FAILURE":
      return { ...state, error: action?.payload, patientDetails: null, loading: false };
    default:
      return state;
  }
};