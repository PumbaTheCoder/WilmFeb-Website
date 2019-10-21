import { Component, OnInit } from '@angular/core';
import { WatchedMovie } from 'src/app/_models/watchedMovie';
import { WatchedService } from 'src/app/_services/watched.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit {
  
  watchedMovies: WatchedMovie[];
  watchedMoviesNumber: number;

  constructor(private watchedService: WatchedService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadWatchedMovies();
  }
  
  loadWatchedMovies(){
    this.watchedService.loadUserWatchedMovies()
    .subscribe( data => {
     this.watchedMovies = data;
     this.watchedMoviesNumber = this.watchedMovies.length;
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't load queue");
   });
  }

}
