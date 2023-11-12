import { View, Text, StyleSheet } from "react-native";

interface Props {
    label: string;
}

export default function Header({ label }: Props) {
    return (
        <View style={styles.header}>
            <Text style={styles.headertext}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        marginLeft: 30,
        marginVertical: 5,
    },
    headertext: {
        marginTop: 10,
        fontSize: 21,
        color: '#ececec'
    },
});