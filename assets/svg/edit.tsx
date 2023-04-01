import { Svg, Path, G } from 'react-native-svg';

export default function Edit() {
    return (
        <Svg
            width={20}
            height={20}
            viewBox={"10.07 9.96 58.01 58.61"}
        >
            <G
                transform={{
                    translate: [0, 79],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M495 650 l-39 -40 74 -76 75 -75 38 40 c52 56 51 90 -7 147 -57 58 -88 59 -141 4z"} fill="#000000"></Path>

                <Path d={"M282 437 c-139 -140 -142 -144 -162 -212 -22 -77 -25 -111 -10 -120 5 -3 47 4 92 17 l83 22 148 145 147 145 -72 73 c-40 40 -75 73 -78 73 -3 0 -69 -64 -148 -143z"} fill="#000000"></Path>

            </G>
        </Svg>
    )
}