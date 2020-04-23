import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Spinner, Text } from "@ui-kitten/components";
import Service from "../../services/Covid/covidService";
import CardItem from "../../components/Home/CountryCard/Index";
const HomeScreen = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData()
      .then((response) => {
        setData(response.data.Countries);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getData = () => {
    return new Service().getAllData();
  };

  return (
    <View style={styles.container}>
      {data.length <= 0 ? (
        <View style={styles.spinerContainer}>
          <Spinner size="giant" />
          <Text
            onPress={() => paginate(3)}
            style={{ marginTop: 30 }}
            category="h3"
          >
            Espere un momento...
          </Text>
        </View>
      ) : (
        <ListCountry data={data} />
      )}
    </View>
  );
};

const ListCountry = (props) => {
  const { data } = props;
  const [list, setList] = useState([]);
  const [actualPage, setActualPage] = useState(1);

  useEffect(() => {
    paginate(3);
  }, []);

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
    <FlatList
      data={list}
      removeClippedSubviews={true}
      maxToRenderPerBatch={4}
      initialNumToRender={4}
      onEndReachedThreshold={0.1}
      onEndReached={() => paginate(3)}
      renderItem={(country) => (
        <CardItem
          country={country}
          day={country.item.Date}
          style={styles.card}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        <View style={{ alignItems: "center" }}>
          <Spinner />
        </View>
      }
    />
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
