import { View, Text } from "react-native";
import styles from '../StyleSheets/saved'
import Clock from "../assets/svg/clock";
import Dumbbell from "../assets/svg/dumbbell";
import Snooze from "../assets/svg/snooze";
import RepeatSnooze from "../assets/svg/repeatsnooze";
import normalizer from "../utils/normalizer";

const database = [
    {
        id: "1",
        name: "Entrenamiento 1",
        prepTime: 5,
        activeTime: 8,
        restTime: 25,
        restBetweenSets: 60,
        series: 7,
        sets: 4
    },
    {
        id: "2",
        name: "Entrenamiento 2",
        prepTime: 10,
        activeTime: 12,
        restTime: 30,
        restBetweenSets: 90,
        series: 5,
        sets: 3
    },
    {
        id: "3",
        name: "Entrenamiento 3",
        prepTime: 7,
        activeTime: 10,
        restTime: 20,
        restBetweenSets: 45,
        series: 8,
        sets: 5
    }
];

const guardados = normalizer(database)

export default function Saved() {
    return (
        <>
            {
                guardados.map(interval => (
                    <View key={interval.id} style={styles.item}>
                        <View style={styles.header}>
                            <Text style={styles.headertext}>{interval.name}</Text>
                        </View>

                        <View style={styles.line} />

                        <View style={styles.iconelement}>
                            <View style={styles.element}>
                                <Clock />
                                <Text style={styles.textinfo}>{interval.prepTime}s</Text>
                            </View>

                            <View style={styles.element}>
                                <Dumbbell />
                                <Text style={styles.textinfo}>{interval.activeTime}s</Text>
                            </View>

                            <View style={styles.element}>
                                <Snooze />
                                <Text style={styles.textinfo}>{interval.restTime}s</Text>
                            </View>

                            <View style={styles.element}>
                                <RepeatSnooze />
                                <Text style={styles.textinfo}>{interval.restBetweenSets}s</Text>
                            </View>
                        </View>

                        <View style={styles.infoelement}>
                            <Text style={styles.textinfo}>Series: {interval.series}</Text>
                            <Text style={styles.textinfo}>Sets: {interval.sets}</Text>
                        </View>
                        <Text style={styles.textinfo}>Total time: {interval.totalTime}</Text>
                    </View>
                ))
            }
        </>
    )
}