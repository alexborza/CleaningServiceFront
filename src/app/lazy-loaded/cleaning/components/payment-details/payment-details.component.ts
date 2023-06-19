import { Component, OnInit } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Payment } from 'src/app/core/model/representation/cleaning_service/Payment';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {

  paymentMethods: {label: string, method: Payment}[] = [];
  showCreditCardDetails: boolean = false;

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit(): void {
    this.paymentMethods = [
      {label: "By Cash", method: Payment.CASH}, 
      {label: "By Credit Card", method: Payment.CARD}
    ]
    this.controlContainer.control?.get('payment')?.valueChanges.subscribe(res => {
      if(res.paymentMethod === Payment.CARD){
        this.showCreditCardDetails = true;
      } else {
        this.showCreditCardDetails = false;
      }
    })
  }

}
