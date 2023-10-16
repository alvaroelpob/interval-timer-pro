import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Plus from "../../assets/svg/plus";
import OctopusMainButton from "./button";

interface Props {
    onPress?: () => void;
}

export default function OctopusButton({ onPress }: Props) {

    const [showArms, setShowArms] = useState<boolean>(false);

    const handleOpenSubButtons = () => {

    };

    return (
        <View style={styles.container}>
            <OctopusMainButton />

            {showArms && (
                <>
                    <TouchableOpacity onPress={() => { }} style={[styles.btn, styles.btn1]}>
                        <Text style={styles.buttonText}><Plus /></Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={[styles.btn, styles.btn2]}>
                        <Text style={styles.buttonText}><Plus /></Text>
                    </TouchableOpacity>
                </>
            )}
        </View >
    );
}

const size = 40;
const mainButton = {
    size: 50,
    position: {
        bottom: 20,
        right: 20
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderColor: "#FF00FF",
        borderWidth: 3,
    },
    btn: {
        position: "absolute",
        borderRadius: size / 2,
        backgroundColor: '#5d5cff',
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btn1: {
        bottom: mainButton.position.bottom,
        right: mainButton.position.right,
    },
    btn2: {
        bottom: mainButton.position.bottom,
        right: mainButton.position.right,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
    },
});