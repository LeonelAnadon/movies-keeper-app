import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./navigations/AppNavigator";
import LoginNavigator from "./navigations/LoginNavigator";
import { MoviesProvider } from "./src/context";

export default function App() {
  const [isLogin, setIsLogin] = useState({user: '', status: false});

  return (
    <>
      {isLogin.status ? (
        <MoviesProvider setIsLogin={setIsLogin} userName={isLogin.user}>
          <AppNavigator userName={isLogin.user} />
        </MoviesProvider>
      ) : (
        <LoginNavigator setIsLogin={setIsLogin}/>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
