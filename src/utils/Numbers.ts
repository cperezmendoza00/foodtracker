import { Item } from "../types"

export const roundNumber = (value: number) => {
  return Number(value.toFixed(2))
}

export const getCalories = (item: Item) => {
  return ((item.info.protein * 4) + (item.info.fat * 4) + (item.info.carb * 4))
}