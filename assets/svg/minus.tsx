import { Svg, Path, G } from 'react-native-svg';

export default function Minus({ width=19, height=19 }) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={"0 0 289.000000 138.000000"}
        >
            <G
                transform={{
                    translate: [0, 138],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M210 680 l0 -310 1090 0 1090 0 0 310 0 310 -1090 0 -1090 0 0 -310z"} fill="#FFFFFF" />

            </G>
        </Svg>
    )
}