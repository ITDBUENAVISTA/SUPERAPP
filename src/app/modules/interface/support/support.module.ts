import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomersModule } from '../customers/customers.module';
import { RouterModule } from '@angular/router';
import { SupportRoutingModule } from './support.routing';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormComponent } from './users/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentsComponent } from './payments/payments.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { ReservationDetailModalComponent } from './reservations/reservation-detail-modal/reservation-detail-modal.component';
import { ChangePasswordComponent } from '../../users/change-password/change-password.component';




@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    UserFormComponent,
    PaymentsComponent,
    ReservationsComponent,
    ReservationDetailModalComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SupportRoutingModule,
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    DropdownModule,
    FormsModule,
    MenuModule,
    CustomersModule
  ]
})
export class SupportModule { }
