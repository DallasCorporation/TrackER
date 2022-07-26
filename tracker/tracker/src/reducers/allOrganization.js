import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    organization: JSON.parse(localStorage.getItem("allOrganization")),
}

export const allOrganizationSlice = createSlice({
    name: 'allOrganization',
    initialState: initialState,
    reducers: {
        setAllOrganization: (state, action) => {
            state.organization = action.payload
            localStorage.setItem("allOrganization", JSON.stringify(action.payload))
        },
    },
})

export const { setAllOrganization } = allOrganizationSlice.actions

export default allOrganizationSlice.reducer