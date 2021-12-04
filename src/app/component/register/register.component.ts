import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
// import { Observable } from 'rxjs';
// import * as alertify from 'alertify.js';
import { Users } from '../../models/users';

@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrls: ['./register-new-user.component.css']
})

export class RegisterNewUserComponent implements OnInit {

	regNewUser = new Users;
	signupForm: FormGroup;

  emptyUserName = 'You must enter a username';
  minlengthUserName = 'User name must be at least 3 characters long';
  maxlengthUserName = 'Username cannot exceed 20 characters';
  userNamePattern = 'Username should be in alphanumeric only';

  emptyPassword = 'You must enter a password';
  minlengthPassword = 'Password must be at least 8 characters long';
  maxlengthPassword = 'Password cannot exceed 20 characters';
  passwordPattern = 'Pattern does not match';

  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private route: Router, private dataService: DataService) {
   }

  ngOnInit() {

    // add necessary validators

    this.signupForm = new FormGroup({
      userName: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z0-9_]+$')]),
      password: new FormControl('',[Validators.required,
        Validators.minLength(8), Validators.maxLength(20)
      , Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]),
      mobile: new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}$")]),
      email: new FormControl('',[Validators.email,Validators.required]),
      location: new FormControl('',[Validators.required])
    });
  }
 get f(){
    return this.signupForm.controls;
  }

  signUp() {

   const form = this.signupForm.value;
    // call regNewUser method to perform signup operation
    // if success, redirect to login page
    // else display appropriate error message
       // reset the form
      const regForm = {
        username: form.userName,
        password : form.password,
        mobile: form.mobile,
        email: form.email,        
        location : form.location
       }
      //  console.log(regForm);
      this.dataService.regNewUser(regForm)
      .subscribe((res) =>{
        // console.log('register user response' +res);
    //  if(res){
      //  console.log('response '+ JSON.stringify(res))
       this.regNewUser = res;
        this.route.navigate(['login']);
        this.signupForm.reset();
    
  }, err => {
    console.log(err);
  })
    
  }

  goBack() {

    // should navigate to login page
    this.route.navigate(['login']);

  }

}
