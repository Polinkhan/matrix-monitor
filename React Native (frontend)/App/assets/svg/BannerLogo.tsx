import * as React from "react";
import Svg, { Path, G, Circle } from "react-native-svg";

function BannerLogo(props: any) {
  return (
    <Svg
      width={props.size || "100px"}
      height={props.size || "100px"}
      viewBox="-6.4 -6.4 76.80 76.80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="iconify iconify--emojione"
      {...props}
    >
      <Path
        transform="matrix(4.8 0 0 4.8 -6.4 -6.4)"
        fill="#313e47"
        d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
        strokeWidth={0}
      />
      <Path d="M62 6c0-2-2-4-4-4H6C4 2 2 4 2 6v38h60V6z" fill="#212528" />
      <Path d="M2 44v4c0 2 2 4 4 4h52c2 0 4-2 4-4v-4H2z" fill="#ddd" />
      <Path d="M24 54c0 4-4 4-8 4h32c-4 0-8 0-8-4v-2H24v2" fill="#bfbebe" />
      <Path fill="#3e4347" d="M6 6h52v34H6z" />
      <G fill="#94989b">
        <Circle cx={32} cy={47.9} r={1} />
        <Path d="M16 58h32v4H16z" />
      </G>
    </Svg>
  );
}

export default BannerLogo;
