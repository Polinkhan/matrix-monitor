import React from "react";
import { View, ViewStyle } from "react-native";
import { Svg, Circle, Text as SVGText } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  text: any;
  progressPercent: number;
  pgColor: string;
  textSize?: number;
  textColor?: string;
  style?: ViewStyle;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = (props: CircularProgressProps) => {
  const progress = useSharedValue(100);

  const { size, strokeWidth, text, style } = props;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  progress.value = withTiming(100 - props.progressPercent * 0.7);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = radius * Math.PI * 2 * (progress.value / 100);
    return { strokeDashoffset };
  });

  return (
    <View style={{ ...style }}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={"#f2f2f2"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (30 / 100)}
          strokeLinecap="round"
          transform={`rotate(144, ${size / 2}, ${size / 2})`}
        />

        {/* Progress Circle */}
        <AnimatedCircle
          stroke={props.pgColor ? props.pgColor : "#3b5998"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeLinecap="round"
          transform={`rotate(144, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth, animatedProps }}
        />

        {/* Text */}
        <SVGText
          fontSize={props.textSize ? props.textSize : "10"}
          x={size / 2}
          y={size / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
          textAnchor="middle"
          fill={props.textColor ? props.textColor : "#333333"}
        >
          {text}
        </SVGText>
      </Svg>
    </View>
  );
};

export default CircularProgress;
