import { OnInit } from '@angular/core';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { CustomersService } from 'src/app/core/services/customers.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {

      this.user = this.localStorageService.getUsuario();

      this.loadProjects();

  }

  user!: User;

  projects: Customer[] = [];

  purchaseForm = this.fb.group({

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

}