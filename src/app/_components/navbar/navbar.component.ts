import { Component, OnInit } from '@angular/core';
import { AuthoristaionService } from 'src/app/_services/authorisation.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

import { startWith, tap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  registerMode = false;
  loggedInTest = false;
  model: any = {};
  userLogin: string;
  searchStr: string;
  //correctSearch: boolean = false;

  constructor(private authService: AuthoristaionService, 
              private router: Router,
              private alertify: AlertifyService) { }

  ngOnInit() {
      this.userLogin = this.authService.getUserLogin();   
  }
  
  goToSearchComponent(){
    if(this.searchStr){
      this.router.navigate(['/search/', this.searchStr]);
      //[routerLink]="['/search/'+searchStr, searchStr]
    }else{
      this.alertify.warning("Search statement can not be empty");
    }
  }
  /*checkSearchStatement(): boolean{
    console.log("sprawdzam searchStr");
    if(this.searchStr){
      this.correctSearch = true;
    }else{
      this.correctSearch = false;
      this.alertify.warning("Search statement can not be empty");
    }
    return this.correctSearch;
  }*/
  loggedIn2(){
    return this.authService.loggedIn();
  }

//--------- mozna usunac
  loggedIn(){
   if(  this.authService.loggedIn() ){
     this.loggedInTest = true;
   }else(
     this.loggedInTest = false
   )
  }
// ================================


  logout(){
    this.authService.logout();
    this.loggedInTest = false;
    this.alertify.message("Logged out");
    this.router.navigate(['/home']);
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  
  login() {
    this.authService.login(this.model).subscribe(
      data => { 
        this.userLogin = this.authService.decodedToken.actort
        this.alertify.success("Logged in");
      }, error =>{
        this.alertify.error("Failed to sign in");
      }, () =>{
        this.router.navigate(['/movies']);
      }
    );
  }

}
