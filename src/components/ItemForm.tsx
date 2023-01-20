import React, { useState, ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Card, TextInput, Button, ActivityIndicator, MD2Colors } from 'react-native-paper'
import { globalStyles } from '../ui/globalStyles'
import { LocaleContext } from '../utils/LocaleContext';
import { Item } from '../types'
import { postItem } from '../utils/http'
import { addItem } from '../store/items'
import { hideModal } from '../store/modal'
import { validateFields } from '../utils/Fields'
import { showSnackbar } from '../store/snackbar';


export default function NewItemForm() {

  const items = useSelector((state: any) => state.items.data)
  const [name, setName] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [gramsPerPortion, setGramsPerPortion] = useState<string>('');
  const [protein, setProtein] = useState<string>('');
  const [fat, setFat] = useState<string>('');
  const [carb, setCarb] = useState<string>('');
  const appData = React.useContext(LocaleContext);
  const dispatch = useDispatch()

  const [nameError, setNameError] = useState<boolean>(false);
  const [descriptionError, setDetailsError] = useState<boolean>(false);
  const [gramsPerPortionError, setGramsPerPortionError] = useState<boolean>(false);
  const [proteinError, setProteinError] = useState<boolean>(false);
  const [fatError, setFatError] = useState<boolean>(false);
  const [carbError, setCarbError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);





  const onSaveHandler = async () => {

    const errorFromFields: boolean = validateFields([
      {
        value: name,
        type: 'text',
        required: true,
        errorSetter: setNameError,
        fieldSetter: setName,
        
      }, {
        value: details,
        type: 'text',
        required: false,
        errorSetter: setDetailsError,
        fieldSetter: setDetails
      }, {
        value: gramsPerPortion,
        type: 'numeric',
        required: true,
        errorSetter: setGramsPerPortionError,
        fieldSetter: setGramsPerPortion
      }, {
        value: protein,
        type: 'numeric',
        required: true,
        errorSetter: setProteinError,
        fieldSetter: setProtein
      }, {
        value: fat,
        type: 'numeric',
        required: true,
        errorSetter: setFatError,
        fieldSetter: setFat
      }, {
        value: carb,
        type: 'numeric',
        required: true,
        errorSetter: setCarbError,
        fieldSetter: setCarb
      }
    ])

    if (!errorFromFields) {
      setLoading(true)
      const item: Omit<Item, 'id'> = {
        order: items.length + 1,
        name,
        details,
        portions: 0,
        gramsPerPortion: Number(gramsPerPortion),
        info: {
          protein: Number(protein),
          fat: Number(fat),
          carb: Number(carb),
        }
      }
      try {
        const { data } = await postItem('-NKUMEKM4dGs1DgPfwQe', item)
        dispatch(addItem({
          ...item,
          id: data.name,
        }))
        dispatch(hideModal())
      } catch (e) {
        dispatch(showSnackbar(appData.errorAddingItem))
        setLoading(false)
      }



    }




  }

  const onCancelHandler = () => {
    dispatch(hideModal())
  }

  return (
    <View style={globalStyles.container}>
      <Card.Title title={appData.addItemForm.title} />
      <View style={styles.section}>
        <View>
          <TextInput
            mode='outlined'
            style={globalStyles.TextInput}
            label={appData.addItemForm.name}
            error={nameError}
            value={name}
            disabled={loading}
            onChangeText={text => {
              setName(text)
            }}
            autoComplete='off'
          />
        </View>
        <View>
          <TextInput
            mode='outlined'
            style={globalStyles.TextInput}
            label={appData.addItemForm.description}
            error={descriptionError}
            value={details}
            disabled={loading}
            onChangeText={text => {
              setDetails(text)
            }}
            autoComplete='off'
          />
        </View>
        <View>
          <TextInput
            mode='outlined'
            style={globalStyles.TextInput}
            label={appData.addItemForm.gramsPerPortion}
            error={gramsPerPortionError}
            value={gramsPerPortion}
            disabled={loading}
            onChangeText={text => {
              setGramsPerPortion(text)
            }}
            keyboardType={'numeric'}
            autoComplete='off'
          />
        </View>
        <View style={styles.macros}>
          <View style={styles.macro}>
            <TextInput
              mode='outlined'
              style={[globalStyles.TextInput, styles.TextInputMacros]}
              label={appData.config.protein}
              error={proteinError}
              value={protein}
              disabled={loading}
              onChangeText={text => {
                setProtein(text)
              }}
              keyboardType={'numeric'}
              autoComplete='off'
            />
          </View>
          <View style={styles.macro} >
            <TextInput
              mode='outlined'
              style={[globalStyles.TextInput, styles.TextInputMacros]}
              label={appData.config.fat}
              error={fatError}
              value={fat}
              disabled={loading}
              onChangeText={text => {
                setFat(text)
              }}
              keyboardType={'numeric'}
              autoComplete='off'
            />
          </View>
          <View style={styles.macro}>
            <TextInput
              mode='outlined'
              style={[globalStyles.TextInput, styles.TextInputMacros]}
              label={appData.config.carb}
              error={carbError}
              value={carb}
              disabled={loading}
              onChangeText={text => {
                setCarb(text)
              }}
              keyboardType={'numeric'}
              autoComplete='off'
            />
          </View>
        </View>



        <View style={styles.buttons}>
          <View style={styles.buttonSection}>
            <Button
              style={styles.button}
              disabled={loading}
              icon="backup-restore"
              mode="contained"
              onPress={onCancelHandler}>
              {appData.cancel}
            </Button>
          </View>
          <View style={styles.buttonSection}>
            <Button
              style={styles.button}
              disabled={loading}
              icon="content-save"
              mode="contained"
              onPress={onSaveHandler}>
              {loading ?
                <ActivityIndicator animating={true} color={MD2Colors.white} size="small" /> :
                appData.save
              }
            </Button>
          </View>
        </View>

      </View>

    </View >
  )
}


const styles = StyleSheet.create({
  section: {
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  macroSection: {
    //paddingTop: 8,
    //paddingBottom: 16,
  },
  macros: {
    flexDirection: 'row',
    paddingRight: 8,
    marginLeft: -22,
    marginRight: -8,
  },
  macro: {
    flex: 1,
    marginLeft: 22,
    alignItems: 'center',
  },

  modal: {
    backgroundColor: 'white',
    padding: 20
  },
  TextInputMacros: {
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    paddingRight: 8,
    marginLeft: -22,
    marginRight: -8,
  },
  buttonSection: {
    flex: 1,
    marginLeft: 22,
    alignItems: 'center',
  },
  button: {
    width: '100%',
  }
});
