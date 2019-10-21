import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MovieDetail } from '../_models/movieDetail';
import { MovieService } from '../_services/movie.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs';

import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MovieDetailResolver implements Resolve<MovieDetail> {

    constructor(private movieService: MovieService, 
                private router: Router, private alertify: AlertifyService) {}
    

    resolve(route: ActivatedRouteSnapshot): Observable<MovieDetail> {
        return this.movieService.getMovieDetail( route.params['id']).pipe( 
            catchError( error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/movies']);
                return of(null);
            })
        );
   }
}
