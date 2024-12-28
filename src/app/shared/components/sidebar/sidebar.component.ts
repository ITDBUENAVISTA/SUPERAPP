import { Component } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor (
    private uiService: UiServiceService
  ) {}

  menuMovil() {
    this.uiService.headerClick.emit();
  }

}
