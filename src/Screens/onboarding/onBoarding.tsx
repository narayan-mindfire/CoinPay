import React, { useRef, useState, useMemo } from "react";
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
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors, dark } = useTheme();

  const slides = dark ? slidesDark : slidesLight;

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

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  };

  const styles = useMemo(
    () =>
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
          borderRadius: 4,
          marginHorizontal: 5,
        },
        activeDot: {
          width: 16,
          backgroundColor: colors.primary,
        },
        inactiveDot: {
          width: 37,
          backgroundColor: "rgba(208, 208, 208, 1)",
        },
      }),
    [colors]
  );

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
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
      />
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
        buttonText="Next"
        handleButton={handleNext}
        buttonStyles={{ marginBottom: 30 }}
      />
    </View>
  );
};

export default OnboardingScreen;
