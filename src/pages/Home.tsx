import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button } from 'react-native-paper';
import { LocaleContext } from '../utils/LocaleContext';
import { Item } from '../types'
import StatusHeader from '../components/StatusHeader'
import ItemComponent from '../components/ItemComponent';
import { fetchItems } from '../utils/http';
import { mapItemsFromRequest } from '../utils/Mappers'
import { updateItems } from '../store/items'
import ModalComponent from '../components/ModalComponent'

type RootStackParamList = {
  Home: undefined
  Config: undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


export default function Home({ navigation }: Props) {

  //const [items, setItems] = useState<Item[]>([])
  const [loaded, setLoaded] = useState<boolean>(false)
  const appData = React.useContext(LocaleContext);
  const dispatch = useDispatch()
  const items: Item[] = useSelector((state: any) => state.items.data)
  useEffect(() => {
    const getItems = async () => {
      //Get items from DB
      fetchItems('-NKUMEKM4dGs1DgPfwQe').then(({ data }) => {
        const fetchItems: Item[] = mapItemsFromRequest(data)
        //setItems(fetchItems)
        setLoaded(true)
        dispatch(updateItems(fetchItems))
      }).catch(e => {
        //Set items from default
        //setItems(items)
        dispatch(updateItems(items))
        setLoaded(true)
      })
    }
    getItems()
  }, [])


  return (
    <View style={styles.container}>
      {loaded &&
        <View style={styles.header}>
          <StatusHeader />
        </View>
      }

      {loaded &&
        <ScrollView>
          <View style={styles.items}>
            {items.map((item: Item, index: number) =>
              <ItemComponent key={`item_${index}`} item={item} />
            )}

          </View>
          <View style={styles.addItemButton}>
            <Button icon='plus-thick' mode='contained' onPress={() => {
              console.log('modal')
              //requestAddItem()
            }}>
              {appData.addItem}
            </Button>
          </View>
        </ScrollView>
      }
   
    </View >

  )
}

const styles = StyleSheet.create({
  header: {
    minHeight: 118,
    height: 118,
    backgroundColor: 'rgb(249, 249, 249)',

    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 0.3,
    elevation: 4,
    shadowRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  items: {
    paddingBottom: 24,
  },
  addItemButton: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});
