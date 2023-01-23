import React, { useState, useContext } from 'react'
import { StyleSheet, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux'
import { Text, IconButton, TouchableRipple } from 'react-native-paper';
import { Item, IncrementPortion, ChangePortion } from '../types';
import { globalStyles } from '../ui/globalStyles'
import { LocaleContext } from '../utils/LocaleContext';
import { updatePortion } from '../store/items';
import { getCaloriesFromItem, roundNumber } from '../utils/Numbers'
import { putItemPortion } from '../utils/http';
import { showItemModal } from '../store/itemModal';
import { showSnackbar } from '../store/snackbar';
interface Props {
  item: Item
}

export default function ItemComponent({ item }: Props) {
  const [loading, setLoading] = useState<boolean>(false)
  const appData = useContext(LocaleContext);
  const [portions, setPortions] = useState(item.portions.toString());
  const [portionsInitialValue, setPortionsInitialValue] = useState(item.portions);
  const dispatch = useDispatch()

  //Called when clicking on ▲ or ▼
  const handlerIncrementPortion = async (operation: IncrementPortion['operation']) => {
    if (!loading) {
      let newValue: number = 0
      if (operation === 'add') {
        newValue = roundNumber(item.portions + 1)
        setPortions((newValue).toString())
      }
      if (operation === 'remove') {
        if (item.portions - 1 <= 0) {
          newValue = roundNumber(0)
          setPortions('0')
        } else {
          newValue = roundNumber(item.portions - 1)
          setPortions((newValue).toString())
        }
      }

      if (newValue !== portionsInitialValue) {
        const payload: IncrementPortion = {
          id: item.id,
          operation,
          value: newValue,
        }
        try {
          setLoading(true)
          await putItemPortion('-NKUMEKM4dGs1DgPfwQe', { ...item, portions: newValue })
          setPortionsInitialValue(newValue)
          //SLEEP
          //await new Promise(r => setTimeout(r, 2000));
        } catch (e) {
          dispatch(showSnackbar(appData.errorPatchingPortion))
          dispatch(updatePortion({ ...payload, value: portionsInitialValue }))
          setPortions(portionsInitialValue.toString())
        }
        dispatch(updatePortion(payload))
        setLoading(false)
      }








    }
  }

  //Called when typing new values (portions) on the keyboard
  const handlerChangePortion = async (text: string) => {
    const valueTrimmed = text.trim()
    if (Number(valueTrimmed) >= 0 || valueTrimmed === '') {
      setPortions(valueTrimmed)
      if (text !== '' && Number(text) >= 0) {
        //UPDADTE REDUX STATE Everytime there is a change
        const changePortionPayload: ChangePortion = {
          id: item.id,
          value: Number(text)
        }
        dispatch(updatePortion(changePortionPayload))

      }
    }
  }

  const handlerOnBlur = async () => {
    if (!loading) {
      let roundedPortions: number = roundNumber(Number(portions))
      if (roundedPortions !== portionsInitialValue) {
        try {
          setLoading(true)
          //Round value when blur
          if ((Number(portions) >= 0)) {
            setPortions(roundedPortions.toString())
          }
          //SLEEP
          //await new Promise(r => setTimeout(r, 3000));
          //throw new Error('errror')
          await putItemPortion('-NKUMEKM4dGs1DgPfwQe', { ...item, portions: roundedPortions })
          setPortionsInitialValue(roundedPortions)
          setLoading(false)
        } catch (e) {
          setLoading(false)
          dispatch(showSnackbar(appData.errorPatchingPortion))
          //UPDADTE REDUX STATE with original value
          const changePortionPayload: ChangePortion = {
            id: item.id,
            value: portionsInitialValue
          }
          dispatch(updatePortion(changePortionPayload))
          //Set value of portion with the orignal value
          setPortions(portionsInitialValue.toString())
        }
      }
    }
  }


  return (
    <View style={styles.item}>
      <View style={[globalStyles.row]} >
        <TouchableRipple
          style={styles.itemDetails}
          onPress={() => { }}
          onLongPress={() => { dispatch(showItemModal(item)) }}
          //rippleColor="rgba(0, 0, 0, .32)"
        >
          <View>
            <View>
              <View style={styles.itemName}><Text variant='titleSmall'>{item.name}</Text></View>
              <View style={styles.itemDescription}><Text variant='bodySmall'>{item.details}</Text></View>
            </View>

            <View style={[styles.macroDetail, globalStyles.row]}>
              <View style={[styles.macroDetails]}>
                <View><Text variant='labelSmall'>{appData.config.proteinI}</Text></View>
                <View><Text variant='bodySmall'>{item.info.protein.toString()}</Text></View>
              </View>

              <View style={[styles.macroDetails]}>
                <View><Text variant='labelSmall'>{appData.config.fatI}</Text></View>
                <View><Text variant='bodySmall'>{item.info.fat.toString()}</Text></View>
              </View>

              <View style={[styles.macroDetails]}>
                <View><Text variant='labelSmall'>{appData.config.carbI}</Text></View>
                <View><Text variant='bodySmall'>{item.info.carb.toString()}</Text></View>
              </View>

              <View style={[styles.macroDetails]}>
                <View><Text variant='labelSmall'>{appData.config.caloriesI}</Text></View>
                <View><Text variant='bodySmall'>{getCaloriesFromItem(item).toString()}</Text></View>
              </View>
            </View>
          </View>
        </TouchableRipple>

        <View style={[styles.columnDetails]}>
          <IconButton style={styles.iconButton} icon='plus' onPress={() => { }} />
        </View>
        <View style={[styles.columnDetails]}>
          <TextInput
            style={[
              styles.portion,
              ...!(Number(portions) >= 0) ? [styles.portionError] : [],
              ...(loading) ? [styles.loading] : []
            ]}
            value={portions}
            editable={!loading}
            onChangeText={text => handlerChangePortion(text)}
            onBlur={() => handlerOnBlur()}
            keyboardType={'numeric'}
            autoComplete='off'
          />

        </View>
        <View style={[styles.columnDetails]}>
          <IconButton disabled={loading} style={styles.iconButton} icon='menu-down' onPress={() => {
            handlerIncrementPortion('remove')
          }} />
        </View>
        <View style={[styles.columnDetails]}>
          <IconButton disabled={loading} style={styles.iconButton} icon='menu-up' onPress={() => {
            handlerIncrementPortion('add')
          }} />
        </View>

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  loading: {

    backgroundColor: 'gray',

  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    borderBottomWidth: 1
  },
  headerStatus: {
    //flex: 7 / 10,
    flex: 1,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 20

  },
  macroStatus: {
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'rgb(255, 219, 219)',
    marginBottom: 4,
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  current: {
    flex: 2 / 10,
    alignItems: 'flex-start',
  },
  title: {
    flex: 6 / 10,
    alignItems: 'center',
  },
  goal: {
    flex: 2 / 10,
    alignItems: 'flex-end',
  },
  headerFilter: {
    //flex: 3 / 10,
    display: 'none'
  },
  items: {
    paddingBottom: 24,
  },
  item: {
    borderBottomWidth: 1,
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  itemDetails: {
    flex: 0.5
  },
  itemName: {
    //paddingBottom: 0,
  },
  itemDescription: {
    paddingBottom: 8,
  },
  columnDetails: {
    flex: 1 / 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: '100%',
    height: '100%',
  },
  macroDetail: {
    marginLeft: -4,
    marginRight: -4,
  },
  macroDetails: {
    borderRadius: 4,
    backgroundColor: 'rgb(249, 249, 249)',
    flex: 1 / 4,
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
    paddingTop: 4,
    paddingBottom: 4,

    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 4,
    shadowRadius: 4,

  },
  portion: {
    flexDirection: 'column',
    borderRadius: 4,
    backgroundColor: '#FFF',
    borderWidth: 1,
    flex: 1,
    width: '100%',
    textAlign: 'center',
  },


  portionError: {
    color: 'red',
  }
});
