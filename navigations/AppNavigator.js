import React, { useContext, useState } from "react";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Switch,
  Alert,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeNavigator from "./HomeNavigator";
import About from "../screens/About";
import { COLORS, SIZES, TOTAL_HEIGHT, TOTAL_WIDTH } from "../constants/theme";
import { MoviesContext } from "../src/context";
import PopularNavigator from "./PopularNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    border: "transparent",
  },
};

function CustomDrawerContent(props) {
  const appContext = useContext(MoviesContext);
  const { deleteAllViewedMovies, deleteAllSavedMovies } = appContext;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
        { text: "Si, borralas.", onPress: () => deleteAllViewedMovies() },
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
        { text: "Si, borralas.", onPress: () => deleteAllSavedMovies() },
      ]
    );

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flexDirection: "row", padding: 15, alignItems: "center" }}>
        <MaterialCommunityIcons
          name="video-vintage"
          color={COLORS.pink}
          size={SIZES.h1}
          style={{ marginHorizontal: SIZES.h4 }}
        />
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.h2,
            fontWeight: "bold",
          }}
        >
          Movies Keeper
        </Text>
      </View>

      <DrawerItemList {...props} />

      <View
        style={{ justifyContent: "flex-end", height: TOTAL_HEIGHT * 0.65 }}
      >
        {/* <DrawerItem
          label="Información"
          onPress={() => props.navigation.navigate("Vistas")}
        /> */}
        <View>
          <DrawerItem
            label={() => (
              <Text style={{ color: COLORS.lightGray, marginLeft: -20 }}>
                Borrar Vistas
              </Text>
            )}
            onPress={() => handleDeleteAllWatchedMovies()}
            icon={() => (
              <MaterialCommunityIcons
                name="delete"
                color={COLORS.pink}
                size={SIZES.h1}
              />
            )}
            style={{ marginHorizontal: 4 }}
          />
          <DrawerItem
            label={() => (
              <Text style={{ color: COLORS.lightGray, marginLeft: -20 }}>
                Borrar Guardadas
              </Text>
            )}
            onPress={() => handleDeleteAllSavedMovies()}
            icon={() => (
              <MaterialCommunityIcons
                name="delete"
                color={COLORS.pink}
                size={SIZES.h1}
              />
            )}
            style={{ marginHorizontal: 4 }}
          />
        </View>
      </View>

      {/* <Switch
        trackColor={{ false: COLORS.lightGray, true: COLORS.lightPink }}
        thumbColor={isEnabled ? COLORS.pink : COLORS.white}
        ios_backgroundColor={COLORS.lightGray}
        onValueChange={toggleSwitch}
        value={isEnabled}
      /> */}
    </DrawerContentScrollView>
  );
}

const AppNavigator = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="black"
        barStyle={"default"}
        hidden={false}
      />
      <NavigationContainer theme={theme}>
        <Drawer.Navigator
          initialRouteName="HomePage"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            drawerStatusBarAnimation: "slide",
            drawerActiveTintColor: "#dad8d9",
            drawerItemStyle: { marginVertical: 10 },
            keyboardDismissMode: 'on-drag'
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="HomePage"
            options={{
              drawerLabel: () => (
                <Text style={{ color: COLORS.lightGray, marginLeft: -20 }}>
                  Inicio
                </Text>
              ),
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="home"
                  color={COLORS.lightGray}
                  size={SIZES.h2}
                />
              ),
            }}
            component={HomeNavigator}
          />
          <Drawer.Screen
            name="Popular"
            options={{
              headerShown: false,


              drawerLabel: () => (
                <Text style={{ color: COLORS.lightGray, marginLeft: -20 }}>
                  Recomendados para ver
                </Text>
              ),
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="star-face"
                  color={COLORS.gold}
                  size={SIZES.h2}
                />
              ),
            }}
            component={PopularNavigator}
          />
          <Drawer.Screen
            name="About"
            options={{
              headerShown: true,
              drawerLabel: () => (
                <Text style={{ color: COLORS.lightGray, marginLeft: -20 }}>
                  About
                </Text>
              ),
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="information"
                  color={COLORS.lightGray}
                  size={SIZES.h2}
                />
              ),
            }}
            component={About}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default AppNavigator;
