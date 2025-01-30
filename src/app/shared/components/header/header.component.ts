import { Component } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private readonly uiService: UiServiceService,
    private readonly authService: AuthService
  ) { }


  menuMovil() {
    this.uiService.headerClick.emit();
  }

  logout() {
    this.authService.logout();
  }

}
