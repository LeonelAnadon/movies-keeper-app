import React, { useContext, useState, useRef, useEffect } from "react";
import { Animated, StyleSheet, Text, View, Button, Image } from "react-native";
import { COLORS, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";
import * as FileSystem from 'expo-file-system';
import { handleSaveBase64, handleGetBase64, handleReadDirectory } from "../src/services/fileSystemSave";

const About = (props) => {
  const [data, setData] = useState('')

  
  const handleTest = async() => {
    // let dataImg = await handleGetBase64()
    // setData(`data:image/jpeg;base64,${dataImg}`)
    setData(await handleReadDirectory())
  }


  return (
    <View style={styles.container}>
      <Text style={{ color: COLORS.white }}>Testing Screen</Text>
      <Text style={{ color: COLORS.white }}>{JSON.stringify(data, null, ' ')}</Text>


      {/* <Image
        source={
          {
            uri: data,
          }
        }
        resizeMode="contain"
        style={{
          width: TOTAL_WIDTH,
          height: 300,
          backgroundColor: COLORS.white,
        }}
      /> */}

      <Button
        title="DOWNLOAD AND SAVE IMAGE"
        // onPress={() => handleSaveBase64()}
      />
      <Button title="SHOW IMAGE" onPress={() => handleTest()} />
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
