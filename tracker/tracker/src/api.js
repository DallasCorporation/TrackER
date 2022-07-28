import axios from "axios";

const API_URL = "http://localhost:3000/api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    user: {
        login: (credentials) =>
            axios
                .post(`${API_URL}/user/login`, { ...credentials })
                .then((res) => res.data),
        signUp: (user) =>
            axios
                .post(`${API_URL}/user/register`, { ...user })
                .then((res) => res.data),
        confirm: (token) => axios.post(`${API_URL}/user/confirmation`, { token })
            .then((res) => res),
        resetPasswordRequest: (email) =>
            axios.post(`${API_URL}/user/auth/reset_password_request`, {
                email,
            }),
        validateToken: (token) =>
            axios.post(`${API_URL}/user/auth/validate_token`, { token }),
        resetPassword: (data) =>
            axios.post(`${API_URL}/user/auth/reset_password`, data),
        get: (id) =>
            axios.get(`${API_URL}/user/${id}`)
                .then((res) => res.data),
        update: (id, data) =>
            axios.put(`${API_URL}/user/${id}`, data),
        updatePassword: (id, data) =>
            axios.put(`${API_URL}/user/password/${id}`, data),
        delete: (id) => {
            axios.delete(`${API_URL}/user/${id}`).then(res => res.data)
        },
        fetchAll: () =>
            axios.get(`${API_URL}/user/all`)
                .then((res) => res.data),
    },
    activity: {
        fetchActivity: (userId) =>
            axios.get(`${API_URL}/activity/${userId}`)
                .then((res) => res.data),
        updateActivity: (userId) =>
            axios.post(`${API_URL}/activity`, { userId: userId })
                .then((res) => res.data),
    },
    preference: {
        fetchPreference: (userId) =>
            axios.get(`${API_URL}/preference/${userId}`)
                .then((res) => res.data),
        updatePreference: (userId, body) =>
            axios.put(`${API_URL}/preference/${userId}`, body)
                .then((res) => res.data),
        createPreference: (userId) =>
            axios.post(`${API_URL}/preference/${userId}`)
                .then((res) => res.data),
    },
    buildings: {
        fetchBuildings: (userId) =>
            axios.get(`${API_URL}/building/${userId}`)
                .then((res) => res.data),
        addBuilding: (body) =>
            axios.post(`${API_URL}/building/register`, body)
                .then((res) => res.data),
        deleteBuilding: (userId) =>
            axios.delete(`${API_URL}/building/${userId}`)
                .then((res) => res.data),
        getBuilding: (id) =>
            axios.get(`${API_URL}/build/${id}`)
                .then((res) => res.data[0]),
    },
    organization: {
        create: (body) =>
            axios.post(`${API_URL}/organization`, body)
                .then((res) => res.data),
        getByUserId: (userId) =>
            axios.get(`${API_URL}/organization/${userId}`)
                .then((res) => res.data),
        update: (id, body) =>
            axios.put(`${API_URL}/organization/${id}`, body)
                .then((res) => res.data),
        fetch: () =>
            axios.get(`${API_URL}/organization/all`)
                .then((res) => res.data)
    },
    bills: {
        fetchBills: (buildingId) =>
            axios.get(`${API_URL}/bills/${buildingId}`)
                .then((res) => res.data),
        addBills: (buildingId, body) =>
            axios.post(`${API_URL}/bills/${buildingId}`, body)
                .then((res) => res.data),
        getBills: () =>
            axios.get(`${API_URL}/bills`)
                .then((res) => res.data),
    },
};
