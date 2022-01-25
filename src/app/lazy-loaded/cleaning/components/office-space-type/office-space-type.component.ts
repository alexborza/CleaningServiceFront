import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-office-space-type',
  templateUrl: './office-space-type.component.html',
  styleUrls: ['./office-space-type.component.scss']
})
export class OfficeSpaceTypeComponent implements OnInit {

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
  }

}
