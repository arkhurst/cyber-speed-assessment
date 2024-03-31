import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {MoviesDetailsHeader} from './components';
import {Colors} from '../../constants';
import {RFValue} from 'react-native-responsive-fontsize';

const MoviesDetails = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MoviesDetailsHeader />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary['900'],
    flex: 1,
    paddingHorizontal: RFValue(2),
  },
});
export {MoviesDetails};
