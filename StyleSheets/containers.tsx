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
        justifyContent: 'space-around',
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
    wheelpicker: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'nowrap',
        rowGap: 5
    },
    controls: {
        alignSelf: 'center',
        width: "100%",
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
});

export default containers;