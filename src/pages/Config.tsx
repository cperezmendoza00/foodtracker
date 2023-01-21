import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { Card, TextInput, Text, Chip, Button, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { updateMacrosProps, UserInfo } from '../types'
import { globalStyles } from '../ui/globalStyles'
import { patchUserInfo } from '../utils/http';
import { LocaleContext } from '../utils/LocaleContext';
import { updateUserInfo } from '../store/userInfo'
import { showSnackbar } from '../store/snackbar'
import { validateFields } from '../utils/Fields';

export default function Config({ navigation }: any) {
  const [loading, setLoading] = useState<boolean>(false)
  const appData = React.useContext(LocaleContext);
  const dispatch = useDispatch()
  const userInfo: UserInfo = useSelector((state: any) => state.userInfo)

  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [gramsOfProtein, setGramsOfProtein] = useState('');
  const [fatPercentage, setFatPercentage] = useState('');

  const [weightError, setWeightError] = useState<boolean>(false);
  const [caloriesError, setCaloriesError] = useState<boolean>(false);
  const [gramsOfProteinError, setGramsOfProteinError] = useState<boolean>(false);
  const [fatPercentageError, setFatPercentageError] = useState<boolean>(false);

  const [protein, setProtein] = useState('0');
  const [fat, setFat] = useState('0');
  const [carb, setCarb] = useState('0');
  
  const getProtein = (w: number, p: number) =>
    Math.floor((Number(w) * (Number(p))))

  const getFat = (c: number, fp: number) =>
    Math.floor((((Number(c) * Number(fp)) / 100) / 9))

  const getCarb = (c: number, p: number, f: number) => {
    const result = Math.floor((Number(c) - (Number(p) * 4) - (Number(f) * 9)) / 4)
    return result >= 0 ? result : 0
  }

  const updateMacros = (data: updateMacrosProps) => {
    if(!Number(data.value)) {
      return
    }
    if (data.name === 'weight') {
      setWeight(data.value)
      const p = getProtein(Number(data.value), Number(gramsOfProtein))
      setProtein(p.toString())
      setCarb(getCarb(Number(calories), p, Number(fat)).toString())
    }

    if (data.name === 'calories') {
      setCalories(data.value)
      const f = getFat(Number(data.value), Number(fatPercentage))
      setFat(f.toString())
      setCarb(getCarb(Number(data.value), Number(protein), f).toString())
    }

    if (data.name === 'protein') {
      setGramsOfProtein(data.value)
      let f = Number(fat)
      const p = getProtein(Number(weight), Number(data.value))
      const percentageInProtein = Math.floor(((p * 4) / (Number(calories) ? Number(calories) : 1)) * 100)
      const remaininPercentageForCarb = 100 - percentageInProtein
      if (Number(percentageInProtein) >= 0 && (Number(fatPercentage) + percentageInProtein) > 100) {
        f = getFat(Number(calories), remaininPercentageForCarb)
        setFatPercentage(remaininPercentageForCarb.toString())
        setFat(f.toString())

      }
      setProtein(p.toString())
      setCarb(getCarb(Number(calories), p, f).toString())
    }

    if (data.name === 'fat') {
      setFatPercentage(data.value)
      const f = getFat(Number(calories), Number(data.value))
      setFat(f.toString())
      setCarb(getCarb(Number(calories), Number(protein), f).toString())
    }

  }

  

  const onSaveHandler = async () => {

    const errorFromFields: boolean = validateFields([
      {
        value: weight,
        type: 'numeric',
        required: true,
        errorSetter: setWeightError,
        fieldSetter: setWeight,

      }, {
        value: calories,
        type: 'numeric',
        required: true,
        errorSetter: setCaloriesError,
        fieldSetter: setCalories
      }, {
        value: gramsOfProtein,
        type: 'numeric',
        required: true,
        errorSetter: setGramsOfProteinError,
        fieldSetter: setGramsOfProtein
      }, {
        value: fatPercentage,
        type: 'numeric',
        required: true,
        errorSetter: setFatPercentageError,
        fieldSetter: setFatPercentage
      }
    ])

    if (!errorFromFields) {
      setLoading(true)

      const updatedUserInfo: UserInfo = {
        weight: Number(weight),
        calories: Number(calories),
        gramsOfProtein: Number(gramsOfProtein),
        fatPercentage: Number(fatPercentage),
        protein: Number(protein),
        fat: Number(fat),
        carb: Number(carb),
      }
      try {
        const { data } = await patchUserInfo('-NKUMEKM4dGs1DgPfwQe', updatedUserInfo)
        dispatch(updateUserInfo({
          updatedUserInfo,
        }))
        setLoading(false)
        navigation.navigate('Home')

      } catch (e) {
        //show snackbar
        dispatch(showSnackbar(appData.errorAddingItem))
        setLoading(false)
      }
    }

  }





  useFocusEffect(
    React.useCallback(() => {      
      setWeight(userInfo.weight.toString())
      setCalories(userInfo.calories.toString())
      setGramsOfProtein(userInfo.gramsOfProtein.toString())
      setFatPercentage(userInfo.fatPercentage.toString())
      setProtein(userInfo.protein.toString())
      setFat(userInfo.fat.toString())
      setCarb(userInfo.carb.toString())
      return () => {
        // Do something when the config is closed
      };
    }, [])
  );
  

  return (
    <View style={styles.container}>
        <ScrollView style={globalStyles.container}>
          <Card style={styles.card}>
            <Card.Title title={appData.config.basicInfo} />
            <View style={styles.section}>
              <View>
                <TextInput
                  mode='outlined'
                  style={globalStyles.TextInput}
                  label={appData.config.weight}
                  error={weightError}
                  value={weight}
                  disabled={loading}
                  onChangeText={text => {
                    updateMacros({ value: text, name: 'weight' })
                  }}
                  keyboardType={'numeric'}
                  autoComplete='off'
                />
              </View>
              <View>
                <TextInput
                  mode='outlined'
                  style={globalStyles.TextInput}
                  label={appData.config.calories}
                  error={caloriesError}
                  value={calories}
                  disabled={loading}
                  onChangeText={text => {
                    updateMacros({ value: text, name: 'calories' })
                  }}
                  keyboardType={'numeric'}
                  autoComplete='off'
                />
              </View>
            </View>

          </Card>

          <Card style={styles.card}>
            <Card.Title title={appData.config.adjustMacros} />
            <View style={styles.section}>
              <View>
                <TextInput
                  mode='outlined'
                  style={globalStyles.TextInput}
                  label={appData.config.gramsOfProtein}
                  error={gramsOfProteinError}
                  value={gramsOfProtein}
                  disabled={loading}
                  onChangeText={text => {
                    updateMacros({ value: text, name: 'protein' })
                  }}
                  keyboardType={'numeric'}
                  autoComplete='off'

                />
              </View>
              <View>
                <TextInput
                  mode='outlined'
                  style={globalStyles.TextInput}
                  label={appData.config.fatPercentage}
                  value={fatPercentage}
                  disabled={loading}
                  error={fatPercentageError}
                  onChangeText={text => {
                    updateMacros({ value: text, name: 'fat' })
                  }}
                  keyboardType={'numeric'}
                  autoComplete='off'
                />
              </View>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={[styles.section, styles.macroSection]}>

              <View style={styles.macros}>
                <View style={styles.macro}>
                  <Text>{appData.config.protein} ({Math.floor(((Number(protein) * 4) / (Number(calories) ? Number(calories) : 1)) * 100)}%)</Text>
                </View>
                <View style={styles.macro} >
                  <Text>{appData.config.fat} ({Number(fatPercentage)}%)</Text>
                </View>
                <View style={styles.macro}>
                  <Text>{appData.config.carb} ({Math.floor(((Number(carb) * 4) / (Number(calories) ? Number(calories) : 1)) * 100)}%)</Text>
                </View>
              </View>

              <View style={styles.macros}>
                <Chip style={styles.macro}>
                  <Text>{`${protein}${appData.config.gramI}`}</Text>
                </Chip>
                <Chip style={styles.macro} >
                  <Text>{`${fat}${appData.config.gramI}`}</Text>
                </Chip>
                <Chip style={styles.macro}>
                  <Text>{`${carb}${appData.config.gramI}`}</Text>
                </Chip>
              </View>

            </View>
          </Card>

          <Button
            icon="content-save"
            mode="contained"
            disabled={loading}
            onPress={onSaveHandler}>
            {loading ?
              <ActivityIndicator animating={true} color={MD2Colors.white} size="small" /> :
              appData.save
            }
          </Button>
        </ScrollView>
    </View>


  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  section: {
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  macroSection: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  macros: {
    flex: 1,
    flexDirection: 'row',
    paddingRight: 8,
    marginLeft: -8,
    marginRight: -8,
  },
  macro: {
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  }
});
