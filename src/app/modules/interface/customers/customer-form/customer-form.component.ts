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

  }

  user!: User;

  projects: Customer[] = [];

  saving = false;

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

        ...this.documentsForm.getRawValue(),

        created_by: this.user._id,
        observations: null

    } as CustomerForm;

    this.saving = true;

    this.customersFormService.createCustomerForm(body).subscribe({

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

}