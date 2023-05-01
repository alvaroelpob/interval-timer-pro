import { Database } from "expo-sqlite";
import { ScrollView, View, Text, Switch, TouchableOpacity } from "react-native";

import styles from '../StyleSheets/settings'
import containers from "../StyleSheets/containers";
import { useState } from "react";
import ArrowRight from "../assets/svg/arrowright";

import { SettingsT } from "../utils/types"

type Props = {
  workoutsDB: Database;
  setWorkouts: Function;
  settings: SettingsT;
  setSettings: React.Dispatch<React.SetStateAction<SettingsT>>;
}

export default function Settings({ workoutsDB, setWorkouts, settings, setSettings }: Props) {
  const [volume, setVolume] = useState<boolean>(settings.volume === 1 ? true : false);
  const [vibration, setVibration] = useState<boolean>(settings.volume === 1 ? true : false);

  const toggleSwitch = (setting: string) => {
    switch (setting) {
      case 'volume':
        setVolume(prev => !prev);
        setSettings(previous => { return { ...previous, volume: { ...previous }.volume === 1 ? 0 : 1 } })
        break
      case 'vibration':
        setVibration(prev => !prev);
        setSettings(previous => { return { ...previous, vibration: { ...previous }.vibration === 1 ? 0 : 1 } })
        break
    }
  }

  const dropTrainings = () => {
    workoutsDB.transaction((tx: any) => {
      tx.executeSql(`
        DELETE FROM workouts
      `);
    });
    setWorkouts([]);
  }

  return (
    <ScrollView style={containers.main}>
      <View style={styles.boxes}>
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

          <View style={styles.separator}></View>

          <View style={styles.subbox}>
            <Text style={styles.setting}>Vibración</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#e47474' }}
              thumbColor={vibration ? '#ef4234' : '#f4f3f4'}
              onValueChange={() => toggleSwitch('vibration')}
              value={vibration}
            />
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.subbox}>
            <Text style={styles.setting}>Eliminar entrenamientos</Text>
            <TouchableOpacity onPress={dropTrainings}>
              <ArrowRight />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}