import React, { useContext } from "react";
import { MoviesContext } from "../src/context";
import { Image, Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS, MARGIN, SIZES } from "../constants/theme";
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
  savingMovie
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
            resizeMode="cover"
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
        <Text style={styles.title}>{title}</Text>
        <View style={styles.descContainer}>
          <View style={styles.ratingContainer}>
            <View style={{ flexDirection: "row" }}>
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
                size={SIZES.h2}
              />
              <Text style={styles.textPlain}>{rating}</Text>
            </View>
            <Text style={[styles.textPlain, { color: COLORS.lightGray }]}>
              Año: <Text style={{ color: COLORS.white }}>{year}</Text>{" "}
            </Text>
          </View>
          <View style={styles.starringContainer}>
            <Text style={[styles.textPlain, { color: COLORS.lightGray }]}>
              Director: <Text style={{ color: COLORS.white }}>{director}</Text>
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={5}
              style={[styles.textPlain, { color: COLORS.lightGray }]}
            >
              Reparto:
              {starring.map((star, i) => {
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
            //? SAVE BUTTON
          }
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: "row",
    backgroundColor: COLORS.gray,
    marginVertical: 8,
    // marginHorizontal: 16,
  },
  imgContainer: {
    flex: 1,
    justifyContent: "center",
    padding: MARGIN.m1,
    width: "100%",
    height: 290,
  },
  imgStyle: {
    height: "100%",
  },
  infoContainer: {
    flex: 1,
    padding: MARGIN.m3,
  },
  title: {
    fontSize: SIZES.h2,
    color: COLORS.white,
  },
  descContainer: {
    flexDirection: "column",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: MARGIN.m1,
  },
  textPlain: {
    color: COLORS.lightGray,
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: SIZES.body3,
    margin: MARGIN.m2,
  },
  starringContainer: {
    // backgroundColor: COLORS.lightGray,
  },
  saveBtn: {
    alignItems: "center",
    backgroundColor: COLORS.darkGray,
    marginVertical: MARGIN.m4,
    padding: 10,
  },
});

export default SearchItem;
