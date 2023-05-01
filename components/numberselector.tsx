import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import WheelPicker from 'react-native-wheely';

import styles from '../StyleSheets/selectors';

const numberArray = Array.from({ length: 100 }, (_, i) => i.toString()).slice(1);

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
        <View style={styles.modal}>
            <View style={styles.wheelpickers}>
                <WheelPicker
                    selectedIndex={number - 1 >= 0 ? number - 1 : 0}
                    options={numberArray}
                    selectedIndicatorStyle={{ borderRadius: 0, borderTopColor: '#393939', borderBottomColor: '#393939', borderTopWidth: 2, borderBottomWidth: 2, backgroundColor: 'none' }}
                    itemTextStyle={{ fontSize: 23, width: 35, textAlign: 'center', color: '#cfcfcf' }}
                    onChange={(index) => setNumber(index + 1)}
                    containerStyle={{ width: 90 }}
                />
            </View>
            
            <TouchableOpacity onPress={saveNumber} style={styles.button}>
                <Text>Guardar</Text>
            </TouchableOpacity>
        </View>
    );
}