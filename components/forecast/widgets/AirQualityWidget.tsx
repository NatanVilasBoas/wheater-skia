import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import BaseWidget from "./BaseWidget";
import useApplicationDimensions from "../../../hooks/useApplicationDimensions";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Canvas,
  Circle,
  Line,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";

interface AirQualityWidgetProps {
  value: number;
}

const AirQualityWidget = ({ value }: AirQualityWidgetProps) => {
  const { width } = useApplicationDimensions();
  const widgetWidth = width - 40;
  const lineCy = 8;
  return (
    <BaseWidget
      height={172}
      width={widgetWidth}
      headerText="air quality"
      icon={<Entypo name="air" size={24} color="#9392A8" />}
    >
      <View style={styles.body}>
        <Text style={styles.title}>3-Low Health Risk</Text>
        <Canvas style={{ height: 32, width: widgetWidth }}>
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
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 20,
          }}
        >
          <Text style={styles.footerText}>See more</Text>
          <MaterialIcons name="arrow-forward-ios" size={18} color="#645C86" />
        </Pressable>
      </View>
    </BaseWidget>
  );
};

export default AirQualityWidget;

const styles = StyleSheet.create({
  body: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "SF-Semibold",
    color: "#fff",
    paddingBottom: 16,
  },
  footerText: {
    fontSize: 18,
    fontFamily: "SF-Regular",
    color: "#FFF",
  },
});
