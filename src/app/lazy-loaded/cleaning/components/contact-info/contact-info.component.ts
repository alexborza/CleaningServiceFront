import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.scss']
})
export class ContactInfoComponent implements OnInit {

  contactInfoForm: any;

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.contactInfoForm = this.controlContainer.control;
  }

}
