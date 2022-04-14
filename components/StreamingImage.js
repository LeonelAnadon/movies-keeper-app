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
import { COLORS, MARGIN, SIZES, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";

const strImgs = {
  amazonprimevideo: require("../images/amazonprime.jpg"),
  appleitunes: require("../images/appletunes.jpg"),
  appletvplus: require("../images/appletvplus.jpg"),
  clarovideo: require("../images/clarovideo.jpg"),
  directvgo: require("../images/directvgo.jpg"),
  disneyplus: require("../images/disneymas.jpg"),
  googleplaymovies: require("../images/googleplay.jpg"),
  hbogo: require("../images/hbogo.jpg"),
  hbomax: require("../images/hbomax.jpg"),
  movistarplay: require("../images/movistar.jpg"),
  netflix: require("../images/netflix.jpg"),
  paramountplus: require("../images/paramountplus.jpg"),
  qubittv: require("../images/qubittv.jpg"),
  starplus: require("../images/starmas.jpg"),
  starz: require("../images/starz.jpg"),
};

const StrList = ({ item }) => {
  // console.log(item);

  return (
    <View style={styles.strContainer}>
      {item["Suscripción"]?.length ? (
        <View
          style={{
            flex: 1,
            // flexDirection: "row",
            alignItems: "center",
            marginBottom: MARGIN.m1,
          }}
        >
          <Text style={styles.streamingTitle}>{`${Object.keys(item)[0]}:`}</Text>
          <View>
            <FlatList
              data={item[Object.keys(item)[0]]}
              renderItem={({ item }) => (
                <View
                  style={{marginTop: MARGIN.m1
                  }}
                >
                  <Image
                    style={styles.imgStyle}
                    resizeMode="center"
                    source={
                      strImgs[
                        item.replace(" ", "").replace(" ", "").toLowerCase()
                      ]
                    }
                  />
                </View>
              )}
              keyExtractor={(v, i) => v + i}
              horizontal={true}
              style={{ width: "100%" }}
              fadingEdgeLength={1}
            />
          </View>
        </View>
      ) : null}
      {item["Alquiler"]?.length ? (
        <View style={{         
          flex: 1,
          alignItems: "center",
          marginBottom: MARGIN.m1,
        }}>
          <Text style={styles.streamingTitle}>{`${Object.keys(item)[1]}: `}</Text>
          <FlatList
            data={item[Object.keys(item)[1]]}
            renderItem={({ item }) => (
              <View style={{marginTop: MARGIN.m1 }}>
                <Image
                  style={styles.imgStyle}
                  resizeMode="center"
                  source={
                    strImgs[
                      item.replace(" ", "").replace(" ", "").toLowerCase()
                    ]
                  }
                />
              </View>
            )}
            keyExtractor={(v, i) => v + i}
            horizontal={true}
            style={{ width: "100%" }}
          />
        </View>
      ) : null}
      {item["Compra"]?.length ? (
        <View style={{ flex: 1,
          alignItems: "center",
          marginBottom: MARGIN.m1, }}>
          <Text style={styles.streamingTitle}>{Object.keys(item)[2]}</Text>
          <FlatList
            data={item[Object.keys(item)[2]]}
            renderItem={({ item }) => (
              <View style={{ marginTop: MARGIN.m1 }}>
                <Image
                  style={styles.imgStyle}
                  resizeMode="center"
                  source={
                    strImgs[
                      item.replace(" ", "").replace(" ", "").toLowerCase()
                    ]
                  }
                />
              </View>
            )}
            keyExtractor={(v, i) => v + i}
            horizontal={true}
            style={{ width: "100%" }}
          />
        </View>
      ) : null}
    </View>
  );
};

const StreamingImage = ({ stream }) => {
  useEffect(() => {
    console.log(stream);
  }, []);

  return (
    <View style={styles.streamingContainer}>
      <StrList item={stream[0]} />
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
    fontWeight: "bold",
    fontSize: SIZES.h3,
  },
  imgStyle: {
    height: TOTAL_HEIGHT * 0.045,
    width: TOTAL_WIDTH * 0.1,
    marginHorizontal: TOTAL_WIDTH * 0.005,
  },
  strContainer: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: COLORS.gold,
    // flexDirection: "column",
  },
});

export default StreamingImage;
