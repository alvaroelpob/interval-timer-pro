import { useState, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { formatTime } from '../utils/normalizer';

const hoursArray = Array.from({ length: 24 }, (_, i) => i);
const minutesArray = Array.from({ length: 60 }, (_, i) => i);
const secondsArray = Array.from({ length: 60 }, (_, i) => i);

type Props = {
    currentValue: string;
    setter: Function;
    setModalVisible: Function;
};

export default function TimeSelector({ currentValue, setter, setModalVisible }: Props) {
    const importedTime = currentValue.split(':');

    const [hours, setHours] = useState(+importedTime[0]);
    const [minutes, setMinutes] = useState(+importedTime[1]);
    const [seconds, setSeconds] = useState(+importedTime[2]);

    const saveTime = () => {
        setter(formatTime(hours, minutes, seconds));
        setModalVisible(false);
    }

    return (
        <>
            <View style={styles.container}>
                <WheelPickerExpo
                    selectedStyle={{ borderColor: '#202124', borderWidth: 2 }}
                    height={200}
                    width={100}
                    initialSelectedIndex={hours}
                    items={hoursArray.map(number => ({ label: `${number}`, value: number }))}
                    onChange={({ item }) => setHours(item.value)}
                />

                <WheelPickerExpo
                    selectedStyle={{ borderColor: '#202124', borderWidth: 2 }}
                    height={200}
                    width={100}
                    initialSelectedIndex={minutes}
                    items={minutesArray.map(number => ({ label: `${number}`, value: number }))}
                    onChange={({ item }) => setMinutes(item.value)}
                />

                <WheelPickerExpo
                    selectedStyle={{ borderColor: '#202124', borderWidth: 2 }}
                    height={200}
                    width={100}
                    initialSelectedIndex={seconds}
                    items={secondsArray.map(number => ({ label: `${number}`, value: number }))}
                    onChange={({ item }) => setSeconds(item.value)}
                />

                <Button title='Save time' onPress={saveTime}></Button>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'nowrap',
        rowGap: 5
    }
});