import * as React from 'react';
import {Text, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MoviesHome = () => {
  return (
    <SafeAreaView>
      <Text>Movies Home</Text>
      <MaterialCommunityIcons name="bell" color={'red'} size={20} />
    </SafeAreaView>
  );
};

export {MoviesHome};
