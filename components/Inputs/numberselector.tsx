import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import styles from '../../StyleSheets/selectors';
import Selector from './selector';

const numberArray = Array.from({ length: 100 }, (_, i) => i.toString()).slice(1);

type Props = {
    currentValue: string;
    setter: Function;
    setModalVisible: Function;
};

export default function NumberSelector({ currentValue, setter, setModalVisible }: Props) {

    const [number, setNumber] = useState(+currentValue);

    const { t } = useTranslation();

    const saveNumber = () => {
        setter(number);
        setModalVisible(false);
    };

    return (
        <View style={styles.modal}>
            <View style={styles.wheelpickers}>
                <Selector
                    number={number}
                    setNumber={setNumber}
                    minNumber={0}
                    maxNumber={100}
                ></Selector>
            </View>

            <TouchableOpacity onPress={saveNumber} style={styles.button}>
                <Text style={{ color: "#FFFFFF", fontWeight: "500" }}>{t("save")}</Text>
            </TouchableOpacity>
        </View>
    );
}