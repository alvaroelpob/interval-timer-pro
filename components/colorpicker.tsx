import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import ColorPicker, { Panel1, HueSlider, returnedResults, Preview } from 'reanimated-color-picker';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackgroundColors, DEFAULT_COLORS } from '../utils/types';
import styles from '../StyleSheets/colorpicker'


type Props = {
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
    defaultColor: string;
    editing: string;
    setBackgroundColors: React.Dispatch<React.SetStateAction<BackgroundColors>>
}

export default function ColorPickerComponent({ setShowPicker, defaultColor, editing, setBackgroundColors }: Props) {
    const [color, setColor] = useState<string>(defaultColor);

    const onColorSelect = (newColor: returnedResults) => {
        setColor(newColor.hex);
    }

    const saveToDB = async () => {
        const savedBgColors = await AsyncStorage.getItem('bgColors');
        const saved = savedBgColors ? JSON.parse(savedBgColors) : {};

        const data = {
            ...DEFAULT_COLORS,
            ...saved,
            [editing]: color,
        };

        await AsyncStorage.setItem('bgColors', JSON.stringify(data));
        setBackgroundColors(data)
        setShowPicker(false);
    }

    return (
        <Animated.View style={styles.container}>
            <View style={styles.pickerContainer}>
                <ColorPicker
                    value={color}
                    sliderThickness={25}
                    thumbSize={24}
                    thumbShape="circle"
                    onChange={onColorSelect}
                    boundedThumb={true}
                >
                    <Preview style={styles.previewStyle} hideInitialColor={true} />
                    <Panel1 style={styles.panelStyle} />
                    <HueSlider style={styles.sliderStyle} />

                </ColorPicker>

                <View style={styles.buttons}>
                    <Pressable
                        style={styles.button}
                        onPress={() => setShowPicker(false)}
                    >
                        <Text style={{ color: '#707070', fontWeight: 'bold', textAlign: 'center' }}>Volver</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={saveToDB}
                    >
                        <Text style={{ color: '#707070', fontWeight: 'bold', textAlign: 'center' }}>Seleccionar</Text>
                    </Pressable>
                </View>
            </View>
        </Animated.View>
    )
} 