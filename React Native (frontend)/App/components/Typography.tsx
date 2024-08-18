import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";
import React, { ReactNode } from "react";

interface TypographyProps extends TextProps {
  p?: number;
  px?: number;
  py?: number;

  children: ReactNode;
  bold?: boolean;
  sm?: boolean;
  lg?: boolean;
  xl?: boolean;
  color?: string;

  center?: boolean;
}

const defaultSize = 16;

const Typography = (props: TypographyProps) => {
  const style: StyleProp<TextStyle> = {};
  style.fontWeight = props.bold ? "bold" : "normal";
  style.fontSize = defaultSize;
  if (props.color) style.color = props.color;

  if (props.sm) style.fontSize = defaultSize / 1.2;
  if (props.lg) style.fontSize = defaultSize * 1.5;
  if (props.xl) style.fontSize = defaultSize * 2.0;

  if (props.p) style.padding = props.p * 8;
  if (props.px) style.paddingHorizontal = props.px * 8;
  if (props.py) style.paddingVertical = props.py * 8;

  if (props.center) style.textAlign = "center";

  return <Text style={[style, props.style]}>{props.children}</Text>;
};

export default Typography;

const styles = StyleSheet.create({});
