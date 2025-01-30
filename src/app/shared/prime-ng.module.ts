import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ChartModule,
    TableModule,
    SidebarModule,
    DialogModule,
    SkeletonModule
  ]
})
export class PrimeNgModule { }
