import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ValidationMessagesModel } from 'src/app/core/interfaces/messages/validacion-mensajes.interface';
import { Person } from 'src/app/core/interfaces/persons/persons.interface';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { UsersService } from 'src/app/core/services/users.service';
import { VALIDATE_MESSAGES_USER } from 'src/app/data/constants/error/validacion-mensajes.const';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  signal = new Subject<void>();

  validationMessages: ValidationMessagesModel;

  userSelected: User;
  isEdit: boolean = false;
  triggerCloseModal: boolean = false;
  users: User[] = [];
  loadedUsers: boolean = false;

  constructor(
    private readonly usersService: UsersService,
    private readonly uiService: UiServiceService
  ) {
    this.userSelected = {} as User
    this.validationMessages = VALIDATE_MESSAGES_USER;
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void {
    this.usersService.listUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loadedUsers = true;
      }
    })
  }

  clearUser(): void {
    this.userSelected = {
      _id: '',
      username: '',
      password: '',
      rols: '',
      attempts: 0,
      person: {} as Person, // O asigna un objeto vacío de tipo Person si lo necesitas
    } as User;
  }

  submitForm(user: User): void {
    if (!this.isEdit) {
      this.usersService.createUser(user).subscribe({
        next: (resp) => {
          this.signal.next();
          this.uiService.alertaSuccess('Usuario creado correctamente');
          this.loadUsers();
        }
      })
    }
  }

}
