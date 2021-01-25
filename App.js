import React, {useEffect, useState} from 'react'
import AppNavigation from '@navigation/AppNavigation'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();//Ignore all log notifications

import AsyncStorage from '@react-native-community/async-storage'

import items from '@datos/DatosLecciones'

function App( ){

  const [jsonObj , setObj] = useState(null);

  

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@items_key')
          setObj(jsonValue)
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          console.log("Ya que no se pudo cargar se guarda");
          storeData(items)
          return null;
        }
    }
  
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@items_key', jsonValue)
      } catch (e) {
        // saving error
      }
    }

    
  
    useEffect( () => {
      try {
          getData();    
      } catch (e) {
          storeData(items);
          getData();
      }

      console.log(jsonObj)
  })

  storeData(items);

  return (
    <AppNavigation datosApp={jsonObj}/>
  ) 
}

export default App;