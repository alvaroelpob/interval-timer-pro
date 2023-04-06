import { View, Text, Button, BackHandler } from 'react-native';
import { useState, useEffect } from 'react'
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/styles';
import { formatTimeSeconds, calcTotalTime, timeToSeconds } from '../utils/normalizer';

export default function Countdown({ name, prepTime, activeTime, restTime, restBetweenSets, series, sets, setRenderCountdown }: any) {
    prepTime = timeToSeconds(prepTime)
    activeTime = timeToSeconds(activeTime)
    restTime = timeToSeconds(restTime)
    restBetweenSets = timeToSeconds(restBetweenSets)

    const totalTime = calcTotalTime({ id: true, name: name ? name : "Untitled", prepTime, activeTime, restTime, restBetweenSets, series, sets })

    const [timerState, setTimerState] = useState('Preparación')
    const [timeRemaining, setTimeRemaining] = useState(prepTime)
    const [serie, setSerie] = useState(0)
    const [setNumber, setSetNumber] = useState(1)

    const [isRunning, setIsRunning] = useState(false)
    const [buttonText, setButtonText] = useState('Iniciar');

    const [totalTimeRemaining, setTotalTimeRemaining] = useState(totalTime)

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTimeRemaining((prevTimeRemaining: number) => prevTimeRemaining - 1);
                setTotalTimeRemaining((prevTotalTimeRemaining: number) => prevTotalTimeRemaining - 1);
            }, 1000);
        }

        if (timeRemaining === 0) {
            clearInterval(intervalId);

            if (serie == series) {
                if (setNumber == sets) {
                    return setTimerState("End of Training")
                }
                setTimerState('Descanso')
                setTimeRemaining(restBetweenSets)
                setSerie(0)
                setSetNumber(prevSetNumber => prevSetNumber + 1)
            } else {
                if (timerState == "Activo") {
                    setTimerState('Descanso')
                    setTimeRemaining(restTime)
                } else {
                    setTimerState('Activo')
                    setTimeRemaining(activeTime)
                    setSerie(prevSerie => prevSerie + 1)
                }
            }
        }

        return () => clearInterval(intervalId);

    }, [isRunning, timeRemaining]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, []);

    const handleBackPress = () => {
        setRenderCountdown(false)
        return true
    }

    const handleTogglePause = () => {
        setIsRunning(isRunning => !isRunning);
        setButtonText(buttonText => isRunning ? 'Reaunudar' : 'Pausar');
    }

    return (
        <View style={containers.timer}>

            <View style={containers.timeleft}>
                <Text style={{ color: '#FFFFFF' }}>Tiempo restante</Text>
                <Text style={{ color: '#FFFFFF' }}>{formatTimeSeconds(totalTimeRemaining)}</Text>
            </View>

            <View style={containers.countdown}>
                <Text style={[{ color: '#FFFFFF' }, styles.timerstate]}>{timerState}</Text>
                <Text style={[{ color: '#FFFFFF' }, styles.countdown]}>{formatTimeSeconds(timeRemaining)}</Text>
            </View>


            <View style={containers.timerinfo}>
                <View style={containers.subinfo}>
                    <Text style={{ color: '#FFFFFF' }}>Serie</Text>
                    <Text style={{ color: '#FFFFFF' }}>{serie}/{series}</Text>
                </View>
                <View style={containers.subinfo}>
                    <Text style={{ color: '#FFFFFF' }}>Set</Text>
                    <Text style={{ color: '#FFFFFF' }}>{setNumber}/{sets}</Text>
                </View>
            </View>

            <Button title={buttonText} onPress={handleTogglePause} />

        </View>
    );
}