import { Svg, Path, G } from 'react-native-svg';

export default function ArrowRight() {
    return (
        <Svg
            width={19}
            height={19}
            viewBox={"26 27.15 166.3 284.5"}
        >
            <G
                transform={{
                    translate: [0, 336],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M357 2992 c-152 -152 -205 -69 475 -749 l573 -573 -573 -573 -572 -573 0 -42 c0 -39 6 -48 81 -126 85 -89 133 -120 172 -111 13 4 326 309 717 700 l693 693 -6 38 c-6 35 -73 105 -694 726 -814 814 -712 744 -866 590z"} fill="#747474" />

            </G>
        </Svg>
    )
}