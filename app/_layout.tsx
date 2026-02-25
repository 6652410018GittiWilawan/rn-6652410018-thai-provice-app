import {
  Kanit_400Regular,
  Kanit_700Bold,
  useFonts,
} from "@expo-google-fonts/kanit";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const logo = require("@/assets/images/Logo1.jpg")

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold,
  });
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  {
    if (!fontsLoaded) {
      return null;
    }
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "KHONKAEN",
          headerTransparent: true,
          headerBlurEffect: 'dark',
          headerShadowVisible: false,
          headerTitleAlign: "left",
          headerTitleStyle: {
            fontSize: 20,
            color: "#fff4f4",
          }
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียด ",
          headerBackButtonDisplayMode: "minimal",
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#000000" },
          headerTitleStyle: {
            fontFamily: "Kanit_700Bold",
            fontSize: 18,
            color: "#fff",
          },
        }}
      />
    </Stack>
  );
}