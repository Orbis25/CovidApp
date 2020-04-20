import React from "react";
import HomeScreen from "../../screens/Home/Index";
import DashBoardScreen from "../../screens/DashBoard/Index";
import WordScreen from "../../screens/Word/Index";
import SearchScreen from "../../screens/Search/Index";

import { StyleSheet, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const { Navigator, Screen } = createBottomTabNavigator();

const TabIcons = (props) => {
  const { focused, route } = props;
  let iconName;
  if (route.name === "Inicio") {
    iconName = "home";
  } else if (route.name === "Dashboard") {
    iconName = "dashboard";
  } else if (route.name === "Word") {
    iconName = "public";
  } else {
    iconName = "search";
  }
  return (
    <MaterialIcons
      name="#8F9BB3"
      style={{ color: focused == true ? "#448AFF" : "#434B56" }}
      size={34}
      name={iconName}
    />
  );
};

export const Home = () => {
  return (
    <Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: (props) => <TabIcons route={route} {...props} />,
      })}
      tabBarOptions={{
        showLabel: false,
      }}
      initialRouteName="Inicio"
    >
      <Screen name="Dashboard" component={DashBoardScreen} />
      <Screen name="Inicio" component={HomeScreen} />
      <Screen name="Word" component={WordScreen} />
      <Screen name="Search" component={SearchScreen} />
    </Navigator>
  );
};

const styles = StyleSheet.create({
  Icon: {
    color: "#434B56",
  },
});
