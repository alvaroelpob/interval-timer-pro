import { StyleSheet } from 'react-native';

const saved = StyleSheet.create({
    item: {
        width: '94%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#D1D647',
        margin: '3%',
        borderRadius: 10,
        padding: 10,
        fontSize: 20,
        // borderColor: '#727AFF',
        // borderWidth: 2
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
    line2: {
        borderBottomColor: '#5AA9DD',
        borderBottomWidth: 2,
        marginBottom: 4
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headertext: {
        fontSize: 24
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    pageButton: {
        marginHorizontal: 10,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#ccc',
    }
});

export default saved;