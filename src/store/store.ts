import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items'
import modalReducer from './modal'
import snackbarReducer from './snackbar'
import userInfoReducer from './userInfo'

export const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
        modal: modalReducer,
        snackbar: snackbarReducer,
        items: itemsReducer
    }
})
