import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {NavigationContainer} from '@react-navigation/native';
import {MoviesDetails, MoviesHome} from '../screens';
import {useMovieData} from '../providers/movie';
import Loader from '../components/loader/loader';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator = () => {
  const {isMovieListLoading} = useMovieData();
  return (
    <React.Fragment>
      {isMovieListLoading ? (
        <Loader />
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
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
      )}
    </React.Fragment>
  );
};

export default Navigator;
