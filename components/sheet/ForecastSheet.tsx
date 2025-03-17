import React, { useEffect, useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ForecastSheetBackground from "./ForecastSheetBackground";
import useApplicationDimensions from "../../hooks/useApplicationDimensions";
import ForecastControl from "./elements/ForecastControl";
import Separator from "./elements/Separator";
import { hourly, weekly } from "../../data/ForecastData";
import ForecastScroll from "../forecast/ForecastScroll";
import { ForecastType } from "../../models/Weather";
import { ScrollView, View } from "react-native";
import AirQualityWidget from "../forecast/widgets/AirQualityWidget";
import UvIndexWidget from "../forecast/widgets/UvIndexWidget";
import SunriseWidget from "../forecast/widgets/SunriseWidget";
import WindWidget from "../forecast/widgets/WindWidget";
import RainFallWidget from "../forecast/widgets/RainFallWidget";
import FeelsLikeWidget from "../forecast/widgets/FeelsLikeWidget";
import HumidityWidget from "../forecast/widgets/HumidityWidget";
import VisibilityWidget from "../forecast/widgets/VisibilityWidget";
import PressureWidget from "../forecast/widgets/PressureWidget";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "../../context/ForecastSheetContext";

export default function ForecastSheet() {
  const { width, height } = useApplicationDimensions();
  const [selectedForecastType, setSelectedForecastType] =
    useState<ForecastType>(ForecastType.Hourly);
  const snapPoints = ["38.5%", "83%"];
  const firstSnaPoint = height * (parseFloat(snapPoints[0]) / 100);
  const secondSnapPoint = height * (parseFloat(snapPoints[1]) / 100);
  const minY = height - secondSnapPoint;
  const maxY = height - firstSnaPoint;
  const cornerRadius = 44;
  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;
  const smallWidgetSize = width / 2 - 30;
  const currentPosition = useSharedValue(0);
  const animatedPosition = useForecastSheetPosition();
  const translateXHourly = useSharedValue(0);
  const translateXWeekly = useSharedValue(width);
  const animatedHourlyStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXHourly.value }],
    };
  });
  const animatedWeeklyStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateXWeekly.value }],
    };
  });
  const normalizePosition = (position: number) => {
    "worklet";
    return ((position - maxY) / (maxY - minY)) * -1;
  };
  useAnimatedReaction(
    () => {
      return currentPosition.value;
    },
    (cv) => {
      animatedPosition.value = normalizePosition(cv);
    }
  );

  useEffect(() => {
    if (selectedForecastType === ForecastType.Weekly) {
      translateXHourly.value = withTiming(-width);
      translateXWeekly.value = withTiming(-width);
    } else {
      translateXHourly.value = withTiming(0);
      translateXWeekly.value = withTiming(width);
    }
  }, [selectedForecastType]);

  return (
    <BottomSheet
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      animatedPosition={currentPosition}
      animateOnMount={false}
      handleIndicatorStyle={{
        width: 48,
        height: 8,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
      backgroundComponent={() => (
        <ForecastSheetBackground
          width={width}
          height={firstSnaPoint}
          cornerRadius={cornerRadius}
        />
      )}
    >
      <BottomSheetView style={{ height: height }}>
        <ForecastControl onPress={(type) => setSelectedForecastType(type)} />
        <Separator width={width} height={3} />
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Animated.View style={[animatedHourlyStyles]}>
              <ForecastScroll
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
                forecasts={hourly}
              />
            </Animated.View>
            <Animated.View style={[animatedWeeklyStyles]}>
              <ForecastScroll
                capsuleWidth={capsuleWidth}
                capsuleHeight={capsuleHeight}
                capsuleRadius={capsuleRadius}
                forecasts={weekly}
              />
            </Animated.View>
          </View>
          <View
            style={{
              paddingTop: 30,
              paddingBottom: 50,
              flex: 1,
            }}
          >
            <AirQualityWidget width={width - 30} height={150} />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                padding: 15,
                gap: 18,
              }}
            >
              <UvIndexWidget width={smallWidgetSize} height={smallWidgetSize} />
              <SunriseWidget width={smallWidgetSize} height={smallWidgetSize} />
              <WindWidget width={smallWidgetSize} height={smallWidgetSize} />
              <RainFallWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <FeelsLikeWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <HumidityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <VisibilityWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
              <PressureWidget
                width={smallWidgetSize}
                height={smallWidgetSize}
              />
            </View>
          </View>
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
}
