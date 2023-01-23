import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './items'
import itemModalReducer from './itemModal'
import snackbarReducer from './snackbar'
import userInfoReducer from './userInfo'

export const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
        itemModal: itemModalReducer,
        snackbar: snackbarReducer,
        items: itemsReducer
    }
})
