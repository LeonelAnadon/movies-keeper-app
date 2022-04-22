import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import {
  COLORS,
  MARGIN,
  PADDING,
  SIZES,
  TOTAL_HEIGHT,
  TOTAL_WIDTH,
} from "../constants/theme";
import Animated, { ZoomIn, Layout } from "react-native-reanimated";
import api from "../src/api/api";

const LoginNavigator = ({setIsLogin}) => {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isNotAuthorized, setIsNotAuthorized] = React.useState(false);
  const userInput = React.useRef();
  const passwordInput = React.useRef();

  const handleLogin = async () => {
    try {
      setIsNotAuthorized(false)
      setIsRefreshing(true);
      const res = await api.post("/user", { user, password });
      if (res.status === 200) setIsRefreshing(false); setIsLogin(status => ({...status, status: true, user}))
    } catch (err) {
      setIsRefreshing(false), setIsNotAuthorized(true)
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.container}
        entering={ZoomIn}
        layout={Layout.springify()}
      >
        <Image
          source={require("../assets/login-icons/title_login.png")}
          resizeMode="contain"
          style={styles.titleLogin}
        />
        {isNotAuthorized ? (
          <Text style={[styles.textPlain, {color: COLORS.pink}]}>
            ¡Ups! Ingresa un usuario válido
          </Text>
        ) : (
          <Text style={styles.textPlain}>
            Puedes ingresar con tu usuario y contraseña
          </Text>
        )}

        <TextInput
          autoComplete="off"
          editable={isRefreshing ? false : true}
          ref={userInput}
          value={user}
          onChangeText={setUser}
          onSubmitEditing={() => passwordInput.current.focus()}
          placeholder="Usuario"
          returnKeyType="next"
          selectionColor={COLORS.pink}
          style={styles.input}
          underlineColorAndroid="transparent"
        />
        <TextInput
          autoComplete="off"
          editable={isRefreshing ? false : true}
          ref={passwordInput}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={() => handleLogin()}
          placeholder="Contraseña"
          returnKeyType="next"
          selectionColor={COLORS.pink}
          secureTextEntry={true}
          style={styles.input}
          underlineColorAndroid="transparent"
        />

        <Pressable
          onPress={() => handleLogin()}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? COLORS.pink : COLORS.black,
              borderColor: pressed ? COLORS.pink : COLORS.white,
            },
            styles.loginBtn,
          ]}
        >
          {({ pressed }) => (
            <View>
              {!isRefreshing ? (
                <Text style={styles.loginTextBtn}>Entrar</Text>
              ) : (
                <ActivityIndicator
                  size={TOTAL_HEIGHT * 0.03 || "small"}
                  color={COLORS.pink}
                />
              )}
            </View>
          )}
        </Pressable>

        <View
          style={{ marginTop: TOTAL_HEIGHT * 0.1, height: TOTAL_HEIGHT * 0.02 }}
        ></View>
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
  input: {
    height: TOTAL_HEIGHT * 0.05,
    width: TOTAL_WIDTH * 0.75,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    color: COLORS.black,
  },
  textPlain: {
    color: COLORS.white,
    marginVertical: MARGIN.m1,
  },
  titleLogin: { width: 200, height: 200 },
  logoLogin: {
    width: 200,
    height: TOTAL_HEIGHT * 0.2,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  loginBtn: {
    marginVertical: MARGIN.m1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: PADDING.pd1,
    height: TOTAL_HEIGHT * 0.05,
    width: TOTAL_WIDTH * 0.4,
  },
  loginTextBtn: {
    color: COLORS.white,
    marginVertical: MARGIN.m1,
    fontSize: SIZES.h3,
  },
});
export default LoginNavigator;
