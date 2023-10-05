import { View, Pressable, Text } from "react-native";

interface Props {
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ColorPickerComponent({ setShowPicker }: Props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#FFFFFF' }}>Unavailable :{'('}</Text>
            <Pressable style={{ borderWidth: 2, padding: 10, borderColor: '#FFFFFF', marginTop: 5, borderRadius: 10 }} onPress={() => setShowPicker(false)}>
                <Text style={{ color: '#FFFFFF' }}>Go back</Text>
            </Pressable>
        </View>
    )
}