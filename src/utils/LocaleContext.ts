import React from 'react'

export const lang = {
  en: {
    value: 'English',
    save: 'Save',
    cancel: 'Cancel',
    addItem: 'Add Food',
    config: {
      basicInfo: 'Set the values below to start',
      weight: 'Your weigt in kg',
      calories: 'Calories',
      adjustMacros: 'Adjust diet',
      macros: 'Macronutrients',
      gramsOfProtein: 'Grams of protein per kg',
      fatPercentage: 'Percentage of fat from calories',
      protein: 'Protein',
      fat: 'Fat',
      carb: 'Carbohydrate',
      gram: 'Grams',
      fatI: 'F',
      carbI: 'C',
      gramI: 'G',
      proteinI: 'P',
      caloriesI: 'K',
    },
    addItemForm: {
      title: 'Adding Item',
      name: 'Name',
      gramsPerPortion: 'Grams per portion',
      description: 'Description',
    },
    closeSnackbar: 'close',
    errorFetchingItem: 'There was a problem fetching the items',
    errorFetchingUserInfo: 'There was a problem fetching user',
    errorAddingItem: 'There was a problem adding the item, try again',
  },
  es: {
    value: 'Español',
    save: 'Guardar',
    cancel: 'Cancelar',
    addItem: 'Agregar Alimento',
    config: {
      basicInfo: 'Ingrese los siguientes valores para comenzar',
      weight: 'Tu peso en kg',
      calories: 'Calorias',
      adjustMacros: 'Ajustar macronutrientes',
      macros: 'Macronutrientes',
      gramsOfProtein: 'Gramos de proteina por kilo',
      fatPercentage: 'Porcentaje de grasa de las calories',
      protein: 'Proteína',
      fat: 'Grasa',
      carb: 'Carbohidrato',
      gram: 'Gramos',
      fatI: 'G',
      carbI: 'C',
      gramI: 'G',
      proteinI: 'P',
      caloriesI: 'K',
    },
    addItemForm: {
      title: 'Agregando alimento',
      name: 'Nombre',
      gramsPerPortion: 'Gramos por porción',
      description: 'Descripción',
    },
    closeSnackbar: 'Cerrar',
    errorFetchingItem: 'No se pudo cargar los alimentos',
    errorFetchingUserInfo: 'No se pudo cargar el usuario',
    errorAddingItem: 'No se pudo guardar alimento, intente de nuevo',
  },
};
export const LocaleContext = React.createContext(
  lang.en
);


export const LocaleProvider = LocaleContext.Provider;
export const LocaleConsumer = LocaleContext.Consumer;