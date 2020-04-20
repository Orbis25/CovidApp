import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Spinner, Text } from "@ui-kitten/components";
import Service from "../../services/Covid/covidService";
import CardItem from "../../components/Home/CountryCard/Index";
const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setIsLoading(true);
    new Service()
      .getAllData()
      .then((response) => {
        setData(response.data.Countries);
      })
      .catch((err) => {})
      .finally(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.spinerContainer}>
          <Spinner size="giant" />
          <Text style={{ marginTop: 30 }} category="h3">
            Espere un momento...
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={(country) => (
            <View style={styles.containerCard}>
              <CardItem
                country={country}
                day={country.item.Date}
                style={styles.card}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            <View style={{ alignItems: "center" }}>
              <Spinner />
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  containerCard: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    marginLeft: 10,
    marginRight: 10,
  },
  spinerContainer: {
    // alignContent:'center',
    // alignItems:'center',
    // borderRadius: 4,
    // padding: 12,
    // backgroundColor: "#3366FF",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 100,
  },
});
export default HomeScreen;
