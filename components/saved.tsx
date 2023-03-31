import { View, Text } from "react-native";
import styles from '../StyleSheets/saved'

const guardados = [
    {
        id: "1",
        name: "Training 1",
        prepTime: 5,
        activeTime: 8,
        restTime: 25,
        restBetweenSets: 60,
        series: 7,
        sets: 4
    },
    {
        id: "2",
        name: "Suspensiones",
        prepTime: 10,
        activeTime: 12,
        restTime: 30,
        restBetweenSets: 90,
        series: 5,
        sets: 3
    },
    {
        id: "3",
        name: "Pushups",
        prepTime: 7,
        activeTime: 10,
        restTime: 20,
        restBetweenSets: 45,
        series: 8,
        sets: 5
    }
];

export default function Saved() {
    return (
        <>
            {
                guardados.map(interval => (
                    <View key={interval.id} style={styles.item}>
                        <Text>{interval.name}</Text>
                    </View>
                ))
            }
        </>
    )
}