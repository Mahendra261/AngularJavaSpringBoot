import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-all-patients-list',
  templateUrl: './all-patients-list.component.html',
  styleUrls: ['./all-patients-list.component.css']
})
export class AllPatientsListComponent implements OnInit {

  allPatients;
  allPatients1;
  constructor(private route: Router, private dataService: DataService) { }

  ngOnInit() {


    this.dataService.getAllPatientsList()
    .subscribe(res => {
      this.allPatients = res;
      console.log(this.allPatients) })

  }

  view(patientId: string) {
    this.route.navigate(['patientList', patientId]);
  }
  
}
