import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    organization: JSON.parse(localStorage.getItem("organization")),
}

export const organizationSlice = createSlice({
    name: 'organization',
    initialState: initialState,
    reducers: {
        fetchOrganization: (state, action) => {
            state.organization = action.payload
            localStorage.setItem("organization", JSON.stringify(action.payload))
        },
    },
})

export const { fetchOrganization } = organizationSlice.actions

export default organizationSlice.reducer