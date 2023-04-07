import { Svg, Path, G } from 'react-native-svg';

export default function Pause({ disabled }: { disabled: boolean }) {
    return (
        <Svg
            width={40}
            height={40}
            viewBox={"25 18.09 142 170.91"}
        >
            <G
                transform={{
                    translate: [0, 203],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M411 1841 c-53 -14 -114 -62 -139 -111 l-22 -44 0 -691 c0 -776 -3 -738 76 -803 52 -43 89 -52 214 -52 120 0 164 15 217 71 60 64 58 37 61 747 2 425 -1 673 -8 710 -12 67 -48 117 -110 151 -38 21 -59 25 -149 27 -59 2 -121 -1 -140 -5z"} fill={disabled ? "#83BBE0" : "#FFFFFF"} />

                <Path d={"M1248 1834 c-54 -17 -103 -62 -129 -119 -17 -37 -19 -83 -19 -721 l0 -680 28 -55 c20 -40 39 -61 76 -84 48 -29 52 -30 181 -30 129 0 133 1 181 30 37 23 56 44 77 84 l27 55 0 680 c0 638 -2 684 -19 721 -27 59 -75 102 -133 120 -65 19 -207 19 -270 -1z"} fill={disabled ? "#83BBE0" : "#FFFFFF"}></Path>

            </G>
        </Svg>
    )
}