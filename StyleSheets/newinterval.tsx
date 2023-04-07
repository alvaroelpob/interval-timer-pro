import { StyleSheet } from 'react-native';

const newinterval = StyleSheet.create({
    create: {
        marginHorizontal: 10,
        marginVertical: 10,
        height: 50,
        padding: 5,
        backgroundColor: '#D1D647',
        borderRadius: 10
    },
    modalContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#5AA9DD',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginHorizontal: 10,
    },
    text: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default newinterval;