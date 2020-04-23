import React, { PureComponent } from "react";
import { Card, Text, Layout } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { primary, hint } from "../../../utils/colors.json";
class CardItem extends PureComponent {
  render() {
    const { country, day } = this.props;
    const {
      Country,
      CountryCode,
      NewConfirmed,
      TotalConfirmed,
      NewDeaths,
      TotalDeaths,
      NewRecovered,
      TotalRecovered,
    } = country.item;

    const formatDate = (value) =>
      `${new Date(value).getDay()}/${1 + new Date(value).getMonth()}/${new Date(
        value
      ).getFullYear()}`;

    const Header = () => {
      return (
        <View style={styles.header}>
          <View style={styles.containerTitle}>
            <MaterialIcons name="public" style={styles.iconTop} />
            <Text
              style={{
                marginRight: 40,
                fontSize: 17,
                fontWeight: "bold",
                color: hint,
                marginBottom: 0,
              }}
            >
              {Country}
            </Text>
          </View>
          <Text style={styles.textDate}>{formatDate(day)}</Text>
        </View>
      );
    };

    return (
      <Card style={styles.card}>
        <Header />
        <View style={styles.containerInfo}>
          <MaterialIcons name="local-hospital" style={styles.icons} />
          <Text style={styles.textInfo}>
            Nuevos Confirmados : {NewConfirmed}
          </Text>

          <MaterialIcons name="sentiment-dissatisfied" style={styles.icons} />
          <Text style={styles.textInfo}>Total Muertos : {TotalDeaths}</Text>
        </View>

        <View style={styles.containerInfo}>
          <MaterialIcons name="hotel" style={styles.icons} />
          <Text style={styles.textInfo}>Confirmados : {TotalConfirmed}</Text>

          <MaterialIcons name="sentiment-satisfied" style={styles.icons} />
          <Text style={styles.textInfo}>
            Nuevos Recuperados : {NewRecovered}{" "}
          </Text>
        </View>

        <View style={styles.containerInfo}>
          <MaterialIcons name="hotel" style={styles.icons} />
          <Text style={styles.textInfo}>Nuevos Muertos : {NewDeaths}</Text>

          <MaterialIcons name="star-border" style={styles.icons} />
          <Text style={styles.textInfo}>
            Total Recuperados : {TotalRecovered}{" "}
          </Text>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  header: {},
  textHeader: {
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  icons: {
    fontSize: 14,
    marginLeft: 0,
    color: hint,
    marginTop: 3,
  },
  iconTop: {
    fontSize: 30,
    marginRight: 50,
    marginLeft: 0,
    color: primary,
  },
  containerTitle: {
    flexDirection: "row",
  },
  textDate: {
    textAlign: "center",
    fontSize: 11,
    marginBottom: 5,
  },
  containerInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  textInfo: {
    fontSize: 11,
  },
});
export default CardItem;
