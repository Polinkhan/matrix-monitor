import React from "react";
import { View, ViewStyle } from "react-native";
import { Svg, Rect, Text as SVGText } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface LinearProgressBarProps {
  width: number;
  height: number;
  strokeWidth: number;
  text: any;
  progressPercent: number;
  pgColor: string;
  textSize?: number;
  textColor?: string;
  style?: ViewStyle;
}

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const LinearProgress = (props: LinearProgressBarProps) => {
  const progress = useSharedValue(0);

  const { width, height, text, style } = props;
  const progressWidth = width * (props.progressPercent / 100);
  progress.value = withTiming(progressWidth);

  const animatedProps = useAnimatedProps(() => {
    return { width: progress.value };
  });

  return (
    <View style={{ ...style }}>
      <Svg width={width} height={height}>
        {/* Background Rectangle */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#f2f2f2"
          rx={height / 2}
          ry={height / 2}
        />

        {/* Progress Rectangle */}
        <AnimatedRect
          x={0}
          y={0}
          width={progress.value}
          height={height}
          fill={props.pgColor ? props.pgColor : "#3b5998"}
          rx={height / 2}
          ry={height / 2}
          animatedProps={animatedProps}
        />

        {/* Text */}
        <SVGText
          fontSize={props.textSize ? props.textSize : "10"}
          x={width / 2}
          y={height / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
          textAnchor="middle"
          fill={props.textColor ? props.textColor : "#333333"}
        >
          {text}
        </SVGText>
      </Svg>
    </View>
  );
};

export default LinearProgress;
