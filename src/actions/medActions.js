import axios from "axios";
import { baseUrl } from "../App";
import { GET_DOCUMENTS_FAILURE, GET_DOCUMENTS_SUCCESS, GET_PATIENT_DETAILS_FAILURE, GET_PATIENT_DETAILS_SUCCESS } from "./types";

const token = sessionStorage.getItem("token") || "";
const headers = { Authorization: `Bearer ${token}` };

//getAll records action
export const getDocumentsAction = () => async (dispatch) => {
    try {
        const response = await axios.get(`${baseUrl}/admin/records`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({
            type: GET_DOCUMENTS_SUCCESS,
            payload: response?.data?.data,
        });
    } catch (error) {
        dispatch({
            type: GET_DOCUMENTS_FAILURE,
            payload: error,
        });
    }
};

//get a single record action
export const getPatientDetails = (id, token) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${baseUrl}/admin/getMedicalRecord/${id}`,
            {
                headers
            }
        );

        dispatch({
            type: GET_PATIENT_DETAILS_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: GET_PATIENT_DETAILS_FAILURE,
            payload: error,
        });
    }
};


