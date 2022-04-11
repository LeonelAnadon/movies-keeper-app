import React, { useContext, useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View, Button, Image } from "react-native";
import { COLORS, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";
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

  const handleTest = async () => {
    setData(await handleReadDirectory());
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: COLORS.white }}>Testing Screen</Text>
      <Text style={{ color: COLORS.white }}>
        {JSON.stringify(data, null, " ")}
      </Text>

      <Button title="SHOW IMAGE" onPress={() => handleTest()} />
      <Image
        source={{
          uri: "https://images.justwatch.com/poster/228853389/s166/merli.webp",
        }}
        style={{ width: TOTAL_WIDTH * 0.4, height: TOTAL_HEIGHT * 0.3 }}
      />
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
