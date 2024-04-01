import {type MovieDetails} from '../../screens/movie-details/types';
import {type Movie} from '../../screens/movies-home/types';

export type ReturnValue = {
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
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  isSearchingForResults: boolean;
  searchResults: Movie[];
};

export type Props = {
  children: React.ReactNode;
};
