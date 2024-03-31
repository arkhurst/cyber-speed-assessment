import React, {FC, useState} from 'react';
import {Colors} from '../../constants';
import {
  TextInput as BaseTextInput,
  StyleSheet,
  TextInputProps,
  Platform,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

interface Props {
  backgroundColor?: string;
}

const TextInput: FC<Props & TextInputProps> = props => {
  const [active, setActive] = useState(false);
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <BaseTextInput
          {...props}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          placeholderTextColor={Colors.secondary['400']}
          style={[
            styles.container,
            {backgroundColor: props.backgroundColor ?? Colors.white},
            active ? styles.activeBorder : styles.inactiveBorder,
          ]}
          selectionColor={Colors.secondary['600']}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  container: {
    borderRadius: RFValue(8),
    height: Platform.OS === 'ios' ? RFValue(45) : RFValue(50),
    paddingHorizontal: RFValue(15),
    color: Colors.primary['900'],
    fontFamily: 'Poppins-Regular',
    fontSize: RFValue(13),
  },
  innerContainer: {
    flex: 1,
  },
  activeBorder: {borderWidth: 1, borderColor: Colors.primary['800']},
  inactiveBorder: {
    ...Platform.select({
      ios: {
        borderWidth: 0.5,
        borderColor: Colors.primary['700'],
      },
      android: {
        borderWidth: 1,
        borderColor: Colors.primary['700'],
      },
    }),
  },
  countryPickerButton: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: RFValue(8),
    marginRight: 8,
    height: Platform.OS === 'ios' ? RFValue(45) : RFValue(50),
    paddingHorizontal: RFValue(15),
    justifyContent: 'center',
    display: 'flex',
  },
});

export default TextInput;
