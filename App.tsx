import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { useState, useEffect } from 'react'
import { ArrayDB } from './utils/types';
import { openDatabase, Database } from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import normalizer from './utils/normalizer';

/* Components */
import Newinterval from './Screens/newinterval';
import Saved from './Screens/saved';
import Settings from './Screens/settings';
import Title from './components/title';


/* Icons */
import Plus from './assets/svg/circleplus';
import Bookmark from './assets/svg/bookmark';
import Gear from './assets/svg/gear';
import Lupa from './assets/svg/lupa';
import Close from './assets/svg/close';
import { APPTHEME } from './lib/constants';

/* i18next */
import "./i18n/i18n.config";
import { useTranslation } from "react-i18next";
import { changeLanguage } from 'i18next';

export default function App() {
    const [workoutsDB] = useState<Database>(openDatabase('workouts.db'));

    const [workouts, setWorkouts] = useState<ArrayDB>([]);

    const [showNav, setShowNav] = useState<boolean>(true)
    const [showSearch, setShowSearch] = useState<boolean>(true);

    const [openSearch, setOpenSearch] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")

    const { t } = useTranslation();
    const Tab = createBottomTabNavigator();

    useEffect(() => {
        const retrieveLanguage = async () => {
            try {
                const storedLang = await AsyncStorage.getItem('language');

                if (storedLang !== null) {
                    changeLanguage(JSON.parse(storedLang));
                }
            } catch (error) {
                console.log('Error retrieving language:', error);
            }
        };

        retrieveLanguage();
    }, [])

    useEffect(() => {
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

        workoutsDB.transaction(tx => {
            tx.executeSql('SELECT * FROM workouts', [],
                (txObj, resultSet) => setWorkouts(resultSet.rows._array),
                (txObj, error) => { console.log(error); return false }
            );
        });

    }, [workoutsDB]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        return () => backHandler.remove();
    }, []);

    const handleBackPress = () => {
        setSearchQuery("")
        setOpenSearch(false)
        return true
    }

    const handleSearch = () => {
        setOpenSearch(prev => !prev)
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: showNav,
                    tabBarStyle: {
                        display: showNav ? undefined : "none",
                        backgroundColor: APPTHEME.TABBAR,
                        borderTopColor: "none"
                    },

                    tabBarVisibilityAnimationConfig: {
                        show: {
                            animation: 'timing',
                            config: {
                                duration: 1
                            }
                        },
                        hide: {
                            animation: 'timing',
                            config: {
                                duration: 1
                            }
                        },
                    },

                    keyboardHidesTabBar: true,

                    tabBarHideOnKeyboard: true,

                    tabBarIcon: ({ focused, color, size }) => {

                        if (route.name === 'Crear') {
                            return <Plus focused={focused} />
                        } else if (route.name === 'Guardados') {
                            return <Bookmark focused={focused} />
                        } else if (route.name === "Configuración") {
                            return <Gear focused={focused} />
                        }
                    },

                    tabBarLabel: ({ focused, color }) => {

                        if (route.name === 'Crear') {
                            return <Text style={{ color: "#FFFFFF" }}>{t("bottomBar.create")}</Text>
                        } else if (route.name === 'Guardados') {
                            return <Text style={{ color: "#FFFFFF" }}>{t("bottomBar.saved")}</Text>
                        } else if (route.name === "Configuración") {
                            return <Text style={{ color: "#FFFFFF" }}>{t("bottomBar.config")}</Text>
                        }
                    },

                    headerStyle: {
                        backgroundColor: APPTHEME.HEADER,
                    },

                    headerRight: () => {
                        if (route.name === "Guardados" && openSearch) {
                            return (
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TextInput
                                        style={{ flex: 1, color: "#FFFFFF" }}
                                        placeholder={t("search")}
                                        placeholderTextColor="#FFFFFF"
                                        autoFocus={true}
                                        onBlur={handleSearch}
                                        value={searchQuery}
                                        onChangeText={(text) => setSearchQuery(text)}
                                    />

                                    <TouchableOpacity onPress={handleSearch} style={{ marginRight: 20 }}>
                                        <Close />
                                    </TouchableOpacity>
                                </View>
                            );
                        } else if (route.name === "Guardados" && showSearch) {
                            return (
                                <TouchableOpacity onPress={handleSearch} style={{ marginRight: 20 }}>
                                    <Lupa />
                                </TouchableOpacity>
                            );
                        } else {
                            return null;
                        }
                    },

                    headerBackTitleVisible: false,
                })}
            >
                <Tab.Screen
                    name="Crear"
                    options={{
                        headerTitle: () => <Title screen={"create"} />
                    }}
                    children={() => (
                        <Newinterval
                            setShowNav={setShowNav}
                        />
                    )}
                />
                <Tab.Screen
                    name="Guardados"
                    options={{
                        headerTitle: () => <Title screen={"saved"} openSearch={openSearch} />
                    }}
                    children={() => (
                        <Saved
                            workoutsDB={workoutsDB}
                            workouts={normalizer(workouts)}
                            setWorkouts={setWorkouts}
                            setShowSearch={setShowSearch}
                            searchQuery={searchQuery}
                        />
                    )}
                />
                <Tab.Screen
                    name="Configuración"
                    options={{
                        headerTitle: () => <Title screen={"config"} />
                    }}
                    children={() => (
                        <Settings
                            workoutsDB={workoutsDB}
                            setWorkouts={setWorkouts}
                        />
                    )}
                />
            </Tab.Navigator>
        </NavigationContainer >
    );
}