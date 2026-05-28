import axios from "axios"

const API_BASE_URL = "http://localhost:8080";

export const getEmployees = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_BASE_URL}/users/employees`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data;
}