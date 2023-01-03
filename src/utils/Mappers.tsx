import { Item } from "../types"

//This function gets from firebase an array of Items without ID
export const mapItemsFromRequest = (data: Omit<Item, 'id'>[]) => {
    let mappedItems: Item[] = []
    for (const index in data) {
        const fetchedItem: Item = {
            ...data[index],
            id: index
        }
        mappedItems.push(fetchedItem)
    }
    return mappedItems
}



