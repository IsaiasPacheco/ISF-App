  
import React from "react";
import {TouchableOpacity} from 'react-native'
import Svg, { Path } from "react-native-svg";

export const CROSS_SIZE = 24;

export default function Cross(props) {

  
  return (
    <TouchableOpacity
      onPress = { () => { props.navigation.goBack(); }}
    >
    <Svg width={CROSS_SIZE} height={CROSS_SIZE} viewBox="0 0 14 14" fill="none">
      <Path
        d="M13 1L1 13M1 1l12 12"
        stroke="#AFAFAE"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    </TouchableOpacity>
  );
};
