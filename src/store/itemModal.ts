import { createSlice, current } from '@reduxjs/toolkit'
import { Item } from '../types'
interface initialState {
  visible: boolean
  item: Item | undefined
}

const initialState: initialState = {
  visible: false,
  item: undefined
}

const store = createSlice({
  name: 'itemModal',
  initialState,
  reducers: {
    showNewItemModal: (state) => {
      state.visible = true
    },
    showItemModal: (state, action) => {
      state.visible = true
      if (action.payload) {
        state.item = action.payload
      }
    },
    hideItemModal: (state) => {
      state.visible = false
      state.item = undefined
    }
  }
})

export const {
  showItemModal,
  showNewItemModal,
  hideItemModal,
} = store.actions
export default store.reducer