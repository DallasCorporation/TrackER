import { configureStore } from '@reduxjs/toolkit'
import { buildingsSlice } from './reducers/buildings'
import { preferenceSlice } from './reducers/preference'
import { userSlice } from './reducers/user'


export default configureStore({
  reducer: {
    user: userSlice.reducer,
    preference: preferenceSlice.reducer,
    buildings: buildingsSlice.reducer
  },
})