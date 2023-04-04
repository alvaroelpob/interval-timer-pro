import React, { useState } from 'react';
import { StatusBar, View, Text, TextInput, Button, ScrollView, } from 'react-native';
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/newinterval';

import Countdown from './countdown';

export default function NewInterval({ db }: { db: any }) {
    const [sent, setSent] = useState(false);

    const [prepTime, setPrepTime] = useState('5');
    const [series, setSeries] = useState('3');
    const [activeTime, setActiveTime] = useState('8');
    const [restTime, setRestTime] = useState('15');
    const [sets, setSets] = useState('4');
    const [restBetweenSets, setRestBetweenSets] = useState('30');

    const handleTextChange = (setter: (value: string) => void) => (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setter(numericValue);
    };

    const handleClickStart = () => {
        setSent(true);
    };

    return (
        <ScrollView style={containers.main}>
            <StatusBar />
            {sent ? (
                <Countdown
                    prepTime={prepTime}
                    activeTime={activeTime}
                    restTime={restTime}
                    restBetweenSets={restBetweenSets}
                    series={series}
                    sets={sets}
                />
            ) : (
                <>
                    <View style={styles.create}>
                        <Text>Preparación</Text>
                        <TextInput
                            value={prepTime}
                            onChangeText={handleTextChange(setPrepTime)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.create}>
                        <Text>Series</Text>
                        <TextInput
                            value={series}
                            onChangeText={handleTextChange(setSeries)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.create}>
                        <Text>Activo</Text>
                        <TextInput
                            value={activeTime}
                            onChangeText={handleTextChange(setActiveTime)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.create}>
                        <Text>Descanso</Text>
                        <TextInput
                            value={restTime}
                            onChangeText={handleTextChange(setRestTime)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.create}>
                        <Text>Sets</Text>
                        <TextInput
                            value={sets}
                            onChangeText={handleTextChange(setSets)}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.create}>
                        <Text>Descanso entre Sets</Text>
                        <TextInput
                            value={restBetweenSets}
                            onChangeText={handleTextChange(setRestBetweenSets)}
                            keyboardType="numeric"
                        />
                    </View>

                    <Button
                        title="Create Interval Timer"
                        onPress={handleClickStart}
                    />
                </>
            )}
        </ScrollView>
    );
}