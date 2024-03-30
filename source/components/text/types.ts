import {StyleProp, TextStyle} from 'react-native';

export interface TextComponentProp {
  style?: StyleProp<TextStyle>;
  type?: 'bold' | 'extraBold' | 'light' | 'medium' | 'regular' | 'thin';
}

export enum TextVariant {
  bold = 'bold',
  extraBold = 'extraBold',
  light = 'light',
  medium = 'medium',
  regular = 'regular',
  thin = 'thin',
}
