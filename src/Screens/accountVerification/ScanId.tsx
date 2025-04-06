import React from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import images from "@/src/Assets/images";
// import { ArrowLeft, Scan } from "lucide-react-native";

const ScanId = () => {
  const navigation = useNavigation();
  const { colors, dark } = useTheme();
  return (
    <View className="flex-1 bg-black px-5 py-8">
      {/* Header with Back Button */}
      <Pressable onPress={() => navigation.goBack()} className="mb-6">
        {/* <ArrowLeft size={24} color="white" /> */}
      </Pressable>

      {/* Illustration */}
      <View className="flex-1 justify-center items-center">
        <Image
          source={dark ? images.scanIdDark : images.scanId} // Replace with actual image
          className="w-64 h-64"
          resizeMode="contain"
        />
      </View>

      {/* Title & Subtitle */}
      <Text className="text-white text-xl font-semibold text-center">
        Scan ID document to verify your identity
      </Text>
      <Text className="text-gray-400 text-sm text-center mt-2">
        Confirm your identity with just a few taps on your phone
      </Text>

      {/* Scan Button */}
      <TouchableOpacity className="mt-8 bg-purple-600 rounded-full p-4 flex-row justify-center items-center">
        {/* <Scan size={20} color="white" /> */}
        <Text className="text-white text-lg font-medium ml-2">Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScanId;
