import { useFocusEffect } from "@react-navigation/native";
import React, {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import {
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  InteractionManager,
  Pressable,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  COLORS,
  MARGIN,
  SIZES,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MoviesContext } from "../src/context";
import StreamingImage from "../components/StreamingImage";

const PopularDetailsScreen = ({ route }) => {
  const { movieUrl } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const appContext = useContext(MoviesContext);
  const {
    findPopular,
    popularFetched: { results: item },
  } = appContext;

  const handleGetMovie = async () => {
    try {
      setRefreshing(true);
      const data = await findPopular(movieUrl);
      if (data.res === "ok") setRefreshing(false);
      if (data.res === "error") setRefreshing(false), setIsError(true); //and handle error
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetMovie();
    return () => {};
  }, []);

  if (refreshing) {
    return (
      <View
        style={{
          height: TOTAL_HEIGHT,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator
          style={{ marginVertical: MARGIN.m5_big }}
          size={TOTAL_HEIGHT * 0.065 || "large"}
          color={COLORS.pink}
        />
        <Text
          style={{ color: COLORS.pink, fontSize: SIZES.h3, fontWeight: "bold" }}
        >
          Cargando datos...
        </Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: MARGIN.m5_big,
        }}
      >
        <MaterialCommunityIcons
          name="emoticon-sad"
          color={COLORS.pink}
          size={SIZES.bigText}
        />
        <Text
          style={{
            color: COLORS.pink,
            fontSize: SIZES.h3,
            marginTop: MARGIN.m1,
          }}
        >
          No se han encontrado resultados
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => alert(JSON.stringify(item))}>
        <Text style={styles.title}>{item?.title}</Text>
      </TouchableOpacity>
      <View style={styles.imgContainer}>
        {loadingImg ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: 'center'
            }}
          >
            <ActivityIndicator
              size={TOTAL_HEIGHT * 0.065 || "large"}
              color={COLORS.pink}
            />
          </View>
        ) : null}
        <Image
          style={styles.backgroundImg}
          resizeMode="contain"
          onLoadStart={() => setLoadingImg(true)}
          onLoadEnd={() => setLoadingImg(false)}
          fadeDuration={500}
          source={{
            uri: item?.url_img,
          }}
        />
      </View>
      <View style={[styles.container, styles.scrollDesc]}>
        <ScrollView style={styles.scrollView} contentContainerStyle={{ justifyContent: "center" }}>
        <View style={styles.detailsBtns}>
            <TouchableOpacity
              onPress={() => alert("OK")}
              style={styles.plainBtn}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="video"
                  size={SIZES.h2}
                  color={COLORS.white}
                />
                <Text style={{ color: COLORS.white, marginLeft: MARGIN.m4 }}>
                  Ver trailer
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('jeje')}
              style={styles.plainBtn}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons
                  name="content-save"
                  size={SIZES.h2}
                  color={COLORS.white}
                />
                <Text style={{ color: COLORS.white, marginLeft: MARGIN.m4 }}>
                  Guardar
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
                    {item?.year.trim()}
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
                    {" "}
                    {item?.runing_time}
                  </Text>
                </Text>
              </View>
              {
                //*? GENRES
              }
              <View
                style={{
                  justifyContent: "center",
                  maxWidth: TOTAL_WIDTH * 0.5,
                }}
              >
                <Text style={[styles.yearText, { textAlign: "center" }]}>
                  Género:
                  <Text style={{ color: COLORS.white, fontWeight: "normal" }}>
                    {" "}
                    {item?.genres}
                  </Text>
                </Text>
              </View>
            </View>
            {
              //*? WHERE WATCH
            }
            <View style={styles.whereWatch}>
              {item?.whereToWatch && (
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
                  textAlign: 'justify',
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
    marginHorizontal: MARGIN.m1,
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
    height: TOTAL_HEIGHT * 0.55,
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
    flex: 1.6,
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
  scrollDesc: {
    flexDirection: "row",
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
  scrollView: {},
});

export default PopularDetailsScreen;
