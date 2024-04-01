import * as React from 'react';
import {type Movie} from '../../screens/movies-home/types';
import {
  useGetMovieDetails,
  useGetMovieList,
  useGetMovieSearchResults,
} from '../../api';
import {Alert} from 'react-native';
import {useDebounce} from '../../hooks';
import {type Props, type ReturnValue} from './types';

/**
 * Context provider for movie data.
 * This implementation provides a reusable MovieProvider and useMovieData hook that can be used in both React Native and React JS applications.
 * It abstracts away any platform-specific logic and focuses on providing a consistent interface for managing movie data across different platforms.
 *
 * You can access logic for API calls and fetcher libraries in the `api` & `lib` folder respectively.
 * Oh and don't forget to set up react-query :D
 *
 * @param children - React children to be wrapped by the MovieProvider.
 * @returns move lists, movie details loading states for all scenarios & search results.
 */

const MovieContext = React.createContext({} as ReturnValue);

export const MovieProvider: React.FC<Props> = ({children}) => {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  const {data: moviesResponse, isPending: isMovieListLoading} =
    useGetMovieList();
  const {
    mutate: getMovieDetails,
    isPending: isMovieDetailsLoading,
    data,
  } = useGetMovieDetails();

  const {
    isPending: isSearchingForResults,
    data: searchResults,
    mutate: getMovieSearchResults,
  } = useGetMovieSearchResults();

  const debouncedValue = useDebounce<string>(searchQuery, 500);

  const handleSearch = React.useCallback(() => {
    if (debouncedValue) {
      getMovieSearchResults(
        {
          searchQuery: debouncedValue,
        },
        {
          onError(error) {
            if (error.message) {
              Alert.alert('Oops, something happened', error.message);
            }
          },
        },
      );
    }
  }, [debouncedValue, getMovieSearchResults]);

  const handleSelectMovie = React.useCallback(
    (movie: Movie) => {
      getMovieDetails(
        {
          movieId: movie['#IMDB_ID'],
        },
        {
          onSuccess() {
            setSelectedMovie(movie);
          },
          onError(error) {
            if (error.message) {
              Alert.alert('Oops, something happened', error.message);
            }
          },
        },
      );
    },
    [getMovieDetails],
  );

  React.useEffect(() => {
    // Call handleSearch function whenever debouncedValue changes
    handleSearch();
  }, [debouncedValue, handleSearch]);

  return (
    <MovieContext.Provider
      value={{
        movieList: {
          data: moviesResponse?.movies ?? [],
          statusCode: moviesResponse?.statusCode ?? 500,
        },
        isMovieListLoading,
        movieDetails: {
          statusCode: data?.statusCode ? 200 : 500,
          data: {...data?.movieDetails, ...selectedMovie},
        },
        isMovieDetailsLoading,
        handleSelectMovie,
        searchQuery,
        setSearchQuery,
        isSearchingForResults,
        searchResults: searchResults?.movies ?? [],
      }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieData = () => {
  const context = React.useContext(MovieContext);

  if (!context) {
    throw new Error('useMovieData must be used within MovieProvider');
  }

  return context;
};
