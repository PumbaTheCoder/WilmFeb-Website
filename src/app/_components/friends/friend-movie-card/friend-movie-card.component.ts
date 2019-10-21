import { Component, OnInit, Input } from '@angular/core';
import { UserProfile } from 'src/app/_models/userProfile';

@Component({
  selector: 'app-friend-movie-card',
  templateUrl: './friend-movie-card.component.html',
  styleUrls: ['./friend-movie-card.component.css']
})
export class FriendMovieCardComponent implements OnInit {

  @Input() watchedMovies: UserProfile;

  constructor() { }
  
  ngOnInit() {
  }

}
