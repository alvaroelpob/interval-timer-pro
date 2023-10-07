import { StyleSheet } from 'react-native';

const settings = StyleSheet.create({
    boxes: {
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        marginLeft: 30,
        marginVertical: 5,
    },
    headertext: {
        marginTop: 10,
        fontSize: 21,
        color: '#ececec'
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        marginHorizontal: 18,
        marginVertical: 7,
        borderRadius: 20,
        backgroundColor: '#1f1f1f',
    },
    dangerbox: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        marginHorizontal: 18,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: '#F32013',
    },
    subbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 5,
        height: 60,
    },
    setting: {
        color: '#ececec',
        fontSize: 14
    },
    separator: {
        borderBottomColor: '#0d0d0d',
        borderBottomWidth: 1,
        marginBottom: 4,
    },
    color: {
        color: '#ffffff'
    },
    setCX: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 3
    },
    dropdown: {
        width: 100,
        height: 50,
        paddingHorizontal: 8,
    },
    selectedTextStyle: {
        fontSize: 14,
        color: "#FFFFFF"
    },
    item: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
});

export default settings;