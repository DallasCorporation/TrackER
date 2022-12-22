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
    buildings: {
        fetchBuildings: (userId) =>
            axios.get(`${API_URL}/building/${userId}`)
                .then((res) => res.data),
        addBuilding: (body) =>
            axios.post(`${API_URL}/building/register`, body)
                .then((res) => res.data),
        updateBuilding: (buildingId, body) =>
            axios.put(`${API_URL}/building/${buildingId}`, body)
                .then((res) => res.data),
        updateBuildingResources: (buildingId, body) =>
            axios.put(`${API_URL}/building/resources/${buildingId}`, body)
                .then((res) => res.data),
        deleteBuilding: (userId) =>
            axios.delete(`${API_URL}/building/${userId}`)
                .then((res) => res.data),
        getBuilding: (id) =>
            axios.get(`${API_URL}/build/${id}`)
                .then((res) => res.data),
    },
    bills: {
        fetchBills: () =>
            axios.get(`${API_URL}/bills/buildings/62ed1f97d158cb42b69e5356`)
                .then((res) => res.data),
        addBills: ( body) =>
            axios.post(`${API_URL}/bills/62ed1f97d158cb42b69e5356`, body)
                .then((res) => res.data),
        getBills: () =>
            axios.get(`${API_URL}/bills`)
                .then((res) => res.data),
        getBillsAggregated: (userId) =>
            axios.get(`${API_URL}/bills/${userId}`)
                .then((res) => res.data),
        getBillsRenewable: () =>
            axios.get(`${API_URL}/bills/renewable/62ed1f97d158cb42b69e5356`)
                .then((res) => res.data),
    },
    renewable: {
        fetchResources: (id) =>
            axios.get(`${API_URL}/renewable/${id}`)
                .then((res) => res.data),
        fetchResourcesByBuildingId: (id) =>
            axios.get(`${API_URL}/renewable/building/${id}`)
                .then((res) => res.data),
        fetchAll: () =>
            axios.get(`${API_URL}/all/renewable`)
                .then((res) => res.data),
        updateResourcesBuildings: (renewableId, body) =>
            axios.put(`${API_URL}/renewable/buildings/${renewableId}`, body)
                .then((res) => res.data),
        deleteResources: (id) =>
            axios.delete(`${API_URL}/renewable/${id}`)
                .then((res) => res.data),
        createResources: (body) =>
            axios.post(`${API_URL}/renewable`, body)
                .then((res) => res.data),
    },
};
