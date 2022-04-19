import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { StyleSheet, TextInput, Dimensions, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import { COLORS, SIZES, TOTAL_HEIGHT, TOTAL_WIDTH  } from "../constants/theme";
import DetailsScreen from "../screens/DetailsScreen";
import { MoviesContext } from "../src/context";
import ViewedNavigator from "./ViewedNavigator";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [handleDeleteJustAdded, setHandleDeleteJustAdded] = useState(0)
  const textInput = useRef();
  const appContext = useContext(MoviesContext);
  const { setInputText, savedMovies, deletingJustAdded, setToggleFilter } = appContext;

  const handleSubmit = () => {
    setInputText(searchText);
    setSearchText("");
  };

  const viewedScreenTriggered = () => {
    setHandleDeleteJustAdded(handleDeleteJustAdded + 1)
  }

  useEffect(() => {
    if(handleDeleteJustAdded === 4){
      deletingJustAdded()
      setHandleDeleteJustAdded(0)
    }
  }, [handleDeleteJustAdded])
  

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarItemStyle: {
          marginBottom: Dimensions.get("window").height * 0.012,
          marginTop: Dimensions.get("window").height * 0.004,
        },
        tabBarLabelStyle: { fontSize: SIZES.h5 },
        tabBarStyle: { height: TOTAL_WIDTH * 0.15 },
        headerShown: true,
        headerStyle: {backgroundColor: 'black'} ,
        tabBarActiveTintColor: COLORS.pink,
        tabBarInactiveTintColor: COLORS.lightGray,
        tabBarStyle:{ backgroundColor: COLORS.black, height: TOTAL_HEIGHT * 0.07}
      }}
    >
      {
        //*? MOVIES SAVED TAB */
      }
      <Tab.Screen
        name="Guardadas"
        component={HomeScreen}
        options={{
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{ marginRight: Dimensions.get("window").width * 0.05 }}
            >
              <MaterialCommunityIcons
                name="filter"
                color={COLORS.white}
                size={30}
                onPress={() => setToggleFilter(state => !state)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: Dimensions.get("window").width * 0.05 }}
            >
              <MaterialCommunityIcons
                name="menu"
                color={COLORS.white}
                size={30}
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
            </View>
            
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "content-save" : "content-save-outline"}
              color={color}
              size={size}
            />
          ),
          tabBarBadge: savedMovies.length !== 0 ? savedMovies.length : null,
        }}
      />
      {
        //*? SEARCH TAB */
      }
      <Tab.Screen
        name="Buscar"
        component={SearchScreen}
        listeners={{
          tabPress: () =>
            setTimeout(() => {
              textInput?.current.focus();
            }, 0),
        }}
        options={{
          headerTitle: () => (
            <TextInput
              autoComplete="off"
              ref={textInput}
              value={searchText}
              onChangeText={setSearchText}
              onSubmitEditing={handleSubmit}
              placeholder="Busca una pelicula..."
              returnKeyType="search"
              selectionColor={COLORS.pink}
              style={styles.input}
              underlineColorAndroid="transparent"
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: Dimensions.get("window").width * 0.05 }}
            >
              <MaterialCommunityIcons
                name="menu"
                color={COLORS.white}
                size={30}
                onPress={() => {navigation.openDrawer(), textInput?.current.blur()} }
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "card-search" : "card-search-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      {
        //*? VIEWED TAB */
      }
      <Tab.Screen
        name="Vistas"
        component={ViewedNavigator}
        listeners={{
          tabPress: () => viewedScreenTriggered()}}
        options={{
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: Dimensions.get("window").width * 0.05 }}
            >
              <MaterialCommunityIcons
                name="menu"
                color={COLORS.white}
                size={30}
                onPress={() => navigation.openDrawer()}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "movie" : "movie-outline"}
              color={color}
              size={size}
            />
          ),

          tabBarBadge: null,
        }}
      />
    </Tab.Navigator>
  );
}

const HomeNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          name="home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="details"
          component={DetailsScreen}
          options={{ animationTypeForReplace: "pop", headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.white,
  },
  input: {
    height: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").width * 0.75,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },

});

export default HomeNavigator;
