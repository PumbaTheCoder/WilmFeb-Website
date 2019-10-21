import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../_models/movie';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = environment.apiUrl 

  constructor(private http: HttpClient) { }

  public loadSearchedMovies(searchedStr: string): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.baseUrl + 'Movie/search/' + searchedStr);
  }

}
