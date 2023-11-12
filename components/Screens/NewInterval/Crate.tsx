import { Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { APPTHEME } from '../../../lib/constants';

import Asterisk from '../../Misc/asterisk';

interface Props {
    label: string;
    handleTouched: (x: any, y: React.Dispatch<React.SetStateAction<any>>) => void;
    currentValue: any;
    valueChanger: React.Dispatch<React.SetStateAction<any>>;
    shakeAnimation?: Animated.Value;
    isMandatory: boolean;
}

export default function Crate({ label, handleTouched, currentValue, valueChanger, shakeAnimation, isMandatory }: Props) {
    return (
        <TouchableOpacity onPress={() => handleTouched(currentValue, valueChanger)}>
            <Animated.View style={[styles.create, (shakeAnimation && { transform: [{ translateX: shakeAnimation }] })]}>
                <Text style={styles.label}>
                    {label}
                    {isMandatory && <Asterisk />}
                </Text>
                <Text style={styles.labeltext}>{currentValue}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    create: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 18,
        marginVertical: 10,
        height: 55,
        paddingVertical: 7,
        paddingHorizontal: 13,
        backgroundColor: APPTHEME.SECONDARY,
        borderRadius: 15
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
})