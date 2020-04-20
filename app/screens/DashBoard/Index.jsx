import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, AsyncStorage, Image } from "react-native";
import { Spinner } from "@ui-kitten/components";
import Service from "../../services/Covid/covidService";
import CardItem from "../../components/shared/Card/Index";
import { hint } from "../../utils/colors.json";
const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getSelectedCountry = async () => await AsyncStorage.getItem("country");
  const getData = () => {
    getSelectedCountry().then((value) => {
      new Service().getCountryState(value).then((result) => {
        setData(result.data);
      });
    });
  };
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Estado</Text>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/Dashboard/temperature.png")}
          resizeMode="cover"
        />
      </View>
      {data.length > 0 ? (
        <View style={{ flex: 1 }}>
          <View style={styles.summary}>
            <View style={styles.card}>
              <CardItem
                title="Confirmados"
                quantity={data.slice(-1)[0].Confirmed}
              />
            </View>
            <View style={styles.card}>
              <CardItem title="Muertos" quantity={data.slice(-1)[0].Deaths} />
            </View>
          </View>
          <View style={styles.summary}>
            <View style={styles.card}>
              <CardItem title="Activos" quantity={data.slice(-1)[0].Active} />
            </View>
            <View style={styles.card}>
              <CardItem
                title="Recuperados"
                quantity={data.slice(-1)[0].Recovered}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.spinerContainer}>
          <Spinner size="giant" />
          <Text style={{ marginTop: 30 }} category="h3">
            Espere un momento...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "white",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    textAlign: "center",
    fontSize: 17,
    color: hint,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  image: {
    width: 146,
    height: 146,
  },
  imageContainer: {
    marginTop: 30,
    alignItems: "center",
    alignContent: "center",
  },
  spinerContainer: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 100,
  },
});

export default Dashboard;
