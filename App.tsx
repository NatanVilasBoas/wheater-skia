import HomeBackground from "./components/HomeBackground";
import { StatusBar } from "expo-status-bar";
import WeatherTabBar from "./components/tabbar/WeatherTabBar";
import WeatherInfo from "./components/section/WheaterInfo";
import { currentWeather } from "./data/CurrentWheater";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "SF-Thin": require("./assets/fonts/SF-Pro-Display-Thin.otf"),
    "SF-Regular": require("./assets/fonts/SF-Pro-Display-Regular.otf"),
    "SF-Semibold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style="light" />
        <HomeBackground />
        <WeatherInfo weather={currentWeather} />
        <WeatherTabBar />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
