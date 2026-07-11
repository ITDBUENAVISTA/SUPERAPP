import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { OnInit } from '@angular/core';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { CustomersService } from 'src/app/core/services/customers.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerForm } from 'src/app/core/interfaces/customers/customer-form.interface';

import { CustomerFormService } from 'src/app/core/services/customer-form.service'

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private customersFormService: CustomerFormService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {

      this.user = this.localStorageService.getUsuario();

      this.loadProjects();

      this.configureMancomunadoValidators();

      //this.listenLotChanges();

      this.listenCustomerChanges();

  }

  user!: User;

  projects: Customer[] = [];

  saving = false;

  customerFile?: File;

  customerSecondFile?: File;

  beneficiaryFile?: File;

  formLoaded = false;

  readonlyStatuses = [
    'PENDING',
    'REVIEWED'
  ];

  currentStatus = '';

  purchaseForm = this.fb.group({

    customer_id: ['', Validators.required],
    lot: ['', Validators.required],
    financing_term: ['', Validators.required]

  });

  personalForm = this.fb.group({

    full_name: ['', Validators.required],
    age: [null, Validators.required],
    identity_number: ['', Validators.required],
    marital_status: ['', Validators.required],
    profession: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    country: ['', Validators.required],
    department: ['', Validators.required],
    municipality: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    monthly_income: [null, Validators.required],

    isMancomunado: [false],

    full_name_second: [''],
    age_second: [null],
    identity_number_second: [''],
    marital_status_second: [''],
    profession_second: [''],
    email_second: ['', Validators.email],
    country_second: [''],
    department_second: [''],
    municipality_second: [''],
    address_second: [''],
    phone_second: [''],
    monthly_income_second: [null]

  });

  beneficiaryForm = this.fb.group({

    beneficiary_name: ['', Validators.required],
    beneficiary_identity: ['', Validators.required]

  });

  referencesForm = this.fb.group({

    reference1_name: ['', Validators.required],
    reference1_phone: ['', Validators.required],

    reference2_name: ['', Validators.required],
    reference2_phone: ['', Validators.required]

  });

  documentsForm = this.fb.group({

    customer_dni_url: ['', Validators.required],
    customer_second_dni_url: [''],
    beneficiary_dni_url: ['', Validators.required]

  });

  loadProjects(): void {

    this.customersService
      .customersByPerson(this.user.person._id)
      .subscribe({

        next: (resp) => {

          this.projects = resp.data;

          }

        });

  }

  save(){

    if (this.formLoaded) {

        return;

    }

    if(
        this.purchaseForm.invalid ||
        this.personalForm.invalid ||
        this.beneficiaryForm.invalid ||
        this.referencesForm.invalid ||
        this.documentsForm.invalid
    ){

        this.purchaseForm.markAllAsTouched();
        this.personalForm.markAllAsTouched();
        this.beneficiaryForm.markAllAsTouched();
        this.referencesForm.markAllAsTouched();
        this.documentsForm.markAllAsTouched();

        return;

    }

    const body = {

        ...this.purchaseForm.getRawValue(),

        ...this.personalForm.getRawValue(),

        ...this.beneficiaryForm.getRawValue(),

        ...this.referencesForm.getRawValue(),

        //...this.documentsForm.getRawValue(),

        created_by: this.user._id,
        observations: null

    }; //as CustomerForm;
    
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {

        if (value !== null && value !== undefined) {

            formData.append(key, value.toString());

        }

    });

    if (this.customerFile) {

        formData.append(
            'customer_dni',
            this.customerFile
        );

    }

    if (this.customerSecondFile) {

        formData.append(
            'customer_second_dni',
            this.customerSecondFile
        );

    }

    if (this.beneficiaryFile) {

        formData.append(
            'beneficiary_dni',
            this.beneficiaryFile
        );

    }

    console.log('customerFile', this.customerFile);
    console.log('customerSecondFile', this.customerSecondFile);
    console.log('beneficiaryFile', this.beneficiaryFile);

    this.saving = true;

    this.customersFormService.createCustomerForm(formData).subscribe({

        next: async (resp) => {

          this.saving = false;

          await Swal.fire({

            icon: 'success',
            title: 'Formulario enviado',
            text: 'Tu formulario fue enviado correctamente. Pronto será revisado por nuestro equipo.',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#98c640'

          });

          this.router.navigate(['/clientes/dashboard']);

        },

        error: async (err) => {

          this.saving = false;

          console.error(err);

          await Swal.fire({

            icon: 'error',
            title: 'No fue posible enviar el formulario',
            text: err?.error?.message ?? 'Ocurrió un error inesperado.',
            confirmButtonText: 'Aceptar'

          });

        }

    });

  }

  private configureMancomunadoValidators(): void {

    this.personalForm.get('isMancomunado')?.valueChanges.subscribe(isMancomunado => {

      const controls = [

        'full_name_second',
        'age_second',
        'identity_number_second',
        'marital_status_second',
        'profession_second',
        'email_second',
        'country_second',
        'department_second',
        'municipality_second',
        'address_second',
        'phone_second',
        'monthly_income_second'

      ];

      controls.forEach(controlName => {

        const control = this.personalForm.get(controlName);

        if (!control) return;

        if (isMancomunado) {

          if (controlName === 'email_second') {

            control.setValidators([
              Validators.required,
              Validators.email
            ]);

          } else {

            control.setValidators(Validators.required);

          }

        } else {

          if (controlName === 'email_second') {

            control.setValidators(Validators.email);

          } else {

            control.clearValidators();

          }

        }

        control.updateValueAndValidity();

      });

       const secondDocument = this.documentsForm.get('customer_second_dni_url');

      if (isMancomunado) {

        secondDocument?.setValidators(Validators.required);

      } else {

        secondDocument?.clearValidators();

      }

      secondDocument?.updateValueAndValidity();

    });

  }

  onCustomerFileSelected(file: File){

    this.customerFile = file;

  }

  onCustomerSecondFileSelected(file: File){

    this.customerSecondFile = file;

  }

  onBeneficiaryFileSelected(file: File){

    this.beneficiaryFile = file;

  }

  private listenLotChanges(): void {

    this.purchaseForm.get('lot')?.valueChanges.subscribe(lot => {

      const customerId =
        this.purchaseForm.get('customer_id')?.value;

      if (!customerId || !lot) {

        return;

      }

      this.loadCustomerForm(
        customerId,
        lot
      );

    });

  }

  private listenCustomerChanges(): void {

    this.purchaseForm
      .get('customer_id')
      ?.valueChanges
      .subscribe(customerId => {

        const lot = this.purchaseForm.get('lot')?.value;

        if (!customerId || !lot) {
          return;
        }

        this.loadCustomerForm(customerId, lot);

      });

  }

  private loadCustomerForm(
      customerId: string,
      lot: string
  ): void {

      this.customersFormService
          .getCustomerForm(customerId, lot)
          .subscribe({

              next: (resp) => {

                  const form = resp.data;

                  if (!form) {

                      this.enableEdition();

                      return;

                  }

                  this.currentStatus = form.status;

                  this.purchaseForm.patchValue(form,{emitEvent:false});
                  this.personalForm.patchValue(form);
                  this.beneficiaryForm.patchValue(form);
                  this.referencesForm.patchValue(form);
                  this.documentsForm.patchValue(form);

                  if (
                      this.readonlyStatuses.includes(form.status)
                  ) {

                      this.disableEdition();

                  } else {

                      this.enableEdition();

                  }

              },

              error: () => {

                  this.enableEdition();

              }

          });

  }

  private disableEdition(): void {

    //this.purchaseForm.disable();

    this.personalForm.disable();

    this.beneficiaryForm.disable();

    this.referencesForm.disable();

    this.documentsForm.disable();

    this.formLoaded = true;

  }

  private enableEdition(): void {

    //this.purchaseForm.enable();

    this.personalForm.enable();

    this.beneficiaryForm.enable();

    this.referencesForm.enable();

    this.documentsForm.enable();

    this.formLoaded = false;

  }

}