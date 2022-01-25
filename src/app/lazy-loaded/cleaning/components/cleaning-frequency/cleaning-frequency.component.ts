import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { CleaningFrequencyEnum } from 'src/app/core/dto/CleaningFrequencyEnum';

@Component({
  selector: 'app-cleaning-frequency',
  templateUrl: './cleaning-frequency.component.html',
  styleUrls: ['./cleaning-frequency.component.scss']
})
export class CleaningFrequencyComponent implements OnInit {

  frequencies: CleaningFrequency[] = [];

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.frequencies = [
      {label: "One Time", value: CleaningFrequencyEnum.OneTime, discount: 0},
      {label: "Weekly -15%",  value: CleaningFrequencyEnum.Weekly, discount: 15},
      {label: "BiWeekly -10%",  value: CleaningFrequencyEnum.BiWeekly, discount: 10},
      {label: "Monthly -5%",  value: CleaningFrequencyEnum.Monthly, discount: 5}
    ];
  }

}

interface CleaningFrequency {
  label: string;
  value: CleaningFrequencyEnum;
  discount: number;
}