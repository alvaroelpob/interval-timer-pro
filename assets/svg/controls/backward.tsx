import { Svg, Path, G } from 'react-native-svg';

export default function Backward({ disabled }: { disabled: boolean }) {
    return (
        <Svg
            width={40}
            height={40}
            viewBox={"15 9.85 141.94 140.27"}
        >
            <G
                transform={{
                    translate: [0, 159],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M245 1486 c-17 -7 -45 -25 -62 -40 l-33 -28 0 -624 0 -624 31 -27 c76 -69 106 -71 180 -12 l39 31 0 627 0 627 -27 27 c-45 42 -92 58 -128 43z"} fill={disabled ? "#83BBE0" : "#FFFFFF"} />

                <Path d={"M1360 1348 c-123 -70 -612 -422 -666 -480 -37 -38 -49 -84 -31 -114 6 -12 35 -42 62 -66 85 -75 555 -412 634 -454 76 -41 168 -25 193 34 15 33 23 652 13 891 -7 163 -8 165 -35 193 -40 40 -97 38 -170 -4z"} fill={disabled ? "#83BBE0" : "#FFFFFF"}></Path>

            </G>
        </Svg>
    )
}