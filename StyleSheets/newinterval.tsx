import { StyleSheet } from 'react-native';

const newinterval = StyleSheet.create({
    create: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 18,
        marginVertical: 10,
        height: 55,
        paddingVertical: 7,
        paddingHorizontal: 13,
        backgroundColor: '#1f1f1f',
        borderRadius: 15
    },
    createWinput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 50,
        marginHorizontal: 18,
        marginVertical: 10,
        height: 55,
        paddingVertical: 7,
        paddingHorizontal: 13,
        backgroundColor: '#1f1f1f',
        borderRadius: 15
    },
    input: {
        width: '100%',
        height: '80%',
        flex: 1,
        borderRadius: 10,
        paddingLeft: 7,
        color: '#ececec',
        borderWidth: 0,
        backgroundColor: '#333333',
    },
    label: {
        color: '#ececec',
        fontSize: 18,
    },
    labeltext: {
        marginRight: 10,
        fontSize: 25,
        color: '#ececec',
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
        backgroundColor: '#747474',
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