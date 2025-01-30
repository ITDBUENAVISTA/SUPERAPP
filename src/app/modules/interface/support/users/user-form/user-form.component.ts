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

  rols = [
    { name: 'Soporte', rols: '01,03' },
    { name: 'Cliente', rols: '02' }
  ];

  persons: Person[] = [];

  @Output()
  formSubmit: EventEmitter<User>;

  formUser: FormGroup;

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
    this.closeModal.nativeElement.click();
  }


  loadPersons(): void {
    this.personsService.peopleWithoutAccount().subscribe({
      next: (data) => {
        this.persons = data.data;
      }
    })
  }

  private initForm(): void {
    this.formUser.reset({
      _id: this.user?._id || '',
      username: this.user?.username || '',
      password: this.user?.password || '',
      rols: this.user?.rols || '',
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
    return this.formUser.valid && this.formUser.dirty;
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
      this.formSubmit.emit(this.getUserFormValues());
    } else {
      this.formUser.markAllAsTouched();
    }
  }

  onCancel(): void {
    console.log('onCancel');
  }

}
