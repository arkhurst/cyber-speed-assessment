import React, {FC, Fragment} from 'react';
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ActivityIndicator,
  AccessibilityState,
} from 'react-native';
import {Text} from '../text';
import {ButtonProps} from './types';
import Icon from 'react-native-vector-icons/Feather';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '../../constants';

const Button: FC<ButtonProps> = ({
  accessibilityLabel,
  color,
  onPress,
  title,
  hasTVPreferredFocus,
  disabled,
  loading,
  icon,
  iconStyle,
  testID,
  style,
  outlined,
  iconColor,
  iconPosition,
}) => {
  const buttonStyles: any = [styles.button];
  const textStyles: any = [styles.text];
  const iconStyles: any = [styles.icon];
  if (color) {
    if (Platform.OS === 'ios') {
      textStyles.push({color: color});
    } else {
      buttonStyles.push({backgroundColor: color});
    }
  }
  const accessibilityState: AccessibilityState = {};
  if (style) {
    buttonStyles.push(style);
  }
  if (iconStyle) {
    iconStyles.push(iconStyle);
  }
  if (disabled) {
    buttonStyles.push(styles.buttonDisabled);
    textStyles.push(styles.textDisabled);
    accessibilityState.disabled = true;
  }
  if (outlined) {
    buttonStyles.push(styles.buttonOutlined);
    textStyles.push(styles.textOutlined);
    iconStyles.push(styles.iconOutlined);
  }
  if (disabled && outlined) {
    buttonStyles.push(styles.buttonOutlinedDisabled);
  }

  const formattedTitle = Platform.select({
    android: title.toUpperCase(),
    ios: title,
  });

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={accessibilityState}
        hasTVPreferredFocus={hasTVPreferredFocus}
        testID={testID}
        disabled={disabled}
        onPress={onPress}
        touchSoundDisabled={disabled}>
        <View style={buttonStyles}>
          {loading ? (
            <ActivityIndicator
              color={outlined ? Colors.secondary['600'] : Colors.white}
            />
          ) : (
            <>
              {iconPosition === 'left' && (
                <Fragment>
                  {icon && (
                    <Icon
                      name={icon}
                      color={iconColor}
                      style={iconStyles}
                      size={RFValue(22)}
                    />
                  )}
                </Fragment>
              )}
              <Text type={'bold'} style={textStyles}>
                {formattedTitle}
              </Text>
              {iconPosition === 'right' && (
                <Fragment>
                  {icon && (
                    <Icon
                      name={icon}
                      color={iconColor}
                      style={iconStyles}
                      size={RFValue(22)}
                    />
                  )}
                </Fragment>
              )}
            </>
          )}
        </View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      hasTVPreferredFocus={hasTVPreferredFocus}
      testID={testID}
      disabled={disabled}
      onPress={onPress}
      touchSoundDisabled={disabled}>
      <View style={buttonStyles}>
        {loading ? (
          <ActivityIndicator
            color={outlined ? Colors.secondary['600'] : Colors.white}
          />
        ) : (
          <>
            {iconPosition === 'left' && (
              <Fragment>
                {icon && (
                  <Icon name={icon} style={iconStyles} size={RFValue(22)} />
                )}
              </Fragment>
            )}
            <Text type={'medium'} style={textStyles}>
              {formattedTitle}
            </Text>
            {iconPosition === 'right' && (
              <Fragment>
                {icon && (
                  <Icon name={icon} style={iconStyles} size={RFValue(22)} />
                )}
              </Fragment>
            )}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...Platform.select({
      ios: {
        backgroundColor: Colors.primary['900'],
        borderRadius: RFValue(8),
        height: RFValue(40),
        paddingHorizontal: RFValue(16),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      android: {
        elevation: 0,
        backgroundColor: Colors.primary['900'],
        borderRadius: RFValue(8),
        height: RFValue(50),
        paddingHorizontal: RFValue(16),
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
    }),
  },
  text: {
    textAlign: 'center',
    fontSize: RFValue(13),
    ...Platform.select({
      ios: {
        color: '#fff',
      },
      android: {
        color: '#fff',
      },
    }),
  },
  icon: {
    ...Platform.select({
      ios: {
        color: Colors.white,
        fontSize: RFValue(16),
      },
      android: {
        color: Colors.white,
        fontWeight: '500',
        marginHorizontal: RFValue(8),
      },
    }),
  },
  buttonDisabled: {
    ...Platform.select({
      ios: {
        backgroundColor: Colors.secondary['400'], //use color picker to change it to a lighter shade of red
      },
      android: {
        elevation: 0,
        backgroundColor: Colors.secondary['400'], // same for this
      },
    }),
  },
  textDisabled: {
    ...Platform.select({
      ios: {
        color: Colors.white,
      },
      android: {
        color: Colors.white,
      },
    }),
  },
  buttonOutlined: {
    ...Platform.select({
      ios: {
        borderColor: Colors.secondary['500'],
        borderWidth: 1,
        backgroundColor: Colors.white,
      },
      android: {
        borderColor: Colors.secondary['500'],
        borderWidth: 1,
        backgroundColor: Colors.white,
      },
    }),
  },
  buttonOutlinedDisabled: {
    ...Platform.select({
      ios: {
        borderColor: Colors.secondary['400'],
        borderWidth: 1,
        opacity: 0.6,
        backgroundColor: '#f2f2f2',
      },
      android: {
        borderColor: Colors.secondary['400'],
        borderWidth: 1,
        backgroundColor: Colors.white,
      },
    }),
  },
  textOutlined: {
    ...Platform.select({
      ios: {
        color: Colors.secondary['400'],
      },
      android: {
        color: Colors.secondary['400'],
      },
    }),
  },
  iconOutlined: {
    ...Platform.select({
      ios: {
        color: '#cdcdcd',
      },
      android: {
        color: '#FBB03B',
      },
    }),
  },
});

export default Button;
