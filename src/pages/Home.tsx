import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Button, Snackbar } from 'react-native-paper';
import { LocaleContext } from '../utils/LocaleContext';
import { Item } from '../types'
import StatusHeader from '../components/StatusHeader'
import ItemComponent from '../components/ItemComponent';
import { fetchItems } from '../utils/http';
import { mapItemsFromRequest } from '../utils/Mappers'
import { updateItems } from '../store/items'
import ModalComponent from '../components/ModalComponent'
import ItemForm from '../components/ItemForm'
import { showModal } from '../store/modal';
import { showSnackbar, hideSnackbar } from '../store/snackbar';

type RootStackParamList = {
  Home: undefined
  Config: undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;


export default function Home({ navigation }: Props) {

  const [loaded, setLoaded] = useState<boolean>(false)
  const appData = React.useContext(LocaleContext);
  const dispatch = useDispatch()
  const items: Item[] = useSelector((state: any) => state.items.data)
  const modalVisible: boolean = useSelector((state: any) => state.modal.visible)
  const modalChildren: any = useSelector((state: any) => state.modal.children)
  const snackbarVisible: boolean = useSelector((state: any) => state.snackbar.visible)
  const snackbarText: string = useSelector((state: any) => state.snackbar.text)

  const addItemHandler = () => {
    dispatch(showModal())
  }
  useEffect(() => {
    const getItems = async () => {
      //Get items from DB
      try {
        const { data } = await fetchItems('-NKUMEKM4dGs1DgPfwQe')
        const fetchedItems: Item[] = mapItemsFromRequest(data)
        setLoaded(true)
        dispatch(updateItems(fetchedItems))
      } catch (e) {
        dispatch(showSnackbar(appData.errorFetchingItem))
        //Set items from default
        console.log(items)
        dispatch(updateItems(items))
        setLoaded(true)
      }

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
            <Button icon='plus-thick' mode='contained' onPress={addItemHandler}>
              {appData.addItem}
            </Button>
          </View>
        </ScrollView>
      }
      <ModalComponent visible={modalVisible}>
        <ItemForm/>
      </ModalComponent>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          dispatch(hideSnackbar())
        }}
        action={{
          label: appData.closeSnackbar,
          onPress: () => {
            dispatch(hideSnackbar())
          },
        }}>
        {snackbarText}
      </Snackbar>


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
    paddingBottom: 16,
  },
  items: {
    paddingBottom: 24,
  },
  addItemButton: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});
