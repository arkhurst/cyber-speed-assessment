import React, {Fragment, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {TextComponentProp, TextVariant} from './types';
import {Colors} from '../../constants';

const TextComponent = ({
  style,
  type,
  children,
}: PropsWithChildren<TextComponentProp>) => {
  const customStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <Fragment>
      <Text
        style={[
          {
            color: Colors.secondary['600'],
            ...customStyles,
            fontFamily: `${
              type === 'extraBold'
                ? 'Poppins-ExtraBold'
                : type === 'bold'
                ? 'Poppins-Bold'
                : type === 'light'
                ? 'Poppins-Light'
                : type === 'medium'
                ? 'Poppins-Medium'
                : type === 'regular'
                ? 'Poppins-Regular'
                : 'Poppins-Thin'
            }`,
          },
        ]}>
        {children}
      </Text>
    </Fragment>
  );
};

TextComponent.defaultProps = {
  type: TextVariant.regular,
};

export default TextComponent;
