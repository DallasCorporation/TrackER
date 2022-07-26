import { createSlice } from '@reduxjs/toolkit'


const initialState = {
     buildings: JSON.parse(localStorage.getItem("buildings")),
}


export const buildingsSlice = createSlice({
    name: 'buildings',
    initialState: initialState,
    reducers: {
        fetchBuildings: (state, action) => {
            state.buildings = action.payload
            localStorage.setItem("buildings", JSON.stringify(action.payload))
        },
    },
})

export const { fetchBuildings } = buildingsSlice.actions

export default buildingsSlice.reducer