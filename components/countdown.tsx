import { StatusBar, View, Text, Button } from 'react-native';
import { useState, useEffect } from 'react'
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/styles';
import { formatTime, calcTotalTime } from '../utils/normalizer';

export default function Countdown({ prepTime, activeTime, restTime, restBetweenSets, series, sets }: any) {

    const totalTime = calcTotalTime({ prepTime, activeTime, restTime, restBetweenSets, series, sets })

    const [timerState, setTimerState] = useState('Preparación')
    const [timeRemaining, setTimeRemaining] = useState(prepTime)
    const [serie, setSerie] = useState(0)
    const [setNumber, setSetNumber] = useState(1)
    const [isRunning, setIsRunning] = useState(false)

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

    const handleTogglePause = () => {
        setIsRunning(isRunning => !isRunning);
    }

    return (
        <View style={containers.timer}>

            <View style={containers.timeleft}>
                <Text>Tiempo restante</Text>
                <Text>{formatTime(totalTimeRemaining)}</Text>
            </View>

            <View style={containers.countdown}>
                <Text style={styles.timerstate}>{timerState}</Text>
                <Text style={styles.countdown}>{timeRemaining}</Text>
            </View>


            <View style={containers.timerinfo}>
                <View>
                    <Text>Serie</Text>
                    <Text>{serie}/{series}</Text>
                </View>
                <View>
                    <Text>Set</Text>
                    <Text>{setNumber}/{sets}</Text>
                </View>
            </View>

            <Button title={isRunning ? 'Pausar' : 'Reaunudar'} onPress={handleTogglePause} />

        </View>
    );
}