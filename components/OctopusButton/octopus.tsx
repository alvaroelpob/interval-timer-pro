import { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, Animated, Pressable } from "react-native";
import { useIsFocused } from '@react-navigation/native';

/* Components */
import OctopusMainButton from "./button";

/* Icons */
import New from "../../assets/svg/new";
import Upload from "../../assets/svg/upload";

const size = 60;
const mainButton = {
    size: 60,
    position: {
        bottom: 20,
        right: 20
    }
}

interface Props {
    onPress1?: () => void;
    onPress2?: () => void;
}

export default function OctopusButton({ onPress1, onPress2 }: Props) {

    const isFocused = useIsFocused();
    const [showArms, setShowArms] = useState<boolean>(false);

    const armsAnimatedValue = useRef(new Animated.Value(0)).current;

    const openArms = () => {
        Animated.timing(armsAnimatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const closeArms = () => {
        Animated.timing(armsAnimatedValue, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setShowArms(false));
    }


    const valueBtn1 = armsAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(mainButton.position.bottom * 4.4)],
    });

    const animatedStylesBtn1 = {
        transform: [
            { translateX: valueBtn1 }
        ],
    };

    const valueBtn2 = armsAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -(mainButton.position.right * 4.4)],
    });

    const animatedStylesBtn2 = {
        transform: [
            { translateY: valueBtn2 }
        ],
    };

    useEffect(() => {
        if (showArms && !isFocused) {
            armsAnimatedValue.setValue(0);
            setShowArms(false);
        }
    }, [isFocused]);

    const handleShowArms = () => {
        if (showArms) {
            closeArms();
        } else {
            setShowArms(true)
            openArms();
        }
    };

    return (
        <Pressable style={styles.container} onPress={closeArms}>
            <OctopusMainButton onPress={handleShowArms} />

            {showArms && (
                <>
                    <Animated.View style={[styles.btn, styles.btn1, animatedStylesBtn1]}>
                        <TouchableOpacity onPress={onPress1} >
                            <Text style={styles.buttonText}><New /></Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={[styles.btn, styles.btn2, animatedStylesBtn2]}>
                        <TouchableOpacity onPress={onPress2} >
                            <Text style={styles.buttonText}><Upload /></Text>
                        </TouchableOpacity>
                    </Animated.View>
                </>
            )}
        </Pressable >
    );
}



const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "100%",
        height: "100%"
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
        right: mainButton.position.right,
        bottom: mainButton.position.bottom
    },
    btn2: {
        bottom: mainButton.position.bottom,
        right: mainButton.position.right,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        alignSelf: "center"
    },
});