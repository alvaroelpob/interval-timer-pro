import { useState, useEffect, useRef } from 'react';
import { StatusBar, View, Text, ScrollView, Modal, TouchableOpacity, BackHandler, TextInput, Animated } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { Database } from 'expo-sqlite';
import { timeToSeconds } from '../utils/normalizer';

/* Styles */
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/newinterval';

/* Components */
import TimeSelector from './timeselector';
import NumberSelector from './numberselector'

export default function Creator({ workoutsDB, setCreatingModal, setWorkouts }: { workoutsDB: Database, setCreatingModal: Function, setWorkouts: Function }) {
    const headerHeight = useHeaderHeight();

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

    const handleClickStart = () => {
        if (name.length === 0) return shakeAnimation(shakeAnimationName);

        if (prepTime === "00:00:00") return shakeAnimation(shakeAnimationPrepTime);

        if (activeTime === "00:00:00") return shakeAnimation(shakeAnimationActiveTime);

        if (restTime === "00:00:00") return shakeAnimation(shakeAnimationRestTime);

        if (sets !== 1 && restBetweenSets === "00:00:00") return shakeAnimation(shakeAnimationRestBetweenSets);

        workoutsDB.transaction(tx => {
            tx.executeSql(`
              CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                prepTime INTEGER,
                activeTime INTEGER,
                restTime INTEGER,
                restBetweenSets INTEGER,
                series INTEGER,
                sets INTEGER
              )
            `);

            tx.executeSql(`
                INSERT INTO workouts (name, prepTime, activeTime, restTime, restBetweenSets, series, sets) VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [name, timeToSeconds(prepTime), timeToSeconds(activeTime), timeToSeconds(restTime), timeToSeconds(restBetweenSets), series, sets],
                (txObj, resultSet) => {
                    setWorkouts((prev: any) => [...prev, {
                        id: resultSet.insertId,
                        name: name,
                        prepTime: timeToSeconds(prepTime),
                        activeTime: timeToSeconds(activeTime),
                        restTime: timeToSeconds(restTime),
                        restBetweenSets: timeToSeconds(restBetweenSets),
                        series: series,
                        sets: sets
                    }])
                },
                (txObj, error) => { console.log(error); return false }
            );
        });

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

                <Animated.View style={[styles.createWinput, { transform: [{ translateX: shakeAnimationName }] }]}>
                    <Text style={styles.label}>Nombre</Text>
                    <TextInput
                        onChangeText={(text) => setName(text)}
                        style={styles.input}
                        cursorColor="#000000"
                    />
                </Animated.View>

                <TouchableOpacity onPress={() => handleTouched(prepTime, setPrepTime)}>
                    <Animated.View style={[styles.create, { transform: [{ translateX: shakeAnimationPrepTime }] }]}>
                        <Text style={styles.label}>Preparación</Text>
                        <Text style={styles.labeltext}>{prepTime}</Text>
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleTouched(series, setSeries)}>
                    <View style={styles.create}>
                        <Text style={styles.label}>Series</Text>
                        <Text style={styles.labeltext}>{series}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleTouched(activeTime, setActiveTime)}>
                    <Animated.View style={[styles.create, { transform: [{ translateX: shakeAnimationActiveTime }] }]}>
                        <Text style={styles.label}>Ejercitar</Text>
                        <Text style={styles.labeltext}>{activeTime}</Text>
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleTouched(restTime, setRestTime)}>
                    <Animated.View style={[styles.create, { transform: [{ translateX: shakeAnimationRestTime }] }]}>
                        <Text style={styles.label}>Descanso</Text>
                        <Text style={styles.labeltext}>{restTime}</Text>
                    </Animated.View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleTouched(sets, setSets)}>
                    <View style={styles.create}>
                        <Text style={styles.label}>Sets</Text>
                        <Text style={styles.labeltext}>{sets}</Text>
                    </View>
                </TouchableOpacity>

                {sets > 1 && (
                    <TouchableOpacity onPress={() => handleTouched(restBetweenSets, setRestBetweenSets)}>
                        <Animated.View style={[styles.create, { transform: [{ translateX: shakeAnimationRestBetweenSets }] }]}>
                            <Text style={styles.label}>Descanso entre sets</Text>
                            <Text style={styles.labeltext}>{restBetweenSets}</Text>
                        </Animated.View>
                    </TouchableOpacity>
                )}

                <TouchableOpacity onPress={handleClickStart} style={styles.button}>
                    <Text style={styles.text}>Create Interval Timer</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}