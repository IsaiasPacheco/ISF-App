import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Cross from "./HeaderComps/Cross";
import Heart from "./HeaderComps/Heart";
import Progress from "./HeaderComps/Progress";
import Character from "./HeaderComps/Character";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
    paddingLeft: 16,
  },
});

const Header = (props) => {

  return (
    <View>
      <View style={styles.row}>
        <Cross />
        <Progress progreso={props.progreso}/>
        <Heart />
      </View>
      <Text style={styles.title}>@Nombre del cuento</Text>
      <Character indexImg={props.indexImg} />
    </View>
  );
};

export default Header;