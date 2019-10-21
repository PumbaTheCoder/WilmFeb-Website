import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieFromQueue } from '../_models/movieFromQueue';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  baseUrl = environment.apiUrl 

  constructor(private http: HttpClient) { }



  public getMoviesInQueue(): Observable<MovieFromQueue[]>{
    return this.http.get<MovieFromQueue[]>(this.baseUrl + 'Queue/all');
  }

}
