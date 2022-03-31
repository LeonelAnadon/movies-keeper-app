import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, MARGIN, SIZES } from "../constants/theme";
import { MoviesContext } from "../src/context";
import { formatedTime } from '../src/utils/formatTime'

const DetailsScreen = ({ navigation, route }) => {
  const { movieId } = route.params;
  const appContext = useContext(MoviesContext);
  const { savedMovies } = appContext;
  const [item, setItem] = useState({});

  useEffect(() => {
    if (!movieId) return navigation.navigate("Guardadas");
    setItem(() => savedMovies.find((movie) => movie.movieId === movieId));
  }, []);

  if (Object.entries(item).length < 2) {
    return (
      <View>
        <Text style={{ color: COLORS.white }}>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => alert(JSON.stringify(item))}>
        <Text style={styles.title}>{item?.title}</Text>
      </TouchableOpacity>
      <View style={styles.imgContainer}>
        {!!item?.url_img.match("noimgfull.jpg") ? (
          <Image
            resizeMode="cover"
            source={require("../images/errorImg2.png")}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              left: MARGIN.m1,
            }}
          />
        ) : (
          <Image
            style={styles.backgroundImg}
            resizeMode="contain"
            source={{
              uri:
                item?.url_img.length > 235
                  ? `data:image/jpeg;base64,${item?.url_img}`
                  : item?.url_img.slice(
                      item?.url_img.match("webp").index + 6,
                      -3
                    ),
            }}
          />
        )}
      </View>

      <View style={[styles.container, styles.scrollDesc]}>
        <ScrollView style={styles.scrollView}>
          {
            //*? RIGHT COLUMN */
          }
          <View style={styles.whereWatchContainer}>
            <View style={[styles.ratingYearContainer]}>
              <View style={[styles.ratingContainer]}>
                <MaterialCommunityIcons
                  name={item.rating !== "N/A" ? "star" : "cancel"}
                  color={
                    item.rating === "N/A"
                      ? COLORS.lightGray
                      : item.rating >= "5.5"
                      ? COLORS.gold
                      : item.rating <= "4"
                      ? COLORS.red
                      : COLORS.orange
                  }
                  size={SIZES.h1}
                />
                <Text style={[styles.ratingText]}>
                  {item?.rating}
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: SIZES.h3,
                      color: COLORS.lightGray,
                    }}
                  >
                    /10
                  </Text>
                </Text>
              </View>
              {
                //*? YEAR
              }
              <View style={{}}>
                <Text style={styles.yearText}>
                  Año:
                  <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                    {" "}
                    {item?.year}
                  </Text>
                </Text>
              </View>
              {
                //*? DURATION
              }
              <View style={{ justifyContent: "center" }}>
                <Text style={[styles.yearText, { textAlign: "center" }]}>
                  Duración:
                  <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                    {""}
                    {`\n ${item?.runing_time}\n ${formatedTime(item?.runing_time)}`}
                  </Text>
                </Text>
              </View>
            </View>
            {
              //*? WHERE WATCH
            }
            <View style={styles.whereWatch}>
              <Text style={{ color: COLORS.white }}>En netflix...</Text>
            </View>
          </View>
          {
            //*? LEFT COLUMN */
          }

          <View style={[styles.descContainer, {}]}>
            <Text
              style={{
                fontSize: SIZES.h3,
                color: COLORS.notSoGray,
                fontWeight: "bold",
                marginVertical: MARGIN.m1,
              }}
            >
              Sinopsis:
              <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}>
                {" "}
                {item?.description}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: SIZES.h3,
                color: COLORS.notSoGray,
                fontWeight: "bold",
                marginVertical: MARGIN.m1,

              }}
            >
              Director:
              <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}>
                {" "}
                {item?.director}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: SIZES.h3,
                color: COLORS.notSoGray,
                marginVertical: 2,
                fontWeight: "bold",
              }}
            >
              Reparto:
              {item.starring.map((star, i) => {
                if (i === 0) {
                  return (
                    <Text key={star + i} style={{ color: COLORS.lightGray }}>
                      {" "}
                      {star}
                    </Text>
                  );
                }
                return (
                  <Text key={star + i} style={{ color: COLORS.lightGray }}>
                    {", "}
                    {star}
                  </Text>
                );
              })}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: MARGIN.m1,
    // backgroundColor: COLORS.darkGray,
  },
  borders: {
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    color: COLORS.white,
  },
  descContainer: {
    flex: 2,
    height: "100%",
    alignContent: "flex-start",
    marginTop: MARGIN.m5,
    padding: MARGIN.m3,
  },
  imgContainer: {
    flex: 2,
    width: "100%",
    backgroundColor: COLORS.black,
    padding: Dimensions.get("window").height * 0.01,
  },
  backgroundImg: {
    width: "100%",
    height: Dimensions.get("window").height * 0.6,
  },
  ratingYearContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    padding: MARGIN.m3,
    marginTop: MARGIN.m5,
  },
  whereWatch: {
    flex: 1,
    marginTop: MARGIN.m5,
    padding: MARGIN.m3,
  },
  whereWatchContainer: {
    flexDirection: "row",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: COLORS.white,
    fontSize: SIZES.h2,
    fontWeight: "bold",
    margin: 1,
  },
  yearText: {
    color: COLORS.lightGray,
    fontSize: SIZES.body3,
    fontWeight: "bold",
    // marginTop: Dimensions.get("window").height * -0.01,
  },
  scrollDesc: {
    flexDirection: "row",
  },
  scrollView: {},
});

export default DetailsScreen;
