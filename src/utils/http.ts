import axios from 'axios'
import { Item } from '../types'
const db = 'https://foodtracker-2bf66-default-rtdb.firebaseio.com'
const document = 'users'

export const requestAddItem = () => {
  /*
  axios.post(
    //'https://foodtracker-2bf66-default-rtdb.firebaseio.com/users.json',
    'https://foodtracker-2bf66-default-rtdb.firebaseio.com/users/-NKUMEKM4dGs1DgPfwQe/items.json',
    {
      //name: 'cadukeson@gmail.com',
      name: 'Chocolate chips',
      portions: 0,
      gramsPerPortion: 15,
      details: '15g',
      info: {
        protein: 1,
        fat: 7,
        carb: 7,
      }

    }
  )
  */
}


export const updateItem = (id: string, item: Item) => {
  //const url = `${db}/${document}/${user_id}/items/${id}/.json`
  //axios.patch(url, item)
}

export const fetchItems = async (userId: string) => {
  const url = `${db}/${document}/${userId}/items/.json`
  const response = await axios.get(url)
  return response
}