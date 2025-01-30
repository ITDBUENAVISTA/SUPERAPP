import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';
import { ValidationMessagesModel } from 'src/app/core/interfaces/messages/validacion-mensajes.interface';
import { Vouncher } from 'src/app/core/interfaces/vounchers/vounchers.interfaces';
import { VALIDATE_MESSAGES_VOUNCHER } from 'src/app/data/constants/error/validacion-mensajes.const';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent {
  @ViewChild('closeModalForm') closeModal!: ElementRef;
  @ViewChild('vouncherFile') vouncherFileInput: ElementRef | undefined;

  private vouncherFile: File | undefined;

  validationMessages: ValidationMessagesModel;

  private subscription!: Subscription;

  @Input()
  vouncher: Vouncher;

  @Input()
  customer: Customer;

  @Input()
  signal!: Subject<void>;

  @Input()
  isEdit: boolean;

  @Input()
  registeringPayment: boolean;

  @Output()
  hasUnsavedChangesForm: EventEmitter<boolean>;

  @Output()
  formSubmit: EventEmitter<FormData>;

  formVouncher: FormGroup;

  constructor(
    private readonly fb: FormBuilder
  ) {
    this.registeringPayment = false;
    this.validationMessages = VALIDATE_MESSAGES_VOUNCHER;
    this.vouncher = {} as Vouncher;
    this.customer = {} as Customer;
    this.hasUnsavedChangesForm = new EventEmitter<boolean>();
    this.isEdit = false;
    this.formSubmit = new EventEmitter<FormData>();
    this.formVouncher = this.createForm();
  }

  ngOnChanges(): void {
    this.subscription = this.signal.subscribe(() => {
      this.closeModalForm();
    });
    this.formVouncher = this.createForm();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): FormGroup {
    const form = this.fb.group({
      _id: new FormControl('', []),
      date: new FormControl('', [Validators.required]),
      concept: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),
      customer: new FormControl('', [Validators.required]),
    });

    return form;
  }

  private initForm(): void {
    this.formVouncher.reset({
      _id: this.vouncher?._id || '',
      date: this.vouncher?.date || '',
      concept: this.vouncher?.concept || '',
      customer: this.customer?._id || '',
    });
  }

  closeModalForm(): void {
    this.closeModal.nativeElement.click();
  }

  get f() { return this.formVouncher.controls; }

  private formControlHasError(formControlName: string, errorName: string): boolean {
    return this.f[formControlName].hasError(errorName);
  }

  public isFieldValid(field: string): boolean {
    return this.f[field].dirty || this.f[field].touched;
  }

  isInvalidField(fieldName: string): boolean {
    const field = this.formVouncher.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  public isValid(field: string, error: string): boolean {
    return this.isFieldValid(field) && this.formControlHasError(field, error);
  }

  private getVouncherFormValues(): Vouncher {
    return this.formVouncher.value;
  }

  onActiveButton(): boolean {
    return this.formVouncher.valid && this.formVouncher.dirty;
  }

  onInputChange(): void {
    this.hasUnsavedChangesForm.emit(this.onActiveButton());
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.vouncherFile = file;
    if (file) {
      this.vouncher.file = file.name;
    }
    else {
      this.vouncher.file = undefined;
    }

  }

  onSubmit(): void {
    if (this.formVouncher.pristine) {
      this.onCancel();
      return;
    }

    if (this.onActiveButton()) {
      const formData = new FormData();

      formData.append('vouncher', JSON.stringify(this.getVouncherFormValues()));
      if (this.vouncherFile) {
        formData.append('file', this.vouncherFile);
      }

      this.formSubmit.emit(formData);
    } else {
      this.formVouncher.markAllAsTouched();
    }
  }

  onCancel(): void {
  }

}
