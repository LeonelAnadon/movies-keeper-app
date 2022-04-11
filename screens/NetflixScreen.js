import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  FlatList
} from "react-native";
import { COLORS, MARGIN, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";
import { MoviesContext } from "../src/context";

const NetflixScreen = () => {
  const appContext = useContext(MoviesContext);
  const { isSearchingPopular, error404Popular, searchPopular, netflixPopular } = appContext;

  const Item = ({item}) => {
    return (
      <View style={{width: TOTAL_WIDTH, height: TOTAL_HEIGHT * 0.22, maxWidth: '30%', marginHorizontal: '1.5%'}}>
        <Image source={{uri: item.imgUrl}} resizeMode='contain' style={{width: '100%', height: '100%'}} />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={{ color: COLORS.white }}>NETFLIX SCREEN</Text>
      <Button title="SEARCH!" onPress={() => searchPopular('netflix')}/>
      {isSearchingPopular ? (
        <ActivityIndicator
          style={{ marginVertical: MARGIN.m5_big }}
          size={50 || "large"}
          color={COLORS.pink}
        />
      ) : null}
      <View style={{ }}>
        <FlatList 
        data={netflixPopular}
        numColumns={3}
        renderItem={Item}
        keyExtractor={(popular) => popular.imgUrl + Math.random() * 1000}
        showsVerticalScrollIndicator={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:'center'
  }
})

export default NetflixScreen;
