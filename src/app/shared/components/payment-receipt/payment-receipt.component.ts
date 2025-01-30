import { Component, Input } from '@angular/core';
import { Pay } from 'src/app/core/interfaces/customers/payments.interface';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent {

  @Input() pay: Pay;

  constructor(){
    this.pay = {} as Pay;
  }

}
