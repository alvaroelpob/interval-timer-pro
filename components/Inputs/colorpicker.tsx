import { Button, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import ColorPicker, { Panel1, HueSlider, PreviewText } from 'reanimated-color-picker';
import { BackgroundColors } from '../../utils/types';
import { useEffect } from 'react';

type Props = {
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
    editing: string;
    backgroundColors: BackgroundColors;
    setBackgroundColors: React.Dispatch<React.SetStateAction<BackgroundColors>>;
}

export default function ColorPickerComponent({ setShowPicker, editing, backgroundColors, setBackgroundColors }: Props) {
    const selectedColor = useSharedValue(({
        "prep": backgroundColors.prepTime,
        "work": backgroundColors.activeTime,
        "rest": backgroundColors.restTime,
    }[editing] || "#FFFFFF"));

    const onColorSelect = (color: { hex: string }) => {
        selectedColor.value = color.hex.toUpperCase();
    };

    const handleChangeColor = (newColor: { hex: string }) => {
        if (editing === "prep") {
            setBackgroundColors(prev => ({ ...prev, prepTime: newColor.hex.toUpperCase() }));
        } else if (editing === "work") {
            setBackgroundColors(prev => ({ ...prev, activeTime: newColor.hex.toUpperCase() }));
        } else if (editing === "rest") {
            setBackgroundColors(prev => ({ ...prev, restTime: newColor.hex.toUpperCase() }));
        }
    }

    if (selectedColor.value.length < 1) return <></>;

    return (
        <Animated.View style={styles.pickerContainer}>
            <ColorPicker
                value={selectedColor.value}
                sliderThickness={25}
                thumbSize={24}
                thumbShape="circle"
                onChange={onColorSelect}
                onComplete={handleChangeColor}
                boundedThumb
            >
                <Panel1 style={styles.panelStyle} />
                <HueSlider style={styles.sliderStyle} />
                <View style={styles.previewTxtContainer}>
                    <PreviewText style={{ textTransform: "uppercase" }} />
                </View>
            </ColorPicker>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        alignSelf: 'center',
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    panelStyle: {
        borderRadius: 16,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    sliderStyle: {
        borderRadius: 20,
        marginTop: 20,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    previewTxtContainer: {
        paddingTop: 15,
        marginTop: 15,
        borderTopWidth: 1,
        borderColor: '#bebdbe',
        alignItems: "center",
    },
    previewTxt: {
        fontWeight: "bold"
    }
})