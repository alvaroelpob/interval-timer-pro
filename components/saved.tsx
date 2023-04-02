import { View, Text, ScrollView } from "react-native";
import styles from '../StyleSheets/saved'
import containers from '../StyleSheets/containers';
import Clock from "../assets/svg/clock";
import Dumbbell from "../assets/svg/dumbbell";
import Snooze from "../assets/svg/snooze";
import RepeatSnooze from "../assets/svg/repeatsnooze";
import normalizer from "../utils/normalizer";
import devdb from "../utils/devdb";

const guardados = normalizer(devdb)

export default function Saved() {
    return (
        <ScrollView style={containers.main}>
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
                                <Text style={styles.textinfo}>{interval.prepTime}</Text>
                            </View>

                            <View style={styles.element}>
                                <Dumbbell />
                                <Text style={styles.textinfo}>{interval.activeTime}</Text>
                            </View>

                            <View style={styles.element}>
                                <Snooze />
                                <Text style={styles.textinfo}>{interval.restTime}</Text>
                            </View>

                            <View style={styles.element}>
                                <RepeatSnooze />
                                <Text style={styles.textinfo}>{interval.restBetweenSets}</Text>
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
        </ScrollView>
    )
}