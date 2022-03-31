import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { COLORS, SIZES } from "../constants/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { bounce } from "react-native/Libraries/Animated/Easing";

const ViewedScreen = () => {
  const [spin, setSpin] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
        easing: bounce
      }),

      { iterations: 1 }
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          // transform: [{ rotateZ: `${spin}deg` }],
          opacity: spin,
          transform: [
            {
              rotateZ:spin.interpolate({
                inputRange: [0, 1],
                outputRange: [`${0}deg`,`${360}deg`], // 0 : 150, 0.5 : 75, 1 : 0
              }),
            },
          ],
        }}
      >
        <MaterialCommunityIcons
          name="star"
          color={COLORS.gold}
          size={SIZES.bigText}
        />
      </Animated.View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
});

export default ViewedScreen;