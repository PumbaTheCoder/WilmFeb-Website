import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Movie } from 'src/app/_models/movie';
import { RecommendedService } from 'src/app/_services/recommended.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css']
})
export class RecommendedComponent implements OnInit {

  recommendedMovies: Movie[];

  constructor(private recommendedService: RecommendedService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadRecomendedMovies();
  }

  loadRecomendedMovies(){
    this.recommendedService.getRecommendedMovies()
    .subscribe( data => {
     this.recommendedMovies = data;
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't load recommended movies");
   });
  }
}
