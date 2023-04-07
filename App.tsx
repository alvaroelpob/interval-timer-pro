import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { ArrayDB } from './utils/types';
import { openDatabase, Database } from 'expo-sqlite';

/* Components */
import Newinterval from './components/newinterval';
import Saved from './components/saved';
import Settings from './components/settings';

/* Icons */
import Plus from './assets/svg/plus';
import Bookmark from './assets/svg/bookmark';
import Gear from './assets/svg/gear';
import { Text } from 'react-native';


export default function App() {
  const [db, setDb] = useState<Database>(openDatabase('workouts.db'));
  const [workouts, setWorkouts] = useState<ArrayDB>([]);
  const [showNav, setShowNav] = useState<boolean>(true)

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    db.transaction(tx => {
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

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM workouts', [],
        (txObj, resultSet) => setWorkouts(resultSet.rows._array),
        (txObj, error) => { console.log(error); return false }
      );
    });

  }, [db]);
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
          }
        })}>
        <Tab.Screen name="Crear" children={() => <Newinterval setShowNav={setShowNav} />} />
        <Tab.Screen name="Guardados" children={() => <Saved workouts={workouts} />} />
        <Tab.Screen name="Configuración" children={() => <Settings db={db} setWorkouts={setWorkouts} />} />
      </Tab.Navigator>
    </NavigationContainer >
  );
}