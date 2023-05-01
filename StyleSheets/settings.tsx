import { StyleSheet } from 'react-native';

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
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: '#1f1f1f',
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
        color: '#FFFFFF',
    },
    separator: {
        borderBottomColor: '#0d0d0d',
        borderBottomWidth: 1,
        marginBottom: 4,
    }
});

export default settings;