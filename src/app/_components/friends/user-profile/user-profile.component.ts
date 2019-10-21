import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/_services/friends.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from 'src/app/_models/userProfile';
import { AuthoristaionService } from 'src/app/_services/authorisation.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  searchedLogin: string;
  private sub: any;
  userProfile: UserProfile[];
  watchedMoviesNumber: number = 0;
  isAFriend: boolean;
  itIsMeImg: string = "https://i.ibb.co/d0sH0Ng/Meme-Spiderman-you.jpg";
  itIsMe: boolean = false;
  loggedInUserLogin: string;
  randomAvatar:string;
  
  constructor(private friendsService: FriendsService,
              private authService: AuthoristaionService, 
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.randomAvatar = 'https://randomuser.me/api/portraits/lego/' + Math.floor(10*Math.random()) + '.jpg';
    this.sub = this.route.params.subscribe(params => {
      this.searchedLogin = params['searchedLogin']; // (+) converts string to a number
    });
    this.loggedInUserLogin = this.authService.getUserLogin();
    this.loadUserProfileInfo();
    this.checkIfFriend();
    
    if(this.loggedInUserLogin == this.searchedLogin ){
      this.itIsMe=true;
    }
  }

  loadUserProfileInfo(){ 
    this.friendsService.loadUserProfileInfo(this.searchedLogin)
    .subscribe( data => {
      this.userProfile  = JSON.parse(JSON.stringify( data ));
      this.watchedMoviesNumber = this.userProfile.length;
   }, error => {
     this.alertify.error("Error " + error.status + " - Couldn't load user profile");
   });
  }

  
  checkIfFriend(){
    this.friendsService.checkIfFriend(this.searchedLogin)
    .subscribe( data => {
      this.isAFriend  = JSON.parse(JSON.stringify( data ));
   }, error => {
     console.log(error.status);
   });

  }
  
  addFriend(){
    this.friendsService.addFriend(this.searchedLogin).subscribe( next => {
      this.alertify.success("Friend added");
      this.isAFriend = true;
    }, error => {
      this.alertify.error(error);
    })
  }
}
