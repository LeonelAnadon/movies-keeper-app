import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Linking,
} from "react-native";
import { COLORS, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPie,
  VictoryLabel,
} from "victory-native";
import * as FileSystem from "expo-file-system";
import {
  handleSaveBase64,
  handleGetBase64,
  handleReadDirectory,
  handleDeleteOneFile,
  handleDeleteAllFiles,
} from "../src/services/fileSystemSave";

const About = (props) => {
  const [data, setData] = useState("");

  const data2 = [
    { x: "Terror", y: 10 },
    { x: "Comedia", y: 3 },
    { x: "Romance", y: 5 },
    { x: "Suspenso", y: 6 },
    { x: "Misterio", y: 15},
  ];

  const handleTest = async () => {
    setData(await handleReadDirectory());
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: COLORS.white }}>Testing Screen</Text>
      <Text style={{ color: COLORS.white }}>{JSON.stringify(data, null, 3)}</Text>
      <Button title="Show directory" onPress={() => handleTest()}/>
      <View>
        <VictoryChart width={TOTAL_WIDTH * 0.9} maxDomain={{ y: 15 }}>
          <VictoryBar
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            alignment="middle"
            x="x"
            y="y"
            barRatio={0.8}
            padding={10}
            // horizontal
            data={data2}
            sortOrder='descending'
            sortKey='y'
            // labels={({ datum }) => datum.x}
            style={{
              data: { fill: "#c43a31" },
            }}
          />
        </VictoryChart>
      </View>
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

export default About;
