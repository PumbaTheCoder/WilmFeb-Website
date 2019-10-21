import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/_models/movie';
import { QueueService } from 'src/app/_services/queue.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { MovieFromQueue } from 'src/app/_models/movieFromQueue';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  
  moviesFromQueue: MovieFromQueue[];
  moviesInQueueNumber: number;

  constructor(private queueService: QueueService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMoviesInQueue();
  }

  loadMoviesInQueue(){
    this.queueService.getMoviesInQueue()
    .subscribe( data => {
     this.moviesFromQueue = data;
     this.moviesInQueueNumber = this.moviesFromQueue.length;
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't load queue");
   });
  }
}
