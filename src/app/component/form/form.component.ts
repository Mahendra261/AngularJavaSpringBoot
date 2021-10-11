import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder,Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Patient } from '../../models/patient';
import { DataService } from '../../services/data.service';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [DatePipe]
})
export class FormComponent implements OnInit {

  complexForm: FormGroup;
  patientDetails = new Patient;
  today: string;
  result;

  noRecordsFound = 'No patient records found in the list. Click on Register New Patient to add Patient details.';

  emptyFirstname = 'You must include a first name.';
  minlengthFirstname = 'Your first name must be at least 3 characters long.';
  maxlengthFirstname = 'Your first name cannot exceed 20 characters.';
  emptyLastname = 'You must include a last name.';
  minlengthLastname = 'Your last name must be at least 3 characters long.';
  maxlengthLastname = 'Your last name cannot exceed 20 characters.';
  noGender = 'You must select a gender.';
  noDob = 'You must select a valid date of birth.';
  noMobile = 'You must include mobile number.';
  numberMobile = 'You must enter a valid 10 digit mobile number.';
  maxlengthMobile = 'Your mobile number should not exceed 10 digits.';
  noEmail = 'You must include a valid email.';
  patternEmail = 'Pattern does not match.';

  ngOnInit() {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  constructor( fb: FormBuilder,private datePipe: DatePipe,private route: Router, private dataService: DataService){

    // add necessary validators

    this.complexForm = fb.group({
      'firstName' : ['', [Validators.required]],
      'lastName': ['',[Validators.required]],
      'gender' : [null,[Validators.required]],
      'dob' : [null,[Validators.required]],
      'mobile' : ['',[Validators.required]],
      'email' : ['',[Validators.required]],
      'description' : ''
    })
  }
  get f(){
    return this.complexForm.controls;
  }
  submitForm(value: any){
    const reportedTime = new Date();
    value.registeredTime = reportedTime;
    this.dataService.registerPatient(value)
    .subscribe(res => this.route.navigate(['patientList']))
    // assign new date object to reportedTime
    // should reister new patient using service
    // if added successfully should redirect to 'patientList' page

  }

}
