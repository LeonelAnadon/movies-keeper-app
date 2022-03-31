import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Switch,
  Vibration,
  ToastAndroid,
} from "react-native";
import { COLORS, MARGIN, SIZES } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MoviesContext } from "../src/context";
import SearchItem from "./SearchItem";



function SearchScreen() {
  const appContext = useContext(MoviesContext);
  const { data, isSearching, howMany, error404, textSearched, setJustOne, saveMovie } =
    appContext;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setJustOne((previousState) => !previousState);
  };

  const savingMovie = (movie) => {
    const message = saveMovie(movie)
    if(message === 'error'){
      ToastAndroid.show('Ya existe la pelicula en tu colección', ToastAndroid.SHORT)
    } else if (message === 'saved'){
      ToastAndroid.show('Guardé la peli en tu colección', ToastAndroid.SHORT)
    }
  }

  useEffect(() => {
    if (data?.results?.length > 0) {
      Vibration.vibrate(400);
    }
  }, [data]);

  useEffect(() => {
    if (isEnabled) {
      ToastAndroid.showWithGravity(
        `Multiple resultados puede incrementar el tiempo de espera`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
    }
  }, [isEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: MARGIN.m1,
        }}
      >
        {howMany !== 0 && !isSearching && !error404 ? (
          <Text style={{ color: COLORS.white, margin: MARGIN.m1 }}>
            {`${textSearched}: ${howMany} resultados`}
          </Text>
        ) : (
          <Text style={{ color: COLORS.white, margin: MARGIN.m1 }}>
            ¿Algúna peli en mente?
          </Text>
        )}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ color: COLORS.white }}>Multiple resultados </Text>
          <Switch
            trackColor={{ false: COLORS.lightGray, true: COLORS.lightPink }}
            thumbColor={isEnabled ? COLORS.pink : COLORS.white}
            ios_backgroundColor={COLORS.lightGray}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      {error404 ? (
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
      ) : null}

      {isSearching ? (
        <ActivityIndicator
          style={{ marginVertical: MARGIN.m5_big }}
          size={50 || "large"}
          color={COLORS.pink}
        />
      ) : null}
      <FlatList
        data={data?.results}
        renderItem={({ item }) => (
          <SearchItem
            title={item.title}
            rating={item.rating}
            year={item.year}
            director={item.director}
            starring={item.starring}
            imgUri={item.url_img}
            allItem={item}
            savingMovie={savingMovie}
          />
        )}
        keyExtractor={(item) => item.title + item.year + item.director}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   // marginTop: StatusBar.currentHeight || 0,
  // },
  // item: {
  //   flexDirection: "row",
  //   backgroundColor: COLORS.gray,
  //   marginVertical: 8,
  //   // marginHorizontal: 16,
  // },
  // imgContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   padding: MARGIN.m1,
  //   width: "100%",
  //   height: 290,
  // },
  // imgStyle: {
  //   height: "100%",
  // },
  // infoContainer: {
  //   flex: 1,
  //   padding: MARGIN.m3,
  // },
  // title: {
  //   fontSize: SIZES.h2,
  //   color: COLORS.white,
  // },
  // descContainer: {
  //   flexDirection: "column",
  // },
  // ratingContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   marginVertical: MARGIN.m1,
  // },
  // textPlain: {
  //   color: COLORS.lightGray,
  //   textAlignVertical: "center",
  //   fontWeight: "bold",
  //   fontSize: SIZES.body3,
  //   margin: MARGIN.m2,
  // },
  // starringContainer: {
  //   // backgroundColor: COLORS.lightGray,
  // },
  // saveBtn: {
  //   alignItems: "center",
  //   backgroundColor: COLORS.darkGray,
  //   marginVertical: MARGIN.m4,
  //   padding: 10,
  // },
});

export default SearchScreen;
