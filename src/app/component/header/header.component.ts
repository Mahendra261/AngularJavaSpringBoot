import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import {DataService } from '../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId;
  userDetails: any = {};
  
  constructor(private dataService: DataService) { 

  }

  ngOnInit() {

    // call getProfileDetails method to get user details
    this.userId = localStorage.getItem('uid')
    if(this.userId != -1){
      this.getProfileDetails();
    }
  }

  getProfileDetails() {

  // call getUserDetails method of dataService and assign response to userDetails property
    this.dataService.getUserDetails()
    .subscribe(res => {
      this.userDetails = res;      
    }, err =>{
      console.log(err);
    })
  }

  logout() {

    this.dataService.doLogOut();
    // call doLogOut method
    
  }
  
}
