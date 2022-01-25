import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CleaningServiceType } from '../models/cleaning-service-type';

@Component({
  selector: 'app-office-cleaning',
  templateUrl: './office-cleaning.component.html',
  styleUrls: ['./office-cleaning.component.scss']
})
export class OfficeCleaningComponent implements OnInit {

  form!: FormGroup;
  title: string = '';
  type!: CleaningServiceType;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ) {}

  ngOnInit(): void {
    this.getRouteData();
    this.buildForm();
  }

  private getRouteData(){
    this.title = this.route.snapshot.data?.['title'];
    this.type = this.route.snapshot.data?.['type'];
  }

  private buildForm(){
    this.form = this.fb.group({
      space_details: this.fb.group({
        totalSquareMeters: '',
        numberOfPersons: null,
        frequencyOfCleaning: null,
        dayTime: null,
      }),
      space_type: this.fb.group({
        enclosedOffices: 0,
        workStations: 0,
        meetingRooms: 0,
        bathrooms: 0,
        toilets: 0,
        hallways: 0,
        cafeterias: 0
      }),
      contact_info: this.fb.group({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      }),
      location: this.fb.group({
        county: null,
        city: '',
        address: ''
      }),
    })
  }
}
