import { Category } from './category';
import { Comments } from './comments';

export interface MovieDetail{

    idMovie: number;
    title: string;
    description: string;
    director: string;
    year: string;
    image: string;
    trailer: string;

    userMark: number;
    globalMark: number;
    
    movieCategories: Category[];
    movieComments: Comments[];
}