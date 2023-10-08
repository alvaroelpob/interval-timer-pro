import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    totaltimeremaining: {
        color: '#FFFFFF',
        fontSize: 45
    },
    timeleft: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 2
    },
    countdownContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    timerstate: {
        fontSize: 40,
        alignSelf: 'center',
        color: '#FFFFFF'
    },
    countdown: {
        fontSize: 999,
        marginTop: -17,
        alignSelf: 'center',
        color: '#FFFFFF'
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
        rowGap: 50,
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
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        flexWrap: 'nowrap',
        marginBottom: '10%'
    },
});

export default styles;