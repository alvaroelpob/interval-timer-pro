import { TouchableOpacity, Text } from "react-native";
import Plus from "../../assets/svg/plus";
import buttons from "../../StyleSheets/buttons";

interface Props {
    onPress: () => void;
}

export default function OctopusMainButton({ onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={buttons.buttonContainer}>
            <Text style={buttons.buttonText}><Plus /></Text>
        </TouchableOpacity>
    );
}