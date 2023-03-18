import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Frequency } from 'src/app/core/model/representation/cleaning_service/Frequency';

@Component({
  selector: 'app-cleaning-frequency',
  templateUrl: './cleaning-frequency.component.html',
  styleUrls: ['./cleaning-frequency.component.scss']
})
export class CleaningFrequencyComponent implements OnInit {

  frequencies: Frequency[] = [];

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.frequencies = [
      {label: "One Time", value: Frequency.OneTime, discount: 0},
      {label: "Weekly -15%",  value: Frequency.Weekly, discount: 15},
      {label: "BiWeekly -10%",  value: Frequency.BiWeekly, discount: 10},
      {label: "Monthly -5%",  value: Frequency.Monthly, discount: 5}
    ];
  }

}

interface Frequency {
  label: string;
  value: Frequency;
  discount: number;
}