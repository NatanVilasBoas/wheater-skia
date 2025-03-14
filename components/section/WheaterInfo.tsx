import { StyleSheet, Text, View } from "react-native";
import { Weather } from "../../models/Weather";
import { DEGREE_SYMBOL } from "../../utils/Constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useForecastSheetPosition } from "../../context/ForecastSheetContext";

interface WeatherInfoProps {
  weather: Weather;
}

export default function WeatherInfo({ weather }: WeatherInfoProps) {
  const { city, temperature, condition, high, low } = weather;
  const { top } = useSafeAreaInsets();
  const topMargin = 51;
  const weatherInfoMargin = top + topMargin;
  const animatedPosition = useForecastSheetPosition();
  const animatedViewStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 1],
            [0, -topMargin],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  const animatedTempTxtStyle = useAnimatedStyle(() => {
    const fontFamily = animatedPosition.value > 0.5 ? "SF-Semibold" : "SF-Thin";
    return {
      fontSize: interpolate(animatedPosition.value, [0, 1], [96, 20]),
      lineHeight: interpolate(animatedPosition.value, [0, 1], [96, 20]),
      color: interpolateColor(
        animatedPosition.value,
        [0, 1],
        ["white", "rgba(235,235,245,0.6)"]
      ),
      fontFamily,
      opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [1, 0, 1]),
    };
  });

  const animatedMinMaxTxtStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.5], [1, 0]),
    };
  });

  const animatedSeparatorTxtStyle = useAnimatedStyle(() => {
    const display = animatedPosition.value > 0.5 ? "flex" : "none";
    return {
      opacity: interpolate(animatedPosition.value, [0, 0.5, 1], [0, 0, 1]),
      display,
    };
  });

  const animatedTempConditionStyle = useAnimatedStyle(() => {
    const flexDirection = animatedPosition.value > 0.5 ? "row" : "column";
    return {
      flexDirection,
    };
  });

  const animatedConditionTxtStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            animatedPosition.value,
            [0, 0.5, 1],
            [0, -20, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        { alignItems: "center", marginTop: weatherInfoMargin },
        animatedViewStyle,
      ]}
    >
      <Animated.Text style={styles.cityText}>{city}</Animated.Text>
      <Animated.View
        style={[{ alignItems: "center" }, animatedTempConditionStyle]}
      >
        <Animated.View style={{ flexDirection: "row" }}>
          <Animated.Text style={[styles.temperatureText, animatedTempTxtStyle]}>
            {temperature}
            {DEGREE_SYMBOL}
          </Animated.Text>
          <Animated.Text
            style={[styles.separatorText, animatedSeparatorTxtStyle]}
          >
            |
          </Animated.Text>
        </Animated.View>
        <Animated.Text
          style={[styles.conditionText, animatedConditionTxtStyle]}
        >
          {condition}
        </Animated.Text>
      </Animated.View>
      <Animated.Text style={[styles.minMaxText, animatedMinMaxTxtStyle]}>
        H:{high}
        {DEGREE_SYMBOL} L:{low}
        {DEGREE_SYMBOL}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cityText: {
    fontFamily: "SF-Regular",
    fontSize: 34,
    color: "white",
    lineHeight: 41,
  },
  temperatureText: {
    fontFamily: "SF-Thin",
    fontSize: 96,
    color: "white",
    lineHeight: 96,
  },
  conditionText: {
    fontFamily: "SF-SemiBold",
    fontSize: 20,
    color: "rgba(235,235,245,0.6)",
    lineHeight: 20,
  },
  minMaxText: {
    fontFamily: "SF-SemiBold",
    fontSize: 20,
    color: "white",
    lineHeight: 20,
  },
  separatorText: {
    fontFamily: "SF-SemiBold",
    fontSize: 20,
    color: "rgba(235,235,245,0.6)",
    lineHeight: 20,
    marginHorizontal: 2,
    display: "none",
  },
});
