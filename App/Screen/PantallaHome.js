import React, {useEffect, useState} from 'react'
import { StyleSheet, FlatList, SafeAreaView, View , Pressable} from 'react-native'

import Lecciones from '@components/Lecciones'
import AsyncStorage from '@react-native-community/async-storage'

const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@items_key', jsonValue)
    } catch (e) {
      // saving error
    }
  }

//Descomentar para reiniciar valores de las lecciones
//storeData(items)

export default function PantallaHome(props){

    const [jsonObj, setObj] = useState(null);

    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@items_key')
        setObj(jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        return null;
      }
  }

    useEffect( () => {
      const unsubscribe = props.navigation.addListener('focus', () => {
        getData()      
      });
      getData()
    })

    return(
        <SafeAreaView>
            <FlatList
                data={JSON.parse(jsonObj)}
                renderItem={
                    ({item}) => (
                        <View style={styles.container}>
                            <Pressable onPress={() => props.navigation.navigate('Minijuego', {nombre: item.nombre, id_cuento:item.id, arrObj: JSON.parse(jsonObj)} )}>
                                <Lecciones nav={props.navigation} arrObj={JSON.parse(jsonObj)} id_cuento={item.id} nombre={item.nombre} img={item.img} porcentaje={item.pc}/>
                            </Pressable>
                        </View>
                    )
                }
                keyExtractor={(item, index) => index.toString()}
            >
            </FlatList>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 0.5,
    }
  });