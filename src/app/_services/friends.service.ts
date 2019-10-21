import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserProfile } from '../_models/userProfile';
import { FriendCardInfo } from '../_models/friendCardInfo';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  baseUrl = environment.apiUrl 

  constructor(private http: HttpClient) { }

  public loadUserProfileInfo(searchedLogin: string): Observable<UserProfile>{
    return this.http.get<UserProfile>(this.baseUrl + 'Movie/userProfile/' + searchedLogin);
  }

  public addFriend(userLogin: string ){
    return this.http.post(this.baseUrl + 'Friend/addFriend/' + userLogin, null);
  }

  public checkIfFriend(userProfLogin: string): Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl + 'Friend/checkIfFriend/'+userProfLogin );
  }

  public findUserFriends(): Observable<FriendCardInfo>{
    return this.http.get<FriendCardInfo>(this.baseUrl + 'Friend/findUserFriends' );
  }

  public getAllUsersWithoutLoggedInUser(): Observable<FriendCardInfo>{
    return this.http.get<FriendCardInfo>(this.baseUrl + 'Friend/getAllUsers' );
  }
}
