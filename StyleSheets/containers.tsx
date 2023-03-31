import { StyleSheet } from 'react-native';

const containers = StyleSheet.create({
    main: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        height: '100%',
        padding: 0
    },
    timer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    timeleft: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    countdown: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    timerinfo: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        columnGap: 40
    }
});

export default containers;