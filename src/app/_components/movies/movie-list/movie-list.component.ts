import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/_services/movie.service';
import { Movie } from 'src/app/_models/movie';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { map } from 'rxjs/operators';
import { HttpHeaderResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  
  movies: Movie[];
  pagination: Pagination;
  pageSize = 8;
  pageNumber = 1;

  constructor(private movieService: MovieService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(){
    this.movieService.getMovies2(this.pageNumber, this.pageSize)
   
   .subscribe( data => {
    this.movies = data.result;
    this.pagination = data.pagination;
  }, error => {
    this.alertify.error("Error " + error.status + " - Couldn't load movie details");
  });
  }


  loadMovies(){
    this.movieService.getMovies2(this.pagination.currentPage, this.pagination.itemsPerPage)
    
    .subscribe( data => {
      this.movies = data.result;
      this.pagination = data.pagination;
    }, error => {
      this.alertify.error("Error " + error.status + " - Couldn't load movie details");
    });
  
  }

  pageChanged(event:any):void{
    this.pagination.currentPage = event.page;
    this.loadMovies();
  }
}
