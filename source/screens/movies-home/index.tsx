import * as React from 'react';
import {Text, SafeAreaView} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';

FIcon.loadFont();

const MoviesHome = () => {
  return (
    <SafeAreaView>
      <Text>Movies Home</Text>
      <FIcon name="home" color={'red'} size={20} />
    </SafeAreaView>
  );
};

export {MoviesHome};
