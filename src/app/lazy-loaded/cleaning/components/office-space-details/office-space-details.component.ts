import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { DayTimeOfficeCleaningEnum } from 'src/app/core/dto/DayTimeOfficeCleaningEnum';
import { OfficeCleaningFrequencyEnum } from 'src/app/core/dto/OfficeCleaningFrequencyEnum';
import { PrimaryUseOfSpaceEnum } from 'src/app/core/dto/PrimaryUseOfSpaceEnum';

@Component({
  selector: 'app-office-space-details',
  templateUrl: './office-space-details.component.html',
  styleUrls: ['./office-space-details.component.scss']
})
export class OfficeSpaceDetailsComponent implements OnInit {

  spaceDetailsForm: any;
  numberOfPersons: {label: string;}[] = [];
  primaryUse: {label: string; value: PrimaryUseOfSpaceEnum}[] = [];
  frequency: {label: string; value: OfficeCleaningFrequencyEnum}[] = [];
  timeOfTheDay: {label: string; value: DayTimeOfficeCleaningEnum}[] = [];

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.spaceDetailsForm = this.controlContainer.control;
    this.primaryUse = [
      {label: "Office space", value: PrimaryUseOfSpaceEnum.OfficeSpace},
      {label: "Office & Some Industrial", value: PrimaryUseOfSpaceEnum.OfficeAndSomeIndustrial},
      {label: "Primarily Industrial", value: PrimaryUseOfSpaceEnum.PrimarilyIndustrial}
    ];
    this.numberOfPersons = [
      {label: "1-10"},
      {label: "10-30"},
      {label: "30-50"},
      {label: "50-100"},
      {label: "100-200"},
      {label: "200-400"},
      {label: "400+"}
    ];
    this.frequency = [
      {label: "Daily including weekends", value: OfficeCleaningFrequencyEnum.DailyIncludingWeekends},
      {label: "Daily weekdays only", value: OfficeCleaningFrequencyEnum.DailyWeekdaysOnly},
      {label: "Twice / week", value: OfficeCleaningFrequencyEnum.TwiceWeek},
      {label: "Weekly", value: OfficeCleaningFrequencyEnum.Weekly},
      {label: "Every 2 weeks", value: OfficeCleaningFrequencyEnum.Every2Weeks},
      {label: "Monthly", value: OfficeCleaningFrequencyEnum.Monthly},
      {label: "To be determined", value: OfficeCleaningFrequencyEnum.ToBeDetermined}
    ];
    this.timeOfTheDay = [
      {label: "During regular business hours", value: DayTimeOfficeCleaningEnum.DuringRegularBusinessHours},
      {label: "After regular business hours", value: DayTimeOfficeCleaningEnum.AfterRegularBusinessHours},
      {label: "Graveyard shift 11 pm to 7 am", value: DayTimeOfficeCleaningEnum.GraveyardShift}
    ];
  }

}
