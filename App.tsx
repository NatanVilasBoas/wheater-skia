import HomeBackground from "./components/HomeBackground";
import { StatusBar } from "expo-status-bar";
import { WeatherTabBar } from "./components/tabbar/WeatherTabBar";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <HomeBackground />
      <WeatherTabBar />
    </>
  );
}
