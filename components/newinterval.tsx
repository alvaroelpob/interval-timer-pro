import { StatusBar, View, Text, TextInput, Button } from 'react-native';
import { useState } from 'react'
import containers from '../StyleSheets/containers';
import styles from '../StyleSheets/newinterval'
import Countdown from './countdown';

export default function Newinterval() {

    const [sent, setSent] = useState(false)

    const [prepTime, setPrepTime] = useState("")
    const [series, setSeries] = useState("")
    const [activeTime, setActiveTime] = useState("")
    const [restTime, setRestTime] = useState("")


    const [sets, setSets] = useState("")
    const [restBetweenSets, setRestBetweenSets] = useState("")

    const handleTextChange1 = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setPrepTime(numericValue);
    };

    const handleTextChange2 = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setSeries(numericValue);
    };

    const handleTextChange3 = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setActiveTime(numericValue);
    };

    const handleTextChange4 = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setRestTime(numericValue);
    };

    const handleTextChange5 = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setSets(numericValue);
    };

    const handleTextChange6 = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setRestBetweenSets(numericValue);
    };

    const handleClickStart = () => {
        setSent(true)
    }

    return (
        <View style={containers.main}>
            <StatusBar />
            {
                sent ?
                    (
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
                                    onChangeText={handleTextChange1}
                                    keyboardType="numeric" />
                            </View>

                            <View style={styles.create}>
                                <Text>Series</Text>
                                <TextInput
                                    value={series}
                                    onChangeText={handleTextChange2}
                                    keyboardType="numeric" />
                            </View>

                            <View style={styles.create}>
                                <Text>Activo</Text>
                                <TextInput
                                    value={activeTime}
                                    onChangeText={handleTextChange3}
                                    keyboardType="numeric" />
                            </View>

                            <View style={styles.create}>
                                <Text>Descanso</Text>
                                <TextInput
                                    value={restTime}
                                    onChangeText={handleTextChange4}
                                    keyboardType="numeric" />
                            </View>

                            <View style={styles.create}>
                                <Text>Sets</Text>
                                <TextInput
                                    value={sets}
                                    onChangeText={handleTextChange5}
                                    keyboardType="numeric" />
                            </View>

                            <View style={styles.create}>
                                <Text>Descanso entre Sets</Text>
                                <TextInput
                                    value={restBetweenSets}
                                    onChangeText={handleTextChange6}
                                    keyboardType="numeric" />
                            </View>

                            <Button title="Create Interval Timer" onPress={handleClickStart} />
                        </>
                    )
            }
        </View >
    )
}