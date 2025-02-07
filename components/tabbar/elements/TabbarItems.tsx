import { View } from "react-native";
import ListIcon from "../icons/ListIcon";
import MapIcon from "../icons/MapIcon";

const TabbarItems = () => {
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
      <ListIcon />
    </View>
  );
};

export default TabbarItems;
