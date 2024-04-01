import * as React from 'react';
import {StyleSheet, View, ActivityIndicator, StatusBar} from 'react-native';
import {Colors} from '../../constants';

const Loader = () => {
  return (
    <React.Fragment>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.container}>
        <ActivityIndicator color={Colors.white} animating={true} />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary['900'],
  },
});

export default Loader;
