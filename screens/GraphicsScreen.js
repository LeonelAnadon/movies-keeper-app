import React, { useContext, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  COLORS,
  MARGIN,
  SIZES,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "../constants/theme";
import { VictoryLegend, VictoryLabel, VictoryPie } from "victory-native";
import { MoviesContext } from "../src/context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const GraphicsScreen = (props) => {
  const appContext = useContext(MoviesContext);
  const { watchedMovies } = appContext;
  const [graphicData, setGraphicData] = useState([]);
  const [graphicLegends, setGraphicsLegends] = useState([
    { name: "Loading..." },
  ]);

  function normalizedData() {
    let res = watchedMovies
      .flatMap((genres) => {
        let justOne = genres.genres.map((genre, idx) => {
          if(idx < 1){
            return genre
          }
          genre = ''
        }).filter(clean => clean)
        return justOne
      })
      .reduce((accumulator, value) => {
        return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };
      }, {});
    let data = [];
    for (let [key, value] of Object.entries(res)) {
      data.push({ x: key, y: value });
    }
    setGraphicData(data);
  }

  function graphicLegend() {
    let data = [];
    let nw = graphicData.sort(function (a, b) {
      return b.y - a.y;
    });
    for (let key of nw) {
      data.push({ name: key.x});
    }
    setGraphicsLegends(data);
  }

  useEffect(() => {
    normalizedData();
  }, [watchedMovies]);
  useEffect(() => {
    graphicLegend();
  }, [graphicData]);

  if (!graphicData.length) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.h3,
            marginBottom: MARGIN.m1,
          }}
        >
          Nada por aquí...
        </Text>
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.h3,
            marginBottom: MARGIN.m1,
            flexWrap: "wrap",
            maxWidth: TOTAL_WIDTH * 0.5,
            textAlign: "center",
          }}
        >
          Buscá una pelicula, mirala y luego vení aquí
        </Text>

        <MaterialCommunityIcons
          onPress={() => props.navigation.navigate("Buscar")}
          name="plus-circle"
          color={COLORS.pink}
          size={TOTAL_HEIGHT * 0.08}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <VictoryPie
            // animate={{
            //   duration: 2000,
            //   onLoad: { duration: 1000 },
            // }}
            width={TOTAL_WIDTH}
            barRatio={1}
            padding={50}
            data={graphicData}
            horizontal
            sortOrder="descending"
            colorScale="qualitative"
            innerRadius={40}
            labelRadius={({ innerRadius }) => innerRadius + 25}
            sortKey="y"
            labels={({ datum }) => `${datum.x.slice(0, 15)}: ${datum.y}`}
            padAngle={() => 3}
            style={{
              labels: { fill: "white", fontSize: 10, fontWeight: "bold" },
            }}
            labelPosition={({ index }) => (index ? "centroid" : "centroid")}
            labelPlacement={({ index }) => graphicData.length > 2 && (index ? "parallel" : "parallel")}
          />
          <VictoryLegend
            x={TOTAL_WIDTH * 0.2}
            // y={50}
            // title="Esquema"
            // centerTitle
            orientation="vertical"
            itemsPerRow={5}
            gutter={40}
            colorScale="qualitative"
            style={{
              border: { stroke: "black" },
              title: { fontSize: 20, fill: "white" },
              labels: { fill: "white" },
            }}
            // data={[
            //   { name: "One"},
            //   { name: "Two"},
            //   { name: "Three"},
            // ]}
            data={graphicLegends}
          />
        </View>
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

export default GraphicsScreen;
