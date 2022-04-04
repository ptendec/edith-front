import {createSlice} from "@reduxjs/toolkit"

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAuth: false,
    admin: {},
  },
  reducers: {
    setAdmin: (state, action) => {
      state.isAuth = true
      state.admin = action.payload
    },
    removeAdmin: (state, action) => {
      state.isAuth = false
      state.admin = {}
    },
  }
})

export const {setAdmin, removeAdmin} = adminSlice.actions
export default adminSlice.reducer

