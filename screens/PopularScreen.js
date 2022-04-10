import React, { useContext, useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View, Button, Image } from "react-native";
import { COLORS, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";




const PopularScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: COLORS.white }}>Testing Screen</Text>
    </View>

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

export default PopularScreen;
