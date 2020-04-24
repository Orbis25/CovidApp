import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Spinner } from "@ui-kitten/components";
import Service from "../../services/Covid/covidService";
import CardItem from "../../components/shared/Card/Index";
import { hint, primary } from "../../utils/colors.json";
import { MaterialIcons } from "@expo/vector-icons";

const Word = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getSelectedCountry = async () => await AsyncStorage.getItem("country");
  const getData = () => {
    getSelectedCountry().then((value) => {
      new Service().getTotal(value).then((result) => {
        setData(result.data);
      });
    });
  };
  const reloadData = () => {
    setData([]);
    getData();
  };
  return (
    <View style={styles.view}>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>Estado General</Text>
        <TouchableOpacity onPress={reloadData}>
          <MaterialIcons
            name="cached"
            color={primary}
            style={{ marginTop: 16 }}
            size={31}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../../../assets/Dashboard/temperature.gif")}
          resizeMode="cover"
        />
      </View>
      {data !== null ? (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View style={styles.summary}>
              <View style={styles.card}>
                <CardItem title="Confirmados" quantity={data.TotalConfirmed} />
              </View>
            </View>
            <View style={styles.summary}>
              <View style={styles.card}>
                <CardItem title="Activos" quantity={data.TotalDeaths} />
              </View>
              <View style={styles.card}>
                <CardItem title="Recuperados" quantity={data.TotalRecovered} />
              </View>
            </View>
          </View>
        </ScrollView>
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
  containerTitle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 17,
    color: hint,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "bold",
    // marginLeft: 70,
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

export default Word;
