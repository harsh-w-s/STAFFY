import axios from "axios";

const API_BASE_URL = "http://localhost:8080"

export const login = async (username, password) => {

    const response = await axios.post(
        `${API_BASE_URL}/users/login`,
        {
            username,
            password
        }
    )

    return response.data;
}

export const getCurrentUser = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_BASE_URL}/users/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}

export const getAllUsers = async () => {

    const token = localStorage.getItem("token")

    const response = await axios.get(
        `${API_BASE_URL}/users`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data
}