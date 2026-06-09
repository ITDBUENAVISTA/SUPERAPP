import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonsService } from 'src/app/core/services/persons.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-email',
  templateUrl: './profile-email.component.html',
  styleUrls: ['./profile-email.component.scss']
})
export class ProfileEmailComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private personsService: PersonsService
  ) {

    this.form = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });

  }

  form: FormGroup;

  ngOnInit(): void {
    this.personsService.getMyEmail()
      .subscribe({
        next: (resp) => {
          this.form.patchValue({
            email: resp.data.email
          });
        }
      });
  }

  loadEmail(): void {

    // Luego llamaremos al backend

    const email = 'correo@prueba.com';

    this.form.patchValue({
      email
    });

  }


  save(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.personsService.updateMyEmail(
      this.form.get('email')?.value
    )
    .subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Correo actualizado',
          text: 'Tu correo ha sido actualizado correctamente'
        });
      }
    });
  }

}