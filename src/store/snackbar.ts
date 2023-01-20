import { createSlice, current } from '@reduxjs/toolkit'

interface initialState {
  visible: boolean
  text: string
}

const initialState: initialState = {
  visible: false,
  text: '',
}

const store = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (state, action) => {
      state.visible = true
      state.text = action.payload
    },
    hideSnackbar: (state) => {
      state.visible = false
    }
  }
})

export const {
  showSnackbar,
  hideSnackbar,
} = store.actions
export default store.reducer