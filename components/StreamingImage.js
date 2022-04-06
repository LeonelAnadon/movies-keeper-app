import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  FlatList,
  VirtualizedList,
} from "react-native";
import { COLORS, MARGIN, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";

const strImgs = {
  amazonprimevideo: require("../images/amazonprime.jpg"),
  appleitunes: require("../images/appletunes.jpg"),
  appletvplus: require('../images/appletvplus.jpg'),
  clarovideo: require("../images/clarovideo.jpg"),
  disneyplus: require("../images/disneymas.jpg"),
  googleplaymovies: require("../images/googleplay.jpg"),
  hbogo: require("../images/hbogo.jpg"),
  hbomax: require("../images/hbomax.jpg"),
  movistarplay: require("../images/movistar.jpg"),
  netflix: require("../images/netflix.jpg"),
  paramountplus: require("../images/paramountplus.jpg"),
  qubittv: require('../images/qubittv.jpg'),
  starplus: require("../images/starmas.jpg"),
  starz: require("../images/starz.jpg"),
};

const StrList = ({ item }) => {



  console.log(item);

  return (
    <View style={styles.strContainer}>
      <View
        style={{
          flex: 1,
          marginBottom: MARGIN.m1,
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "row",
          // maxWidth: TOTAL_WIDTH * 0.26,
          flexWrap: "wrap",
        }}
      >
        <Text style={styles.streamingTitle}>
          {Object.keys(item) ? Object.keys(item)[0] : null}
        </Text>
        <FlatList
          data={item[Object.keys(item)[0]]}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={styles.imgStyle}
                resizeMode="center"
                source={
                  strImgs[item.replace(" ", "").replace(" ", "").toLowerCase()]
                }
              />
            </View>
          )}
          keyExtractor={(v, i) => v + i}
          horizontal={true}
          style={{ width: "100%" }}
        />
      </View>
      <View style={{ flex: 1, marginBottom: MARGIN.m1 }}>
        <Text style={styles.streamingTitle}>
          {Object.keys(item) ? Object.keys(item)[1] : null}
        </Text>
        <FlatList
          data={item[Object.keys(item)[1]]}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={styles.imgStyle}
                resizeMode="center"
                source={
                  strImgs[item.replace(" ", "").replace(" ", "").toLowerCase()]
                }
              />
            </View>
          )}
          keyExtractor={(v, i) => v + i}
          horizontal={true}
          style={{ width: "100%" }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.streamingTitle}>
          {Object.keys(item) ? Object.keys(item)[2] : null}
        </Text>
        <FlatList
          data={item[Object.keys(item)[2]]}
          renderItem={({ item }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                style={styles.imgStyle}
                resizeMode="center"
                source={
                  strImgs[item.replace(" ", "").replace(" ", "").toLowerCase()]
                }
              />
            </View>
          )}
          keyExtractor={(v, i) => v + i}
          horizontal={true}
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
};

const StreamingImage = ({ stream }) => {
  const show = () => {
    alert(JSON.stringify(stream[0]["Suscripción"]));
  };

  return (
    <View style={styles.streamingContainer}>
      <StrList item={stream[0]} />

      {/* <Button title="Show" onPress={() => show()} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  streamingContainer: {
    flex: 1,
    marginTop: TOTAL_HEIGHT * -0.004,
  },
  streamingTitle: {
    textAlign: "center",
    color: COLORS.lightGray,
    marginBottom: MARGIN.m1,
    fontWeight: "bold",
  },
  imgStyle: {
    height: TOTAL_HEIGHT * 0.045,
    width: TOTAL_WIDTH * 0.1,
    marginHorizontal: TOTAL_WIDTH * 0.005,
    // borderWidth: 3,
    // borderColor: "red",
  },
  strContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
  },
});

export default StreamingImage;
