import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';
import { ValidationMessagesModel } from 'src/app/core/interfaces/messages/validacion-mensajes.interface';
import { Reservation } from 'src/app/core/interfaces/reservations/reservations.interfaces';
import { ReservationsService } from 'src/app/core/services/reservations.service';
import { VALIDATE_MESSAGES_RESERVE } from 'src/app/data/constants/error/validacion-mensajes.const';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-reserve-form',
  templateUrl: './reserve-form.component.html',
  styleUrls: ['./reserve-form.component.scss']
})
export class ReserveFormComponent {
  @ViewChild('closeModalForm') closeModal!: ElementRef;

  validationMessages: ValidationMessagesModel;

  reservationRegister: boolean = false;

  @Input()
  reservation: Reservation;

  @Input()
  customers: Customer[];

  @Input()
  registeringReserve: boolean;

  @Output()
  formSubmit: EventEmitter<void>;

  formReserve: FormGroup;

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly uiServices: UiServiceService,
    private readonly fb: FormBuilder
  ) {
    this.registeringReserve = false;
    this.validationMessages = VALIDATE_MESSAGES_RESERVE;
    this.reservation = {} as Reservation;
    this.customers = [];
    this.formSubmit = new EventEmitter<void>();
    this.formReserve = this.createForm();
  }

  ngOnChanges(): void {
    this.formReserve = this.createForm();
    this.initForm();
  }

  private createForm(): FormGroup {
    const form = this.fb.group({
      date: new FormControl('', [Validators.required]),
      schedule: new FormControl('', [Validators.required]),
      people: new FormControl('', [Validators.required, Validators.min(1)]),
      pool: new FormControl('', []),
      grill: new FormControl('', []),
      customer: new FormControl('', [Validators.required]),
    });

    return form;
  }

  private initForm(): void {
    this.formReserve.reset({
      date: this.reservation.date || '',
      schedule: this.reservation.schedule || '',
      people: this.reservation.people || undefined,
      pool: this.reservation.pool || false,
      grill: this.reservation.grill || false,
      customer: this.reservation.customer?._id || '',
    });
  }

  closeModalForm(): void {
    this.closeModal.nativeElement.click();
  }

  get f() { return this.formReserve.controls; }

  private formControlHasError(formControlName: string, errorName: string): boolean {
    return this.f[formControlName].hasError(errorName);
  }

  public isFieldValid(field: string): boolean {
    return this.f[field].dirty || this.f[field].touched;
  }

  isInvalidField(fieldName: string): boolean {
    const field = this.formReserve.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  public isValid(field: string, error: string): boolean {
    return this.isFieldValid(field) && this.formControlHasError(field, error);
  }

  getReserveFormValues(): Reservation {
    return this.formReserve.value;
  }

  onActiveButton(): boolean {
    return this.formReserve.valid && this.formReserve.dirty;
  }

  onSubmit(): void {
    if (this.formReserve.pristine) {
      this.onCancel();
      return;
    }

    if (this.onActiveButton()) {
      this.createReservation(this.getReserveFormValues());
    } else {
      this.formReserve.markAllAsTouched();
    }
  }

  onCancel(): void {
  }

  createReservation(reservation: Reservation){
    this.reservationRegister = true;
    this.reservationsService.createReservation(reservation).subscribe({
      next: () => {
        this.uiServices.alertaSuccess('Reservación creada correctamente');
        this.closeModalForm();
        this.formSubmit.emit();
      },
      error: (err) => {
        this.reservationRegister = false;
        this.uiServices.alertaError(err.error.message);
      },
      complete: () => {
        this.reservationRegister = false;
      }
    });
  }

}
