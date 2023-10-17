import { Svg, Path, G } from 'react-native-svg';

export default function New() {
    return (
        <Svg
            width={22}
            height={22}
            viewBox={"11 19 119 159.87"}
        >
            <G
                transform={{
                    translate: [0, 192],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M245 1718 c-50 -17 -96 -58 -116 -102 -18 -39 -19 -77 -19 -686 0 -609 1 -647 19 -686 22 -48 70 -87 126 -104 28 -8 165 -10 470 -8 l430 3 47 27 c34 21 53 41 72 80 l26 52 0 468 0 468 -219 0 c-218 0 -220 0 -248 24 l-28 24 -3 226 -3 226 -262 -1 c-155 0 -274 -5 -292 -11z"} fill="#FFFFFF" />
                <Path d={"M910 1520 l0 -190 192 0 193 0 -190 190 c-104 105 -191 190 -192 190 -2 0 -3 -85 -3 -190z"} fill="#FFFFFF" />
            </G>
        </Svg>
    )
}