import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ValidationMessagesModel } from 'src/app/core/interfaces/messages/validacion-mensajes.interface';
import { Person } from 'src/app/core/interfaces/persons/persons.interface';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { UsersService } from 'src/app/core/services/users.service';
import { VALIDATE_MESSAGES_USER } from 'src/app/data/constants/error/validacion-mensajes.const';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';
import Swal from 'sweetalert2';


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

  resetPassword(user: User): void {

    Swal.fire({
      title: '¿Restablecer contraseña?',
      html: `
        Se restablecerá la contraseña del usuario
        <strong>${user.username}</strong>
        <br><br>
        La nueva contraseña será:
        <strong>PwdGen123*</strong>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, restablecer',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#6c757d'
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      this.usersService.resetPassword(user.username)
        .subscribe({
          next: () => {

            Swal.fire({
              title: 'Contraseña restablecida',
              text: 'La contraseña fue actualizada correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

          },
          error: (err) => {

            console.error(err);

            Swal.fire({
              title: 'Error',
              text: 'No fue posible restablecer la contraseña.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });

          }
        });

    });

  }

}
