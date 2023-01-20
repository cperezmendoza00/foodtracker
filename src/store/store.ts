import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items'
import modalReducer from './modal'
import snackbarReducer from './snackbar'

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        snackbar: snackbarReducer,
        items: itemsReducer
    }
})
