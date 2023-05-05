import { Database } from "expo-sqlite";
import { ScrollView, View, Text, Switch, TouchableOpacity } from "react-native";

import styles from '../StyleSheets/settings'
import containers from "../StyleSheets/containers";
import { useEffect, useState } from "react";
import ArrowRight from "../assets/svg/arrowright";

import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  workoutsDB: Database;
  setWorkouts: Function;
}

export default function Settings({ workoutsDB, setWorkouts }: Props) {
  const [volume, setVolume] = useState<boolean>(false);

  useEffect(() => {
    const retrieveSettings = async () => {
      try {
        const savedVolume = await AsyncStorage.getItem('volume');
        if (savedVolume !== null) {
          setVolume(JSON.parse(savedVolume));
        }
      } catch (error) {
        console.log('Error retrieving settings:', error);
      }
    };

    retrieveSettings();
  }, []);

  const toggleSwitch = async (setting: string) => {
    switch (setting) {
      case 'volume':
        const newVolume = !volume;
        setVolume(newVolume);
        await AsyncStorage.setItem('volume', JSON.stringify(newVolume));
        break;
    }
  };

  const importTrainings = () => {

  }

  const exportTrainings = () => {

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
  }

  return (
    <ScrollView style={containers.main}>
      <View style={styles.boxes}>

        <View style={styles.header}>
          <Text style={styles.headertext}>Preferencias</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.subbox}>
            <Text style={styles.setting}>Volumen</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#e47474' }}
              thumbColor={volume ? '#ef4234' : '#f4f3f4'}
              onValueChange={() => toggleSwitch('volume')}
              value={volume}
            />
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.headertext}>Zona sensible</Text>
        </View>

        <View style={styles.dangerbox}>
          <View style={styles.subbox}>
            <Text style={styles.setting}>Importar entrenamientos</Text>
            <TouchableOpacity onPress={importTrainings}>
              <ArrowRight color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator}></View>

          <View style={styles.subbox}>
            <Text style={styles.setting}>Exportar entrenamientos</Text>
            <TouchableOpacity onPress={exportTrainings}>
              <ArrowRight color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator}></View>

          <View style={styles.subbox}>
            <Text style={styles.setting}>Eliminar entrenamientos</Text>
            <TouchableOpacity onPress={dropTrainings}>
              <ArrowRight color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator}></View>

          <View style={styles.subbox}>
            <Text style={styles.setting}>Restablecer ajustes</Text>
            <TouchableOpacity onPress={dropSettings}>
              <ArrowRight color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}