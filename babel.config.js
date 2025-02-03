module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["bable-preset-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
