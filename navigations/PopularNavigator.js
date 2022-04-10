import React, { useContext, useState, useRef, useEffect } from "react";
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


const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const PopularTopTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen name="Netflix" component={NetflixScreen} />
      <Tab.Screen name="HBO Max" component={HboMaxScreen} />
      <Tab.Screen name="Amazon Prime" component={AmazonPrimeScreen} />
      <Tab.Screen name="Star+" component={StarPlusScreen} />
      <Tab.Screen name="Disney+" component={DisneyPlusScreen} />
    </Tab.Navigator>
  );
};

const PopularNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Popular">
      <Stack.Group>
        <Stack.Screen
          name="Popular"
          component={PopularTopTabs}
          options={{
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity style={{ marginLeft: TOTAL_WIDTH * 0.03 }}>
                <MaterialCommunityIcons
                  name="arrow-left"
                  color={COLORS.white}
                  size={30}
                  onPress={() => navigation.navigate("HomePage")}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        {/* <Stack.Screen
          name="details"
          component={DetailsScreen}
          options={{ animationTypeForReplace: "pop", headerShown: false }}
        /> */}
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

export default PopularNavigator;
