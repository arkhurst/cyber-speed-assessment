import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {NavigationContainer} from '@react-navigation/native';
import {MoviesDetails, MoviesHome} from '../screens';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="moviesHome">
        <Stack.Screen
          name="moviesHome"
          component={MoviesHome}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movieDetails"
          component={MoviesDetails}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
