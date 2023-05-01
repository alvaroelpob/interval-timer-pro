import { StyleSheet } from 'react-native';

const containers = StyleSheet.create({
    main: {
        backgroundColor: '#161616',
        width: '100%',
        height: '100%',
        padding: 0
    },
    timer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 15
    },
    timeleft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 2
    },
    countdown: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    countdowninfo: {
        height: "55%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    timerinfo: {
        height: "45%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        rowGap: 55,
        alignItems: 'center',
    },
    subinfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    setsseries: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 40
    },
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
    },
    controls: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'nowrap',
        marginBottom: '10%'
    },
    empty: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#5AA9DD',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginHorizontal: 13,
    },
});

export default containers;