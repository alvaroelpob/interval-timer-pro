import { StyleSheet } from 'react-native';

const saved = StyleSheet.create({
    item: {
        width: '94%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffc107',
        margin: '3%',
        borderRadius: 10,
        padding: 10,
        fontSize: 20
    },
    element: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 4
    },
    iconelement: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginRight: 20
    },
    infoelement: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 40
    },
    textinfo: {
        fontSize: 17
    },
    line: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 4
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headertext: {
        fontSize: 24
    }
});

export default saved;