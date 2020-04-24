import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { Input, Spinner } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import CardItem from "../../components/Home/CountryCard/Index";
import Service from "../../services/Covid/covidService";

const Search = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    new Service().getAllData().then((response) => {
      setData(response.data.Countries);
    });
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <SearchBar data={data} />
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require("../../../assets/covid19.gif")}
        />
      </View>
    </View>
  );
};

const SearchBar = (props) => {
  const { data } = props;
  const [results, setResults] = useState([]);
  const renderIcon = () => {
    return <MaterialIcons name="search" size={20} />;
  };

  const filters = (value) => {
    const result = data.filter((x) =>
      x.Country.toLowerCase().includes(value.toLowerCase())
    );
    if (value === "") {
      setResults([]);
    } else {
      setResults(result);
    }
  };

  return (
    <View>
      <Input
        size="large"
        onChange={(e) => filters(e.nativeEvent.text)}
        placeholder="Ingresa algo para buscar"
        accessoryLeft={renderIcon}
        style={styles.input}
      />
      {results.length > 0 && (
        <FlatList
          data={results}
          removeClippedSubviews={true}
          maxToRenderPerBatch={4}
          initialNumToRender={4}
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 0,
    borderRadius: 0,
  },
  image: {
    width: 240,
    height: 240,
  },
  imageContainer: {
    alignContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
});
export default Search;
