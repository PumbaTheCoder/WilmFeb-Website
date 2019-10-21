import { Category } from './category';
import { Comments } from './comments';

export interface Movie{

    idMovie: number;
    title: string;
    description: string;
    director: string;
    year: string;
    image: string;

    //userMark: number;
   // globalMark: number;
    
    movieCategories: Category[];
   // movieComments: Comments[];
}