export interface updateMacrosProps {
    name: 'weight' | 'calories' | 'protein' | 'fat',
    value: string
}

export interface Items {
    data: Item[]
}

export interface Details {
    protein: number
    fat: number
    carb: number
}

export interface Item {
    id: string
    order: number
    name: string
    details: string
    portions: number
    gramsPerPortion: number
    info: Details
}

export interface IncrementPortion {
    id: string,
    operation: 'add' | 'remove' | 'change'
    value: number
}

export interface ChangePortion {
    id: string,
    value: number
}
