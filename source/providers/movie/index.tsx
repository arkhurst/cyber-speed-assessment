import * as React from 'react';
import {type Movie} from '../../screens/movies-home/types';
import {type MovieDetails} from '../../screens/movie-details/types';
import {useGetMovieDetails, useGetMovieList} from '../../api';
import {Alert} from 'react-native';

type ReturnValue = {
  movieList: {
    statusCode: number;
    data: Movie[];
  };
  isMovieListLoading: boolean;
  movieDetails: {
    statusCode: number;
    data: Partial<MovieDetails>;
  };
  isMovieDetailsLoading: boolean;
  handleSelectMovie: (movie: Movie) => void;
};

type Props = {
  children: React.ReactNode;
};

const MovieContext = React.createContext({} as ReturnValue);

export const MovieProvider: React.FC<Props> = ({children}) => {
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);
  const {data: moviesResponse, isPending: isMovieListLoading} =
    useGetMovieList();
  const {
    mutate: getMoveDetails,
    isPending: isMovieDetailsLoading,
    data,
  } = useGetMovieDetails();

  const handleSelectMovie = React.useCallback(
    (movie: Movie) => {
      getMoveDetails(
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
    [getMoveDetails],
  );

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
