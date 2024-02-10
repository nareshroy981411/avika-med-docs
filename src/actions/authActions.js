import axios from "axios";
import { baseUrl } from "../App";
import { message } from "antd";

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
      `${baseUrl}/auth/admin-login`,
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
    message.success(`Hi! ${response?.data?.data?.user[0]?.username}`)
    navigate(`/dashboard`)
  } catch (error) {
    // alert(error?.response?.data?.message)
    message.error("Invalid Credentials")
    dispatch({
      type: "LOGIN_FAILED",
      payload: error?.response?.data
    })
  }
};






