import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Plus from "../../assets/svg/plus";
import Minus from "../../assets/svg/minus"; // Import a minus icon

type Props = {
    number: number;
    setNumber: React.Dispatch<React.SetStateAction<number>>;
    minNumber: number;
    maxNumber: number;
};

export default function Selector({ number, setNumber, minNumber, maxNumber }: Props) {
    const requestIdRef = useRef<number | null>(null); // Track the requestAnimationFrame ID
    const lastTimestampRef = useRef<number | null>(null); // Track the last action timestamp
    const delay = 75; // Delay between actions in milliseconds

    const increment = () => {
        setNumber(prev => (prev < maxNumber ? prev + 1 : prev));
    };

    const decrement = () => {
        setNumber(prev => (prev > minNumber ? prev - 1 : prev));
    };

    const startLongPress = (action: () => void) => {
        const performAction = (timestamp: number) => {
            if (!lastTimestampRef.current || timestamp - lastTimestampRef.current >= delay) {
                action(); // Execute the action
                lastTimestampRef.current = timestamp; // Update the last timestamp
            }
            requestIdRef.current = requestAnimationFrame(performAction); // Schedule the next frame
        };

        requestIdRef.current = requestAnimationFrame(performAction); // Start the loop
    };

    const stopLongPress = () => {
        if (requestIdRef.current !== null) {
            cancelAnimationFrame(requestIdRef.current); // Cancel the animation frame
            requestIdRef.current = null;
        }
        lastTimestampRef.current = null; // Reset the last timestamp
    };

    const formattedNumber = number.toString().padStart(2, "0");

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                rowGap: 5,
            }}
        >
            <TouchableOpacity
                onPress={increment} // Single tap
                onLongPress={() => startLongPress(increment)} // Long press starts animation
                onPressOut={stopLongPress} // Stop animation on release
                disabled={number >= maxNumber} // Disable button if maxNumber is reached
            >
                <Plus width={40} height={40} />
            </TouchableOpacity>

            <View>
                <Text style={{ color: "#FFF", fontSize: 24 }}>{formattedNumber}</Text>
            </View>

            <TouchableOpacity
                onPress={decrement} // Single tap
                onLongPress={() => startLongPress(decrement)} // Long press starts animation
                onPressOut={stopLongPress} // Stop animation on release
                disabled={number <= minNumber} // Disable button if minNumber is reached
            >
                <Minus width={40} height={40} />
            </TouchableOpacity>
        </View>
    );
}
