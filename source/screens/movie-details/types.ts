export type MovieCollaboratorEntity = {
  '@type': 'Person' | 'Organization';
  url: string;
  name?: string;
};

export interface MovieDetails {
  short: {
    '@context': string;
    '@type': string;
    url: string;
    name: string;
    description: string;
    genre: string[];
    datePublished: string;
    actor: MovieCollaboratorEntity[];
    director: MovieCollaboratorEntity[];
    creator: MovieCollaboratorEntity[];
    duration: string;
  };
}
