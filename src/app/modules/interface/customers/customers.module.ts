import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customers.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentFormComponent } from './payments/payment-form/payment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReservationsComponent } from './reservations/reservations.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PaymentsComponent,
    PaymentFormComponent,
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class CustomersModule { }
