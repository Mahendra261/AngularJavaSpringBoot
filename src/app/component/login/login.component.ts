import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

import { DataService } from '../../services/data.service';
// import * as alertify from 'alertify.js';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	isLoggedIn: boolean = false;
	loginForm: FormGroup;
	isLoginFailed: boolean = false;

	emptyUserName = 'You must enter a username';
	minlengthUserName = 'User name must be at least 3 characters long';
	maxlengthUserName = 'Username cannot exceed 20 characters';
	userNamePattern = 'Username should be in alphanumeric only';

	emptyPassword = 'You must enter a password';
	minlengthPassword = 'Password must be at least 8 characters long';
	maxlengthPassword = 'Password cannot exceed 20 characters';
	passwordPattern = 'Pattern does not match';

	constructor(private route: Router, private dataService: DataService) {
	 }

	ngOnInit() {
		// add necessary validators

		this.loginForm = new FormGroup({
      userName: new FormControl('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9_]+$')]),
      password: new FormControl('',[Validators.required,
        Validators.minLength(8), Validators.maxLength(20)
      , Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')])
		});
  }
  
  get f(){
  return this.loginForm.controls;
}

	doLogin() {
		// call authenticateUser method to perform login operation
		// if success, redirect to profile page
		// else display appropriate error message
       // reset the form
        const form = this.loginForm.value;
    // console.log('loginForm data: '+ form.userName, form.password);
    this.dataService.authenticateUser(form.userName,form.password)
    .subscribe(res =>{
      // console.log("login component"+JSON.stringify(res));
      if(res){
        this.isLoggedIn = true;
        this.route.navigate(['profile']);
        localStorage.clear();
      }else{
        this.isLoginFailed = true;
        localStorage.clear();
      }

    }, err => {
      console.log('An error occured!' +  err);
    })
      this.loginForm.reset();
	}

	signUp() {
    // should navigate to register new user page
    this.route.navigate(['register_user'])
	}

}



