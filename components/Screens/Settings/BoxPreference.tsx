import { View, Pressable, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import SquareColor from "../../Misc/squarecolor";
import React from "react";

enum STATES {
    PREPARATION = "prep",
    REST = "rest",
    ACTIVE = "work"
}

interface Props {
    label: string;
    text: STATES;
    color: string;
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
    setEditing: React.Dispatch<React.SetStateAction<STATES>>;
};

export default function BoxPreference({ label, text, color, setShowPicker, setEditing }: Props) {

    const handleChangeColor = () => {
        setShowPicker(true);
        setEditing(text);
    };

    return (
        <View style={styles.subbox}>
            <Text style={styles.setting}>{label}</Text>
            <Pressable onPress={handleChangeColor} style={styles.setCX}>
                <SquareColor color={color} />
                <Text style={styles.color}>{color}</Text>
            </Pressable>
        </View>
    );
};

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
        alignItems: "flex-end"
    },
    color: {
        color: '#ffffff'
    },
    setCX: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 3
    },
});