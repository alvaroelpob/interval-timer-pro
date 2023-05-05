import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import { useState, useEffect } from 'react'
import { ArrayDB, SettingsT } from './utils/types';
import { openDatabase, Database } from 'expo-sqlite';
import normalizer from './utils/normalizer';

/* Components */
import Newinterval from './Screens/newinterval';
import Saved from './Screens/saved';
import Settings from './Screens/settings';

/* Icons */
import Plus from './assets/svg/circleplus';
import Bookmark from './assets/svg/bookmark';
import Gear from './assets/svg/gear';
import Lupa from './assets/svg/lupa';
import Close from './assets/svg/close';


export default function App() {
  const [workoutsDB] = useState<Database>(openDatabase('workouts.db'));

  const [workouts, setWorkouts] = useState<ArrayDB>([]);

  const [showNav, setShowNav] = useState<boolean>(true)
  const [showSearch, setShowSearch] = useState<boolean>(true);

  const [openSearch, setOpenSearch] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>("")


  const Tab = createBottomTabNavigator();

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
            backgroundColor: '#010101',
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
              return <Text style={{ color: "#FFFFFF" }}>Crear</Text>
            } else if (route.name === 'Guardados') {
              return <Text style={{ color: "#FFFFFF" }}>Guardados</Text>
            } else if (route.name === "Configuración") {
              return <Text style={{ color: "#FFFFFF" }}>Configuración</Text>
            }
          },

          headerStyle: {
            backgroundColor: '#010101',
          },

          headerTitleStyle: {
            color: "#FFFFFF"
          },

          headerRight: () => {
            if (route.name === "Guardados" && openSearch) {
              return (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    style={{ flex: 1, color: "#FFFFFF" }}
                    placeholder="Buscar..."
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

          headerTitle: openSearch ? "" : route.name,

          headerBackTitleVisible: false,
        })}
      >
        <Tab.Screen
          name="Crear"
          children={() => (
            <Newinterval
              setShowNav={setShowNav}
            />
          )}
        />
        <Tab.Screen
          name="Guardados"
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