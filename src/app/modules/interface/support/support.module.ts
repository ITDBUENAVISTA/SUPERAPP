import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { SupportRoutingModule } from './support.routing';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
