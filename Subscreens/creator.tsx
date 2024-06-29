import { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Text, ScrollView, Modal, TouchableOpacity, BackHandler, Animated } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { timeToSeconds } from '../utils/normalizer';
import { useTranslation } from 'react-i18next';
import { SQLiteDatabase } from 'expo-sqlite';

/* Styles */
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/newinterval';

/* Components */
import Crate from '../components/Screens/NewInterval/Crate';
import CrateInput from '../components/Screens/NewInterval/CrateInput';
import TimeSelector from '../components/Inputs/timeselector';
import NumberSelector from '../components/Inputs/numberselector'

export default function Creator({ workoutsDB, setCreatingModal, setWorkouts }: { workoutsDB: SQLiteDatabase, setCreatingModal: Function, setWorkouts: Function }) {
    const headerHeight = useHeaderHeight();
    const { t } = useTranslation();

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [name, setName] = useState<string>("")
    const [prepTime, setPrepTime] = useState<string>("00:00:00");
    const [series, setSeries] = useState<number>(1);
    const [activeTime, setActiveTime] = useState<string>("00:00:00");
    const [restTime, setRestTime] = useState<string>("00:00:00");
    const [sets, setSets] = useState<number>(1);
    const [restBetweenSets, setRestBetweenSets] = useState<string>("00:00:00");

    const [setter, setSetter] = useState<Function>(() => { });
    const [currentVal, setCurrentVal] = useState<string>("");

    const shakeAnimationName = useRef<Animated.Value>(new Animated.Value(0)).current;
    const shakeAnimationPrepTime = useRef<Animated.Value>(new Animated.Value(0)).current;
    const shakeAnimationActiveTime = useRef<Animated.Value>(new Animated.Value(0)).current;
    const shakeAnimationRestTime = useRef<Animated.Value>(new Animated.Value(0)).current;
    const shakeAnimationRestBetweenSets = useRef<Animated.Value>(new Animated.Value(0)).current;

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, []);

    const shakeAnimation = (component: Animated.Value) => {
        Animated.sequence([
            Animated.timing(component, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(component, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(component, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(component, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    };

    const handleBackPress = () => {
        return true
    }

    const handleTouched = (currentValues: string | number, fnSetter: Function) => {
        setModalVisible(true)
        setSetter(() => (val: string) => fnSetter(val))
        setCurrentVal(`${currentValues}`)
    }

    const handleClickStart = async () => {
        if (name.length === 0) return shakeAnimation(shakeAnimationName);

        if (prepTime === "00:00:00") return shakeAnimation(shakeAnimationPrepTime);

        if (activeTime === "00:00:00") return shakeAnimation(shakeAnimationActiveTime);

        if (restTime === "00:00:00") return shakeAnimation(shakeAnimationRestTime);

        if (sets !== 1 && restBetweenSets === "00:00:00") return shakeAnimation(shakeAnimationRestBetweenSets);

        workoutsDB.execSync(`
            CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                prepTime INTEGER,
                activeTime INTEGER,
                restTime INTEGER,
                restBetweenSets INTEGER,
                series INTEGER,
                sets INTEGER
            )`
        );

        try {
            const result = await workoutsDB.runAsync("INSERT INTO workouts (name, prepTime, activeTime, restTime, restBetweenSets, series, sets) VALUES (?, ?, ?, ?, ?, ?, ?)", name, timeToSeconds(prepTime), timeToSeconds(activeTime), timeToSeconds(restTime), timeToSeconds(restBetweenSets), series, sets);

            setWorkouts((prev: any) => [...prev, {
                id: result.lastInsertRowId,
                name: name,
                prepTime: timeToSeconds(prepTime),
                activeTime: timeToSeconds(activeTime),
                restTime: timeToSeconds(restTime),
                restBetweenSets: timeToSeconds(restBetweenSets),
                series: series,
                sets: sets
            }]);
        } catch (error) {
            return false;
        }

        setCreatingModal(false)
    }


    return (
        <View style={[{ marginTop: headerHeight, paddingTop: 10 }, containers.main]}>
            <StatusBar />

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

                <CrateInput
                    label={t("inputs.name")}
                    setter={setName}
                    shakeAnimation={shakeAnimationName}
                    isMandatory={false}
                />


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

                <TouchableOpacity onPress={handleClickStart} style={styles.button}>
                    <Text style={styles.text}>{t("inputs.create")} Interval Timer</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
