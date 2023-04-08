import { Database } from "expo-sqlite";
import { Button, View } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export default function Settings({ db, setWorkouts }: { db: Database, setWorkouts: Function }) {

  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>()

  function addTrainings() {
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

      tx.executeSql(`
        INSERT INTO workouts (name, prepTime, activeTime, restTime, restBetweenSets, series, sets) VALUES
          ('Entrenamiento 1', 5, 8, 25, 60, 7, 4),
          ('Entrenamiento 2', 10, 12, 30, 90, 5, 3),
          ('Entrenamiento 3', 7, 10, 20, 45, 8, 5),
          ('Entrenamiento 4', 8, 15, 30, 90, 6, 4),
          ('Entrenamiento 5', 6, 12, 15, 30, 10, 3),
          ('Entrenamiento 6', 5, 20, 45, 120, 4, 5),
          ('Entrenamiento 7', 5, 12, 30, 90, 6, 4),
          ('Entrenamiento 8', 10, 20, 45, 120, 4, 5),
          ('Entrenamiento 9', 7, 15, 20, 60, 8, 3),
          ('Entrenamiento 10', 8, 10, 30, 90, 4, 4),
          ('Entrenamiento 11', 5, 15, 20, 45, 10, 3),
          ('Entrenamiento 12', 10, 12, 45, 120, 6, 5),
          ('Entrenamiento 13', 5, 8, 20, 60, 8, 4),
          ('Entrenamiento 14', 7, 18, 30, 90, 5, 3),         
          ('Entrenamiento 15', 10, 12, 45, 120, 6, 5),
          ('Entrenamiento 16', 5, 10, 20, 60, 10, 3),
          ('Entrenamiento 17', 7, 12, 30, 90, 8, 4),
          ('Entrenamiento 18', 8, 15, 45, 120, 6, 5),
          ('Entrenamiento 19', 7, 10, 20, 45, 8, 3),
          ('Entrenamiento 20', 8, 12, 30, 90, 6, 4),
          ('Entrenamiento 21', 6, 15, 25, 60, 10, 3),
          ('Entrenamiento 22', 9, 18, 40, 120, 4, 5),
          ('Entrenamiento 23', 5, 8, 15, 30, 12, 3),
          ('Entrenamiento 24', 6, 12, 20, 60, 8, 4);
      `, [],
        (txObj, resultSet) => {
          tx.executeSql(`
            SELECT * FROM workouts
          `, [],
            (txObj, result) => {
              setWorkouts(result.rows._array);
            },
            (txObj, error) => { console.log(error); return false }
          );
        },
        (txObj, error) => { console.log(error); return false }
      );
    });
  }


  function dropTrainings() {
    db.transaction((tx: any) => {
      tx.executeSql(`
        DELETE FROM workouts
      `);
    });
    setWorkouts([]);
  }

  function makeFastCountdown() {
    navigation.navigate('Crear' as never, {
      interval: {
        id: 1,
        name: "Test training",
        prepTime: "00:00:05",
        activeTime: "00:00:05",
        restTime: "00:00:05",
        restBetweenSets: "00:00:05",
        series: 2,
        sets: 2
      }
    } as never)
  }

  return (
    <View>
      <Button title='Add testing trainings' onPress={addTrainings}></Button>
      <Button title='Drop trainings' onPress={dropTrainings}></Button>
      <Button title='Make fast countdown' onPress={makeFastCountdown}></Button>
    </View>
  );
}