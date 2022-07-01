import axios from "axios";

const API_URL = "http://localhost:3000";

export default {
    user: {
        login: (credentials) =>
            axios
                .post(`${API_URL}/user/login`, { ...credentials })
                .then((res) => res.data),
        signup: (user) =>
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
            axios.put(`${API_URL}/user/users/${id}`, data),
    },
    buildings: {},
};
