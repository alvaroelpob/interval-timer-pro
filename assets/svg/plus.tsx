import { Svg, Path, G } from 'react-native-svg';

export default function Plus({ width=19, height=19 }) {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={"10 7.2 93.8 94.6"}
        >
            <G
                transform={{
                    translate: [0, 108],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M460 818 l0 -188 -180 0 -180 0 0 -95 0 -95 180 0 180 0 0 -187 0 -188 100 -2 100 -1 1 31 c5 205 10 332 14 336 5 4 54 6 286 10 l77 1 -2 95 -1 95 -75 1 c-232 4 -280 6 -284 10 -3 3 -14 244 -16 341 l0 26 -100 -1 -100 -2 0 -187z"} fill="#FFFFFF" />

            </G>
        </Svg>
    )
}