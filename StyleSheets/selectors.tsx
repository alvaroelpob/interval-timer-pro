import { StyleSheet } from 'react-native';

const selectors = StyleSheet.create({
    modal: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'nowrap',
        width: '80%',
        backgroundColor: '#0d0d0d',
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#a492b9cc'
    },
    wheelpickers: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        width: "100%",
        columnGap: 20
    },
    button: {
        backgroundColor: '#5d5cff',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginHorizontal: 13,
    },
});

export default selectors;