import { createSlice } from '@reduxjs/toolkit'
import api from '../api'

const initialState = {
    user: JSON.parse(localStorage.getItem("user")),
    logged: localStorage.getItem("logged") === "true"
}


export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.logged = true
            localStorage.setItem("logged", true)
            localStorage.setItem("user", JSON.stringify(action.payload))
            api.preference.fetchPreference(action.payload._id).then((res) => {
                if (res.activityLog)
                    api.activity.updateActivity(action.payload._id)
            })
        },
        logout: (state) => {
            state.user = initialState.user
            state.logged = false
            localStorage.setItem("logged", false)
            localStorage.setItem("user", JSON.stringify(initialState.user))

        },
        updateUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user", JSON.stringify(action.payload))
        },
    },
})

export const { login, logout, updateUser } = userSlice.actions

export default userSlice.reducer