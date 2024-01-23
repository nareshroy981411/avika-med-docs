// import axios from "axios";
// import React, { useEffect, useState } from 'react';
// import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";
// const apiEndpoint = "https://med.test.avika.ai/auth/login"; // Replace with your API endpoint

// export const login = (mobile, password) => async (dispatch) => {
//   try {
//     const response = await axios.post(apiEndpoint, { mobile, password });
//     dispatch({
//       type: LOGIN_SUCCESS,
//       payload: response.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: LOGIN_FAILURE,
//       payload: error.response.data,
//     });
//   }
// };
// const DataFetchingComponent = () => {
//   const [data, setData] = useState(null); // Initialize data state as null

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://med.test.avika.ai/auth/login');
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


import axios from "axios";
import {baseUrl} from "../App";
import toast from "react-hot-toast";


export const LogoutAction  = ()=> {
  return {
    type: 'LOGOUT'
  }
}

export const loginAction = (usersData, navigate) => async (dispatch) => {
  try {

    dispatch({
        type:"LOGIN_REQUEST",
    })
    console.log(baseUrl,"hello")

    const response = await axios.post(
        `https://med.test.avika.ai/auth/login`,
        usersData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response,baseUrl,"hello")
      sessionStorage.setItem('token',response.data.data.token )
      dispatch({
        type:"LOGIN_SUCCESS",
        payload: response.data
      })  
      alert(`Hi! ${response?.data?.data?.user[0]?.username}`)
      // toast(`Hi! ${response?.data?.data?.user[0]?.username}`);
      navigate(`/dashboard`)
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    alert(error?.response?.data?.message)
    dispatch({
        type:"LOGIN_FAILED",
        payload:error?.response?.data
    })
  }
};
