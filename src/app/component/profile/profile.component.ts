import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Users } from '../../models/users.model';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  // used as a flag to display or hide form
  editProfile = false;
  userId = -1;
  userDetails = new Users;
  isLoggedIn : boolean;
  userName: string;

  editProfileForm: FormGroup;
  userImg = './../../assets/user.jpg';
  mobileErrMsg = 'You must enter a valid mobile number';
  emailErrMsg = 'You must enter a valid Email ID';
  locationErrMsg = 'You must enter the location';

  constructor(private dataService: DataService,
    private apiService : ApiService) { }

  ngOnInit() {

    // add necessary validators
    // username should be disabled. it should not be edited

    this.editProfileForm = new FormGroup({
      userName: new FormControl(this.userDetails.username, [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      email: new FormControl('',[Validators.required]),
      location: new FormControl('',[Validators.required])
    });

      this.dataService.getAuthStatus().subscribe(
        res =>{
          this.isLoggedIn = res;
          if(this.isLoggedIn){

            this.userId = JSON.parse(localStorage.getItem('uid'));
            this.getProfileDetails();
          }
        }
    )


    // get login status from service
    // get userId from service and assign it to userId property
    // get profile details and display it

  }

    get f(){
  return this.editProfileForm.controls;
}
  changeMyProfile() {
    if(this.dataService.updateProfile(this.editProfileForm.value)){
      this.userDetails = this.editProfileForm.value;
      this.userDetails.username = this.userName;
      this.discardEdit();
    }
    // if successfully changed the profile it should display new details hiding the form
    // this.editProfileForm.reset();
  }

  editMyProfile() {
    this.editProfile = true;
    // change editProfile property value appropriately
  }

  discardEdit() {
    this.editProfile = false;
    // change editProfile property value appropriately

  }

  getProfileDetails() {
    this.dataService.getUserDetails(this.userId)
    .subscribe(res => {
      this.userDetails = res;
      this.editProfileForm.patchValue({userName: this.userDetails.username});
      this.userName = this.userDetails.username;
    });
    // retrieve user details from service using userId

  }

}
