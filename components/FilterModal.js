import React, { useContext, useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { COLORS, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";
import { MoviesContext } from "../src/context";
import { bounce } from "react-native/Libraries/Animated/Easing";

const FilterModal = (props) => {
  const appContext = useContext(MoviesContext);
  const { toggleFilter } = appContext;
  const [isTop, setIsTop] = useState(false);
  const slide = useRef(new Animated.Value(0)).current;

  const startAnimation = toValue => {
    Animated.timing(slide, {
        toValue,
        duration: 150,
        easing: bounce,
        useNativeDriver: true
    }).start(() => {
        setIsTop(!isTop);
    })
}
  useEffect(() => {
    handleAnimation()
  }, [toggleFilter])
  
  const handleAnimation = () => {
    startAnimation(isTop ? 1 : 0);
  }

  const translateY = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [-70, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.modal , {transform: [{translateY}]}]}>
        {/* <Button title="Option" onPress={() => alert("Option 1")} />
        <Button title="Option" onPress={() => alert("Option 2")} />
        <Button title="Option" onPress={() => alert("Option 3")} /> */}
        {props.children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: TOTAL_HEIGHT,
    backgroundColor: COLORS.pink,
    position: 'absolute'
  },
  modal: {
    position: "absolute",
    backgroundColor: COLORS.gray,
    width: TOTAL_WIDTH,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
    opacity: 1,
  },

});

export default FilterModal;
