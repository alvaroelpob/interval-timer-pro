import { Text, Animated, TextInput, StyleSheet } from 'react-native';
import Asterisk from '../../Misc/asterisk';
import { APPTHEME } from '../../../lib/constants';

interface Props {
    label: string;
    setter: React.Dispatch<React.SetStateAction<any>>;
    shakeAnimation?: Animated.Value;
    isMandatory: boolean;
}

export default function CrateInput({ label, setter, shakeAnimation, isMandatory }: Props) {
    return (
        <Animated.View style={[styles.createWinput, (shakeAnimation && { transform: [{ translateX: shakeAnimation }] })]}>
            <Text style={styles.label}>
                {label}
                {isMandatory && <Asterisk />}
            </Text>
            <TextInput
                onChangeText={(text) => setter(text)}
                style={styles.input}
                cursorColor="#ececec"
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    createWinput: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 50,
        marginHorizontal: 18,
        marginVertical: 10,
        height: 55,
        paddingVertical: 7,
        paddingHorizontal: 13,
        backgroundColor: APPTHEME.SECONDARY,
        borderRadius: 15
    },
    input: {
        width: '100%',
        height: '80%',
        flex: 1,
        borderRadius: 10,
        paddingLeft: 7,
        color: '#ececec',
        borderWidth: 0,
        backgroundColor: '#404048',
    },
    label: {
        color: '#ececec',
        fontSize: 18,
    },
    labeltext: {
        marginRight: 10,
        fontSize: 25,
        color: '#ececec',
    },
});