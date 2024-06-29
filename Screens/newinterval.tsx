import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Text, ScrollView, Modal, TouchableOpacity, Animated } from 'react-native';
import { useRoute, RouteProp, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundColors, WorkoutFormated } from '../utils/types';
import { APPTHEME } from '../lib/constants';
import { useTranslation } from 'react-i18next';

/* Utils */
import { normalizeDate } from '../utils/normalizer';
import isYoutubeLink from '../utils/isYoutubeLink';
import getVideoId from '../utils/getVideoID';

/* Styles */
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/newinterval';

/* Components */
import Crate from '../components/Screens/NewInterval/Crate';
import CrateInput from '../components/Screens/NewInterval/CrateInput';
import TimeSelector from '../components/Inputs/timeselector';
import NumberSelector from '../components/Inputs/numberselector';
import Countdown from '../Subscreens/countdown';

export default function NewInterval({ setShowNav }: { setShowNav: Function }) {
    const route: RouteProp<{ params: { interval: WorkoutFormated } }, 'params'> = useRoute();
    const isFocused = useIsFocused();
    const { t } = useTranslation();
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

    const [soundDisabled, setSoundDisabled] = useState<boolean>(false)
    const [backgroundColors, setBackgroundColors] = useState<BackgroundColors>(APPTHEME.DEFAULT_COLORS)

    const shakeAnimationPrepTime = useRef(new Animated.Value(0)).current;
    const shakeAnimationActiveTime = useRef(new Animated.Value(0)).current;
    const shakeAnimationRestTime = useRef(new Animated.Value(0)).current;
    const shakeAnimationRestBetweenSets = useRef(new Animated.Value(0)).current;
    const shakeAnimationLink = useRef(new Animated.Value(0)).current;

    const shakeAnimation = (component: Animated.Value) => {
        Animated.sequence([
            Animated.timing(component, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(component, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(component, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(component, { toValue: 0, duration: 100, useNativeDriver: true })
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

    const handleClickStart = async () => {
        if (prepTime === "00:00:00") return shakeAnimation(shakeAnimationPrepTime);

        if (activeTime === "00:00:00") return shakeAnimation(shakeAnimationActiveTime);

        if (restTime === "00:00:00") return shakeAnimation(shakeAnimationRestTime);

        if (sets !== 1 && restBetweenSets === "00:00:00") return shakeAnimation(shakeAnimationRestBetweenSets);

        if (link.length > 0 && !isYoutubeLink(link)) return shakeAnimation(shakeAnimationLink);

        const volumeSetting = await AsyncStorage.getItem('volume');
        if (volumeSetting === null) {
            setSoundDisabled(true);
        } else {
            setSoundDisabled(JSON.parse(volumeSetting));
        }

        const backgroundColorsSetting = await AsyncStorage.getItem('backgroundColors');
        if (backgroundColorsSetting === null) {
            setBackgroundColors(APPTHEME.DEFAULT_COLORS)
        } else {
            setBackgroundColors(JSON.parse(backgroundColorsSetting));
        }

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
                        soundDisabled={soundDisabled}
                        backgroundColors={backgroundColors}
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

                        <Crate
                            label={t("inputs.prep")}
                            handleTouched={handleTouched}
                            currentValue={prepTime}
                            valueChanger={setPrepTime}
                            shakeAnimation={shakeAnimationPrepTime}
                            isMandatory={true}
                        />

                        <Crate
                            label={t("inputs.series")}
                            handleTouched={handleTouched}
                            currentValue={series}
                            valueChanger={setSeries}
                            isMandatory={false}
                        />

                        <Crate
                            label={t("inputs.work")}
                            handleTouched={handleTouched}
                            currentValue={activeTime}
                            valueChanger={setActiveTime}
                            shakeAnimation={shakeAnimationActiveTime}
                            isMandatory={true}
                        />

                        <Crate
                            label={t("inputs.rest")}
                            handleTouched={handleTouched}
                            currentValue={restTime}
                            valueChanger={setRestTime}
                            shakeAnimation={shakeAnimationRestTime}
                            isMandatory={true}
                        />

                        <Crate
                            label={t("inputs.sets")}
                            handleTouched={handleTouched}
                            currentValue={sets}
                            valueChanger={setSets}
                            isMandatory={false}
                        />

                        {sets > 1 && (
                            <Crate
                                label={t("inputs.restbtwsets")}
                                handleTouched={handleTouched}
                                currentValue={restBetweenSets}
                                valueChanger={setRestBetweenSets}
                                shakeAnimation={shakeAnimationRestBetweenSets}
                                isMandatory={true}
                            />
                        )}

                        <CrateInput
                            label={t("inputs.video")}
                            setter={setLink}
                            shakeAnimation={shakeAnimationLink}
                            isMandatory={false}
                        />

                        <TouchableOpacity onPress={handleClickStart} style={styles.button}>
                            <Text style={styles.text}>{t("start")}</Text>
                        </TouchableOpacity>

                    </ScrollView>
                )
            }
        </View>
    );
}