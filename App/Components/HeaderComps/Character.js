import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Image } from "react-native-svg";

import imgs from "@resources/CharactersImgs"

const CHARACTER_WIDTH = 150;
const CHARACTER_ASPECT_RATIO = 560 / 449.75;
const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    width: CHARACTER_WIDTH,
    height: CHARACTER_WIDTH * CHARACTER_ASPECT_RATIO,
  },
});


const Character = (props) => {
  return (
    <Svg style={styles.image}>
      <Image
        width="100%"
        height="100%"
        href={imgs[parseInt(props.indexImg)].img}
      />
    </Svg>
  );
};

export default Character;