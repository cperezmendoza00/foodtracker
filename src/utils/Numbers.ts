import { Item } from "../types"

export const roundNumber = (value: number) => {
  return Number(value.toFixed(2))
}

export const getCaloriesFromItem = (item: Item) => {
  return getCalories(item.info.protein, item.info.fat, item.info.carb)

}

export const getCalories = (protein: number, fat: number, carb: number) => {
  return roundNumber((protein * 4) + (fat * 9) + (carb * 4))
}