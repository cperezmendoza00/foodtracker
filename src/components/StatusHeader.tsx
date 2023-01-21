import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyleSheet, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import { globalStyles } from '../ui/globalStyles'
import { LocaleContext } from '../utils/LocaleContext';
import { Item } from '../types'


export default function StatusHeader() {

  const appData = React.useContext(LocaleContext);
  const items = useSelector((state: any) => state.items.data)

  let p: number = 0;
  let f: number = 0;
  let c: number = 0;
  let k: number = 0;
  items.map((item: Item) => {
    p = p + (item.portions * item.info.protein)
    f = f + (item.portions * item.info.fat)
    c = c + (item.portions * item.info.carb)
  })

  k = ((p * 4) + (f * 4) + (c * 4))
  return (
    <View style={[styles.header, globalStyles.row]}>
      <View style={styles.headerStatus}>
        <View style={[styles.macroStatus, globalStyles.row]}>
          <View style={styles.current}><Text variant='bodySmall'>{Math.floor(p)}</Text></View>
          <View style={styles.title}><Text variant='bodySmall'>{appData.config.protein.toUpperCase()}</Text></View>
          <View style={styles.goal}><Text variant='bodySmall'>140</Text></View>
        </View>
        <View style={[styles.macroStatus, globalStyles.row]}>
          <View style={styles.current}><Text variant='bodySmall'>{Math.floor(f)}</Text></View>
          <View style={styles.title}><Text variant='bodySmall'>{appData.config.fat.toUpperCase()}</Text></View>
          <View style={styles.goal}><Text variant='bodySmall'>100</Text></View>
        </View>

        <View style={[styles.macroStatus, globalStyles.row]}>
          <View style={styles.current}><Text variant='bodySmall'>{Math.floor(c)}</Text></View>
          <View style={styles.title}><Text variant='bodySmall'>{appData.config.carb.toUpperCase()}</Text></View>
          <View style={styles.goal}><Text variant='bodySmall'>351</Text></View>
        </View>

        <View style={[styles.macroStatus, globalStyles.row]}>
          <View style={styles.current}><Text variant='bodySmall'>{Math.floor(k)}</Text></View>
          <View style={styles.title}><Text variant='bodySmall'>{appData.config.calories.toUpperCase()}</Text></View>
          <View style={styles.goal}><Text variant='bodySmall'>3000</Text></View>
        </View>
      </View>
      <View style={styles.headerFilter}>
        <IconButton style={styles.iconButton} icon='magnify' onPress={() => { }} />
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
    paddingBottom: 4,
  },
  headerStatus: {
    //flex: 7 / 10,
    flex: 1,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  macroStatus: {
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'rgba(255, 219, 219,0.2)',
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
    marginLeft: -8,
    marginRight: -8,
  },
  macroDetails: {
    borderWidth: 1,
    flex: 1 / 4,
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
  portion: {
    borderWidth: 1,
    flex: 1,
    width: '100%',
    textAlign: 'center',
  }
});
