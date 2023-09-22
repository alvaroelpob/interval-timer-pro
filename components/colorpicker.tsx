import { BackgroundColors } from '../utils/types';
import ColorPicker from 'react-native-wheel-color-picker';
import React, { useEffect, useState } from 'react';

type Props = {
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
    editing: string;
    backgroundColors: BackgroundColors;
    setBackgroundColors: React.Dispatch<React.SetStateAction<BackgroundColors>>;
}

export default function ColorPickerComponent({ setShowPicker, editing, backgroundColors, setBackgroundColors }: Props) {
    const [color, setColor] = useState<string>("");

    useEffect(() => {
        setColor({
            "Preparación": backgroundColors.prepTime,
            "Ejercitar": backgroundColors.activeTime,
            "Descanso": backgroundColors.restTime,
        }[editing] || "#FFFFFF");
    }, [editing, backgroundColors]);

    const handleChangeColor = (newColor: string) => {
        if (editing === "Preparación") {
            setBackgroundColors(prev => ({ ...prev, prepTime: newColor }));
        } else if (editing === "Ejercitar") {
            setBackgroundColors(prev => ({ ...prev, activeTime: newColor }));
        } else if (editing === "Descanso") {
            setBackgroundColors(prev => ({ ...prev, restTime: newColor }));
        }
    };

    //TODO: Make this beautiful
    return (
        <ColorPicker
            color={color}
            onColorChangeComplete={(newColor) => handleChangeColor(newColor.toUpperCase())}
            thumbSize={40}
            row={true}
            sliderSize={50}
            sliderHidden={false}
            swatches={false}
        />
    );
}