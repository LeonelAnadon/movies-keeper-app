import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  ToastAndroid,
  Linking,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import StreamingImage from "../components/StreamingImage";
import {
  COLORS,
  MARGIN,
  PADDING,
  SIZES,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "../constants/theme";
import { MoviesContext } from "../src/context";
import { formatedTime } from "../src/utils/formatTime";
import { formatDate } from "../src/utils/formatDate";
import { handleGetBase64 } from "../src/services/fileSystemSave";

const DetailsScreen = ({ navigation, route }) => {
  const { movieId } = route.params;
  const appContext = useContext(MoviesContext);
  const { savedMovies, handleWatchedMovie } = appContext;
  const [item, setItem] = useState({});
  const [dataImg, setDataImg] = useState("");

  const getImgGo = async () => {
    try {
      let data = await handleGetBase64(item.imgKey);
      setDataImg(data);
    } catch (err) {
      console.log("something went wrong getting base64");
    }
  };
  const handleCheck = () => {
    console.log(`${movieId} checked`);
    const message = handleWatchedMovie(movieId);
    if (message === "again") {
      ToastAndroid.show(
        `¡Felicidades! La has visto otra vez`,
        ToastAndroid.SHORT
      );
    } else {
      ToastAndroid.show(`Agregué ${message} a tus vistas`, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    if (!movieId) return navigation.navigate("Guardadas");
    setItem(() => savedMovies.find((movie) => movie.movieId === movieId));

    return () => setItem(), setDataImg();
  }, []);

  useEffect(() => {
    if (!dataImg === "") return;
    getImgGo();
  }, [item]);

  if (Object.entries(item).length < 2) {
    return (
      <View>
        <Text style={{ color: COLORS.white }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity>
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
            fadeDuration={500}
            source={{
              uri: item?.imgKey === false ? item.url_img : dataImg,
            }}
          />
        )}
      </View>
      <View style={[styles.container, styles.scrollDesc]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ justifyContent: "center" }}
        >
          <View style={styles.detailsBtns}>
            <TouchableOpacity
              onPress={() => Linking.openURL(item?.trailer)}
              style={styles.plainBtn}
              disabled={item?.trailer ? false : true}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name={item?.trailer ? 'video' : 'video-off'}
                  size={SIZES.h2}
                  color={COLORS.white}
                />
                <Text style={{ color: COLORS.white, marginLeft: MARGIN.m4 }}>
                  {item?.trailer ? 'Ver trailer' : 'No disponible'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCheck()}
              style={styles.plainBtn}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="check"
                  size={SIZES.h2}
                  color={COLORS.white}
                />
                <Text style={{ color: COLORS.white, marginLeft: MARGIN.m4 }}>
                  Visto
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            //*? RIGHT COLUMN */
          }
          <View style={styles.whereWatchContainer}>
            <View style={[styles.ratingYearContainer]}>
              <View style={[styles.ratingContainer]}>
                <MaterialCommunityIcons
                  name={item?.rating !== "N/A" ? "star" : "cancel"}
                  color={COLORS.gold}
                  size={SIZES.h1}
                />
                <Text style={[styles.ratingText]}>{item?.rating}</Text>
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
                {item?.imgKey ? (
                  <Text style={[styles.yearText, { textAlign: "center" }]}>
                    Duración:
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                      {""}
                      {` ${formatedTime(item?.runing_time)}`}
                    </Text>
                  </Text>
                ) : (
                  <Text style={[styles.yearText, { textAlign: "center" }]}>
                    Duración:
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>
                      {" "}
                      {item?.runing_time}
                    </Text>
                  </Text>
                )}
              </View>
              {
                //*? GENRES
              }
              {item?.genres ? (
                <View
                  style={{
                    justifyContent: "center",
                    maxWidth: TOTAL_WIDTH * 0.5,
                  }}
                >
                  <Text style={[styles.yearText, { textAlign: "center" }]}>
                    Género:
                    {item?.genres?.map((genre, idx) =>
                      idx === 0 ? (
                        <Text
                          key={genre + idx}
                          style={{ color: COLORS.white, fontWeight: "normal" }}
                        >
                          {" "}
                          {genre}
                        </Text>
                      ) : (
                        <Text
                          key={genre + idx}
                          style={{ color: COLORS.white, fontWeight: "normal" }}
                        >
                          {", "}
                          {genre}
                        </Text>
                      )
                    )}
                  </Text>
                </View>
              ) : null}
            </View>

            {
              //*? WHERE WATCH
            }
            <View style={styles.whereWatch}>
              {item.whereToWatch && (
                <StreamingImage stream={[item.whereToWatch]} />
              )}
            </View>
          </View>
          {
            //*? LEFT COLUMN */
          }

          <View style={[styles.descContainer, {}]}>
            {
              //*? SINOPSIS */
            }
            <Text
              style={{
                fontSize: SIZES.h3,
                color: COLORS.notSoGray,
                fontWeight: "bold",
                textAlign: "justify",
                // borderWidth: 2,
                // borderColor: 'red',
              }}
            >
              Sinopsis:
              <Text style={{ color: COLORS.lightGray, fontWeight: "normal" }}>
                {" "}
                {item?.description}
              </Text>
            </Text>
            {
              //*? DIRECTOR */
            }
            {item?.director ? (
              <Text
                style={{
                  fontSize: SIZES.h3,
                  color: COLORS.notSoGray,
                  fontWeight: "bold",
                  marginTop: MARGIN.m1,
                }}
              >
                Director:
                <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}>
                  {" "}
                  {item?.director}
                </Text>
              </Text>
            ) : null}
            {
              //*? STARRING */
            }
            {item?.starring.length ? (
              <Text
                style={{
                  fontSize: SIZES.h3,
                  color: COLORS.notSoGray,
                  marginTop: MARGIN.m1,
                  fontWeight: "bold",
                }}
              >
                Reparto:
                {item?.starring.map((star, i) => {
                  if (i === 0) {
                    return (
                      <Text
                        key={star + i}
                        style={{
                          color: COLORS.lightGray,
                          fontWeight: "normal",
                        }}
                      >
                        {" "}
                        {star}
                      </Text>
                    );
                  }
                  return (
                    <Text
                      key={star + i}
                      style={{ color: COLORS.lightGray, fontWeight: "normal" }}
                    >
                      {", "}
                      {star}
                    </Text>
                  );
                })}
              </Text>
            ) : null}
            {
              //*? SAVED AT */
            }
            <Text
              style={{
                fontSize: SIZES.h3,
                color: COLORS.notSoGray,
                fontWeight: "bold",
                marginVertical: MARGIN.m1,
              }}
            >
              Guardada:
              <Text style={{ color: COLORS.lightGray, fontWeight: "bold" }}>
                {" "}
                {formatDate(item?.savedDate)}
              </Text>
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
    marginHorizontal: MARGIN.m1,
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
    textAlign: "center",
    maxWidth: TOTAL_WIDTH * 0.8,
  },
  descContainer: {
    flex: 2,
    height: "100%",
    alignContent: "flex-start",
    marginTop: MARGIN.m5,
    padding: MARGIN.m3,
  },
  imgContainer: {
    flex: 1.6,
    width: "100%",
    backgroundColor: COLORS.black,
    padding: TOTAL_HEIGHT * 0.01,
  },
  backgroundImg: {
    width: "100%",
    height: Dimensions.get("window").height * 0.55,
  },
  ratingYearContainer: {
    flex: 1.3,
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    padding: MARGIN.m3,
    marginTop: MARGIN.m5,
  },
  whereWatch: {
    marginTop: MARGIN.m5,
    padding: MARGIN.m3,
    // borderWidth: 3,
    // borderColor: COLORS.white,
  },
  whereWatchContainer: {
    // flexDirection: "row",
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

  detailsBtns: {
    height: TOTAL_HEIGHT * 0.05,
    width: "85%",
    alignSelf: "center",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: MARGIN.m1,
  },
  plainBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    height: TOTAL_HEIGHT * 0.05,
    // height: "100%",}
    // padding: PADDING.pd6,
    width: TOTAL_WIDTH * 0.4,
    // width: '100%',
  },
  scrollDesc: {
    flexDirection: "column",
  },
});

export default DetailsScreen;
