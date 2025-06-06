const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const config = getDefaultConfig(__dirname);
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};
config.resolver.sourceExts.push("cjs");
config.resolver.unstable_enablePackageExports = false;
require("dotenv").config({ path: path.join(__dirname, ".env") });
module.exports = withNativeWind(config, { input: "./app/globals.css" });
