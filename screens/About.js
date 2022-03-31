import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View, Image, ImageBackground, Button  } from "react-native";
import { COLORS } from "../constants/theme";
import { MoviesContext } from "../src/context";

const About = ({navigation, route}) => {

  const appContext = useContext(MoviesContext);
  const { savedMovies } = appContext;

  return (
    <View style={styles.container}>
      <Text style={{ color: COLORS.white }}>About Screen</Text>
      <Text style={{ color: COLORS.white, marginTop: 30 }}>{savedMovies[0].title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default About;
