export const API_ADDRESS = 'https://search.imdbot.workers.dev';

export const API_ROUTES = {
  MOVIES: (query?: string) => `/?q=${query ?? 'a'}`, // the value "a" is hardcode but it can be changed to any value.
  MOVIE_DETAILS: (movieId: string) => `/?tt=${movieId}`,
};

export const QUERY_KEYS = {
  MOVIE_LIST: 'movie-list',
} as const;
