import axios from 'axios'
import { Item, UserInfo } from '../types'
const db = 'https://foodtracker-2bf66-default-rtdb.firebaseio.com'
const document = 'users'

export const postItem = async (userId: string, item: Omit<Item, 'id'>) => {
  const url = `${db}/${document}/${userId}/items/.json`
  const response = await axios.post(url, item)
  return response
}


export const patchItem = async (userId: string, item: Item) => {
  const url = `${db}/${document}/${userId}/items/${item.id}/.json`
  const response = await axios.post(url, item)
  return response
}

export const fetchItems = async (userId: string) => {
  const url = `${db}/${document}/${userId}/items/.json`
  const response = await axios.get(url)
  return response
}

export const fethUser = async (userId: string) => {
  const url = `${db}/${document}/${userId}/.json`
  const response = await axios.get(url)
  return response
}

export const patchUserInfo = async (userId: string, userInfo: UserInfo) => {
  const url = `${db}/${document}/${userId}/info/.json`
  const response = await axios.patch(url, userInfo)
  return response
}