import { Movie } from './movie';
import { Category } from './category';


export interface UserProfile{
    idMovie: number;
    title: string;
    description: string;
    director: string;
    year: string;
    image: string;
    userMark: number;
    movieCategories: Category[];
}