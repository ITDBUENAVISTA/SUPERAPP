import { Component, Input } from '@angular/core';
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

  onCustomerFile(event: Event){

    const input = event.target as HTMLInputElement;

    if(input.files?.length){

      this.customerFile = input.files[0];

      this.form?.get('customer_dni_url')?.setValue(this.customerFile.name);

    }

  }

  onCustomerSecondFile(event: Event){

    const input = event.target as HTMLInputElement;

    if(input.files?.length){

      this.customerSecondFile = input.files[0];

      this.form?.get('customer_second_dni_url')?.setValue(this.customerSecondFile.name);

    }

  }

  onBeneficiaryFile(event: Event){

    const input = event.target as HTMLInputElement;

    if(input.files?.length){

      this.beneficiaryFile = input.files[0];

      this.form?.get('beneficiary_dni_url')?.setValue(this.beneficiaryFile.name);

    }

  }

}