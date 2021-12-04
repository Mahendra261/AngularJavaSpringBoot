import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Appointment } from '../../models/appointment';
// import * as alertify from 'alertify.js';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css'],
  providers: [DatePipe]
})
export class ViewPatientComponent implements OnInit {
  names;
  patient;
  listOfDiseases;
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
      'selectDisease' : [null,[Validators.required]],
      'tentativeDate' : [null,[Validators.required]],
      'priority' : [null,[Validators.required]]
    })
   }

  ngOnInit() {

    // get selected patient id
    // get Particular Patient from service using patient id and assign response to patient property
    // console.log('view component +++++++');
    let patientId = this.activatedRoute.snapshot.params['id'];
    this.dataService.getParticularPatient(patientId)
    .subscribe(res=> this.patient = res);
  }
get f(){
  return this.appointmentForm.controls;
  }

  bookAppointment() {
    // get diseases list from service

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.dataService.diseasesList().subscribe(res=> {
      this.names = res;
    })
    this.isBookAppointment = false;
      this.isScheduledAppointment = true;
      this.isFormEnabled = true;
      this.isTableEnabled = false;
  }

  scheduleAppointment() {

    // The below attributes to be added while booking appointment using service
    // patientId, disease, priority, tentativedate

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

      this.dataService.scheduleAppointment(request).subscribe(
        res => {this.bookedAppointmentResponse = res;
          this.route.navigate(['requested_appointments']);
        }
      )
  }

  scheduledAppointment() {

    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately

    // get particular patient appointments using getSinglePatientAppointments method of DataService 
      this.isBookAppointment = true;
      this.isScheduledAppointment = false;
      this.isFormEnabled = false;
      this.isTableEnabled = true;
       let patientId = '5fedcf3f-72aa-48fb-927a-492003779e07';
    // change isBookAppointment, isScheduledAppointment, isFormEnabled, isTableEnabled property values appropriately
    this.dataService.getSinglePatientAppointments(patientId).subscribe(res=> {
      this.ScheduledAppointmentResponse = res;
      if (this.ScheduledAppointmentResponse.length) {
        this.isTableEnabled = true
      } else {
        this.isTableEnabled = false;
      }
    })
  }

  cancelAppointment(appointmentId) {
    // delete selected appointment uing service

    // After deleting the appointment, get particular patient appointments
     this.dataService.deleteAppointment(appointmentId);
  }
  
}
