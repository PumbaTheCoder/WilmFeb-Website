import { Component, OnInit, Input } from '@angular/core';
import { FriendCardInfo } from 'src/app/_models/friendCardInfo';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WatchedService } from 'src/app/_services/watched.service';

@Component({
  selector: 'app-friend-info-card',
  templateUrl: './friend-info-card.component.html',
  styleUrls: ['./friend-info-card.component.css']
})
export class FriendInfoCardComponent implements OnInit {

  @Input() friend: FriendCardInfo;
  
  watchedNumber: number;
  randomAvatar: string;
  
  constructor(private router: Router,
              private watchedService: WatchedService) { }
//w-150 h-70
  ngOnInit() {
    this.randomAvatar = 'https://randomuser.me/api/portraits/lego/' + Math.floor(10*Math.random()) + '.jpg';
    this.getUserWatchedMoviesNumber();
  }

  goToUser(){
      this.router.navigate(['/searchUser/userProfile/', this.friend.login]);
      //[routerLink]="['/search/'+searchStr, searchStr]
  }

  getUserWatchedMoviesNumber(){
    this.watchedService.getWatchedMoviesNumber(this.friend.login)
    .subscribe( data => {
      this.watchedNumber  = data;
   }, error => {
     console.log(error.status);
   });
  }
  /*getRandomAvatar():string{
    //https://randomuser.me/photos
    let num = Math.floor(10*Math.random());
    let avatarImgCat = "http://lorempixel.com/output/cats-q-c-200-200-" + num + ".jpg";
    let avatarImgLego = "https://randomuser.me/api/portraits/lego/" + num + ".jpg";
    let avatarImgAnimals = "http://lorempixel.com/output/animals-q-c-200-200-"+num+".jpg";
    
    return avatarImgLego;
  }*/
}
