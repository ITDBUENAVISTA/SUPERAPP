import { Component } from '@angular/core';
import { UiServiceService } from '../../services/ui-service.service';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  user: User = {
    _id: '',
    username: '',
    rols: '',
    attempts: 0,
    person: {
      _id: '',
      name: '',
      email: '',
      phone: '',
      project: '',
    }
  }

  constructor (
    private readonly uiService: UiServiceService,
    private readonly localStorageService: LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.user = this.localStorageService.getUsuario();
  }
  isRole(role: string): boolean{
    if ((this.user.rols).includes(role)) {
      return true;
    } return false
  }

  menuMovil() {
    this.uiService.headerClick.emit();
  }

  getTenant(): string {
    return window.location.hostname.split('.')[0].toUpperCase();
  }

  isTenant(...tenants: string[]): boolean {
    return tenants.includes(this.getTenant());
  }

}
