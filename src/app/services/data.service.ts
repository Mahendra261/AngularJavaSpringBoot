
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';

import { mergeMap, catchError } from 'rxjs/operators';
// import * as alertify from 'alertify.js';

import { ApiService } from './api.service';
import { tap, map } from 'rxjs/operators';
declare var alertify: any;

@Injectable()
export class DataService {


  isLogIn: BehaviorSubject<boolean>;
  constructor(private api: ApiService) {
    this.isLogIn = new BehaviorSubject<boolean>(false);
  }

  authenticateUser(username: string, password: string): Observable<boolean> {
  // store 'uid' from response as key name 'uid' to the localstorage
    return this.api.checkLogin(username,password).
    pipe(tap(res =>{
      this.isLogIn.next(res.userId ? true : false);
      localStorage.setItem('uid',JSON.stringify(res.userId));
      // sessionStorage.setItem('token',JSON.stringify(res.token));
    }), map(res =>{
      return res.userId ? true : false;
    }));
    // return of(res.userId ? true : false);
    // store 'token' from response as key name 'token' to the localstorage

    // return true if user authenticated

    // return false if user not authenticated
  }

  getAuthStatus(): Observable<boolean> {
    // return this.isLogIn.asObservable();
    return  this.isLogIn.asObservable();;
  }
  doLogOut() {
    // remove the key 'userId' if exists
    if(localStorage.getItem('uid')){
      localStorage.removeItem('uid');
      //isLogIn=false;
     // return isLogIn;
     return this.isLogIn.next(false);
    };
    return this.isLogIn.next(false);
  }

  getUserDetails(userId: number): Observable<Users> {
    return this.api.getUserDetails(userId);
    // should return user details retrieved from api service
  }

  updateProfile(userDetails): Observable<boolean> {
    return this.api.updateDetails(userDetails)
    .pipe(map(res => res ? true : false));
    // should return the updated status according to the response from api service


  }

  registerPatient(patientDetails): Observable<any> {

    return this.api.registerPatient(patientDetails);
  //   .pipe(catchError(err => {
  //     alertify
  //     .alert(err.message, function(){
  //     alertify.message('OK');
  // });
  // }));

    // should return response retrieved from ApiService

    // handle error
  }

  getAllPatientsList(): Observable<any> {
    return this.api.getAllPatientsList();

    // should return all patients list retrieved from ApiService

    // handle error
  }

  getParticularPatient(id): Observable<any> {
    return this.api.getParticularPatient(id);
    // should return particular patient details retrieved from ApiService

    // handle error
  }

  getDiseasesList(): Observable<any> {
    return this.api.getDiseasesList();
    // should return response retrieved from ApiService

    // handle error
  }

  bookAppointment(appointmentDetails): Observable<any> {
    return this.api.bookAppointment(appointmentDetails);
    // should return response retrieved from ApiService

    // handle error
  }

  getAppointments(patientId): Observable<any> {
    return this.api.getAppointments(patientId);
    // should return response retrieved from ApiService

    // handle error
  }

  deleteAppointment(appointmentId): Observable<any> {
    return this.api.deleteAppointment(appointmentId);
    // should return response retrieved from ApiService

    // handle error
}

  requestedAppointments(): Observable<any> {
    return this.api.requestedAppointments();
    // should return response retrieved from ApiService

    // handle error

    
  }

  getUserId(): number {
    var uid = JSON.parse(localStorage.getItem('uid'));
    if(!uid){
      return -1
    }
    return uid;
    // retrieve 'userId' from localstorage
  }


}

