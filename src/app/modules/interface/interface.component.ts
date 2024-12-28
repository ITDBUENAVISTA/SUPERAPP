import { Component } from '@angular/core';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {
  menuMovil: boolean = false;

  constructor(
    private uiService: UiServiceService
  ){
    uiService.headerClick.subscribe(() => {
      this.addClass();
    })
  }

  addClass() {
    this.menuMovil = !this.menuMovil;
  }

}
