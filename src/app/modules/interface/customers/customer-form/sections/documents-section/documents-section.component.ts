import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-documents-section',
  templateUrl: './documents-section.component.html',
  styleUrls: ['./documents-section.component.scss']
})
export class DocumentsSectionComponent {

  customerFile?: File;
  customerSecondFile?: File;
  beneficiaryFile?: File;

  @Input()
  form!: FormGroup;

  @Input()
  saving = false;

  @Output()
  save = new EventEmitter<void>();

  @Input()
  isMancomunado = false;

  @Input()
  formDisabled = false;

  @Output()
  customerFileSelected = new EventEmitter<File>();

  @Output()
  customerSecondFileSelected = new EventEmitter<File>();

  @Output()
  beneficiaryFileSelected = new EventEmitter<File>();

  onCustomerFile(event: Event){

    const input = event.target as HTMLInputElement;

    if(input.files?.length){

      this.customerFile = input.files[0];

      this.form?.get('customer_dni_url')?.setValue(this.customerFile.name);

      this.customerFileSelected.emit(this.customerFile);

    }

  }

  onCustomerSecondFile(event: Event){

    const input = event.target as HTMLInputElement;

    if(input.files?.length){

      this.customerSecondFile = input.files[0];

      this.form?.get('customer_second_dni_url')?.setValue(this.customerSecondFile.name);

      this.customerSecondFileSelected.emit(this.customerSecondFile);

    }

  }

  onBeneficiaryFile(event: Event){

    const input = event.target as HTMLInputElement;

    if(input.files?.length){

      this.beneficiaryFile = input.files[0];

      this.form?.get('beneficiary_dni_url')?.setValue(this.beneficiaryFile.name);

      this.beneficiaryFileSelected.emit(this.beneficiaryFile);

    }

  }

}