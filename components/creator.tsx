import React, { useState, useEffect } from 'react';
import { StatusBar, View, Text, ScrollView, Modal, TouchableOpacity, BackHandler } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

/* Styles */
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/newinterval';

/* Components */
import TimeSelector from './timeselector';
import NumberSelector from './numberselector'

export default function Creator() {
    const [modalVisible, setModalVisible] = useState(false);

    const [prepTime, setPrepTime] = useState<string>("00:00:00");
    const [series, setSeries] = useState<number>(1);
    const [activeTime, setActiveTime] = useState<string>("00:00:00");
    const [restTime, setRestTime] = useState<string>("00:00:00");
    const [sets, setSets] = useState<number>(1);
    const [restBetweenSets, setRestBetweenSets] = useState<string>("00:00:00");

    const [setter, setSetter] = useState<Function>(() => { });
    const [currentVal, setCurrentVal] = useState<string>("");

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, []);

    const handleBackPress = () => {
        return true
    }

    const handleTouched = (currentValues: string | number, fnSetter: Function) => {
        setModalVisible(true)
        setSetter(() => (val: string) => fnSetter(val))
        setCurrentVal(`${currentValues}`)
    }

    const handleClickStart = () => {

    }


    return (
        <View style={containers.main}>
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
                        <Text>Ejercitar</Text>
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

                {
                    sets > 1 ? (
                        <TouchableOpacity onPress={() => handleTouched(restBetweenSets, setRestBetweenSets)}>
                            <View style={styles.create}>
                                <Text>Descanso entre sets</Text>
                                <Text>{restBetweenSets}</Text>
                            </View>
                        </TouchableOpacity>
                    ) : null
                }

                <TouchableOpacity onPress={handleClickStart} style={styles.button}>
                    <Text style={styles.text}>Create Interval Timer</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}