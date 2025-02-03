import React from "react";
import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
const HomeBackground = () => {
  const { width, height } = useWindowDimensions();
  return (
    <>
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(width, height)}
            colors={["#2E335A", "#1C1B33"]}
          />
        </Rect>
      </Canvas>
      <ImageBackground
        source={require("../assets/home/Background.png")}
        resizeMode="cover"
        style={{ height: "100%" }}
      >
        <Image
          source={require("../assets/home/House.png")}
          resizeMode="cover"
          style={{
            width: width,
            height: width,
            ...StyleSheet.absoluteFillObject,
            top: 304,
          }}
        />
      </ImageBackground>
    </>
  );
};

export default HomeBackground;
