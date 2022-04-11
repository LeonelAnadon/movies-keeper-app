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
} from "react-native";
import { COLORS, MARGIN, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";
import { MoviesContext } from "../src/context";

const NetflixScreen = () => {
  const appContext = useContext(MoviesContext);
  const { isSearchingPopular, error404Popular, searchPopular, netflixPopular } =
    appContext;
  const [refreshing, setRefreshing] = useState(false);

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
        <Image
          source={{ uri: item.imgUrl }}
          resizeMode="contain"
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    );
  };

  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    let res = await searchPopular('netflix')
    if(res === 'ok') setRefreshing(false)
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={netflixPopular}
          numColumns={3}
          refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor={COLORS.black} colors={[COLORS.pink]}/>}
          renderItem={Item}
          keyExtractor={(popular) => popular.imgUrl + Math.random() * 1000}
          ListFooterComponent={() => {
            if(!netflixPopular.length > 0) return <View style={{height: TOTAL_HEIGHT}}></View>
            return(
            <View
              style={{
                height: 1,
                backgroundColor: COLORS.pink,
                marginVertical: TOTAL_HEIGHT * 0.06,
              }}
            ></View>)
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

export default NetflixScreen;
