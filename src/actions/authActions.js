import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";

const apiEndpoint = "http://localhost:3030/auth/login"; // Replace with your API endpoint

export const login = (mobile, password) => async (dispatch) => {
  try {
    const response = await axios.post(apiEndpoint, { mobile, password });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data,
    });
  }
};

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DataFetchingComponent = () => {
//   const [data, setData] = useState(null); // Initialize data state as null

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3030/auth/login');
//         setData(response.data); // Set data state when fetching is successful
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array ensures the effect runs only once on component mount

//   return (
//     <div>
//       {data && data.property && (
//         <p>Data Property: {data.property}</p>
//       )}
//     </div>
//   );
// };

// export default DataFetchingComponent;

