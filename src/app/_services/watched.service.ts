import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { WatchedMovie } from '../_models/watchedMovie';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchedService {
  
  baseUrl = environment.apiUrl 
  
  constructor(private http: HttpClient) { }


  loadDifferentUserWatchedMovies(userLogin: string): Observable<WatchedMovie[]> {
    return this.http.get<WatchedMovie[]>(this.baseUrl + 'Watched/userWatchedMovies/' + userLogin);
  }

  loadUserWatchedMovies(): Observable<WatchedMovie[]> {
    return this.http.get<WatchedMovie[]>(this.baseUrl + 'Watched/myWatchedMovies');
  }

  getWatchedMoviesNumber(userLogin: string): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'Watched/howManyWatched/' + userLogin);
  }
}
