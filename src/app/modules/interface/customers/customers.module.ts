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
import { ReserveFormComponent } from './reservations/reserve-form/reserve-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { PurchaseSectionComponent } from './customer-form/sections/purchase-section/purchase-section.component';
import { PersonalSectionComponent } from './customer-form/sections/personal-section/personal-section.component';
import { BeneficiarySectionComponent } from './customer-form/sections/beneficiary-section/beneficiary-section.component';
import { ReferencesSectionComponent } from './customer-form/sections/references-section/references-section.component';
import { DocumentsSectionComponent } from './customer-form/sections/documents-section/documents-section.component';
import { MatStepperModule } from '@angular/material/stepper';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    DashboardComponent,
    PaymentsComponent,
    PaymentFormComponent,
    ReservationsComponent,
    ReserveFormComponent,
    CustomerFormComponent,
    PurchaseSectionComponent,
    PersonalSectionComponent,
    BeneficiarySectionComponent,
    ReferencesSectionComponent,
    DocumentsSectionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerRoutingModule,
    SharedModule,
    ComponentsModule,

    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule
  ],exports: [
    ReserveFormComponent
  ]
})
export class CustomersModule { }
