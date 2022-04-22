import React, { useContext, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Alert, ToastAndroid } from "react-native";
import {
  COLORS,
  MARGIN,
  PADDING,
  SIZES,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "../constants/theme";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { MoviesContext } from "../src/context";

const Stack = createStackNavigator();

const SettingScreen = () => {
  const appContext = useContext(MoviesContext);
  const { userName, deleteAllViewedMovies, deleteAllSavedMovies } = appContext;

  const handleDeleteAllWatchedMovies = () =>
  Alert.alert(
    "Eliminando 🗑",
    "Eliminaré todas las pelis que viste. ¿Continúo?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Si, borralas.", onPress: () => { 
       let res = deleteAllViewedMovies()
       if(res === 'ok'){
        ToastAndroid.show('Todas las peliculas vistas fueron borradas', ToastAndroid.SHORT)
      } else if (message === 'error'){
        ToastAndroid.show('¡Ups! Algo salío mal', ToastAndroid.SHORT)
      }
      } },
    ]
  );
const handleDeleteAllSavedMovies = () =>
  Alert.alert(
    "Eliminando 🗑",
    "Eliminaré todas las pelis que guardaste. ¿Continúo?",
    [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Si, borralas.", onPress: () => {
        let res = deleteAllSavedMovies()
        if(res === 'ok'){
          ToastAndroid.show('Todas las peliculas guardadas fueron borradas', ToastAndroid.SHORT)
        } else if (message === 'error'){
          ToastAndroid.show('¡Ups! Algo salío mal', ToastAndroid.SHORT)
        }
      } },
    ]
  );

  return (
    <View style={styles.container}>
      <Text style={{ color: COLORS.white, fontSize: SIZES.body2 }}>
        {`Hola ${userName}. ¿Todo bien hoy?`}
      </Text>
      <Text style={{ color: COLORS.white, fontSize: SIZES.body2, textAlign: 'center' }}>
        {`\nVamos a ver lo que tenemos para configurar 🤔`}
      </Text>
      <View style={{ flex: 1, marginTop: TOTAL_HEIGHT * 0.05 }}>

        <Pressable
          onPress={() => handleDeleteAllSavedMovies()}
          style={({pressed}) => [{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'center',
            marginBottom: MARGIN.m5_big,
            borderWidth: 1,
            borderColor: pressed ? COLORS.pink : COLORS.darkGray,
            paddingVertical: PADDING.pd6,
            paddingHorizontal: PADDING.pd6,
          }]}
        >
          <MaterialCommunityIcons
            name="delete"
            color={COLORS.pink}
            size={SIZES.h1}
          />
          <Text
            style={{
              color: COLORS.lightGray,
              fontSize: SIZES.body3,
              marginLeft: MARGIN.m1,
            }}
          >
            Borrar todas las peliculas guardadas
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleDeleteAllWatchedMovies()}
          style={({pressed}) => [{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'center',
            marginBottom: MARGIN.m5_big,
            borderWidth: 1,
            borderColor: pressed ? COLORS.pink : COLORS.darkGray,
            paddingVertical: PADDING.pd6,
            paddingHorizontal: PADDING.pd6,
          }]}
        >
          <MaterialCommunityIcons
            name="delete"
            color={COLORS.pink}
            size={SIZES.h1}
          />
          <Text
            style={{
              color: COLORS.lightGray,
              fontSize: SIZES.body3,
              marginLeft: MARGIN.m1,
            }}
          >
            Borrar todas las peliculas ya vistas
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Settings = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="settingscreen"
        component={SettingScreen}
        options={{
          headerTitle: "Configuración",
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity style={{ marginLeft: TOTAL_WIDTH * 0.03 }}>
              <MaterialCommunityIcons
                name="arrow-left"
                color={COLORS.white}
                size={30}
                onPress={() => navigation.navigate("HomePage")}
              />
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: COLORS.black },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: TOTAL_HEIGHT,
    padding: TOTAL_HEIGHT * 0.05,
  },
  modal: {
    position: "absolute",
    backgroundColor: COLORS.white,
    width: TOTAL_WIDTH,
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default Settings;
