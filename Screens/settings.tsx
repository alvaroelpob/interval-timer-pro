import { ScrollView, View, Text, Switch, Modal, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageAccessFramework, readAsStringAsync, writeAsStringAsync } from 'expo-file-system';
import { getDocumentAsync } from 'expo-document-picker';
import { APPTHEME } from "../lib/constants";
import { Dropdown } from 'react-native-element-dropdown';

/* Components */
import ColorPickerComponent from "../components/Inputs/colorpicker";
import BoxPreference from "../components/Screens/Settings/BoxPreference";
import BoxSensible from "../components/Screens/Settings/BoxSensible";
import Header from "../components/Screens/Settings/Header";
import Separator from "../components/Screens/Settings/Separator";

/* Types */
import { SQLiteDatabase } from "expo-sqlite";
import { ArrayDB, BackgroundColors } from "../utils/types";

/* Styles */
import styles from '../StyleSheets/settings'
import containers from "../StyleSheets/containers";

/* Translations */
import i18n, { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";

type Props = {
    workoutsDB: SQLiteDatabase;
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
    const [editing, setEditing] = useState<STATES>(STATES.ACTIVE);

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
            if (!result.canceled) {
                const content = await readAsStringAsync(result.assets[0].uri);
                try {
                    const newWorkouts: ArrayDB = JSON.parse(content);

                    workoutsDB.execSync(`
                        CREATE TABLE IF NOT EXISTS workouts (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            prepTime INTEGER,
                            activeTime INTEGER,
                            restTime INTEGER,
                            restBetweenSets INTEGER,
                            series INTEGER,
                            sets INTEGER
                        )`
                    );

                    newWorkouts.forEach(async newWorkout => {
                        const result = await workoutsDB.runAsync(
                            `INSERT INTO workouts (name, prepTime, activeTime, restTime, restBetweenSets, series, sets) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                            newWorkout.name, newWorkout.prepTime, newWorkout.activeTime, newWorkout.restTime, newWorkout.restBetweenSets, newWorkout.series, newWorkout.sets
                        );

                        setWorkouts((prev: any) => [...prev, {
                            id: result.lastInsertRowId,
                            name: newWorkout.name,
                            prepTime: newWorkout.prepTime,
                            activeTime: newWorkout.activeTime,
                            restTime: newWorkout.restTime,
                            restBetweenSets: newWorkout.restBetweenSets,
                            series: newWorkout.series,
                            sets: newWorkout.sets
                        }]);
                    })
                } catch (err) {
                    alert("File must be a valid json");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const exportTrainings = async () => {
        const result: ArrayDB = await workoutsDB.getAllAsync("SELECT * FROM workouts");

        if (result.length === 0) {
            alert("No workouts to export")
        } else {
            saveFile(result);
        }
    }

    const dropTrainings = async () => {
        await workoutsDB.runAsync("DELETE FROM workouts")
        setWorkouts([]);
    }

    const dropSettings = async () => {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys));
        setVolume(true);
        setBackgroundColors(APPTHEME.DEFAULT_COLORS);
    }

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
                        onPress={() => {
                            setShowPicker(false);
                            saveBgColors();
                        }}
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

                    <Header label={t("config.preferences")} />

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

                    <Header label={t("config.bgcolor")} />

                    <View style={styles.box}>
                        <BoxPreference
                            label={t("states." + STATES.PREPARATION)}
                            text={STATES.PREPARATION}
                            color={backgroundColors.prepTime}
                            setShowPicker={setShowPicker}
                            setEditing={setEditing}
                        />

                        <Separator />

                        <BoxPreference
                            label={t("states." + STATES.ACTIVE)}
                            text={STATES.ACTIVE}
                            color={backgroundColors.activeTime}
                            setShowPicker={setShowPicker}
                            setEditing={setEditing}
                        />

                        <Separator />

                        <BoxPreference
                            label={t("states." + STATES.REST)}
                            text={STATES.REST}
                            color={backgroundColors.restTime}
                            setShowPicker={setShowPicker}
                            setEditing={setEditing}
                        />
                    </View>

                    {/******************************************************************/}

                    <Header label={t("config.sensible")} />

                    <View style={styles.dangerbox}>
                        <BoxSensible
                            label={t("config.importWorkouts")}
                            onPress={importTrainings}
                        />

                        <Separator />

                        <BoxSensible
                            label={t("config.exportWorkouts")}
                            onPress={exportTrainings}
                        />

                        <Separator />

                        <BoxSensible
                            label={t("config.deleteWorkouts")}
                            onPress={dropTrainings}
                        />

                        <Separator />

                        <BoxSensible
                            label={t("config.resetSettings")}
                            onPress={dropSettings}
                        />
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}
