import { Component, OnInit, DoCheck, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {DataService } from '../../services/data.service';
import { Users } from '../../models/users.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId = -1;
  private userDetails = new Users;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {

    // get userId from service and assign it to userId property
     this.userId = JSON.parse(localStorage.getItem('uid'));
    if(this.userId != -1)
     this.getProfileDetails();
    // call getProfileDetails method to get user details

  }

  getProfileDetails() {
this.dataService.getUserDetails(this.userId)
    .subscribe(res => this.userDetails = res);
  // call getUserDetails method of dataService and assign response to userDetails property

  }


}
