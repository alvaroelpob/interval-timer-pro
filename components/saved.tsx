import { View, Text, TouchableOpacity, Modal, FlatList, TextInput, ScrollView } from "react-native";
import { useState, useCallback } from "react";
import styles from '../StyleSheets/saved'
import containers from '../StyleSheets/containers';
import buttons from "../StyleSheets/buttons";
import { NewArrayDB, WorkoutFormated } from "../utils/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Database } from "expo-sqlite";

const ITEMS_PER_PAGE = 10;

/* Icons */
import Clock from "../assets/svg/clock";
import Dumbbell from "../assets/svg/dumbbell";
import Snooze from "../assets/svg/snooze";
import RepeatSnooze from "../assets/svg/repeatsnooze";
import Plus from "../assets/svg/plus";
import Creator from "./creator";
import Sad from "../assets/svg/sad";

export default function Saved({ db, workouts, setWorkouts, setShowSearch, searchQuery }: { db: Database, workouts: NewArrayDB, setWorkouts: Function, setShowSearch: React.Dispatch<React.SetStateAction<boolean>>, searchQuery: string }) {
    const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>()
    const [creatingModal, setCreatingModal] = useState(false);
    const [page, setPage] = useState(1);

    const startCountdown = (interval: WorkoutFormated) => {
        navigation.navigate('Crear' as never, {
            interval: interval,
        } as never)
    };

    const handleCreateInterval = () => {
        setCreatingModal(true);
        setShowSearch(false)
    };

    const renderWorkoutItem = ({ item: interval, index }: { item: WorkoutFormated, index: number }) => {
        if (
            index < (page - 1) * ITEMS_PER_PAGE ||
            index >= page * ITEMS_PER_PAGE ||
            (searchQuery !== "" && !interval.name.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
            return null;
        }

        return (
            <TouchableOpacity style={styles.item} onPress={() => startCountdown(interval)}>
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
            </TouchableOpacity>
        )
    }

    return (
        <View style={containers.main}>
            <Modal
                animationType="none"
                transparent={true}
                visible={creatingModal}
                onRequestClose={() => {
                    setShowSearch(prev => !prev)
                    setCreatingModal(!creatingModal);
                }}>
                <Creator db={db} setCreatingModal={setCreatingModal} setWorkouts={setWorkouts} />
            </Modal>

            {
                workouts.length === 0 ? (
                    <View style={containers.empty}>
                        <Text style={{ color: "#FFFFFF" }}>No tienes ningún entrenamiento guardado.</Text>
                        <Sad />
                    </View>
                ) : (
                    <FlatList
                        data={
                            searchQuery !== "" ? (
                                workouts.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            ) : workouts
                        }
                        renderItem={renderWorkoutItem}
                        keyExtractor={(item) => item.id.toString()}
                        initialScrollIndex={(page - 1) * ITEMS_PER_PAGE}
                        ListFooterComponent={
                            workouts.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())).length > ITEMS_PER_PAGE ? (
                                <View style={styles.pagination}>
                                    <TouchableOpacity
                                        style={styles.pageButton}
                                        disabled={page === 1}
                                        onPress={() => setPage(page - 1)}
                                    >
                                        <Text>{'<'}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#fff' }}>{page}/{Math.ceil(workouts.length / ITEMS_PER_PAGE)}</Text>
                                    <TouchableOpacity
                                        style={styles.pageButton}
                                        disabled={workouts.length <= page * ITEMS_PER_PAGE}
                                        onPress={() => setPage(page + 1)}
                                    >
                                        <Text>{'>'}</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null
                        }
                    />
                )
            }

            <TouchableOpacity onPress={handleCreateInterval} style={buttons.buttonContainer}>
                <Text style={buttons.buttonText}><Plus /></Text>
            </TouchableOpacity>
        </View>
    )
}