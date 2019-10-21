import { Component, OnInit, Input } from '@angular/core';
import { WatchedMovie } from 'src/app/_models/watchedMovie';

@Component({
  selector: 'app-watched-card',
  templateUrl: './watched-card.component.html',
  styleUrls: ['./watched-card.component.css']
})
export class WatchedCardComponent implements OnInit {

  @Input() watchedMovies: WatchedMovie;

  constructor() { }

  ngOnInit() {
  }

}
