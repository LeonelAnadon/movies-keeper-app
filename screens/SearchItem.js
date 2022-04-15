import React, { useContext } from "react";
import { MoviesContext } from "../src/context";
import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  COLORS,
  MARGIN,
  SIZES,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { TouchableOpacity } from "react-native-gesture-handler";

const SearchItem = ({
  title,
  rating,
  year,
  director,
  starring,
  imgUri,
  allItem,
  savingMovie,
  genres,
}) => {
  // const appContext = useContext(MoviesContext);
  // const { saveMovie } = appContext;

  return (
    <View style={styles.item}>
      <View style={styles.imgContainer}>
        {!!imgUri.match("noimgfull.jpg") ? (
          <Image
            resizeMode="center"
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
            style={styles.imgStyle}
            resizeMode="contain"
            source={{
              uri:
                imgUri.length > 235
                  ? `data:image/jpeg;base64,${imgUri}`
                  : imgUri.slice(imgUri.match("webp").index + 6, -3),
            }}
          />
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text ellipsizeMode="tail" numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        <View style={styles.descContainer}>
          <View style={styles.ratingContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MaterialCommunityIcons
                name={rating !== "N/A" ? "star" : "cancel"}
                color={
                  rating === "N/A"
                    ? COLORS.lightGray
                    : rating >= "5.5"
                    ? COLORS.gold
                    : rating <= "4"
                    ? COLORS.red
                    : COLORS.orange
                }
                size={SIZES.h2m}
              />
              <Text style={[styles.textPlain, { fontSize: SIZES.body3 }]}>
                {rating}
              </Text>
            </View>
            <Text style={[styles.textPlain, { color: COLORS.lightGray }]}>
              Año:{" "}
              <Text style={{ color: COLORS.white, fontWeight: "normal" }}>
                {year}
              </Text>{" "}
            </Text>
          </View>
          {genres ? (
            <View
              style={{
                justifyContent: "center",
                maxWidth: TOTAL_WIDTH * 0.5,
              }}
            >
              <Text style={[styles.textPlain, { textAlign: "center" }]}>
                Género:
                {genres.map((genre, idx) =>
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
          <View style={styles.starringContainer}>
            <Text style={[styles.textPlain, { color: COLORS.lightGray }]}>
              Director: <Text style={{ color: COLORS.white }}>{director}</Text>
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={3}
              style={[styles.textPlain, { color: COLORS.lightGray }]}
            >
              Reparto:
              {starring.map((star, i) => {
                if (i === 0) {
                  return (
                    <Text
                      key={star + i}
                      style={{ color: COLORS.white, fontWeight: "normal" }}
                    >
                      {" "}
                      {star}
                    </Text>
                  );
                }
                return (
                  <Text
                    key={star + i}
                    style={{ color: COLORS.white, fontWeight: "normal" }}
                  >
                    {", "}
                    {star}
                  </Text>
                );
              })}
            </Text>
          </View>
          {
            //? SAVE BUTTON
          }
          <View style={{flex: 1.2, flexDirection: 'column', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => savingMovie(allItem)}
              style={styles.saveBtn}
            >
              <MaterialCommunityIcons
                name="content-save"
                size={SIZES.h2}
                color={COLORS.pink}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    backgroundColor: COLORS.black,
    marginVertical: SIZES.body6,
    height: TOTAL_HEIGHT * 0.4,
  },
  imgContainer: {
    flex: 1.5,
    padding: MARGIN.m1,
  },
  imgStyle: {
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    padding: MARGIN.m3,
    height: TOTAL_HEIGHT * 0.4,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  descContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: TOTAL_HEIGHT * 0.3,
    // height: '90%'
  },
  ratingContainer: {
    flex: 1,
    marginTop: SIZES.body6
  },
  textPlain: {
    color: COLORS.lightGray,
    textAlignVertical: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: SIZES.body3,
    margin: MARGIN.m2,
  },

  saveBtn: {
    alignItems: "center",
    backgroundColor: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.darkGray,
    // marginVertical: MARGIN.m4,
    padding: SIZES.body6,
  },
});

export default SearchItem;
