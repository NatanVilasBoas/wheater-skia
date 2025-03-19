import { Pressable, StyleSheet, View } from "react-native";
import ListIcon from "../icons/ListIcon";
import MapIcon from "../icons/MapIcon";
import TrapezoidBackground from "./TrapezoidBackground";
import useApplicationDimensions from "../../../hooks/useApplicationDimensions";
import CircleButton from "./CricleButton";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function TabbarItems() {
  const { width, height } = useApplicationDimensions();
  const trapezoidWidth = width * 0.68;
  const trapezoidHeight = height * 0.12;
  const circleRadius = (trapezoidHeight * 0.51) / 2;
  const buttonCenterX = width / 2 - circleRadius;
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 32,
      }}
    >
      <MapIcon />
      <TrapezoidBackground width={trapezoidWidth} height={trapezoidHeight} />
      <Pressable
        style={{
          ...StyleSheet.absoluteFillObject,
          left: buttonCenterX,
          top: 12,
          width: circleRadius * 2,
          height: circleRadius * 2,
        }}
      >
        {({ pressed }) => (
          <CircleButton radius={circleRadius} pressed={pressed} />
        )}
      </Pressable>
      <Pressable onPress={() => navigation.navigate("List")}>
        <ListIcon />
      </Pressable>
    </View>
  );
}
