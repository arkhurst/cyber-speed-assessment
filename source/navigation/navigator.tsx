import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {NavigationContainer} from '@react-navigation/native';
import {MoviesDetails, MoviesHome} from '../screens';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="moviesHome" component={MoviesHome} />
        <Stack.Screen name="movieDetails" component={MoviesDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
