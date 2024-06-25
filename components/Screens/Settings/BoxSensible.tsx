import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import ArrowRight from "../../../assets/svg/arrowright";

interface Props {
    label: string;
    onPress: () => void;
}

export default function BoxSensible({ label, onPress }: Props) {
    return (
        <View style={styles.subbox}>
            <Text style={styles.setting}>{label}</Text>
            <TouchableOpacity style={styles.settingBtn} onPress={onPress}>
                <ArrowRight color="#000000" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    subbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 5,
        height: 60,
    },
    setting: {
        color: '#ececec',
        fontSize: 14
    },
    settingBtn: {
        width: "30%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center"
    },
});