import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../TabsNavigation/Index";
import { StyleSheet, View, Text } from "react-native";
const { Navigator, Screen } = createStackNavigator();
import WelcomeScreen from "../../screens/Welcome/Index";
import Header from "../../components/shared/Header/Index";

const Navigation = () => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
          
        }}
        initialRouteName="Bienvenido"
      >
        <Screen
          name="Inicio"
          options={{ headerLeft: false }}
          component={Home}
        />
        <Screen
          name="Bienvenido"
          options={{
            headerShown: false,
          }}
          component={WelcomeScreen}
        />
      </Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default Navigation;
