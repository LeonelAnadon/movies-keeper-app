import React, { useContext, useEffect, useState } from "react";
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
  TouchableOpacity
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, MARGIN, SIZES } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MoviesContext } from "../src/context";

const Item = ({ item, handleInfo, handleDelete, handleCheck }) => {
  return (
    <View style={styles.itemContainer}>
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
          <Image
            style={styles.img}
            resizeMode="contain"
            source={{
              uri:
                item.url_img.length > 235
                  ? `data:image/jpeg;base64,${item.url_img}`
                  : item.url_img.slice(
                      item.url_img.match("webp").index + 6,
                      -3
                    ),
            }}
          />
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
                : item.rating >= "5.5"
                ? COLORS.gold
                : item.rating <= "4"
                ? COLORS.red
                : COLORS.orange
            }
            size={SIZES.h2}
            style={{ marginRight: MARGIN.m2 }}
          />
          <Text style={[styles.defaultText, { fontSize: SIZES.h3 }]}>
            {item.rating}
          </Text>
        </View>
        {
          //? DIRECTOR
        }
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
        </View>
        {
          //? STARRING
        }
        <View style={[styles.centerRow, { marginTop: MARGIN.m1 }]}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={2}
            style={[
              styles.defaultText,
              { color: COLORS.lightGray, fontSize: SIZES.h4 },
            ]}
          >
            Reparto:
            {item.starring.map((star, i) => {
              if (i === 0) {
                return (
                  <Text key={star + i} style={{ color: COLORS.white }}>
                    {" "}
                    {star}
                  </Text>
                );
              }
              return (
                <Text key={star + i} style={{ color: COLORS.white }}>
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
                fontSize: SIZES.h3,
                color: COLORS.lightGray,
                textAlign: "center",
              },
            ]}
          >
            Duración:{" "}
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
            onPress={() => handleDelete(item.movieId)}
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
    </View>
  );
};

function HomeScreen({ navigation }) {
  const appContext = useContext(MoviesContext);
  const { savedMovies, deleteMovie, handleWatchedMovie } = appContext;

  useEffect(() => {
    // console.log(savedMovies);
  }, [savedMovies]);

  const handleInfo = (movieId) => {
    console.log(`Information of ${movieId}`);
    navigation.navigate("details", { movieId: movieId });
  };
  const handleDelete = (movieId) => {
    console.log(`Deleting ${movieId}`);
    let message = deleteMovie(movieId);
    if (message) {
      ToastAndroid.show(message, ToastAndroid.LONG);
    }
  };
  const handleCheck = (movieId) => {
    console.log(`${movieId} checked`);
    const message = handleWatchedMovie(movieId);
    if (message === 'again') {
      ToastAndroid.show(
        `¡Felicidades! La has visto otra vez`,
        ToastAndroid.SHORT
      );
    } else {
      ToastAndroid.show(
        `Agregué ${message} a tus vistas`,
        ToastAndroid.SHORT
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <Item
        // onPress={() => navigation.navigate("details", { item: { ...item } })}
        handleInfo={handleInfo}
        handleDelete={handleDelete}
        handleCheck={handleCheck}
        item={item}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={savedMovies}
        renderItem={renderItem}
        keyExtractor={(movie) => movie.movieId}
        snapToInterval={350 + MARGIN.m2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: MARGIN.m2,
  },
  itemContainer: {
    flexDirection: "row",
    height: 350,
    marginVertical: MARGIN.m2,
    marginHorizontal: MARGIN.m1,
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
    backgroundColor: COLORS.darkGray,
    marginVertical: MARGIN.m4,
    padding: 10,
  },
});

export default HomeScreen;
