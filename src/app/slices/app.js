import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    userInfoAC: (state, action) => {
        state.userInfo = action.payload
    }
  },
})

export const { userInfoAC } = appSlice.actions

export default appSlice.reducer