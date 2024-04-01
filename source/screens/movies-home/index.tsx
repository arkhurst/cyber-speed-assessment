import * as React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from '../../constants';
import {Header, MovieCard} from './components';
import {RFValue} from 'react-native-responsive-fontsize';
import {Movie} from './types';
import {FlatList} from 'react-native-gesture-handler';
import {RootStackParamList} from '../../navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {useMovieData} from '../../providers/movie';
import {EmptyState, ErrorState} from '../../components/alerts';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const MoviesHome = ({navigation}: Props) => {
  const {movieList, handleSelectMovie} = useMovieData();

  const handlePressMovie = React.useCallback(
    (selectedMovie: Movie) => {
      handleSelectMovie(selectedMovie);
      navigation.navigate('movieDetails');
    },
    [navigation, handleSelectMovie],
  );

  const renderEmptyState = () => <EmptyState />;

  if (movieList?.statusCode !== 200) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ErrorState />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={movieList?.data}
        renderItem={({item}) => (
          <MovieCard
            movie={item}
            onMoviePressed={() => handlePressMovie(item)}
          />
        )}
        keyExtractor={item => item['#IMDB_ID']}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary['900'],
    flex: 1,
    paddingVertical: RFValue(20),
    paddingHorizontal: RFValue(2),
  },
  listContainer: {
    justifyContent: 'space-between',
    paddingVertical: RFValue(20),
  },
});

export {MoviesHome};
