import * as React from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import FIcon from 'react-native-vector-icons/Ionicons';

FIcon.loadFont();

const HeaderBackButton = () => {
  const navigation = useNavigation();

  const handleGoBack = React.useCallback(
    () => navigation.goBack(),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor="black"
      />
      <TouchableOpacity onPress={handleGoBack} activeOpacity={0.9}>
        <FIcon name="arrow-back" color={Colors.white} size={RFValue(20)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export {HeaderBackButton};
