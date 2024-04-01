import {useMutation} from '@tanstack/react-query';
import {API_ROUTES} from '../constants';
import {fetchClient} from '../lib';
import {
  MovieCollaboratorEntity,
  MovieRating,
  MovieReview,
} from '../screens/movie-details/types';

export interface MovieDetailsAPiResponse {
  '@context': string;
  '@type': string;
  url: string;
  name: string;
  description: string;
  genre: string[];
  image?: string;
  datePublished: string;
  actor: MovieCollaboratorEntity[];
  director: MovieCollaboratorEntity[];
  creator: MovieCollaboratorEntity[];
  duration: string;
  review: MovieReview;
  aggregateRating: MovieRating;
  contentRating: 'R';
}

type MovieDetailsList = {
  short: MovieDetailsAPiResponse;
};

type GetMovieDetailsRequest = {
  movieId: string;
};

const getMovieDetails = async (request: GetMovieDetailsRequest) => {
  try {
    const response = await fetchClient<MovieDetailsList>(
      API_ROUTES.MOVIE_DETAILS(request.movieId),
      {
        method: 'GET',
      },
    );

    return {
      statusCode: response.parsedBody.short?.name ? 200 : 500,
      movieDetails: response.parsedBody.short,
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

export const useGetMovieDetails = () =>
  useMutation({
    mutationFn: getMovieDetails,
  });
