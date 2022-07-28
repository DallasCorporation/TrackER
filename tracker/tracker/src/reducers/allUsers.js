import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem("allUser")),
}

export const allUserSlice = createSlice({
    name: 'allUser',
    initialState: initialState,
    reducers: {
        setAllUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("allUser", JSON.stringify(action.payload))
        },
    },
})

export const { setAllUser } = allUserSlice.actions

export default allUserSlice.reducer