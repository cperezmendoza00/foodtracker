import { createSlice, current } from '@reduxjs/toolkit'
import { Items } from '../types'

interface initialState extends Items { }

const initialState: initialState = {
  /*data: [
    {
      id: '-NKUNezwHVZHRlrPdTwR',
      order: 1,
      name: 'Friuts',
      portions: 0,
      gramsPerPortion: 100,
      details: 'Apple, Pear, Melon',
      info: {
        protein: 0.8,
        fat: 0.2,
        carb: 14.8,
      }
    }, {
      id: '-NKUNyDxit3C7-F2jWVF',
      order: 2,
      name: 'Banana',
      portions: 0,
      gramsPerPortion: 100,
      details: '100g',
      info: {
        protein: 1,
        fat: 0.3,
        carb: 22.8,
      }
    }, {
      id: '-NKUO2cPPWrWC6T6dR0_',
      order: 3,
      name: 'Oat',
      portions: 0,
      gramsPerPortion: 100,
      details: '100g',
      info: {
        protein: 14,
        fat: 7.5,
        carb: 66.6,
      }
    }, {
      id: '-NKUOT4G3dq-U03H7y50',
      order: 4,
      name: 'Chocolate chips',
      portions: 0,
      gramsPerPortion: 15,
      details: '15g',
      info: {
        protein: 1,
        fat: 7,
        carb: 7,
      }
    },
  ],*/
  data: []
}


const store = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.data.push(action.payload)
    },
    updateItems: (state, action) => {
      state.data = action.payload
    },
    updatePortion: (state, action) => {
      state.data.map(item => {
        if (item.id === action.payload.id) {
          item.portions = action.payload.value
        }
        return item
      })
    },
  }
})

export const {
  updatePortion,
  updateItems,
  addItem
} = store.actions
export default store.reducer