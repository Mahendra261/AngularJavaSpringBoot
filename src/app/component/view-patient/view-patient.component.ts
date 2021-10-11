import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
//import {ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
// import 'rxjs/add/operator/switchMap';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {

  patient;
  names;
  today;
  isBookAppointment: boolean = true;
  isFormEnabled: boolean = false;
  isScheduledAppointment: boolean = true;
  isTableEnabled: boolean = false;
  appointmentForm: FormGroup;
  appointmentDetails = new Appointment;
  bookedAppointmentResponse;
  ScheduledAppointmentResponse;

  constructor(fb: FormBuilder,private route: Router, private datePipe: DatePipe, private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');

    // add necessary validators
    this.appointmentForm = fb.group({
      'selectDisease' : [null, [Validators.required]],
      'tentativeDate' : [null, [Validators.required]],
      'priority' : [null, [Validators.required]]
    })

   }

  ngOnInit() {
    let patientId = this.activatedRoute.snapshot.params['id'];
    this.dataService.getParticularPatient(patientId)
    .subscribe(res=> this.patient = res);
    // get selected patient id
    // get Particular Patient from service using patient id and assign response to patient property

  }

  get f(){
  return this.appointmentForm.controls;
  }

  bookAppointment() {
    this.dataService.getDiseasesList().subscribe(res=> {
      this.names = res;
    })
    this.isBookAppointment = true;
      this.isScheduledAppointment = false;
      this.isFormEnabled = true;
      this.isTableEnabled = false;
    // get diseases list from service

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, patientFirstName, patientLastName, disease, priority, tentativedate, registeredTime

    // if booked successfully should redirect to 'requested_appointments' page

      let request = {
        patientId : this.patient.id,
        patientFirstName : this.patient.firstName,
        patientLastName : this.patient.lastName,
        disease: this.f.selectDisease.value,
        priority : this.f.priority.value,
        tentativedate : this.f.tentativeDate.value,
        registeredTime : this.patient.registeredTime
      }

      this.dataService.bookAppointment(request).subscribe(
        res => {this.bookedAppointmentResponse = res;
          this.route.navigate(['requested_appointments']);
        }
      )

  }

  scheduledAppointment() {
    this.isBookAppointment = false;
      this.isScheduledAppointment = true;
      this.isFormEnabled = false;
      this.isTableEnabled = true;
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.dataService.getAppointments(this.patient.id).subscribe(res=> {
      this.ScheduledAppointmentResponse = res;
      if (this.ScheduledAppointmentResponse.length) {
        this.isTableEnabled = true
      } else {
        this.isTableEnabled = false;
      }
    })
    // get particular patient appointments using getAppointments method of DataService

  }

  cancelAppointment(id) {
    this.dataService.deleteAppointment(id).subscribe(res=> {
       this.scheduledAppointment();
    })
    // delete selected appointment uing service

    // After deleting the appointment, get particular patient appointments

  }

}
