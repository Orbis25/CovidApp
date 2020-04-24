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
import { Spinner, Button } from "@ui-kitten/components";
import Service from "../../services/Covid/covidService";
import CardItem from "../../components/shared/Card/Index";
import { hint, primary } from "../../utils/colors.json";
import { MaterialIcons } from "@expo/vector-icons";
const Dashboard = (props) => {
  const { navigation } = props;
  const [data, setData] = useState([]);
  const [countryName, setCountryName] = useState("");
  useEffect(() => {
    getData();
  }, []);

  const getSelectedCountry = async () => await AsyncStorage.getItem("country");
  const getData = () => {
    getSelectedCountry().then((value) => {
      new Service().getCountryState(value).then((result) => {
        setData(result.data);
        setCountryName(result.data[0].Country);
      });
    });
  };

  const reloadData = () => {
    setData([]);
    getData();
  };

  const goToClose = () => {
    navigation.navigate("Bienvenido");
  };

  return (
    <View style={styles.view}>
      <ScrollView>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Estado en {countryName}</Text>
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
        <View style={{ alignItems: "center" }}>
          <Button
            size="small"
            onPress={() => goToClose()}
            style={styles.btnClose}
          >
            Cambiar de pais
          </Button>
        </View>
      </ScrollView>
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
    justifyContent: "space-around",
  },
  title: {
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
  btnClose: {
    borderRadius: 100,
    marginTop: 20,
  },
});

export default Dashboard;
