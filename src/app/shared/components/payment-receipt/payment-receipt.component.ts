import { Component, Input } from '@angular/core';
import { Pay } from 'src/app/core/interfaces/customers/payments.interface';
import { Person } from 'src/app/core/interfaces/persons/persons.interface';

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent {

  @Input() pay: Pay;
  @Input() person: Person;

  constructor(){
    this.pay = {} as Pay;
    this.person = {} as Person;
  }

}
