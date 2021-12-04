import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
// import * as alertify from 'alertify.js';

@Component({
  selector: 'app-all-requested-appointments',
  templateUrl: './all-requested-appointments.component.html',
  styleUrls: ['./all-requested-appointments.component.css']
})
export class AllRequestedAppointmentsComponent implements OnInit {

	allAppointments;

  constructor(private dataService: DataService, private route: Router) { 
  }

  ngOnInit() {
    // call appointments method by default
    this.appointments();
  }

  appointments() {
    this.dataService.requestedAppointments().subscribe(res=> {
      this.allAppointments = res;
    })
    // get all requested appointments from service

  }

  view(patientId) {
    this.route.navigate(['patientList', patientId]);
    // should navigate to 'patientList' page with selected patientId

  }

  cancelAppointment(id) {

    // delete selected appointment uing service
    id= '6c57dfc5-2dce-4616-aa1d-9ac8bc510a3f' ;
    // After deleting the appointment, get all requested appointments
    this.dataService.deleteAppointment(id).subscribe(res=> {
      if (res) {
        this.appointments();
      }
    })

  }

}
