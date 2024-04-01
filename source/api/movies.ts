import {
  useQuery,
  type UndefinedInitialDataOptions,
  type QueryKey,
} from '@tanstack/react-query';
import {API_ROUTES, QUERY_KEYS} from '../constants';
import {fetchClient} from '../lib';
import {Movie} from '../screens/movies-home/types';

export type MovieList = {
  ok: boolean;
  description: Movie[];
  error_code: number;
};

type ReturnValue = {
  statusCode: number;
  movies: Movie[];
};

const getMovieList = async () => {
  try {
    // the goal is to fetch a list of 10 random movies, however the API returns 8 per request
    const firstMovieFetcher = fetchClient<MovieList>(API_ROUTES.MOVIES());
    const secondMovieFetcher = fetchClient<MovieList>(
      API_ROUTES.MOVIES('ba'), // the value "ba" is hardcode but it can be changed to any value.
    );

    const [firstMovieList, secondMovieList] = await Promise.all([
      firstMovieFetcher,
      secondMovieFetcher,
    ]);

    // return a list 10 movies and I used 2023 and  beyond as a personal preference
    const filteredFirstMovies = firstMovieList.parsedBody.description
      .filter(movie => movie['#YEAR'] >= 2023)
      .slice(0, 7);

    const filteredSecondMovies = secondMovieList.parsedBody.description.filter(
      movie => movie['#YEAR'] >= 2023,
    );

    const isSuccessful =
      filteredFirstMovies?.length || filteredSecondMovies?.length;

    return {
      statusCode: isSuccessful ? 200 : 500,
      movies: [...filteredFirstMovies, ...filteredSecondMovies],
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }

    // Error from server.
    if (error instanceof Response) {
      const response = await error.json();
      throw new Error(response.errorMessage);
    }
  }
};

export const useGetMovieList = (
  opts?: Omit<
    UndefinedInitialDataOptions<
      ReturnValue | undefined,
      Error,
      ReturnValue | undefined,
      QueryKey
    >,
    'queryKey'
  >,
) =>
  useQuery({
    queryFn: getMovieList,
    queryKey: [QUERY_KEYS.MOVIE_LIST],
    ...opts,
  });
