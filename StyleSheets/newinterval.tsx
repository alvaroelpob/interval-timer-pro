import { StyleSheet } from 'react-native';

const newinterval = StyleSheet.create({
    create: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 13,
        marginVertical: 10,
        height: 45,
        padding: 5,
        backgroundColor: '#D1D647',
        borderRadius: 10
    },
    createWinput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        columnGap: 50,
        alignItems: 'center',
        marginHorizontal: 13,
        marginVertical: 10,
        width: 'auto',
        height: 45,
        padding: 5,
        backgroundColor: '#D1D647',
        borderRadius: 10
    },
    input: {
        width: '100%',
        flex: 1,
        borderRadius: 10,
        paddingLeft: 5,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#D1D647',
    },
    label: {
        color: '#000000',
        fontSize: 18,
    },
    labeltext: {
        marginRight: 10,
        fontSize: 25
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
        marginHorizontal: 13,
    },
    text: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default newinterval;