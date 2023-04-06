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


export default function App() {
  const [db, setDb] = useState<Database>(openDatabase('workouts.db'));
  const [workouts, setWorkouts] = useState<ArrayDB>([]);

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
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Crear') {
              return <Plus gray={!focused} />
            } else if (route.name === 'Guardados') {
              return <Bookmark gray={!focused} />
            } else if (route.name === "Configuración") {
              return <Gear gray={!focused} />
            }

          },
        })}>
        <Tab.Screen name="Crear" children={() => <Newinterval />} />
        <Tab.Screen name="Guardados" children={() => <Saved workouts={workouts} />} />
        <Tab.Screen name="Configuración" children={() => <Settings db={db} setWorkouts={setWorkouts} />} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}