import React from "react";
import HomeBackground from "../components/HomeBackground";
import WeatherInfo from "../components/section/WheaterInfo";
import { currentWeather } from "../data/CurrentWheater";
import ForecastSheet from "../components/sheet/ForecastSheet";
import WeatherTabBar from "../components/tabbar/WeatherTabBar";
import { ForecastSheetProvider } from "../context/ForecastSheetContext";

const Home = () => {
  return (
    <ForecastSheetProvider>
      <HomeBackground />
      <WeatherInfo weather={currentWeather} />
      <ForecastSheet />
      <WeatherTabBar />
    </ForecastSheetProvider>
  );
};

export default Home;
