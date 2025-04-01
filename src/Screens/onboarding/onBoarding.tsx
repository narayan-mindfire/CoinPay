import Button from "@/src/components/Button";
import { OnBoardingScreenProps } from "@/src/navigation/NavigationTypes";
import { useTheme } from "@react-navigation/native";
import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const { width } = Dimensions.get("window");

interface Slide {
  key: string;
  title: string;
  image: any;
}

const slidesLight: Slide[] = [
  {
    key: "1",
    title: "Trusted by millions of people, part of one part",
    image: require("../../Assets/slide3.png"),
  },
  {
    key: "2",
    title: "Spend money abroad, and track your expense",
    image: require("../../Assets/slide2.png"),
  },
  {
    key: "3",
    title: "Receive Money From Anywhere In The World",
    image: require("../../Assets/slide1.png"),
  },
];

const slidesDark: Slide[] = [
  {
    key: "1",
    title: "Trusted by millions of people, part of one part",
    image: require("../../Assets/darkPNG/slide1.png"),
  },
  {
    key: "2",
    title: "Spend money abroad, and track your expense",
    image: require("../../Assets/darkPNG/slide2.png"),
  },
  {
    key: "3",
    title: "Receive Money From Anywhere In The World",
    image: require("../../Assets/darkPNG/slide3.png"),
  },
];

const OnboardingScreen: React.FC = ({ navigation }: OnBoardingScreenProps) => {
  const sliderRef = useRef<AppIntroSlider>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { colors, dark } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeIndex < slidesLight.length - 1) {
        sliderRef.current?.goToSlide(activeIndex + 1, true);
      } else {
        sliderRef.current?.goToSlide(0, true);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleNext = () => {
    if (activeIndex === slidesLight.length - 1) {
      navigation.navigate("Registration");
    }
    if (activeIndex < slidesLight.length - 1) {
      sliderRef.current?.goToSlide(activeIndex + 1, true);
    }
  };

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { backgroundColor: colors.background }]}>
      <Image source={item.image} style={styles.image} />
      {renderPagination()}
      <Text style={[styles.text, { color: colors.text }]}>{item.title}</Text>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {slidesLight.map((_, index) => {
        const isActive = activeIndex === index;
        const dotStyle = isActive
          ? { width: 16, backgroundColor: colors.primary }
          : { width: 37, backgroundColor: "#D3D3D3" };
        return <View key={index} style={[styles.dot, dotStyle]} />;
      })}
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AppIntroSlider
        ref={sliderRef}
        renderItem={renderItem}
        data={dark ? slidesDark : slidesLight}
        onSlideChange={(index) => setActiveIndex(index)}
        showNextButton={false}
        showDoneButton={false}
        showSkipButton={false}
        dotStyle={styles.inactiveDotStyle}
        activeDotStyle={styles.activeDotStyle}
      />
      {activeIndex < slidesLight.length && (
        <Button buttonText={"Next"} handleButton={handleNext} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.6,
    resizeMode: "contain",
    marginBottom: 88,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 42,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
  },
  inactiveDotStyle: {
    backgroundColor: "#F8F9FC",
  },
  activeDotStyle: {
    backgroundColor: "#F8F9FC",
  },
});

export default OnboardingScreen;
