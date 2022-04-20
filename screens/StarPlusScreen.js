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
import { MoviesContext } from "../src/context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const StarPlusScreen = ({ navigation }) => {
  const appContext = useContext(MoviesContext);
  const { isSearchingPopular, error404Popular, searchPopular, starPlusPopular } =
    appContext;
  const [refreshing, setRefreshing] = useState(false);
  const [isSearching, setisSearching] = useState(false);

  const handlePopularDetails = (movieUrl) => {
    navigation.navigate("PopularDetails", {movieUrl});
  }

  const Item = ({ item }) => {
    return (
      <View
        style={{
          width: TOTAL_WIDTH,
          height: TOTAL_HEIGHT * 0.22,
          maxWidth: "30%",
          marginHorizontal: "1.5%",
        }}
      >
        <TouchableOpacity
          onPress={() => handlePopularDetails(item.movieUrl)}
        >
          <Image
            source={{ uri: item.imgUrl }}
            resizeMode="contain"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setisSearching(true);
    let res = await searchPopular("star-plus");
    if (res === "ok") setRefreshing(false), setisSearching(false);
    if (res === "error") setRefreshing(false), setisSearching(false);
  }, [refreshing]);

  useEffect(() => {
    // onRefresh()
  }, []);

  if (!starPlusPopular.length || refreshing) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {isSearching ? (
          <ActivityIndicator
            style={{ marginVertical: MARGIN.m5_big }}
            size={50 || "large"}
            color={COLORS.pink}
          />
        ) : null}
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.h3,
            marginBottom: MARGIN.m1,
          }}
        >
          {isSearching ? "Buscando..." : "Nada por aquí..."}
        </Text>

        {!isSearching ? (
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
            ¡Toca para buscar!
          </Text>
        ) : null}

        <MaterialCommunityIcons
          onPress={() => onRefresh()}
          name="movie-search"
          color={COLORS.pink}
          size={TOTAL_HEIGHT * 0.08}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
            {error404Popular === 'star-plus' ? (
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
      <View>
        <FlatList
          data={starPlusPopular}
          numColumns={3}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressBackgroundColor={COLORS.black}
              colors={[COLORS.pink]}
              size='large'
            />
          }
          renderItem={Item}
          keyExtractor={(popular) => popular.imgUrl + Math.random() * 1000}
          ListFooterComponent={() => {
            if (!starPlusPopular?.length > 0)
              return <View style={{ height: TOTAL_HEIGHT }}></View>;
            return (
              <View
                style={{
                  height: 1,
                  backgroundColor: COLORS.pink,
                  marginVertical: TOTAL_HEIGHT * 0.06,
                }}
              ></View>
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: TOTAL_HEIGHT,
  },
});

export default StarPlusScreen;
