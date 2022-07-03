import { configureStore } from '@reduxjs/toolkit'
import { preferenceSlice } from './reducers/preference'
import { userSlice } from './reducers/user'


export default configureStore({
  reducer: {
    user: userSlice.reducer,
    preference: preferenceSlice.reducer
  },
})