import { configureStore } from '@reduxjs/toolkit'
import useReducer from './user/userSlic.js'

export const store = configureStore({
  reducer: {
    user: useReducer
},
})