import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import React, { ReactNode } from "react";

interface StackProps extends ViewProps {
  p?: number;
  px?: number;
  py?: number;

  row?: boolean;
  gap?: number | Array<number>;
  center?: boolean;
  wrap?: boolean;
  children?: ReactNode;
  fullHeight?: boolean;
  align?: "center" | "flex-start" | "flex-end" | "baseline";
  justify?: "center" | "flex-start" | "flex-end" | "space-around" | "space-between";
}

const Stack = (props: StackProps) => {
  const Style: StyleProp<ViewStyle> = {};

  if (props.fullHeight) Style.flex = 1;

  if (props.gap) {
    if (Array.isArray(props.gap)) {
      Style.columnGap = props.gap[0] * 8 || 0;
      Style.rowGap = props.gap[1] * 8 || 0;
    } else Style.gap = props.gap * 8;
  }
  if (props.row) Style.flexDirection = "row";
  if (props.align) Style.alignItems = props.align;
  if (props.justify) Style.justifyContent = props.justify;

  if (props.center) {
    Style.alignItems = "center";
    Style.justifyContent = "center";
  }

  if (props.wrap) Style.flexWrap = "wrap";

  if (props.p) Style.padding = props.p * 8;
  if (props.px) Style.paddingHorizontal = props.px * 8;
  if (props.py) Style.paddingVertical = props.py * 8;

  // if (props.p)
  return <View style={[Style, props.style]}>{props.children}</View>;
};

export default Stack;

const styles = StyleSheet.create({});
