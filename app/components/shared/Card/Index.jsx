import React from "react";
import { Card, Text } from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { primary, hint } from "../../../utils/colors.json";
const CardItem = (props) => {
  const { title = "", quantity = "" } = props;
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.qyt} category="h1">
        {quantity}
      </Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 103,
    width: 157,
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    color: hint,
    fontWeight: "bold",
    fontSize: 15,
  },
  qyt: {
    textAlign: "center",
    fontWeight: "bold",
    color: primary,
    fontSize: 25,
  },
});
export default CardItem;
