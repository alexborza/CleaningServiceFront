import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AvailableHour } from 'src/app/core/model/AvailableHour';
import { CleaningType } from '../../../../core/model/representation/cleaning_service/CleaningType';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.scss']
})
export class BookingSummaryComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() cleaningServicePrice: number = 0;
  @Input() cleaningDetailsPrices: number = 0;
  @Input() discount: number = 0;
  @Input() frequency: string = '';
  @Input() cleaningDate: any;
  @Input() hour!: AvailableHour;
  @Input() type!: CleaningType;
  @Input() property: any;
  @Input() timeEstimation: number = 0;
  sticky: boolean = false;
  menuPosition: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.menuPosition = 100;
  }
  
  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    const windowScroll = window.pageYOffset;
    if(windowScroll >= this.menuPosition){
        this.sticky = true;
    } else {
        this.sticky = false;
    }
  }

  ngOnDestroy() {
  }

}
