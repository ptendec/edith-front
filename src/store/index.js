import {configureStore} from "@reduxjs/toolkit"
import adminReducer from './admin/reducer'

export const store = configureStore({
    reducer: {
        admin: adminReducer,
    }
})

