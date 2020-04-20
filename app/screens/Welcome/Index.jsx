import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, AsyncStorage } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import {
  Text,
  Select,
  SelectItem,
  Button,
  IndexPath,
  Spinner,
} from "@ui-kitten/components";
import Service from "../../services/Covid/covidService";

const Welcome = (props) => {
  const { navigation } = props;
  useEffect(() => {
    //AsyncStorage.removeItem("country").then(() => {});
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("country").then((value) => {
        if (value !== null) {
          navigation.navigate("Inicio");
        }
      });
    } catch (error) {}
  };

  return (
    <ViewPager showPageIndicator style={{ flex: 1 }} initialPage={0}>
      <View style={styles.pages} key="1">
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("../../../assets/Welcome/wash-hand.png")}
        />
        <OnePage />
      </View>
      <View style={styles.pages} key="2">
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("../../../assets/Welcome/sanitizer.png")}
        />
        <PageTwo />
      </View>
      <View style={styles.pages} key="3">
        <Image
          resizeMode="cover"
          style={styles.image}
          source={require("../../../assets/Welcome/mask.png")}
        />
        <LastPage navigation={navigation} />
      </View>
    </ViewPager>
  );
};

const OnePage = () => (
  <View>
    <Text style={styles.welcomeText} category="h5">
      Bienvenido a la App
    </Text>
    <Text style={styles.welcomeText} appearance="hint">
      Recuerda siempre lavarte las manos de manera correcta.
    </Text>
  </View>
);

const PageTwo = () => (
  <View>
    <Text style={styles.welcomeText} appearance="hint">
      Recuerda usar un detergente eficiente para las manos.
    </Text>
  </View>
);

const LastPage = (props) => {
  const { navigation } = props;
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    new Service()
      .getCoutries()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {});
  }, []);

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));

  const displayValue =
    countries.length > 0
      ? countries[selectedIndex.row].Country
      : "Selecione su pais";

  const selectedValue = async (index) => {
    const countrySelected = countries[index.row].Country;
    setSelectedIndex(index);
    setSelected(countrySelected);
  };

  const save = () => {
    setIsLoading(true);
    try {
      AsyncStorage.setItem("country", selected)
        .then(() => {
          setIsLoading(false);
          navigation.navigate("Inicio");
        })
        .catch(() => setIsLoading(false));
    } catch (error) {
      console.log("error => ", error);
      setIsLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.welcomeText} appearance="hint">
        No olvides la mascarilla, protegete y protege a los tuyos.
      </Text>
      <View style={styles.containerActions}>
        <Select
          style={styles.select}
          placeholder="Default"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => selectedValue(index)}
        >
          {countries.map((value, index) => (
            <SelectItem key={index} title={value.Country} />
          ))}
        </Select>
        {isLoading ? (
          <View style={styles.spinner}>
            <Spinner />
          </View>
        ) : (
          <Button onPress={save} style={styles.btn}>
            Aceptar
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pages: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: 267,
    height: 267,
  },
  welcomeText: {
    textAlign: "center",
    marginTop: 40,
  },
  containerActions: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  select: {
    width: 267,
    marginTop: 30,
  },
  btn: {
    marginTop: 30,
    borderRadius: 100,
    width: 206,
    height: 37,
  },
  spinner: {
    marginTop: 30,
  },
});

export default Welcome;
