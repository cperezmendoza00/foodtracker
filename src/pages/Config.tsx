import React, { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import { Card, TextInput, Text, Chip, Button } from 'react-native-paper';
import { updateMacrosProps } from '../types'
import { globalStyles } from '../ui/globalStyles'
import { LocaleContext } from '../utils/LocaleContext';


type RootStackParamList = {
  Home: undefined
  Config: undefined
  //Feed: { sort: 'latest' | 'top' } | undefined;
  //Config: { userId: string };
};

//type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Config({ navigation }: any) {
  const appData = React.useContext(LocaleContext);

  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [gramsOfprotein, setGramsOfProtein] = useState('');
  const [fatPercentage, setFatPercentage] = useState('');

  const getProtein = (w: number, p: number) =>
    Math.floor((Number(w) * (Number(p))))

  const getFat = (c: number, fp: number) =>
    Math.floor((((Number(c) * Number(fp)) / 100) / 9))

  const getCarb = (c: number, p: number, f: number) => {
    const result = Math.floor((Number(c) - (Number(p) * 4) - (Number(f) * 9)) / 4)
    return result >= 0 ? result : 0
  }

  const updateMacros = (data: updateMacrosProps) => {
    if (data.name === 'weight') {
      setWeight(data.value)
      const p = getProtein(Number(data.value), Number(gramsOfprotein))
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
      const pPercentage = Math.floor(((p * 4) / (Number(calories) ? Number(calories) : 1)) * 100)
      const fp = 100 - pPercentage
      if (Number(pPercentage) >= 0 && (Number(fatPercentage) + pPercentage) > 100) {
        f = getFat(Number(calories), fp)
        setFatPercentage(fp.toString())
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

  const [protein, setProtein] = useState('0');
  const [fat, setFat] = useState('0');
  const [carb, setCarb] = useState('0');


  return (
    <ScrollView style={globalStyles.container}>
      <Card style={styles.card}>
        <Card.Title title={appData.config.basicInfo} />
        <View style={styles.section}>
          <View>
            <TextInput
              mode='outlined'
              style={globalStyles.TextInput}
              label={appData.config.weight}
              value={weight}
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
              value={calories}
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
              value={gramsOfprotein}
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

      <Button icon="content-save" mode="contained" onPress={() => {
        navigation.navigate('Home')
      }}>
        {appData.save}
      </Button>


    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
