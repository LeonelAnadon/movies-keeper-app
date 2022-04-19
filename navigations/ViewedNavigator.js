import React, { useContext, useState, useRef, useEffect, lazy } from "react";
import { Animated, StyleSheet, Text, View, Button, Image } from "react-native";
import { COLORS, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NetflixScreen from "../screens/NetflixScreen";
import HboMaxScreen from "../screens/HboMaxScreen";
import AmazonPrimeScreen from "../screens/AmazonPrimeScreen";
import StarPlusScreen from "../screens/StarPlusScreen";
import DisneyPlusScreen from "../screens/DisneyPlusScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PopularDetailsScreen from "../screens/PopularDetailsScreen";
import ViewedScreen from "../screens/ViewedScreen";
import GraphicsScreen from "../screens/GraphicsScreen";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const PopularTopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIndicatorStyle: { backgroundColor: COLORS.pink },
        tabBarStyle:{backgroundColor: COLORS.black}
      }}
    >
      <Tab.Screen name="General" component={ViewedScreen} />
      <Tab.Screen name="Por genero" component={GraphicsScreen} />
    </Tab.Navigator>
  );
};

const ViewedNavigator = ({ navigation }) => {


  useEffect(() => {
    console.log("VIEWED NAVIGATOR SCREEN TRIGGERED!");
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name="ViewedNavigator"
          component={PopularTopTabs}
          options={{
            headerShown: false,

          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="PopularDetails"
          component={PopularDetailsScreen}
          options={{ animationTypeForReplace: "pop", headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: TOTAL_HEIGHT,
    // flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modal: {
    position: "absolute",
    backgroundColor: COLORS.white,
    width: TOTAL_WIDTH,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ViewedNavigator;
