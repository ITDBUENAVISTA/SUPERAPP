import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InterfaceComponent } from './interface.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { RouterModule } from '@angular/router';
import { InterfaceRoutingModule } from './interface.routing';



@NgModule({
  declarations: [
    InterfaceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InterfaceRoutingModule,
    ComponentsModule
  ]
})
export class InterfaceModule { }
