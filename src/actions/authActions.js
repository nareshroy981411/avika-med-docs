import axios from "axios";
import { loginUrl } from "../constants/constants";

export const LogoutAction = () => {
  return {
    type: 'LOGOUT'
  }
}

export const loginAction = (usersData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    })
    const response = await axios.post(
      loginUrl,
      usersData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    sessionStorage?.setItem('token', response?.data?.data?.token)
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response?.data
    })
    alert(`Hi! ${response?.data?.data?.user[0]?.username}`)
    navigate(`/dashboard`)
  } catch (error) {
    alert(error?.response?.data?.message)
    dispatch({
      type: "LOGIN_FAILED",
      payload: error?.response?.data
    })
  }
};






