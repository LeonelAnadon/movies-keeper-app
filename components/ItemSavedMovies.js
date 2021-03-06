import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  ToastAndroid,
  Alert,
  Modal,
} from "react-native";
import {
  COLORS,
  MARGIN,
  SIZES,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Animated, {
  LightSpeedInLeft,
  Layout,
  FadeOutRight,
} from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleGetBase64 } from "../src/services/fileSystemSave";
import { formatDateWithoutTime } from "../src/utils/formatDate";

const ItemSavedMovies = ({ item, handleInfo, handleCheck, handleWarning }) => {
  const [dataImg, setDataImg] = useState("data:image/jpeg;base64,");

  
  const getImgGo = useCallback(
    ( async () => {
      try {
        let data = await handleGetBase64(item.imgKey)
        setDataImg(data);
      } catch(err) {
        // console.log(err)
      }
    }),
    [item, dataImg]
  );

  useEffect(() => {
    if(!dataImg === '' || !item?.imgKey) return
    setTimeout(() => {
      getImgGo();
    }, 0)
  }, []);
  // useEffect(() => {
  //   if(!dataImg === '' || !item?.imgKey) return
  //   setTimeout(() => {
  //     getImgGo();
  //   }, 0)
  // }, [item]);

  return (
    <Animated.View
      entering={LightSpeedInLeft}
      exiting={FadeOutRight}
      layout={Layout.springify()}
      style={styles.itemContainer}
    >
      <View style={styles.imgContainer}>
        {!!item.url_img.match("noimgfull.jpg") ? (
          <Image
            resizeMode="contain"
            source={require("../images/errorImg2.png")}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          />
        ) : (
          <TouchableOpacity onPress={() => handleInfo(item.movieId)}>
            <Image
              style={styles.img}
              resizeMode="contain"
              source={{
                uri: item?.imgKey === false ? item.url_img : dataImg,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.descContainer}>
        {
          //? TITLE
        }
        <Text style={styles.movieTitle}>{item.title}</Text>
        {
          //? RATING
        }
        <View style={[styles.centerRow, { marginVertical: MARGIN.m1 }]}>
          <MaterialCommunityIcons
            name={item.rating !== "N/A" ? "star" : "cancel"}
            color={
              item.rating === "N/A"
                ? COLORS.lightGray
                : COLORS.gold
            }
            size={SIZES.h2m}
            style={{ marginRight: MARGIN.m2 }}
          />
          <Text style={[styles.defaultText, { fontSize: SIZES.h2 }]}>
            {item.rating}
          </Text>
        </View>
        {
          //? DIRECTOR
        }
        {
          item?.director ? 
        <View style={[styles.centerRow]}>
          <Text
            style={[
              styles.defaultText,
              {
                fontSize: SIZES.h3,
                color: COLORS.lightGray,
                textAlign: "center",
              },
            ]}
          >
            Director:{" "}
            <Text
              style={[
                styles.defaultText,
                { fontSize: SIZES.h3, color: COLORS.white },
              ]}
            >
              {`\n ${item.director}`}
            </Text>
          </Text>
        </View> : null
        }
        {
          //? STARRING
        }
        <View style={[styles.centerRow, { marginTop: 0 }]}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={[
              styles.defaultText,
              { color: COLORS.lightGray, fontSize: SIZES.h4, textAlign: 'center'},
            ]}
          >
            {`Reparto: \n`}
            {item.starring.map((star, i) => {
              if (i === 0) {
                return (
                  <Text key={star + i} style={{ color: COLORS.white, fontWeight: 'normal' }}>
                    {" "}
                    {star}
                  </Text>
                );
              }
              return (
                <Text key={star + i} style={{ color: COLORS.white, fontWeight: 'normal' }}>
                  {", "}
                  {star}
                </Text>
              );
            })}
          </Text>
        </View>
        {
          //? DURATION
        }
        <View style={[styles.centerRow, { marginTop: MARGIN.m2 }]}>
          <Text
            style={[
              styles.defaultText,
              {
                fontSize: SIZES.h4,
                color: COLORS.lightGray,
                textAlign: "center",
              },
            ]}
          >
            Duraci??n:{" "}
            <Text
              style={[
                styles.defaultText,
                { fontSize: SIZES.h4, color: COLORS.white },
              ]}
            >
              {`${item.runing_time}`}
            </Text>
          </Text>
        </View>
        {
          //? SAVED AT
        }
        <View style={[styles.centerRow, { marginTop: MARGIN.m2 }]}>
          <Text
            style={[
              styles.defaultText,
              {
                fontSize: SIZES.h4,
                color: COLORS.lightGray,
                textAlign: "center",
              },
            ]}
          >
            Guardada:{" "}
            <Text
              style={[
                styles.defaultText,
                { fontSize: SIZES.h4, color: COLORS.white },
              ]}
            >
              {`${formatDateWithoutTime(item.savedDate)}`}
            </Text>
          </Text>
        </View>
        {
          //? BUTTONS
        }
        <View
          style={{
            flexDirection: "row",
            marginTop: MARGIN.m2,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            onPress={() => handleWarning(item.movieId, item.title)}
            style={styles.infoBtn}
          >
            <MaterialCommunityIcons
              name="delete"
              size={SIZES.h2}
              color={COLORS.pink}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleInfo(item.movieId)}
            style={styles.infoBtn}
          >
            <MaterialCommunityIcons
              name="information"
              size={SIZES.h2}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCheck(item.movieId)}
            style={styles.infoBtn}
          >
            <MaterialCommunityIcons
              name="check-bold"
              size={SIZES.h2}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: MARGIN.m2,
    zIndex: 0,
  },
  itemContainer: {
    flexDirection: "row",
    height: 350,
    marginVertical: MARGIN.m2,
    marginHorizontal: MARGIN.m1,
    backgroundColor: COLORS.black,
    zIndex: 0,
  },
  imgContainer: {
    flex: 2,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  descContainer: {
    flex: 1.5,
    padding: MARGIN.m1,
    justifyContent: 'space-evenly'
  },
  movieTitle: {
    marginTop: MARGIN.m3,
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.h2,
    textAlign: "center",
    // borderWidth: 3,
    // borderColor: 'white'
  },
  defaultText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: SIZES.h2,
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  infoBtn: {
    alignItems: "center",
    // backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    marginVertical: MARGIN.m4,
    padding: 10,
  },
  modalStyle: {
    position: "absolute",
    top: TOTAL_HEIGHT * 0.065,
    height: TOTAL_HEIGHT * 0.1,
    width: TOTAL_WIDTH,
    backgroundColor: COLORS.darkGray,
  },
});

export default ItemSavedMovies;
