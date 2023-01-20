import React, { useState, useContext } from 'react'
import { StyleSheet, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux'
import { Text, IconButton, TouchableRipple } from 'react-native-paper';
import { Item, IncrementPortion, ChangePortion } from '../types';
import { globalStyles } from '../ui/globalStyles'
import { LocaleContext } from '../utils/LocaleContext';
import { incrementPortion, changePortion } from '../store/items';
import { getCalories, roundNumber } from '../utils/Numbers'
import { patchItem } from '../utils/http';
import { showModalData } from '../store/modal';

interface Props {
  item: Item
}

export default function ItemComponent({ item }: Props) {
  const appData = useContext(LocaleContext);
  const [portion, setPortion] = useState(item.portions.toString());
  const dispatch = useDispatch()

  //Called when clicking on ▲ or ▼
  const handlerIncrementPortion = (operation: IncrementPortion['operation']) => {
    let value: number = 0
    if (operation === 'add') {
      value = roundNumber(item.portions + 1)
      setPortion((value).toString())
    }
    if (operation === 'remove') {
      if (item.portions - 1 <= 0) {
        setPortion('0')
      } else {
        value = roundNumber(item.portions - 1)
        setPortion((value).toString())
      }
    }

    patchItem('-NKUMEKM4dGs1DgPfwQe', item).then(({ data }) => {
      const payload: IncrementPortion = {
        id: item.id,
        operation,
        value,
      }
      dispatch(incrementPortion(payload))
    })


  }

  //Called onBlur or when changing the value of the portions
  const handlerChangePortion = (text: string) => {
    setPortion(text.trim())
    if (text !== '' && Number(text) >= 0) {
      const changePortionPayload: ChangePortion = {
        id: item.id,
        value: Number(text)
      }
      dispatch(changePortion(changePortionPayload))
    }
  }

  const handlerOnBlur = () => {
    let value: number = roundNumber(Number(portion))
    //If it's NaN
    if (!(Number(portion) >= 0)) {
      handlerChangePortion(item.portions.toString())
    } else {
      setPortion(value.toString())
    }
    if (value.toString() === '') {
      handlerChangePortion('0')
    }

  }


  return (
    <View style={styles.item}>
      <View style={[globalStyles.row]} >

        <TouchableRipple
          style={styles.itemDetails}
          onPress={() => { console.log('pressed') }}
          onLongPress={() => { console.log('longPressed', item); dispatch(showModalData(item)) }}
          rippleColor="rgba(0, 0, 0, .32)"
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
                <View><Text variant='bodySmall'>{getCalories(item).toString()}</Text></View>
              </View>
            </View>
          </View>
        </TouchableRipple>

        <View style={[styles.columnDetails]}>
          <IconButton style={styles.iconButton} icon='plus' onPress={() => { }} />
        </View>
        <View style={[styles.columnDetails]}>
          <TextInput
            style={[styles.portion, ...!(Number(portion) >= 0) ? [styles.portionError] : []]}
            value={portion}
            onChangeText={text => handlerChangePortion(text)}
            onBlur={() => handlerOnBlur()}
            keyboardType={'numeric'}
            autoComplete='off'
          />

        </View>
        <View style={[styles.columnDetails]}>
          <IconButton style={styles.iconButton} icon='menu-down' onPress={() => {
            handlerIncrementPortion('remove')
          }} />
        </View>
        <View style={[styles.columnDetails]}>
          <IconButton style={styles.iconButton} icon='menu-up' onPress={() => {
            handlerIncrementPortion('add')
          }} />
        </View>

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    borderBottomWidth: 1,
    //minHeight: 118,
    //paddingBottom: 16,
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
