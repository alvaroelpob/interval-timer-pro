import { View, Text, BackHandler, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/styles';
import { formatTimeSeconds, calcTotalTime, timeToSeconds } from '../utils/normalizer';

/* Icons */
import Play from '../assets/svg/controls/play';
import Pause from '../assets/svg/controls/pause';
import Backward from '../assets/svg/controls/backward';
import Forward from '../assets/svg/controls/forward';

/* Sounds */
const whistle = require('../assets/sounds/Others/whistle');
const long_beep = require('../assets/sounds/Beeps/long_beep');
const short_beep = require('../assets/sounds/Beeps/medium_beep');
const congrats = require('../assets/sounds/Others/congrats');

const longBeepSound = new Audio.Sound();
const shortBeepSound = new Audio.Sound();

export default function Countdown({ name, prepTime, activeTime, restTime, restBetweenSets, series, sets, setRenderCountdown, setShowNav }: any) {
    prepTime = timeToSeconds(prepTime)
    activeTime = timeToSeconds(activeTime)
    restTime = timeToSeconds(restTime)
    restBetweenSets = timeToSeconds(restBetweenSets)

    const totalTime = calcTotalTime({ id: true, name: name ? name : "Untitled", prepTime, activeTime, restTime, restBetweenSets, series, sets })

    const [timerState, setTimerState] = useState('Preparación')
    const [timeRemaining, setTimeRemaining] = useState(prepTime)
    const [serie, setSerie] = useState(0)
    const [setNumber, setSetNumber] = useState(1)

    const [isRunning, setIsRunning] = useState(true)

    const [controlsDisabled, setControlsDisabled] = useState(false)
    const [backwardDisabled, setBackwardDisabled] = useState(true);
    const [forwardDisabled, setForwardDisabled] = useState(false);

    const [totalTimeRemaining, setTotalTimeRemaining] = useState(totalTime)

    useEffect(() => {
        let intervalId: string | number | NodeJS.Timeout | undefined;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTimeRemaining((prevTimeRemaining: number) => prevTimeRemaining - 1);
                setTotalTimeRemaining((prevTotalTimeRemaining: number) => prevTotalTimeRemaining - 1);
            }, 1000);
        }

        if (timerState !== "Preparación") {
            setBackwardDisabled(false)
        } else {
            setBackwardDisabled(true)
        }

        if (timeRemaining === 0) {
            clearInterval(intervalId);

            if (serie == series) {
                if (setNumber == sets) {
                    (async () => {
                        const { sound } = await Audio.Sound.createAsync(congrats);
                        await sound.playAsync();
                    })();
                    setForwardDisabled(true);
                    setTimerState("¡Has terminado!");
                    return
                }

                (async () => {
                    await shortBeepSound.replayAsync();
                })();

                setTimerState('Descanso');
                setTimeRemaining(restBetweenSets)
                setSerie(0)
                setSetNumber(prevSetNumber => prevSetNumber + 1)
            } else {
                if (timerState == "Ejercitar") {
                    (async () => {
                        await shortBeepSound.replayAsync();
                    })();

                    setTimerState('Descanso')
                    setTimeRemaining(restTime)
                } else {
                    (async () => {
                        await longBeepSound.replayAsync();
                    })();

                    setTimerState('Ejercitar')
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

    useEffect(() => {
        setShowNav(false);
        (async () => {
            const { sound } = await Audio.Sound.createAsync(whistle);
            await sound.playAsync();
        })();

        (async () => {
            try {
                if (!longBeepSound._loaded) await longBeepSound.loadAsync(long_beep);
                if (!shortBeepSound._loaded) await shortBeepSound.loadAsync(short_beep);
            } catch (error) {
                console.log('Failed to load audio files', error);
            }
        })();
    }, [])

    const handleBackPress = () => {
        setRenderCountdown(false)
        setShowNav(true)
        return true
    }

    const handleTogglePause = () => {
        setIsRunning(isRunning => !isRunning);
    }

    const handleGoBackward = () => {
        if (timerState === "Preparación") return;

        /* Backward from "Preparación" */
        if (serie === 1 && setNumber === 1 && timerState === "Ejercitar") {
            setTimeRemaining(prepTime);
            setTotalTimeRemaining(prevTTR => prevTTR + prepTime + (activeTime - timeRemaining));
            setTimerState("Preparación");
            setSerie(prevS => prevS - 1);
            return;
        }

        /* Backward from "Ejercitar" moving set */
        if (serie === 1 && timerState === "Ejercitar") {
            (async () => {
                await shortBeepSound.replayAsync();
            })();

            setTimeRemaining(restBetweenSets);
            setTotalTimeRemaining(prevTTR => prevTTR + restBetweenSets + (activeTime - timeRemaining));
            setTimerState("Descanso");
            setSerie(prevS => prevS - 1);
            return;
        }

        /* Backward from "Descanso" moving set */
        if (serie === 0 && timerState === "Descanso") {
            (async () => {
                await longBeepSound.replayAsync();
            })();

            setTimeRemaining(activeTime);
            setTotalTimeRemaining(prevTTR => prevTTR + activeTime + (restBetweenSets - timeRemaining));
            setTimerState("Ejercitar");
            setSerie(series);
            setSetNumber(prevSet => prevSet - 1);
            return;
        }

        /* Backward from "Ejercitar" */
        if (timerState === "Ejercitar") {
            (async () => {
                await shortBeepSound.replayAsync();
            })();

            setTimeRemaining(restTime);
            setTotalTimeRemaining(prevTTR => prevTTR + restTime + (activeTime - timeRemaining));
            setTimerState("Descanso");
            setSerie(prevS => prevS - 1);
            return;
        }

        /* Backward from "Descanso" */
        if (timerState === "Descanso") {
            (async () => {
                await longBeepSound.replayAsync();
            })();

            setTimeRemaining(activeTime);
            setTotalTimeRemaining(prevTTR => prevTTR + activeTime + (restTime - timeRemaining));
            setTimerState("Ejercitar");
            return;
        }

        /* Backward from finish */
        if (timerState === "¡Has terminado!") {
            (async () => {
                await longBeepSound.replayAsync();
            })();

            setTimeRemaining(activeTime);
            setTotalTimeRemaining(prevTTR => prevTTR + activeTime);
            setTimerState("Ejercitar");
            setForwardDisabled(false)
            return;
        }
    };

    const handleGoForward = () => {
        setTimeRemaining(0);
        setTotalTimeRemaining(prevTTR => prevTTR - timeRemaining);
    }

    const getBgColor = (): string => {
        const equalities: { [key: string]: string; } = {
            "Preparación": "#0076be",
            "Ejercitar": "#de2b00",
            "Descanso": "#017a10",
            "¡Has terminado!": "#212121"
        }
        return equalities[timerState]
    }

    return (
        <View style={[{ backgroundColor: getBgColor() }, containers.timer]}>
            <View style={containers.countdowninfo}>
                <View style={containers.timeleft}>
                    <Text style={{ color: '#FFFFFF' }}>Tiempo restante</Text>
                    <Text style={{ color: '#FFFFFF' }}>{formatTimeSeconds(totalTimeRemaining)}</Text>
                </View>

                <View style={containers.countdown}>
                    <Text style={[{ color: '#FFFFFF' }, styles.timerstate]}>{timerState}</Text>
                    <Text style={[{ color: '#FFFFFF' }, styles.countdown]}>{formatTimeSeconds(timeRemaining)}</Text>
                </View>
            </View>



            <View style={containers.timerinfo}>

                <View style={containers.setsseries}>
                    <View style={containers.subinfo}>
                        <Text style={{ color: '#FFFFFF' }}>Serie</Text>
                        <Text style={{ color: '#FFFFFF' }}>{serie}/{series}</Text>
                    </View>
                    <View style={containers.subinfo}>
                        <Text style={{ color: '#FFFFFF' }}>Set</Text>
                        <Text style={{ color: '#FFFFFF' }}>{setNumber}/{sets}</Text>
                    </View>
                </View>


                <View style={containers.controls}>

                    <TouchableOpacity onPress={handleGoBackward} disabled={backwardDisabled}>
                        <Backward disabled={backwardDisabled} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleTogglePause} disabled={controlsDisabled}>
                        {
                            isRunning ? (
                                <Pause disabled={controlsDisabled} />
                            ) : (
                                <Play disabled={controlsDisabled} />
                            )
                        }
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleGoForward} disabled={forwardDisabled}>
                        <Forward disabled={forwardDisabled} />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}