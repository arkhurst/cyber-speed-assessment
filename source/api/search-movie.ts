import {useMutation} from '@tanstack/react-query';
import {API_ROUTES} from '../constants';
import {fetchClient} from '../lib';
import {MovieList} from '.';

type SearchMovieRequest = {
  searchQuery: string;
};

const getMovieResults = async (request: SearchMovieRequest) => {
  try {
    const response = await fetchClient<MovieList>(
      API_ROUTES.MOVIES(request.searchQuery),
      {
        method: 'GET',
      },
    );

    return {
      statusCode: response.parsedBody?.ok ? 200 : 500,
      movies: response.parsedBody.description,
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

export const useGetMovieSearchResults = () =>
  useMutation({
    mutationFn: getMovieResults,
  });
