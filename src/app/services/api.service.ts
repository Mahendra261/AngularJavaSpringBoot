import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Credentials } from '../models/credentials.model';
import { Users } from '../models/users.model';
import { Patient } from '../models/patient';
import { Appointment } from '../models/appointment';
import { mergeMap, catchError } from 'rxjs/operators';
// import { of } from 'rxjs/';

@Injectable()
export class ApiService {

  API_URL: string;
  AUTH_API_URL = '/auth/server/';

  constructor(private http: HttpClient) {
    this.API_URL = 'api';
  }

  public checkLogin(username: string, password: string): Observable<Credentials> {
    // should return response from server

    // handle error
    const authData = {username: username, password: password};
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post<Credentials>(this.API_URL+this.AUTH_API_URL, authData)
    .pipe(catchError(this.handleError))
  }

  public getUserDetails(userId: number): Observable<Users> {
    // should return user details retireved from server
    return this.http.get<Users>(this.API_URL+`/users/${userId}`)
    .pipe(catchError(this.handleError))
    // handle error
  }

  public updateDetails(userDetails: Users): Observable<Users> {
    // should return user details if successfully updated the details
    var uid = userDetails.userId;
   return this.http.put<Users>(this.API_URL+`/users/${uid}`, userDetails)
    .pipe(catchError(this.handleError));
   // handle error
  }

  public registerPatient(patientDetails: any): Observable<any> {
   return this.http.post<Observable<any>>(this.API_URL+'/allpatients', patientDetails)
    .pipe(catchError(this.handleError))
    // should return response from server if patientDetails added successfully

    // handle error

    //return;
  }

  public getAllPatientsList(): Observable<any> {
    return this.http.get<Observable<any>>(this.API_URL+'/allpatients')
    .pipe(catchError(this.handleError))
    // should return all patients from server

    // handle error

    return;
  }

  public getParticularPatient(id): Observable<any> {
   return this.http.get<Observable<any>>(this.API_URL+`/allpatients/${id}`)
    .pipe(catchError(this.handleError))
    // should return particular patient details from server

    // handle error


  }

  public getDiseasesList(): Observable<any> {
  return this.http.get<Observable<any>>(this.API_URL+'/diseases')
    .pipe(catchError(this.handleError))
    // should return diseases from server

    // handle error


  }

  public bookAppointment(appointmentDetails: any): Observable<any> {
    return this.http.post<Observable<any>>(this.API_URL+'/reqappointments', appointmentDetails)
    .pipe(catchError(this.handleError))
    // should return response from server if appointment booked successfully

    // handle error
  }

  public requestedAppointments(): Observable<any> {
   return this.http.get<Observable<any>>(this.API_URL+'/reqappointments')
    .pipe(catchError(this.handleError))
    // should return all requested appointments from server

    // handle error
  }

  public getAppointments(userId): Observable<any> {
  return this.http.get<Observable<any>>(this.API_URL+`/reqappointments?patiemtId=${userId}`)
    .pipe(catchError(this.handleError))
    // should return appointments of particular patient from server

    // handle error
  }

  public deleteAppointment(appointmentId): Observable<any> {
    return this.http.delete<Observable<any>>(this.API_URL+`/reqappointments/${appointmentId}`)
    .pipe(catchError(this.handleError))
    // should delete the appointment

    // handle error
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

}
