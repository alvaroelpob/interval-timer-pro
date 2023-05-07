import { View } from "react-native";

const SquareColor = ({ color }: { color: string }) => (
    <View style={{ backgroundColor: color, width: 15, height: 15 }}></View>
)

export default SquareColor;