import { Svg, Path, G } from 'react-native-svg';

export default function Play({ disabled }: { disabled: boolean }) {
    return (
        <Svg
            width={40}
            height={40}
            viewBox={"33.14 9.19 141.86 165.72"}
        >
            <G
                transform={{
                    translate: [0, 203],
                    scale: [0.1, -0.1]
                }}
            >
                <Path d={"M457 1927 c-59 -18 -104 -69 -117 -131 -7 -36 -10 -266 -8 -723 l3 -669 27 -41 c48 -72 150 -103 221 -67 40 21 981 592 1063 647 77 50 104 94 104 169 0 101 6 96 -605 468 -301 183 -564 339 -584 346 -44 16 -55 16 -104 1z"} fill={disabled ? "#83BBE0" : "#FFFFFF"} />

            </G>
        </Svg>
    )
}