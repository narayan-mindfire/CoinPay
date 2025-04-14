import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import Button from "@/src/components/Button";
import { OnBoardingScreenProps } from "@/src/navigation/NavigationTypes";
import images from "@/src/Assets/images";
import { useTranslation } from "react-i18next";

const { width } = Dimensions.get("window");

interface Slide {
  key: string;
  title: string;
  image: any;
}

// main screen
const OnboardingScreen: React.FC = ({ navigation }: OnBoardingScreenProps) => {
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();
  const slidesDark: Slide[] = [
    {
      key: "1",
      title: t("onboarding.slide1"),
      image: images.slide1Dark,
    },
    {
      key: "2",
      title: t("onboarding.slide2"),
      image: images.slide2Dark,
    },
    {
      key: "3",
      title: t("onboarding.slide3"),
      image: images.slide3Dark,
    },
  ];

  const slidesLight: Slide[] = [
    {
      key: "1",
      title: t("onboarding.slide1"),
      image: images.slide3,
    },
    {
      key: "2",
      title: t("onboarding.slide2"),
      image: images.slide2,
    },
    {
      key: "3",
      title: t("onboarding.slide3"),
      image: images.slide1,
    },
  ];
  const { colors, dark } = useTheme();

  const slides = dark ? slidesDark : slidesLight;

  // renders onboarding images and text
  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  // scroll functionality - runs only when the component is active
  useFocusEffect(
    React.useCallback(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = prevIndex < slides.length - 1 ? prevIndex + 1 : 0;
          flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
          });
          return nextIndex;
        });
      }, 3000);
      return () => clearInterval(interval);
    }, [slides])
  );

  // the first two slides scrolls to the next slide, the last one navigates to registration page on click of next button
  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate("Registration");
    }
  };

  // updates active slide index based on first currently visible item in the flatlist
  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  };
  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        renderItem={renderItem}
      />
      {/* for changing pagination dots style */}
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      <Button
        buttonText={t("onboarding.next")}
        handleButton={handleNext}
        buttonStyles={{ marginBottom: 30 }}
      />
    </View>
  );
};

//this function creates the stylesheet object by dynamically taking colors from useTheme removing the need to use inline styling
const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    slide: {
      width,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      backgroundColor: colors.background,
    },
    image: {
      width: width * 0.8,
      height: width * 0.6,
      resizeMode: "contain",
      marginBottom: 100,
    },
    text: {
      fontSize: 24,
      textAlign: "center",
      fontWeight: "bold",
      paddingHorizontal: 20,
      color: colors.textPrimary,
    },
    paginationContainer: {
      padding: 50,
      flexDirection: "row",
      position: "absolute",
      bottom: 300,
    },
    dot: {
      height: 8,
      width: 16,
      borderRadius: 20,
      marginHorizontal: 5,
    },
    activeDot: {
      width: 16,
      backgroundColor: colors.primary,
    },
    inactiveDot: {
      width: 37,
      backgroundColor: colors.backgroundInfo,
    },
  });

export default OnboardingScreen;
