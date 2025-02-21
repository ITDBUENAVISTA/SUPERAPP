import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationMessagesModel } from 'src/app/core/interfaces/messages/validacion-mensajes.interface';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { VALIDATE_MESSAGES_USER } from 'src/app/data/constants/error/validacion-mensajes.const';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  validationMessages: ValidationMessagesModel;

  user: User;
  formUser: FormGroup;

  showPassword: boolean = false;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.user = {} as User;
    this.validationMessages = VALIDATE_MESSAGES_USER;
    this.formUser = this.createForm();
  }

  ngOnInit() {
    this.initForm();
  }

  private createForm(): FormGroup {
    const form = this.fb.group({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[A-Z]/), // Al menos una letra mayúscula
        Validators.pattern(/[a-z]/), // Al menos una letra minúscula
        Validators.pattern(/\d/), // Al menos un número
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/), // Al menos un carácter especial
      ]),
      confirmPassword: new FormControl('', []),
    });

    return form;
  }

  private initForm(): void {
    this.formUser.reset({
      username: '',
      password: '',
      confirmPassword: ''
    });
  }

  get f() { return this.formUser.controls; }

  private formControlHasError(formControlName: string, errorName: string): boolean {
    return this.f[formControlName].hasError(errorName);
  }

  public isFieldValid(field: string): boolean {
    return this.f[field].dirty || this.f[field].touched;
  }

  isInvalidField(fieldName: string): boolean {
    const field = this.formUser.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  public isValid(field: string, error: string): boolean {
    return this.isFieldValid(field) && this.formControlHasError(field, error);
  }

  private getUserFormValues(): User {
    return this.formUser.value;
  }

  onActiveButton(): boolean {
    return this.formUser.valid && this.formUser.dirty;
  }

  onSubmit(): void {
    if (this.formUser.pristine) {
      return;
    }

    if (this.onActiveButton() && this.passwordMatch()) {
      console.log(this.getUserFormValues());
    } else {
      this.formUser.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordMatch(): boolean{
    if (this.isFieldValid('password') && this.isFieldValid('confirmPassword')) {
      return this.formUser.get('password')?.value === this.formUser.get('confirmPassword')?.value;
    }
    return true;
  }


}
