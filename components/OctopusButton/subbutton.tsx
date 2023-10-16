import { TouchableOpacity, Text } from "react-native";
import buttons from "../../StyleSheets/buttons";

interface Props {
    icon: string;
    onPress?: () => void;
}

export default function OctopusSubButton({ icon, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={buttons.buttonContainer}>
            <Text style={buttons.buttonText}>{icon}</Text>
        </TouchableOpacity>
    );
}