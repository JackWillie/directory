import React, { ReactNode } from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import * as HtmlElements from '@expo/html-elements';

export const layout = {
  maxWidth: 1200,
};

export const colors = {
  primary: '#61DAFB',
  primaryDark: '#39BEE2',
  powder: '#EEFAFE',
  pewter: '#BEC8CB',
  gray1: '#f7f7f7',
  gray2: '#ececec',
  gray3: '#CFCFD5',
  gray4: '#82889E',
  gray5: '#505461',
  gray6: '#2A2C33',
  gray7: '#21232A',
  black: '#1a1a1a',
  white: '#ffffff',
};

const baseTextStyles = {
  color: colors.black,
  marginVertical: 0,
  fontWeight: '400' as const,
};

const textStyles = StyleSheet.create({
  h1: { ...baseTextStyles, fontSize: 57.25, fontWeight: '600' as const },
  h2: { ...baseTextStyles, fontSize: 35.5, fontWeight: '600' as const },
  h3: { ...baseTextStyles, fontSize: 26.5, fontWeight: '600' as const },
  h4: { ...baseTextStyles, fontSize: 22 },
  h5: { ...baseTextStyles, fontSize: 20 },
  h6: { ...baseTextStyles, fontSize: 18 },
  headline: { ...baseTextStyles, fontSize: 16, fontWeight: '500' as const },
  p: { ...baseTextStyles, fontSize: 16 },
  caption: { ...baseTextStyles, fontSize: 15, fontWeight: '300' as const },
});

type TextProps = {
  children?: ReactNode;
  style?: TextStyle | TextStyle[];
};

function createTextComponent(Element: any, textStyle?: TextStyle) {
  return (props: TextProps) => {
    const { children, style } = props;
    return <Element style={[textStyles[Element], textStyle, style]}>{children}</Element>;
  };
}

export const H1 = createTextComponent(HtmlElements.H1, textStyles.h1);
export const H2 = createTextComponent(HtmlElements.H2, textStyles.h2);
export const H3 = createTextComponent(HtmlElements.H3, textStyles.h3);
export const H4 = createTextComponent(HtmlElements.H4, textStyles.h4);
export const H5 = createTextComponent(HtmlElements.H5, textStyles.h5);
export const H6 = createTextComponent(HtmlElements.H6, textStyles.h6);
export const P = createTextComponent(HtmlElements.P, textStyles.p);
export const Headline = createTextComponent(HtmlElements.P, textStyles.headline);
export const Caption = createTextComponent(HtmlElements.P, textStyles.caption);
