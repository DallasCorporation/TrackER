import { configureStore } from '@reduxjs/toolkit'
import { allOrganizationSlice } from './reducers/allOrganization'
import { buildingsSlice } from './reducers/buildings'
import { organizationSlice } from './reducers/organization'
import { preferenceSlice } from './reducers/preference'
import { userSlice } from './reducers/user'


export default configureStore({
  reducer: {
    user: userSlice.reducer,
    preference: preferenceSlice.reducer,
    buildings: buildingsSlice.reducer,
    organization: organizationSlice.reducer,
    allOrganization: allOrganizationSlice.reducer
  },
})