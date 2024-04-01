import {Movie} from '../movies-home/types';

export type MovieCollaboratorEntity = {
  '@type': 'Person' | 'Organization';
  url: string;
  name?: string;
  imageUrl?: string;
};

export type MovieReview = {
  '@type': 'Review';
  itemReviewed: {
    '@type': 'Movie';
    url: string;
  };
  author: {
    '@type': 'Person';
    name: string;
  };
  dateCreated: string;
  inLanguage: string;
  name: string;
  reviewBody: string;
  reviewRating: {
    '@type': 'Rating';
    worstRating: number;
    bestRating: number;
    ratingValue: number;
  };
};

export type MovieRating = {
  '@type': 'AggregateRating';
  ratingCount: number;
  bestRating: number;
  worstRating: number;
  ratingValue: number;
};

export interface MovieDetails extends Movie {
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
