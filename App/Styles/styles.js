import { StyleSheet } from 'react-native'


const stylesLogin = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    },

    btn:{
        backgroundColor: "#FF2D00",
        fontSize: 150
    },

    iconContainer:{
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        flex: 1,
        width: 300,
        resizeMode: 'contain',  
    },
})

export { stylesLogin }