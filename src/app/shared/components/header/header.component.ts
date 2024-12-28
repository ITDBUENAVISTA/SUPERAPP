import { Component } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private uiService: UiServiceService
  ) { }


  menuMovil() {
    this.uiService.headerClick.emit();
  }

}
