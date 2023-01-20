import { createSlice, current } from '@reduxjs/toolkit'
import React from 'react'

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
    showModalData: (state, action) => {
      state.visible = true
    },
    hideModal: (state) => {
      state.visible = false
    }
  }
})

export const {
  showModal,
  showModalData,
  hideModal,
} = store.actions
export default store.reducer