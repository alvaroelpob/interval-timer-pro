import { Pressable, Text, View } from 'react-native';
import { BackgroundColors } from '../utils/types';

type Props = {
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
    defaultColor: string;
    editing: string;
    setBackgroundColors: React.Dispatch<React.SetStateAction<BackgroundColors>>
}

export default function ColorPickerComponent({ setShowPicker, defaultColor, editing, setBackgroundColors }: Props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#FFFFFF' }}>Unavailable :{'('}</Text>
            <Pressable style={{ borderWidth: 2, padding: 10, borderColor: '#FFFFFF', marginTop: 5, borderRadius: 10 }} onPress={() => setShowPicker(false)}>
                <Text style={{ color: '#FFFFFF' }}>Go back</Text>
            </Pressable>
        </View>
    )
} 