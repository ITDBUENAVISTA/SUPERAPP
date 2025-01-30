import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PaymentReceiptComponent } from './payment-receipt/payment-receipt.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    PaymentReceiptComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    PaymentReceiptComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class ComponentsModule { }
