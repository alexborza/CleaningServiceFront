import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { PaymentMethodEnum } from 'src/app/core/dto/PaymentMethodEnum';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  paymentMethods: {label: string, method: PaymentMethodEnum}[] = [];
  showCreditCardDetails: boolean = false;

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.paymentMethods = [
      {label: "By Cash", method: PaymentMethodEnum.CASH}, 
      {label: "By Credit Card", method: PaymentMethodEnum.CARD}
    ]
    this.controlContainer.control?.get('payment')?.valueChanges.subscribe(res => {
      if(res.paymentMethod === PaymentMethodEnum.CARD){
        this.showCreditCardDetails = true;
      } else {
        this.showCreditCardDetails = false;
      }
    })
  }

}
