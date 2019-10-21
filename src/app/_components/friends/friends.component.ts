import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/_services/friends.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { FriendCardInfo } from 'src/app/_models/friendCardInfo';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  
  //searchedLogin: string;
  //private sub: any;
  haveFriends: boolean = false;
  friends: FriendCardInfo[];
  
  constructor(private friendsService: FriendsService, 
              private alertify: AlertifyService ) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.searchedLogin = params['searchedLogin']; // (+) converts string to a number
    // });
    this.findUserFriends();
  }

  findUserFriends(){
    this.friendsService.findUserFriends()
    .subscribe( data => {
      this.friends  = JSON.parse(JSON.stringify( data ));
      if(this.friends.length>0){
        this.haveFriends = true;
      }
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't load friends list");
   });
  }
}