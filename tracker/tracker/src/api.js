import axios from "axios";

const API_URL = "http://172.20.10.6:3000/api";
// const API_URL = "http://localhost:3000/api";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    buildings: {
        fetchBuildings: (userId) =>
            axios.get(`${API_URL}/building/${userId}`)
                .then((res) => res.data),
        updateBuilding: (buildingId, body) =>
            axios.put(`${API_URL}/building/${buildingId}`, body)
                .then((res) => res.data),
    },
    bills: {
        fetchBills: () =>
            axios.get(`${API_URL}/bills/buildings/62ed1f97d158cb42b69e5356`)
                .then((res) => res.data),
        getBillsAggregated: (userId) =>
            axios.get(`${API_URL}/bills/${userId}`)
                .then((res) => res.data),
    },
    renewable: {
        fetchResourcesByBuildingId: (id) =>
            axios.get(`${API_URL}/renewable/building/${id}`)
                .then((res) => res.data),
        fetchAll: () =>
            axios.get(`${API_URL}/all/renewable`)
                .then((res) => res.data),
    },
    organization: {
        fetchCost: (q = '') =>
            axios.get(`${API_URL}/organization/${q}`)
                .then((res) => res.data),
    },
    temperature: {
        get: () =>
            axios.get(`${API_URL}/temperature/`)
                .then((res) => res.data),
    },
    quake: {
        get: () =>
            axios.get(`${API_URL}/quake/`)
                .then((res) => res.data),
    }
};
