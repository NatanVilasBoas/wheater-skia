import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BaseWidget from "./BaseWidget";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Canvas,
  Circle,
  Line,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";

interface UvIndexWidgetProps {
  value: number;
  widgetHeight: number;
  widgetFullWidth: number;
}

const UvIndexWidget = ({
  widgetHeight,
  value,
  widgetFullWidth,
}: UvIndexWidgetProps) => {
  const lineCy = 8;
  const widgetWidth = widgetFullWidth / 2;
  return (
    <BaseWidget
      headerText="UV Index"
      height={widgetHeight}
      width={widgetWidth}
      icon={<Ionicons name="sunny" size={20} color="#9392A8" />}
    >
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>4</Text>
          <Text style={{ ...styles.headerText, fontSize: 24 }}>Moderate</Text>
        </View>
        <Canvas style={{ height: 32, width: widgetFullWidth }}>
          <Line
            p1={vec(0, lineCy)}
            p2={vec(widgetWidth - 40, lineCy)}
            strokeWidth={4}
            strokeCap={"round"}
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(widgetWidth - 40, 0)}
              colors={["#3659B1", "#BF59EA", "#BE3985"]}
            />
          </Line>
          <Circle
            cx={(value / 100) * (widgetWidth - 40) + 2}
            cy={lineCy}
            r={2}
            color={"white"}
          />
        </Canvas>
      </View>
    </BaseWidget>
  );
};

export default UvIndexWidget;

const styles = StyleSheet.create({
  body: {
    paddingLeft: 20,
  },
  header: {
    marginBottom: 12,
  },
  headerText: {
    fontSize: 32,
    color: "white",
    fontFamily: "SF-Semibold",
  },
});
