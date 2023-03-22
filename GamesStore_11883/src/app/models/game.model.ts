import { Author } from './author.model';

export type Game = {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  posterUrl: string;
  imgUrl: string;
  logo: string;
  author?: Author;
};
