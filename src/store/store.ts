import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items'

export const store = configureStore({
    reducer: {
        items: itemsReducer
    }
})
