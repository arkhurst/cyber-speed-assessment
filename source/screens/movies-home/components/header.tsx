import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Text} from '../../../components/text';
import {Colors} from '../../../constants';
import FIcon from 'react-native-vector-icons/Feather';

FIcon.loadFont();

const Header = () => {
  return (
    <View style={style.container}>
      <Text style={style.welcomeText} type="medium">
        Cine Circle
      </Text>
      {/* actions */}
      <View style={style.actionsContainer}>
        <FIcon name="search" color={Colors.primary['300']} size={RFValue(20)} />
        <FIcon
          name="bell"
          style={style.iconContainer}
          color={Colors.primary['300']}
          size={RFValue(20)}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(12),
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: RFValue(17),
    color: Colors.white,
  },
  iconContainer: {
    paddingLeft: RFValue(10),
  },
});

export {Header};
