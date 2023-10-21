import { ScrollView, View, Text, Switch, TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageAccessFramework, readAsStringAsync, writeAsStringAsync } from 'expo-file-system';
import { getDocumentAsync } from 'expo-document-picker';
import { APPTHEME } from "../lib/constants";
import { Dropdown } from 'react-native-element-dropdown';

/* Components */
import ColorPickerComponent from "../components/colorpicker";
import SquareColor from "../components/squarecolor";

/* Types */
import { Database } from "expo-sqlite";
import { ArrayDB, BackgroundColors } from "../utils/types";

/* Styles */
import styles from '../StyleSheets/settings'
import containers from "../StyleSheets/containers";

/* Icons */
import ArrowRight from "../assets/svg/arrowright";

import i18n, { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

type Props = {
    workoutsDB: Database;
    setWorkouts: Function;
}

enum STATES {
    PREPARATION = "prep",
    REST = "rest",
    ACTIVE = "work"
}

const availableLanguages = [
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
    { label: "Català", value: "ca" }
];

export default function Settings({ workoutsDB, setWorkouts }: Props) {
    const [showPicker, setShowPicker] = useState<boolean>(false);
    const [editing, setEditing] = useState<STATES>();

    const [volume, setVolume] = useState<boolean>(true);
    const [backgroundColors, setBackgroundColors] = useState<BackgroundColors>(APPTHEME.DEFAULT_COLORS);

    const { t } = useTranslation();

    useEffect(() => {
        const retrieveSettings = async () => {
            try {
                const savedVolume = await AsyncStorage.getItem('volume');
                const savedBgColors = await AsyncStorage.getItem('backgroundColors');

                if (savedVolume !== null) {
                    setVolume(JSON.parse(savedVolume));
                }
                if (savedBgColors !== null) {
                    console.log(savedBgColors)
                    setBackgroundColors(JSON.parse(savedBgColors));
                }
            } catch (error) {
                console.log('Error retrieving settings:', error);
            }
        };

        retrieveSettings();
    }, []);

    const getCurrentLanguage = () => {
        const equalities: { [key: string]: string; } = {
            "en": "English",
            "es": "Español",
            "ca": "Català"
        }
        return equalities[i18n.resolvedLanguage as string]
    };

    const saveFile = async (data: ArrayDB) => {
        const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (permissions.granted) {
            // Get the directory uri that was approved
            let directoryUri = permissions.directoryUri;
            // Create file and pass it's SAF URI
            await StorageAccessFramework.createFileAsync(directoryUri, "workoutsexport", "application/json").then(async (fileUri) => {
                // Save data to newly created file
                await writeAsStringAsync(fileUri, JSON.stringify(data), { encoding: "utf8" });
            }).catch(error => {
                console.log(error);
            });
        } else {
            alert("You must allow permission to save.")
        }
    }

    const toggleSwitch = async (setting: string) => {
        switch (setting) {
            case 'volume':
                const newVolume = !volume;
                setVolume(newVolume);
                await AsyncStorage.setItem('volume', JSON.stringify(newVolume));
                break;
        }
    };

    const handleChangeLanguage = async (lang: string) => {
        await AsyncStorage.setItem('language', JSON.stringify(lang));
        changeLanguage(lang);
    };

    const saveBgColors = async () => {
        await AsyncStorage.setItem('backgroundColors', JSON.stringify(backgroundColors));
    };

    const importTrainings = async () => {
        try {
            const result = await getDocumentAsync({ type: 'application/json', copyToCacheDirectory: false });
            if (result.type === 'success') {
                const content = await readAsStringAsync(result.uri);
                try {
                    const newWorkouts: ArrayDB = JSON.parse(content);
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
                    });

                    newWorkouts.forEach(newWorkout => {
                        workoutsDB.transaction(tx => {
                            tx.executeSql(`
                                INSERT INTO workouts (name, prepTime, activeTime, restTime, restBetweenSets, series, sets) VALUES (?, ?, ?, ?, ?, ?, ?)
                            `, [newWorkout.name, newWorkout.prepTime, newWorkout.activeTime, newWorkout.restTime, newWorkout.restBetweenSets, newWorkout.series, newWorkout.sets],
                                (txObj, resultSet) => {
                                    setWorkouts((prev: any) => [...prev, {
                                        id: resultSet.insertId,
                                        name: newWorkout.name,
                                        prepTime: newWorkout.prepTime,
                                        activeTime: newWorkout.activeTime,
                                        restTime: newWorkout.restTime,
                                        restBetweenSets: newWorkout.restBetweenSets,
                                        series: newWorkout.series,
                                        sets: newWorkout.sets
                                    }])
                                },
                                (txObj, error) => { console.log(error); return false }
                            );
                        });
                    })
                } catch (err) {
                    alert("File must be a valid json")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const exportTrainings = () => {
        workoutsDB.transaction(tx => {
            tx.executeSql('SELECT * FROM workouts', [],
                (txObj, resultSet) => {
                    if (resultSet.rows._array.length === 0) {
                        alert("No workouts to export")
                    } else {
                        saveFile(resultSet.rows._array);
                    }
                },
                (txObj, error) => { console.log(error); return false }
            );
        });
    }

    const dropTrainings = () => {
        workoutsDB.transaction((tx: any) => {
            tx.executeSql(`
                DELETE FROM workouts
            `);
        });
        setWorkouts([]);
    }

    const dropSettings = async () => {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys));
        setVolume(true);
        setBackgroundColors(APPTHEME.DEFAULT_COLORS);
    }

    const SubBox = ({ text, color }: { text: STATES, color: string }) => {

        const handleChangeColor = () => {
            setShowPicker(true);
            setEditing(text);
        };

        return (
            <View style={styles.subbox}>
                <Text style={styles.setting}>{t("states." + text)}</Text>
                <Pressable onPress={handleChangeColor} style={styles.setCX}>
                    <SquareColor color={color} />
                    <Text style={styles.color}>{color}</Text>
                </Pressable>
            </View>
        )
    };

    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View style={containers.main}>

            <Modal
                animationType="none"
                transparent={true}
                visible={showPicker}
                onRequestClose={() => {
                    setShowPicker(false);
                    saveBgColors()
                }}
            >
                <View
                    style={{
                        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)'
                    }}
                >
                    <Pressable
                        style={{ ...StyleSheet.absoluteFillObject }}
                        onPress={() => setShowPicker(false)}
                    />

                    <ColorPickerComponent
                        setShowPicker={setShowPicker}
                        editing={editing as STATES}
                        backgroundColors={backgroundColors}
                        setBackgroundColors={setBackgroundColors}
                    />
                </View>
            </Modal>

            <ScrollView>
                <View style={styles.boxes}>

                    {/******************************************************************/}

                    <View style={styles.header}>
                        <Text style={styles.headertext}>{t("config.preferences")}</Text>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.subbox}>
                            <Text style={styles.setting}>{t("config.volume")}</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#e47474' }}
                                thumbColor={volume ? '#ef4234' : '#f4f3f4'}
                                onValueChange={() => toggleSwitch('volume')}
                                value={volume}
                            />
                        </View>

                        <View style={styles.subbox}>
                            <Text style={styles.setting}>{t("config.lang")}</Text>
                            <Dropdown
                                style={styles.dropdown}
                                selectedTextStyle={styles.selectedTextStyle}
                                placeholderStyle={styles.selectedTextStyle}
                                data={availableLanguages}
                                maxHeight={200}
                                labelField="label"
                                valueField="value"
                                placeholder={getCurrentLanguage()}
                                onChange={item => {
                                    handleChangeLanguage(item.value);
                                }}
                                renderItem={renderItem}
                            />
                        </View>
                    </View>

                    {/******************************************************************/}

                    <View style={styles.header}>
                        <Text style={styles.headertext}>{t("config.bgcolor")}</Text>
                    </View>

                    <View style={styles.box}>
                        <SubBox
                            text={STATES.PREPARATION}
                            color={backgroundColors.prepTime}
                        />

                        <View style={styles.separator}></View>

                        <SubBox
                            text={STATES.ACTIVE}
                            color={backgroundColors.activeTime}
                        />

                        <View style={styles.separator}></View>

                        <SubBox
                            text={STATES.REST}
                            color={backgroundColors.restTime}
                        />
                    </View>

                    {/******************************************************************/}

                    <View style={styles.header}>
                        <Text style={styles.headertext}>{t("config.sensible")}</Text>
                    </View>

                    <View style={styles.dangerbox}>
                        <View style={styles.subbox}>
                            <Text style={styles.setting}>{t("config.importWorkouts")}</Text>
                            <TouchableOpacity onPress={importTrainings}>
                                <ArrowRight color="#000000" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.separator}></View>

                        <View style={styles.subbox}>
                            <Text style={styles.setting}>{t("config.exportWorkouts")}s</Text>
                            <TouchableOpacity onPress={exportTrainings}>
                                <ArrowRight color="#000000" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.separator}></View>

                        <View style={styles.subbox}>
                            <Text style={styles.setting}>{t("config.deleteWorkouts")}</Text>
                            <TouchableOpacity onPress={dropTrainings}>
                                <ArrowRight color="#000000" />
                            </TouchableOpacity>
                        </View>


                        <View style={styles.separator}></View>

                        <View style={styles.subbox}>
                            <Text style={styles.setting}>{t("config.resetSettings")}</Text>
                            <TouchableOpacity onPress={dropSettings}>
                                <ArrowRight color="#000000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}