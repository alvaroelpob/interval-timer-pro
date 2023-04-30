import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Text, ScrollView, Modal, TouchableOpacity, Animated, TextInput } from 'react-native';
import { useRoute, RouteProp, useIsFocused } from '@react-navigation/native';
import { normalizeDate } from '../utils/normalizer';
import { WorkoutFormated } from '../utils/types';

/* Utils */
import isYoutubeLink from '../utils/isYoutubeLink';
import getVideoId from '../utils/getVideoID';

/* Styles */
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/newinterval';

/* Components */
import TimeSelector from './timeselector';
import NumberSelector from './numberselector'
import Countdown from './countdown';

export default function NewInterval({ setShowNav }: { setShowNav: Function }) {
    const route: RouteProp<{ params: { interval: WorkoutFormated } }, 'params'> = useRoute();
    const isFocused = useIsFocused();
    const interval = route.params?.interval;

    const [renderCountdown, setRenderCountdown] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [prepTime, setPrepTime] = useState<string>("00:00:05");
    const [series, setSeries] = useState<number>(5);
    const [activeTime, setActiveTime] = useState<string>("00:00:10");
    const [restTime, setRestTime] = useState<string>("00:00:25");
    const [sets, setSets] = useState<number>(2);
    const [restBetweenSets, setRestBetweenSets] = useState<string>("00:01:00");
    const [link, setLink] = useState<string>("");

    const [setter, setSetter] = useState<Function>(() => { });
    const [currentVal, setCurrentVal] = useState<string>("");

    const shakeAnimationLink = useRef(new Animated.Value(0)).current;

    const shakeAnimation = () => {
        Animated.sequence([
            Animated.timing(shakeAnimationLink, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimationLink, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimationLink, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimationLink, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    };

    useEffect(() => {
        if (interval) {
            setPrepTime(normalizeDate(interval.prepTime));
            setSeries(interval.series);
            setActiveTime(normalizeDate(interval.activeTime));
            setRestTime(normalizeDate(interval.restTime));
            setSets(interval.sets);
            setRestBetweenSets(normalizeDate(interval.restBetweenSets));
        }
    }, [interval]);

    useEffect(() => {
        if (!isFocused && renderCountdown) {
            setRenderCountdown(false);
        }
    }, [isFocused]);

    const handleTouched = (currentValues: string | number, fnSetter: Function) => {
        setModalVisible(true)
        setSetter(() => (val: string) => fnSetter(val))
        setCurrentVal(`${currentValues}`)
    }

    const handleClickStart = () => {
        if (link.length > 0 && !isYoutubeLink(link)) return shakeAnimation();
        setRenderCountdown(true);
    };

    return (
        <View style={containers.main}>
            <StatusBar />
            {
                renderCountdown ? (
                    <Countdown
                        prepTime={prepTime}
                        activeTime={activeTime}
                        restTime={restTime}
                        restBetweenSets={restBetweenSets}
                        series={series}
                        sets={sets}
                        link={getVideoId(link)}
                        setRenderCountdown={setRenderCountdown}
                        setShowNav={setShowNav}
                    />
                ) : (

                    <ScrollView>

                        <Modal
                            animationType="none"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}>
                            <View style={styles.modalContainer}>
                                {
                                    /^\d{2}:\d{2}:\d{2}$/.test(currentVal) ? (
                                        <TimeSelector currentValue={currentVal as string} setter={setter} setModalVisible={setModalVisible} />
                                    ) : (
                                        <NumberSelector currentValue={currentVal as string} setter={setter} setModalVisible={setModalVisible} />
                                    )
                                }
                            </View>
                        </Modal>

                        <TouchableOpacity onPress={() => handleTouched(prepTime, setPrepTime)}>
                            <View style={styles.create}>
                                <Text style={styles.label}>Preparación*</Text>
                                <Text style={styles.labeltext}>{prepTime}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(series, setSeries)}>
                            <View style={styles.create}>
                                <Text style={styles.label}>Series*</Text>
                                <Text style={styles.labeltext}>{series}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(activeTime, setActiveTime)}>
                            <View style={styles.create}>
                                <Text style={styles.label}>Ejercitar*</Text>
                                <Text style={styles.labeltext}>{activeTime}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(restTime, setRestTime)}>
                            <View style={styles.create}>
                                <Text style={styles.label}>Descanso*</Text>
                                <Text style={styles.labeltext}>{restTime}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(sets, setSets)}>
                            <View style={styles.create}>
                                <Text style={styles.label}>Sets</Text>
                                <Text style={styles.labeltext}>{sets}</Text>
                            </View>
                        </TouchableOpacity>

                        {
                            sets > 1 ? (
                                <TouchableOpacity onPress={() => handleTouched(restBetweenSets, setRestBetweenSets)}>
                                    <View style={styles.create}>
                                        <Text style={styles.label}>Descanso entre sets*</Text>
                                        <Text style={styles.labeltext}>{restBetweenSets}</Text>
                                    </View>
                                </TouchableOpacity>
                            ) : null
                        }

                        <Animated.View style={[styles.createWinput, { transform: [{ translateX: shakeAnimationLink }] }]}>
                            <Text style={styles.label}>Video</Text>
                            <TextInput
                                onChangeText={(text) => setLink(text)}
                                style={styles.input}
                                cursorColor="#000000"
                            />
                        </Animated.View>

                        <TouchableOpacity onPress={handleClickStart} style={styles.button}>
                            <Text style={styles.text}>Start Interval Timer</Text>
                        </TouchableOpacity>

                    </ScrollView>
                )
            }
        </View>
    );
}