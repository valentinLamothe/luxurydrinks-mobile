import React from 'react';
import StackNavigation from './navigation/Stack';
import { NavigationContainer } from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import FlashMessage from "react-native-flash-message";
import DataProvider from './DataProvider';



export default function App() {

  const globalStore = createStore(rootReducer, applyMiddleware(thunk))  

  return (
    <Provider store={globalStore}>
      <DataProvider>
      <NavigationContainer>
          <StackNavigation />
      </NavigationContainer>
      <FlashMessage position="top"  /> 
      </DataProvider>
    </Provider>
  );
}


