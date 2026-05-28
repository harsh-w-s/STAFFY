import axios from "axios"

const API_BASE_URL = "http://localhost:8080";

export const getAssignedTasks =
    async (page = 0) => {

        const token =
            localStorage.getItem("token")

        const response =
            await axios.get(
                `${API_BASE_URL}/tasks?page=${page}&size=5`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

        return response.data
}

export const getMyTasks =
    async (page = 0) => {

        const token =
            localStorage.getItem("token")

        const response =
            await axios.get(
                `${API_BASE_URL}/tasks/my-tasks?page=${page}&size=5`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

        return response.data
}

export const createTask =
    async (taskData) => {

        const token =
            localStorage.getItem("token")

        const response =
            await axios.post(
                `${API_BASE_URL}/tasks`,
                taskData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            )

        return response.data
}

export const updateTaskStatus =
    async (taskId, status) => {
        const token = localStorage.getItem("token")

        const response = await axios.patch(
            `${API_BASE_URL}/tasks/${taskId}/status`,
            { status },
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        )

        return response.data;
}

export const getTaskById =
    async (taskId) => {
        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${API_BASE_URL}/tasks/${taskId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        return response.data;
    }
