import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Movie } from '../_models/movie';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { MovieDetail } from '../_models/movieDetail';
import { CommentAdd } from '../_models/commentAdd';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { Comments } from '../_models/comments';
import { MarkAdd } from '../_models/markAdd';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = environment.apiUrl 

  constructor(private http: HttpClient) { }

  public addComment(comm: CommentAdd ){
    return this.http.put(this.baseUrl + 'Comments', comm);
  }
  
  public addToQueue(movieId: number ){
    return this.http.post(this.baseUrl + 'Queue/'+ movieId, null);
  }

  public checkIfMovieInQueue(movieId: number){
    return this.http.get(this.baseUrl + 'Queue/check/' + movieId);
}

  public addMark(mark: MarkAdd ){
    return this.http.put(this.baseUrl + 'Watched', mark);
  }

  public getMovieAverageMark(movieId: number){
      return this.http.get(this.baseUrl + 'Movie/averageMark/' + movieId);
  }

  public getMovies() {
    return this.http.get(this.baseUrl + 'Movie/all')
      .subscribe(
        data => console.log(data),
        err => console.log(err)
      );
  }

  public getMovies2(page?: number, itemsPerPage?: number): Observable<any> {

    const paginatedResult: PaginatedResult<Movie[]> = new PaginatedResult<Movie[]>(); 
    let queryString = '?';
    if(page != null && itemsPerPage != null){
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage;
    }
    
    return this.http.get(this.baseUrl + 'Movie/all' + queryString,
            {'headers' : new HttpHeaders ({'Content-Type' : 'application/json'}),
            'responseType': 'text', observe:'response'})
    .pipe(
      map(
        (response: any) => {
          paginatedResult.result =  JSON.parse(response.body);
          
          if( response.headers.get('Pagination') != null){
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));

          }
          
          return paginatedResult;
        } 
      )
    );
  }
      
  public getMovieComments(id: number): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.baseUrl + 'Comments/all/' + id);
  }

    private handleError (error: any) {
      let errMsg = error.message || 'Server error';
      console.error(errMsg); // log to console instead
      return Observable.throw(errMsg);
  }
  
  public getMovieDetail(id: number): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(this.baseUrl + 'Movie/' + id);
  }
  
}
