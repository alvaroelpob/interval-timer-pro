import { View, Text, BackHandler, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import { formatTimeSeconds, calcTotalTime, timeToSeconds } from '../utils/normalizer';
import { useKeepAwake } from 'expo-keep-awake';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Styles */
import styles from '../StyleSheets/countdown';

/* Components */
import YoutubePlayer from './youtubeplayer';

/* Icons */
import Play from '../assets/svg/controls/play';
import Pause from '../assets/svg/controls/pause';
import Backward from '../assets/svg/controls/backward';
import Forward from '../assets/svg/controls/forward';
import Repeat from '../assets/svg/controls/repeat';
import On from '../assets/svg/controls/on';
import Off from '../assets/svg/controls/off';
import Lock from '../assets/svg/controls/lock';
import Unlock from '../assets/svg/controls/unlock';

/* Sounds */
const whistle = require('../assets/sounds/Others/whistle');
const long_beep = require('../assets/sounds/Beeps/long_beep');
const medium_beep = require('../assets/sounds/Beeps/medium_beep');
const short_beep = require('../assets/sounds/Beeps/short_beep');
const congrats = require('../assets/sounds/Others/congrats');

const longBeepSound = new Audio.Sound();
const mediumBeepSound = new Audio.Sound();
const shortBeepSound = new Audio.Sound();

export default function Countdown({ name, prepTime, activeTime, restTime, restBetweenSets, series, sets, link, setRenderCountdown, setShowNav, soundDisabled, backgroundColors }: any) {
    useKeepAwake();

    prepTime = timeToSeconds(prepTime)
    activeTime = timeToSeconds(activeTime)
    restTime = timeToSeconds(restTime)
    restBetweenSets = timeToSeconds(restBetweenSets)
    soundDisabled = !soundDisabled

    const totalTime = calcTotalTime({ name: name ? name : "Untitled", prepTime, activeTime, restTime, restBetweenSets, series, sets })

    const [timerState, setTimerState] = useState('Preparación')
    const [timeRemaining, setTimeRemaining] = useState(prepTime)
    const [serie, setSerie] = useState(0)
    const [setNumber, setSetNumber] = useState(1)

    const [isRunning, setIsRunning] = useState(true)
    const [ended, setEnded] = useState(false);
    const [allDisabled, setAllDisabled] = useState(false)
    const [controlsDisabled, setControlsDisabled] = useState(false)
    const [backwardDisabled, setBackwardDisabled] = useState(true);
    const [forwardDisabled, setForwardDisabled] = useState(false);

    const [sound, setSound] = useState(!soundDisabled)

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

        if (timeRemaining === 3) {
            if (sound) {
                (async () => {
                    await shortBeepSound.replayAsync();
                })();
            }
        }
        if (timeRemaining === 2) {
            if (sound) {
                (async () => {
                    await shortBeepSound.replayAsync();
                })();
            }

        }
        if (timeRemaining === 1) {
            if (sound) {
                (async () => {
                    await shortBeepSound.replayAsync();
                })();
            }

        }

        if (timeRemaining === 0) {
            clearInterval(intervalId);

            if (serie == series) {
                if (setNumber == sets) {
                    if (sound) {
                        (async () => {
                            const { sound } = await Audio.Sound.createAsync(congrats);
                            await sound.playAsync();
                        })();
                    }

                    setEnded(true);
                    setTimerState("¡Has terminado!");
                    return
                }
                if (sound) {
                    (async () => {
                        await mediumBeepSound.replayAsync();
                    })();
                }

                setTimerState('Descanso');
                setTimeRemaining(restBetweenSets)
                setSerie(0)
                setSetNumber(prevSetNumber => prevSetNumber + 1)
            } else {
                if (timerState == "Ejercitar") {
                    if (sound) {
                        (async () => {
                            await mediumBeepSound.replayAsync();
                        })();
                    }
                    setTimerState('Descanso')
                    setTimeRemaining(restTime)
                } else {
                    if (sound) {
                        (async () => {
                            await longBeepSound.replayAsync();
                        })();
                    }

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
        if (sound) {
            (async () => {
                const { sound } = await Audio.Sound.createAsync(whistle);
                await sound.playAsync();
            })();
        }

        (async () => {
            try {
                if (!longBeepSound._loaded) await longBeepSound.loadAsync(long_beep);
                if (!mediumBeepSound._loaded) await mediumBeepSound.loadAsync(medium_beep);
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
            if (sound) {
                (async () => {
                    await mediumBeepSound.replayAsync();
                })();
            }

            setTimeRemaining(restBetweenSets);
            setTotalTimeRemaining(prevTTR => prevTTR + restBetweenSets + (activeTime - timeRemaining));
            setTimerState("Descanso");
            setSerie(prevS => prevS - 1);
            return;
        }

        /* Backward from "Descanso" moving set */
        if (serie === 0 && timerState === "Descanso") {
            if (sound) {
                (async () => {
                    await longBeepSound.replayAsync();
                })();
            }

            setTimeRemaining(activeTime);
            setTotalTimeRemaining(prevTTR => prevTTR + activeTime + (restBetweenSets - timeRemaining));
            setTimerState("Ejercitar");
            setSerie(series);
            setSetNumber(prevSet => prevSet - 1);
            return;
        }

        /* Backward from "Ejercitar" */
        if (timerState === "Ejercitar") {
            if (sound) {
                (async () => {
                    await mediumBeepSound.replayAsync();
                })();
            }

            setTimeRemaining(restTime);
            setTotalTimeRemaining(prevTTR => prevTTR + restTime + (activeTime - timeRemaining));
            setTimerState("Descanso");
            setSerie(prevS => prevS - 1);
            return;
        }

        /* Backward from "Descanso" */
        if (timerState === "Descanso") {
            if (sound) {
                (async () => {
                    await longBeepSound.replayAsync();
                })();
            }

            setTimeRemaining(activeTime);
            setTotalTimeRemaining(prevTTR => prevTTR + activeTime + (restTime - timeRemaining));
            setTimerState("Ejercitar");
            return;
        }

        /* Backward from finish */
        if (timerState === "¡Has terminado!") {
            if (sound) {
                (async () => {
                    await longBeepSound.replayAsync();
                })();
            }

            setTimeRemaining(activeTime);
            setTotalTimeRemaining(prevTTR => prevTTR + activeTime);
            setTimerState("Ejercitar");
            setForwardDisabled(false)
            setEnded(false);
            return;
        }
    };

    const handleGoForward = () => {
        setTimeRemaining(0);
        setTotalTimeRemaining(prevTTR => prevTTR - timeRemaining);
    }

    const handleRepeat = () => {
        setIsRunning(false);
        setEnded(false);
        setTimerState('Preparación');
        setTimeRemaining(prepTime);
        setSerie(0);
        setSetNumber(1);
        setControlsDisabled(false);
        setBackwardDisabled(true);
        setForwardDisabled(false);
        setTotalTimeRemaining(totalTime);
    }

    const handleToggleSound = () => {
        setSound(sound => !sound);
    };

    const handleToggleControls = () => {
        setAllDisabled(ds => !ds)
    }

    const getBgColor = (): string => {
        const equalities: { [key: string]: string; } = {
            "Preparación": backgroundColors.prepTime,
            "Ejercitar": backgroundColors.activeTime,
            "Descanso": backgroundColors.restTime,
            "¡Has terminado!": "#212121"
        }
        return equalities[timerState]
    }

    return (
        <View style={[{ backgroundColor: getBgColor() }, styles.timer]}>
            <View style={styles.countdowninfo}>

                <View style={styles.header}>

                    <TouchableOpacity onPress={handleToggleControls}>
                        {
                            allDisabled ? (
                                <Lock />
                            ) : (
                                <Unlock />
                            )
                        }
                    </TouchableOpacity>

                    <Text style={styles.totaltimeremaining}>{formatTimeSeconds(totalTimeRemaining)}</Text>

                    <TouchableOpacity onPress={handleToggleSound} disabled={allDisabled || soundDisabled}>
                        {
                            sound ? (
                                <On disabled={allDisabled || soundDisabled} />
                            ) : (
                                <Off disabled={allDisabled || soundDisabled} />
                            )
                        }
                    </TouchableOpacity>

                </View>

                {link && (
                    <YoutubePlayer videoID={link}></YoutubePlayer>
                )}

                <View style={styles.countdownContainer}>
                    <Text style={styles.timerstate}>{timerState}</Text>
                    <Text
                        style={styles.countdown}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                    >{formatTimeSeconds(timeRemaining)}</Text>
                </View>
            </View>



            <View style={styles.timerinfo}>

                <View style={styles.setsseries}>
                    <View style={styles.subinfo}>
                        <Text style={{ color: '#FFFFFF' }}>Serie</Text>
                        <Text style={{ color: '#FFFFFF' }}>{serie}/{series}</Text>
                    </View>
                    <View style={styles.subinfo}>
                        <Text style={{ color: '#FFFFFF' }}>Set</Text>
                        <Text style={{ color: '#FFFFFF' }}>{setNumber}/{sets}</Text>
                    </View>
                </View>


                <View style={styles.controls}>

                    <TouchableOpacity onPress={handleGoBackward} disabled={allDisabled || backwardDisabled}>
                        <Backward disabled={allDisabled || backwardDisabled} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleTogglePause} disabled={allDisabled || controlsDisabled || ended}>
                        {
                            isRunning ? (
                                <Pause disabled={allDisabled || controlsDisabled} />
                            ) : (
                                <Play disabled={allDisabled || controlsDisabled} />
                            )
                        }
                    </TouchableOpacity>
                    {
                        ended ? (
                            <TouchableOpacity onPress={handleRepeat}>
                                <Repeat />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handleGoForward} disabled={allDisabled || forwardDisabled}>
                                <Forward disabled={allDisabled || forwardDisabled} />
                            </TouchableOpacity>
                        )
                    }


                </View>
            </View>
        </View >
    );
}