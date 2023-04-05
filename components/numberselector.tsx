import { useState, useRef } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const numberArray = Array.from({ length: 99 }, (_, i) => i);

type Props = {
    currentValue: string;
    setter: Function;
    setModalVisible: Function;
};

export default function NumberSelector({ currentValue, setter, setModalVisible }: Props) {

    const [number, setNumber] = useState(+currentValue);

    const saveNumber = () => {
        setter(number);
        setModalVisible(false);
    };

    return (
        <>
            <View style={styles.container}>
                <WheelPickerExpo
                    selectedStyle={{ borderColor: '#202124', borderWidth: 2 }}
                    height={200}
                    width={100}
                    initialSelectedIndex={number}
                    items={numberArray.map(number => ({ label: `${number}`, value: number }))}
                    onChange={({ item }) => setNumber(item.value)}
                />

                <Button title='Save' onPress={saveNumber}></Button>

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