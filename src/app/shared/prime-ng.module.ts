import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ChartModule,
    TableModule,
    SidebarModule,
    DialogModule
  ]
})
export class PrimeNgModule { }
