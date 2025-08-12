import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ValidationMessagesModel } from 'src/app/core/interfaces/messages/validacion-mensajes.interface';
import { Person } from 'src/app/core/interfaces/persons/persons.interface';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { PersonsService } from 'src/app/core/services/persons.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @ViewChild('closeModalForm') closeModal!: ElementRef;

  private subscription!: Subscription;

  selectedRoles: string[] = [];

  @Input()
  signal!: Subject<void>;

  @Input()
  user: User;

  @Input()
  validationMessages: ValidationMessagesModel;

  @Input()
  isEdit: boolean;

  @Output()
  hasUnsavedChangesForm: EventEmitter<boolean>;

  @Output() close = new EventEmitter<void>();

  persons: Person[] = [];

  @Output()
  formSubmit: EventEmitter<User>;

  formUser: FormGroup;

  toggleRole(roleCode: string, event: any) {
  if (event.target.checked) {
    this.selectedRoles.push(roleCode);
  } else {
    this.selectedRoles = this.selectedRoles.filter(r => r !== roleCode);
  }

  this.formUser.get('rols')?.setValue(this.selectedRoles.join(','));
}

  constructor(
    private readonly fb: FormBuilder,
    private readonly personsService: PersonsService
  ) {
    this.user = {} as User;
    this.validationMessages = {} as ValidationMessagesModel;
    this.hasUnsavedChangesForm = new EventEmitter<boolean>();
    this.isEdit = false;
    this.formSubmit = new EventEmitter<User>();
    this.formUser = this.createForm();
  }

  private createForm(): FormGroup {
    const form = this.fb.group({
      _id: new FormControl('', []),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/[A-Z]/), // Al menos una letra mayúscula
        Validators.pattern(/[a-z]/), // Al menos una letra minúscula
        Validators.pattern(/\d/), // Al menos un número
        Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/), // Al menos un carácter especial
      ]),
      rols: new FormControl('', [Validators.required]),
      person: new FormControl('', [Validators.required]),
    });

    if (this.isEdit) {
      form.get('password')?.disable();
      form.get('person')?.disable();
    }

    return form;
  }

  ngOnChanges(): void {
    this.subscription = this.signal.subscribe(() => {
      this.closeModalForm();
    });
    this.formUser = this.createForm();
    this.loadPersons();
    this.initForm();
    if (this.isEdit) {
      this.persons = [];
      this.persons.push(this.user.person);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeModalForm(): void {
    this.close.emit();
  }


  loadPersons(): void {
    this.personsService.peopleWithoutAccount().subscribe({
      next: (data) => {
        this.persons = data.data;
      }
    })
  }

  private initForm(): void {
    this.selectedRoles = this.user?.rols ? this.user.rols.split(',') : [];
    this.formUser.reset({
      _id: this.user?._id || '',
      username: this.user?.username || '',
      password: this.user?.password || '',
      rols: this.selectedRoles.join(','),
      person: this.user?.person?._id || undefined
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
    if(!this.formUser.valid) console.log("InValid")
    if(this.formUser.dirty) console.log("dirty")
    console.log(this.formUser)
    return this.formUser.valid && (this.isEdit ? this.formUser.dirty : true);
  }

  onInputChange(): void {
    this.hasUnsavedChangesForm.emit(this.onActiveButton());
  }

  onSubmit(): void {
    if (this.formUser.pristine) {
      this.onCancel();
      return;
    }

    if (this.onActiveButton()) {
      const values = this.getUserFormValues();
      values.rols = this.selectedRoles.join(',');
      this.formSubmit.emit(values);

      // Limpiamos el formulario SOLO si no es edición
      if (!this.isEdit) {
        this.resetForm();
      }

      // Cerramos modal
      this.closeModalForm();
    } else {
      this.formUser.markAllAsTouched();
    }
  }
  
  private resetForm(): void {

     // Limpiar array de roles
    this.selectedRoles = [];

    // Resetear formulario
    this.formUser.reset();

    // Asegurar que se limpien visualmente los checkboxes
    const checkboxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    checkboxes.forEach(chk => chk.checked = false);
      
  }

  onCancel(): void {
    console.log('onCancel');
  }

}
