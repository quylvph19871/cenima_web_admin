import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from './slides/couterslide'

export const store = configureStore({
    reducer: {
        counter: counterReducer
    },
})