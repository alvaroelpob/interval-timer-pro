import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { formatTime } from '../../utils/normalizer';
import styles from '../../StyleSheets/selectors';
import { useTranslation } from 'react-i18next';
import Plus from '../../assets/svg/plus';
import Selector from './selector';

const hoursArray = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutesArray = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
const secondsArray = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

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

    const { t } = useTranslation();

    const saveTime = () => {
        setter(formatTime(hours, minutes, seconds));
        setModalVisible(false);
    }

    return (
        <View style={styles.modal}>
            <View style={styles.wheelpickers}>
                <Selector
                    number={hours}
                    setNumber={setHours}
                    minNumber={0}
                    maxNumber={24}
                ></Selector>
                <Selector
                    number={minutes}
                    setNumber={setMinutes}
                    minNumber={0}
                    maxNumber={59}
                ></Selector>
                <Selector
                    number={seconds}
                    setNumber={setSeconds}
                    minNumber={0}
                    maxNumber={59}
                ></Selector>
            </View>

            <TouchableOpacity onPress={saveTime} style={styles.button}>
                <Text style={{ color: "#FFFFFF", fontWeight: "500" }}>{t("save")}</Text>
            </TouchableOpacity>
        </View>
    );
}