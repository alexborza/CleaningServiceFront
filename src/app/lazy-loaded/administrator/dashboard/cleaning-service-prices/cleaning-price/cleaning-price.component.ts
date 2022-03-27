import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CleaningServicePricesDto } from 'src/app/core/dto/CleaningServicePricesDto';

@Component({
  selector: 'app-cleaning-price',
  templateUrl: './cleaning-price.component.html',
  styleUrls: ['./cleaning-price.component.scss']
})
export class CleaningPriceComponent implements OnInit {

  dto!: CleaningServicePricesDto;
  cleaningType!: string;

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ) { 
    this.cleaningType = this.config.data?.cleaningType;
    this.dto = this.config.data?.dto;
    console.log(this.cleaningType, this.dto)
  }

  ngOnInit(): void {
  }

}
