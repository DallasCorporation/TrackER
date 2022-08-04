import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    organization: JSON.parse(localStorage.getItem("allOrganization")),
    allBuildings: JSON.parse(localStorage.getItem("allBuildings"))
}

export const allOrganizationSlice = createSlice({
    name: 'allOrganization',
    initialState: initialState,
    reducers: {
        setAllOrganization: (state, action) => {
            state.organization = action.payload
            localStorage.setItem("allOrganization", JSON.stringify(action.payload))
        },
        setAllBuildings: (state, action) => {
            state.allBuildings = action.payload
            localStorage.setItem("allBuildings", JSON.stringify(action.payload))
        },
    },
})

export const { setAllOrganization, setAllBuildings } = allOrganizationSlice.actions

export default allOrganizationSlice.reducer