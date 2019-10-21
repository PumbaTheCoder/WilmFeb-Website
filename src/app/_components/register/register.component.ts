import { Component, OnInit } from '@angular/core';
import { AuthoristaionService } from 'src/app/_services/authorisation.service';
import { Subject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  errorMessage: string;
  
  constructor(private authService: AuthoristaionService,
              private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register(){ 
    this.errorMessage = '';
    this.authService.register(this.model).pipe().subscribe( 
      () =>{
       // console.log('Registration successful :) ');
        this.alertify.success('Registration successful')
    }, error => {
      //console.log( error );
      //console.log( error.error.message );
      this.errorMessage = error.error.message;
      this.alertify.error("Failed to register")
    } );
  }

  cancel(){
    console.log('cancelled :( ');
  }

}
