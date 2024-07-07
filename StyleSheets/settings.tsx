import { StyleSheet } from 'react-native';
import { APPTHEME } from '../lib/constants';

const settings = StyleSheet.create({
    boxes: {
        display: 'flex',
        flexDirection: 'column'
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        marginHorizontal: 18,
        marginVertical: 7,
        borderRadius: 20,
        backgroundColor: APPTHEME.SECONDARY,
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