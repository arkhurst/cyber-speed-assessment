import * as React from 'react';
import {StyleSheet, View, Platform, TouchableOpacity} from 'react-native';
import {Colors} from '../../../constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {Text} from '../../../components/text';
import {useNavigation} from '@react-navigation/native';
import FIcon from 'react-native-vector-icons/Ionicons';

FIcon.loadFont();

const MoviesDetailsHeader = () => {
  const navigation = useNavigation();

  const handleGoBack = React.useCallback(
    () => navigation.goBack(),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} activeOpacity={0.9}>
        <FIcon name="arrow-back" color={Colors.white} size={RFValue(20)} />
      </TouchableOpacity>
      <Text style={styles.titleContainer} type="regular">
        Captain America
      </Text>
      {Platform.OS === 'ios' ? <View /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: Colors.primary['900'],
        padding: RFValue(10),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      android: {
        backgroundColor: Colors.primary['900'],
        padding: RFValue(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    }),
  },
  titleContainer: {
    color: Colors.white,
    fontSize: RFValue(12),
    paddingLeft: RFValue(10),
  },
});

export {MoviesDetailsHeader};
