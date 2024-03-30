export interface ButtonProps {
  loading?: boolean;
  icon?: string;
  iconStyle?: Object;
  style?: Object;
  color?: string;
  title: string;
  outlined?: boolean;
  onPress?: (event: any) => void;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
  hasTVPreferredFocus?: boolean;
  iconPosition?: 'left' | 'right';
  iconColor?: string;
}
