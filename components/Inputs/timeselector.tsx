import { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import WheelPicker from 'react-native-wheely';
import { formatTime } from '../../utils/normalizer';
import styles from '../../StyleSheets/selectors';
import { useTranslation } from 'react-i18next';

const hoursArray = Array.from({ length: 24 }, (_, i) => i.toString());
const minutesArray = Array.from({ length: 60 }, (_, i) => i.toString());
const secondsArray = Array.from({ length: 60 }, (_, i) => i.toString());

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
                <WheelPicker
                    selectedIndex={hours}
                    options={hoursArray}
                    selectedIndicatorStyle={{ borderRadius: 0, borderTopColor: '#393939', borderBottomColor: '#393939', borderTopWidth: 2, borderBottomWidth: 2, backgroundColor: 'none' }}
                    itemTextStyle={{ fontSize: 22, width: 30, textAlign: 'center', color: '#cfcfcf' }}
                    onChange={(index) => setHours(index)}
                    containerStyle={{ width: 80 }}
                />
                <WheelPicker
                    selectedIndex={minutes}
                    options={minutesArray}
                    selectedIndicatorStyle={{ borderRadius: 0, borderTopColor: '#393939', borderBottomColor: '#393939', borderTopWidth: 2, borderBottomWidth: 2, backgroundColor: 'none' }}
                    itemTextStyle={{ fontSize: 22, width: 30, textAlign: 'center', color: '#cfcfcf' }}
                    onChange={(index) => setMinutes(index)}
                    containerStyle={{ width: 80 }}
                />
                <WheelPicker
                    selectedIndex={seconds}
                    options={secondsArray}
                    selectedIndicatorStyle={{ borderRadius: 0, borderTopColor: '#393939', borderBottomColor: '#393939', borderTopWidth: 2, borderBottomWidth: 2, backgroundColor: 'none' }}
                    itemTextStyle={{ fontSize: 22, width: 30, textAlign: 'center', color: '#cfcfcf' }}
                    onChange={(index) => setSeconds(index)}
                    containerStyle={{ width: 80 }}
                />
            </View>

            <TouchableOpacity onPress={saveTime} style={styles.button}>
                <Text style={{ color: "#FFFFFF", fontWeight: "500" }}>{t("save")}</Text>
            </TouchableOpacity>
        </View>
    );
}