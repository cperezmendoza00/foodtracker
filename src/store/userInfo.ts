import { createSlice, current } from '@reduxjs/toolkit'
import { UserInfo } from '../types'

interface initialState extends UserInfo { }

const initialState: initialState = {
  weight: 0,
  calories: 0,
  gramsOfProtein: 0,
  fatPercentage: 0,
  protein: 0,
  fat: 0,
  carb: 0,
}

const store = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateUserInfo: (state, action) => {
      state.weight = action.payload.weight
      state.calories = action.payload.calories
      state.fatPercentage = action.payload.fatPercentage
      state.gramsOfProtein = action.payload.gramsOfProtein
      state.protein = action.payload.protein
      state.fat = action.payload.fat
      state.carb = action.payload.carb
    },
  }
})

export const {
  updateUserInfo,
} = store.actions
export default store.reducer