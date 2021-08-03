import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import  {createStore, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'

import Navigator from './Components/Navigator'
import reducer from './redux/reducer'
import { Provider } from 'react-redux';

const store = createStore(reducer, applyMiddleware(ReduxThunk))

fetchFonts = () => {
  return Font.loadAsync(
    {'open-sans': 
      require('./fonts/OpenSans-Regular.ttf'),
  'open-sans-bold': 
      require('./fonts/OpenSans-Bold.ttf')}
  )
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  if(!fontsLoaded){
    return (
      <AppLoading 
      startAsync ={fetchFonts}
      onFinish={() => setFontsLoaded(true)}
      onError = {console.warn}
      />
    )
  }

  return (
    <Provider store={store}>
    <Navigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
