import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { primary } from "../../../utils/colors.json";
const Header = (props) => {
  const { scene } = props;
  const { route } = scene;
  const { state } = route;
  return (
    <View>
      <View
        style={{
          width: "100%",
          backgroundColor: primary,
          justifyContent: "center",
          height: 100,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "left",
            fontWeight: "bold",
            fontSize: 25,
            marginLeft: 15,
          }}
        >
          {state !== undefined ? state.routes[state.index].name : "Inicio"}
        </Text>
      </View>
    </View>
  );
};

export default Header;
