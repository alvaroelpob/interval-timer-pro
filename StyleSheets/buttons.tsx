import { StyleSheet } from "react-native";

const size = 50;

const buttons = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: size / 2,
        backgroundColor: '#5d5cff',
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
});

export default buttons