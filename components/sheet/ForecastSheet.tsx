import React, { useState } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import ForecastSheetBackground from "./ForecastSheetBackground";
import useApplicationDimensions from "../../hooks/useApplicationDimensions";
import ForecastControl from "./elements/ForecastControl";
import Separator from "./elements/Separator";
import { hourly, weekly } from "../../data/ForecastData";
import ForecastScroll from "../forecast/ForecastScroll";
import { ForecastType } from "../../models/Weather";

export default function ForecastSheet() {
  const { width, height } = useApplicationDimensions();
  const [selectedForecastType, setSelectedForecastType] =
    useState<ForecastType>(ForecastType.Hourly);
  const snapPoints = ["38.5%", "83%"];
  const firstSnaPoint = height * (parseFloat(snapPoints[0]) / 100);
  const cornerRadius = 44;
  const capsuleRadius = 30;
  const capsuleHeight = height * 0.17;
  const capsuleWidth = width * 0.15;

  return (
    <BottomSheet
      snapPoints={snapPoints}
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
      <BottomSheetView style={{ flex: 1, height: height }}>
        <ForecastControl onPress={(type) => setSelectedForecastType(type)} />
        <Separator width={width} height={3} />
        <ForecastScroll
          capsuleWidth={capsuleWidth}
          capsuleHeight={capsuleHeight}
          capsuleRadius={capsuleRadius}
          forecasts={
            selectedForecastType === ForecastType.Hourly ? hourly : weekly
          }
        />
      </BottomSheetView>
    </BottomSheet>
  );
}
