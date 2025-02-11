import { StyleSheet, View } from "react-native";
import ArcComponent from "./elements/ArcComponent";
import useApplicationDimensions from "../../hooks/useApplicationDimensions";
import TabbarItems from "./elements/TabbarItems";

export default function WeatherTabBar() {
  const TabbarHeight = 88;
  const { width, height } = useApplicationDimensions();

  return (
    <View
      style={{
        height: TabbarHeight,
        ...StyleSheet.absoluteFillObject,
        top: height - TabbarHeight,
      }}
    >
      <ArcComponent height={TabbarHeight} width={width} />
      <TabbarItems />
    </View>
  );
}
