import { Component } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private readonly uiService: UiServiceService,
    private readonly authService: AuthService,
    private router: Router
  ) { }


  menuMovil() {
    this.uiService.headerClick.emit();
  }

  logout() {
    this.authService.logout();
  }

  goToChangePassword() {
    this.router.navigate(['/soporte/change-password']);
  }

  goToEmailProfile() {
    this.router.navigate(['/soporte/profile-email']);
  }

}
