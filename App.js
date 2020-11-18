import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Animated,
  ImagePropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const circle_size = 100;

const Circle = (props) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];

  const containerBg = props.animatedValue.interpolate({
    inputRange: inputRange,
    outputRange: ["gold", "gold", "gold", "#444", "#444"],
  });

  const circleBg = props.animatedValue.interpolate({
    inputRange: inputRange,
    outputRange: ["#444", "#444", "#444", "gold", "gold"],
  });

  return (
    <Animated.View
      style={{
        ...styles.circleContainer,
        ...StyleSheet.absoluteFillObject,
        backgroundColor: containerBg,
      }}
    >
      <Animated.View
        style={[
          styles.circle,

          {
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: props.animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0deg", "-90deg", "-180deg"],
                }),
              },
              {
                scale: props.animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: props.animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ["0%", "50%", "0%"],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={props.onPress}>
          <Animated.View
            style={{
              ...styles.circleBtn,
              ...styles.circle,
              backgroundColor: circleBg,
            }}
          >
            <AntDesign name="arrowright" size={28} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default function App() {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [index, setIndex] = useState(0);

  const animation = (toValue) =>
    Animated.timing(animatedValue, {
      toValue: toValue,
      duration: 2500,
      useNativeDriver: false,
    });

  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animation(index === 1 ? 0 : 1).start();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden style="auto" />
      <Circle onPress={onPress} animatedValue={animatedValue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  circleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 8,
    paddingBottom: 100,
    backgroundColor: "gold",
  },
  circle: {
    backgroundColor: "#444",
    width: circle_size,
    height: circle_size,
    borderRadius: circle_size / 2,
  },
  circleBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
