import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthoristaionService {

  //nie hardcodowac localhosta - zrobic w jednym pliku base url ktorego bede wszedzie uzywac
  //jak sie da to nie uzywac typu any
  baseUrl = environment.apiUrl + "/User/";
  userToken: any;

  jwtHelper = new JwtHelperService();
  decodedToken: any;

  
  constructor(private http: HttpClient) { }

  login(model: any){
    return this.http.post(this.baseUrl + 'authenticate', model).pipe(
      map((response: any) => {
        const user = response;

        if (user) {
          localStorage.setItem('token', user.token); 
          //localStorage.getItem('token'); 
          this.decodedToken = this.jwtHelper.decodeToken(user.token);     
          this.userToken = user.token;
        }
      })
    );
  }

  getUserLogin(): string{

    if( localStorage.getItem('token') ){
      return this.decodedToken = this.jwtHelper.decodeToken( localStorage.getItem('token') ).actort;
  }
    return "";
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    //console.log('!!token: ' + !!token);
    //console.log("Token: " + !this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);
    //return !!token;
  }

  logout(){
    this.userToken = null;
    localStorage.removeItem('token');
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }


  /*private handleError(error: any){
    const applicationError = error.headers.get('Application-Error');
    if(applicationError){
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateErrors = '';
    if(serverError){
      for(const key in serverError){
        if(serverError[key]){
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }
  */
}
