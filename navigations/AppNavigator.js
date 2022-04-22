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
import {
  COLORS,
  MARGIN,
  PADDING,
  SIZES,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "../constants/theme";
import { MoviesContext } from "../src/context";
import PopularNavigator from "./PopularNavigator";
import { TouchableOpacity } from "react-native-gesture-handler";
import Settings from "../screens/Settings";
import api from "../src/api/api";

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
  const { handleLogout } = appContext
  const [isEnabled, setIsEnabled] = useState(false);


  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: PADDING.pd6,
          paddingHorizontal: PADDING.pd7,
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="account-circle"
          color={COLORS.pink}
          size={TOTAL_WIDTH * 0.08}
          style={{ marginHorizontal: TOTAL_WIDTH * 0.018 }}
        />
        <Text
          style={{
            color: COLORS.white,
            fontSize: SIZES.h2,
            fontWeight: "bold",
          }}
        >
          {props.userName}
        </Text>
      </View>

      <DrawerItemList {...props} />

      <View style={{ justifyContent: "flex-end", height: TOTAL_HEIGHT * 0.65 }}>
        <View>
          <DrawerItem
            label={() => (
              <Text style={{ color: COLORS.lightGray, marginLeft: -MARGIN.m6 }}>
                Salir
              </Text>
            )}
            onPress={() => handleLogout()}
            icon={() => (
              <MaterialCommunityIcons
                name="exit-to-app"
                color={COLORS.pink}
                size={SIZES.h1}
              />
            )}
            style={{ marginHorizontal: MARGIN.m1 }}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const AppNavigator = ({ navigation, userName }) => {
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
            keyboardDismissMode: "on-drag",
            swipeEnabled: false,
          }}
          drawerContent={(props) => (
            <CustomDrawerContent {...props} userName={userName} />
          )}
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
            name="settings"
            options={{
              headerShown: false,
              drawerLabel: () => (
                <Text style={{ color: COLORS.lightGray, marginLeft: -20 }}>
                  Configuración
                </Text>
              ),
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name="cog"
                  color={COLORS.lightGray}
                  size={SIZES.h2}
                />
              ),
            }}
            component={Settings}
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
