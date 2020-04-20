import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Spinner, Text } from "@ui-kitten/components";
import Service from "../../services/Covid/covidService";
import CardItem from "../../components/Home/CountryCard/Index";
const HomeScreen = (props) => {
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actualPage, setActualPage] = useState(1);
  useEffect(() => {
    getData();
    paginate(1);
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

  const paginate = (pageSize) => {
    const result = data.slice(
      (actualPage - 1) * pageSize,
      actualPage * pageSize
    );
    let page = actualPage + 1;
    setActualPage(page);
    if (actualPage > 1) {
      setList((prevState) => prevState.concat(result));
    } else {
      setList(result);
    }
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
          data={list}
          removeClippedSubviews={true}
          maxToRenderPerBatch={1}
          initialNumToRender={1}
          onEndReachedThreshold={0.1}
          onEndReached={() => paginate(3)}
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
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 100,
  },
});
export default HomeScreen;
