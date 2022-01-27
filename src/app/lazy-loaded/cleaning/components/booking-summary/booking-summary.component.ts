import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PropertyEnum } from 'src/app/core/dto/PropertyEnum';
import { CleaningServiceType } from '../../models/cleaning-service-type';

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
  @Input() hour: string = '';
  @Input() type!: CleaningServiceType;
  @Input() property: any;
  sticky: boolean = false;
  menuPosition: any;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.menuPosition = 150;
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
