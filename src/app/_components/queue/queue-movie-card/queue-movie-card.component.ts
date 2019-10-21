import { Component, OnInit, Input } from '@angular/core';
import { MovieFromQueue } from 'src/app/_models/movieFromQueue';

@Component({
  selector: 'app-queue-movie-card',
  templateUrl: './queue-movie-card.component.html',
  styleUrls: ['./queue-movie-card.component.css']
})
export class QueueMovieCardComponent implements OnInit {

  @Input() movieFromQueue: MovieFromQueue;

  constructor() { }

  ngOnInit() {
  }

}
