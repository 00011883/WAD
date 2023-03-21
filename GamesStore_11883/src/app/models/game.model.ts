import { Author } from './author.model';

export type Game = {
  id: number;
  name: string;
  description: string;
  price: number;
  posterUrl: string;
  author?: Author;
};
