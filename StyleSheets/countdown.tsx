import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    timer: {
        flex: 1,
        width: "100%",
        height: "100%",
        display: 'flex',
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

    videoContainer: {},

    timerInfoContainer: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "column",
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

    containerSubInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        columnGap: 40
    },
    subinfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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