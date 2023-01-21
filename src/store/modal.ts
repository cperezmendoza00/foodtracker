import { createSlice, current } from '@reduxjs/toolkit'
interface initialState {
  visible: boolean
}

const initialState: initialState = {
  visible: false,
}

const store = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state) => {
      state.visible = true
    },
    hideModal: (state) => {
      state.visible = false
    }
  }
})

export const {
  showModal,
  hideModal,
} = store.actions
export default store.reducer