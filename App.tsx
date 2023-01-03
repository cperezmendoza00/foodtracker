import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { AppRegistry, } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { lang, LocaleProvider } from './src/utils/LocaleContext';
import { expo } from './app.json';
import { store } from './src/store/store'
import Home from './src/pages/Home'
import Config from './src/pages/Config'

type RootStackParamList = {
  Home: undefined
  Config: undefined
};

const Drawer = createDrawerNavigator<RootStackParamList>()

export default function App() {

  const [appData, setAppData] = useState(
    lang.en
  );

  return (
    <LocaleProvider value={appData}>
      <ReduxProvider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <Drawer.Navigator>
              <Drawer.Screen name='Home' component={Home} />
              <Drawer.Screen name='Config' component={Config} />
            </Drawer.Navigator>
          </NavigationContainer>
          <StatusBar style='auto' />
        </PaperProvider>
      </ReduxProvider>
    </LocaleProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => App);