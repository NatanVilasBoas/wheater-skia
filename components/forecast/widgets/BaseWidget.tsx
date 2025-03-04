import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Canvas, RoundedRect, Shadow } from "@shopify/react-native-skia";

interface BaseWidgetProps {
  height: number;
  width: number;
  headerText: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const BaseWidget = ({
  height,
  width,
  headerText,
  icon,
  children,
}: BaseWidgetProps) => {
  const cornerRadius = 22;
  return (
    <View
      style={{
        alignSelf: "center",
        width: width,
        height: height,
      }}
    >
      <Canvas style={{ ...StyleSheet.absoluteFillObject, height: height }}>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={cornerRadius}
          color={"rgba(51, 31, 85, 1)"}
        >
          <Shadow
            dx={2}
            dy={2}
            blur={0}
            color={"rgba(235,255,255, 0.30)"}
            inner
          />
        </RoundedRect>
      </Canvas>
      <View style={styles.header}>
        {icon}
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
      {children}
    </View>
  );
};

export default BaseWidget;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 14,
    fontFamily: "SF-Regular",
    textTransform: "uppercase",
    color: "#9392A8",
  },
  header: {
    flexDirection: "row",
    gap: 8,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 12,
    alignItems: "center",
  },
});
