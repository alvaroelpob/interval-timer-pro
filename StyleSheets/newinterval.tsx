import { StyleSheet } from 'react-native';
import { APPTHEME } from '../lib/constants';

const newinterval = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#5d5cff',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginHorizontal: 18,
    },
    text: {
        color: "#ececec",
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default newinterval;