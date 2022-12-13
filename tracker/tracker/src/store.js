import { configureStore } from '@reduxjs/toolkit'
import { buildingsSlice } from './reducers/buildings'
import { userSlice } from './reducers/user'


export default configureStore({
  reducer: {
    user: userSlice.reducer,
    buildings: buildingsSlice.reducer,
  },
})