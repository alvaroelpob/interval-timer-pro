import { ScrollView, View, Text, Button } from "react-native";

export default function Settings({ db }: { db: any }) {

  function addTrainings() {
    if (db) {
      db.transaction((tx: any) => {
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

      db.transaction((tx: any) => {
        tx.executeSql(`
          INSERT INTO workouts (id, name, prepTime, activeTime, restTime, restBetweenSets, series, sets) VALUES
            (1, 'Entrenamiento 1', 5, 8, 25, 60, 7, 4),
            (2, 'Entrenamiento 2', 10, 12, 30, 90, 5, 3),
            (3, 'Entrenamiento 3', 7, 10, 20, 45, 8, 5),
            (4, 'Entrenamiento 4', 8, 15, 30, 90, 6, 4),
            (5, 'Entrenamiento 5', 6, 12, 15, 30, 10, 3),
            (6, 'Entrenamiento 6', 5, 20, 45, 120, 4, 5),
            (7, 'Entrenamiento 7', 5, 12, 30, 90, 6, 4),
            (8, 'Entrenamiento 8', 10, 20, 45, 120, 4, 5),
            (9, 'Entrenamiento 9', 7, 15, 20, 60, 8, 3),
            (10, 'Entrenamiento 10', 8, 10, 30, 90, 4, 4),
            (11, 'Entrenamiento 11', 5, 15, 20, 45, 10, 3),
            (12, 'Entrenamiento 12', 10, 12, 45, 120, 6, 5),
            (13, 'Entrenamiento 13', 5, 8, 20, 60, 8, 4),
            (14, 'Entrenamiento 14', 7, 18, 30, 90, 5, 3),         
            (15, 'Entrenamiento 15', 10, 12, 45, 120, 6, 5),
            (16, 'Entrenamiento 16', 5, 10, 20, 60, 10, 3),
            (17, 'Entrenamiento 17', 7, 12, 30, 90, 8, 4),
            (18, 'Entrenamiento 18', 8, 15, 45, 120, 6, 5),
            (19, 'Entrenamiento 19', 7, 10, 20, 45, 8, 3),
            (20, 'Entrenamiento 20', 8, 12, 30, 90, 6, 4),
            (21, 'Entrenamiento 21', 6, 15, 25, 60, 10, 3),
            (22, 'Entrenamiento 22', 9, 18, 40, 120, 4, 5),
            (23, 'Entrenamiento 23', 5, 8, 15, 30, 12, 3),
            (24, 'Entrenamiento 24', 6, 12, 20, 60, 8, 4);
        `);
      });
    }
  }

  function dropTrainings() {
    if (db) {
      db.transaction((tx: any) => {
        tx.executeSql(`
          DROP TABLE workouts
        `);
      });
    }
  }

  return (
    <ScrollView>
      <View>
        <Text>Version 0.0.0</Text>
      </View>

      <View>
        <Text>Sonido</Text>
        <View>
          <Text> - Preparación</Text>
          <Text> - Activo:</Text>
          <Text> - Descanso:</Text>
          <Text> - Descanso entre series:</Text>
        </View>
      </View>

      <View>
        <Text>Colores</Text>
        <View>
          <Text> - Preparación</Text>
          <Text> - Activo:</Text>
          <Text> - Descanso:</Text>
          <Text> - Descanso entre series:</Text>
        </View>
      </View>

      <View>
        <Text>Controles</Text>
        <View>
          <Text> - Mostrar botones de navegación</Text>
          <Text> - Mostrar boton de silencio</Text>
        </View>
      </View>
      <Button title="Add testing trainings" onPress={addTrainings}></Button>
      <Button title="Drop trainings" onPress={dropTrainings}></Button>

    </ScrollView>
  )
}