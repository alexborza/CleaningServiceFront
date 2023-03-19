import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Frequency } from 'src/app/core/model/representation/cleaning_service/Frequency';

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
      {label: "One Time", value: Frequency.OneTime, discount: 0},
      {label: "Two Time -5%",  value: Frequency.TwoTime, discount: 5},
      {label: "Four Time -10%",  value: Frequency.FourTime, discount: 10},
      {label: "Six Time -15%",  value: Frequency.SixTime, discount: 15}
    ];
  }

}

interface CleaningFrequency {
  label: string;
  value: Frequency;
  discount: number;
}