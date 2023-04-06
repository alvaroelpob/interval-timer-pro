import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, Button, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { normalizeDate } from '../utils/normalizer';
import { WorkoutFormated } from '../utils/types';

/* Styles */
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/newinterval';

/* Components */
import TimeSelector from './timeselector';
import NumberSelector from './numberselector'
import Countdown from './countdown';

export default function NewInterval() {
    const route: RouteProp<{ params: { interval: WorkoutFormated } }, 'params'> = useRoute();
    const interval = route.params?.interval;

    const [renderCountdown, setRenderCountdown] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [prepTime, setPrepTime] = useState<string>("00:00:05");
    const [series, setSeries] = useState<number>(5);
    const [activeTime, setActiveTime] = useState<string>("00:00:10");
    const [restTime, setRestTime] = useState<string>("00:00:25");
    const [sets, setSets] = useState<number>(2);
    const [restBetweenSets, setRestBetweenSets] = useState<string>("00:01:00");

    const [setter, setSetter] = useState<Function>(() => { });
    const [currentVal, setCurrentVal] = useState<string>("");

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

    const handleTouched = (currentValues: string | number, fnSetter: Function) => {
        setModalVisible(true)
        setSetter(() => (val: string) => fnSetter(val))
        setCurrentVal(`${currentValues}`)
    }

    const handleClickStart = () => {
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
                        setRenderCountdown={setRenderCountdown}
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
                                <Text>Preparación</Text>
                                <Text>{prepTime}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(series, setSeries)}>
                            <View style={styles.create}>
                                <Text>Series</Text>
                                <Text>{series}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(activeTime, setActiveTime)}>
                            <View style={styles.create}>
                                <Text>Activo</Text>
                                <Text>{activeTime}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(restTime, setRestTime)}>
                            <View style={styles.create}>
                                <Text>Descanso</Text>
                                <Text>{restTime}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(sets, setSets)}>
                            <View style={styles.create}>
                                <Text>Sets</Text>
                                <Text>{sets}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleTouched(restBetweenSets, setRestBetweenSets)}>
                            <View style={styles.create}>
                                <Text>Descanso entre sets</Text>
                                <Text>{restBetweenSets}</Text>
                            </View>
                        </TouchableOpacity>

                        <Button
                            title="Create Interval Timer"
                            onPress={handleClickStart}
                        />
                    </ScrollView>
                )
            }
        </View>
    );
}