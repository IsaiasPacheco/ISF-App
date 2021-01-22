import React from 'react'
import { View, Text, Image, StyleSheet  } from 'react-native'
import ProgressCircle from 'react-native-progress-circle'

const styles = StyleSheet.create({
    logo: {
        flex: 1,
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    txt: {
        paddingTop: 10,
        fontFamily: "Pineapple Grass",
        fontSize: 20
    },
    vista: {
        paddingTop:15,
        paddingBottom: 10, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center'
    }
  });

export default function Lecciones(props){

    return(
        <View style={styles.vista}>
            <ProgressCircle
            percent={parseInt(props.porcentaje)}
            radius={100}
            borderWidth={18}
            color="#FFCA06"
            shadowColor="#E4E4E4"
            bgColor="#EFEFEF"
            >
                <Image
                    style={styles.logo}
                    source={props.img}
                />
            </ProgressCircle>
            <Text style={styles.txt}> {props.nombre} </Text>
        </View>
    )
}
