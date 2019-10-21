import { Component, OnInit, Input } from '@angular/core';
import { Comments } from 'src/app/_models/comments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-comment-card',
  templateUrl: './movie-comment-card.component.html',
  styleUrls: ['./movie-comment-card.component.css']
})
export class MovieCommentCardComponent implements OnInit {
  
  @Input() singleComment: Comments;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToUser(){
    this.router.navigate(['/searchUser/userProfile/', this.singleComment.user]);
  }
}
