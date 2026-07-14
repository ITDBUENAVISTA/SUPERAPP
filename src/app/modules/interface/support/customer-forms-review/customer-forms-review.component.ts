import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { CustomerFormService } from 'src/app/core/services/customer-form.service';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-forms-review',
  templateUrl: './customer-forms-review.component.html',
  styleUrls: ['./customer-forms-review.component.scss']
})
export class CustomerFormsReviewComponent implements OnInit {

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly customerFormService: CustomerFormService
  ) {}

  public documentsBaseUrl = environment.urlCustomerForms;

  customerId!: string;
  lot!: string;

  loading = true;
  saving = false;
  formLoaded = true;

  projects: Customer[] = [];

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

  ngOnInit(): void {

    this.customerId = this.route.snapshot.paramMap.get('customerId') ?? '';

    this.lot = this.route.snapshot.paramMap.get('lot') ?? '';

    this.markAsViewed();

    this.loadCustomerForm();

  }

  /**
   * ====================================
   * CARGAR FORMULARIO
   * ====================================
   */

  private loadCustomerForm(): void {

    this.loading = true;

    this.customerFormService.getCustomerForm(this.customerId,this.lot)
    .subscribe({

      next: (resp) => {

        const form: any = resp.data;

        if (!form) {

          this.loading = false;

          return;

        }

        this.purchaseForm.patchValue({

          customer_id: form.customer_id,

          lot: form.lot,

          financing_term: form.financing_term

        }, {

          emitEvent: false

        });

        this.personalForm.patchValue(form);

        this.beneficiaryForm.patchValue(form);

        this.referencesForm.patchValue(form);

        this.documentsForm.patchValue(form);        

        this.disableEdition();

      },

      error: (err) => {

        console.error(err);

      },

      complete: () => {

        this.loading = false;

      }

    });

  }

  private disableEdition(): void {

    this.purchaseForm.disable();

    this.personalForm.disable();

    this.beneficiaryForm.disable();

    this.referencesForm.disable();

    this.documentsForm.disable();

    this.formLoaded = true;

  }

  /**
   * ====================================
   * GUARDAR (POR AHORA SIN IMPLEMENTAR)
   * ====================================
   */

  save(): void {

    console.log('Guardar revisión');

  }

  private markAsViewed(): void {

    this.customerFormService.markCustomerFormAsViewed(this.customerId,this.lot)
      .subscribe({next: () => {},error: (err) => {
        
        console.error(err);

      }

    });

  }

  async updateStatus(status: 'REVIEWED' | 'RETURNED'): Promise<void> {

    const action =
      status === 'REVIEWED'
        ? 'aprobar'
        : 'devolver';

    const result = await Swal.fire({

      icon: 'question',
      title: `¿Está seguro de ${action} este formulario?`,
      text: 'Esta acción quedará registrada.',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      confirmButtonColor:
        status === 'REVIEWED'
          ? '#198754'
          : '#dc3545'

    });

    if (!result.isConfirmed) {

      return;

    }

    this.customerFormService
      .updateCustomerFormStatus(
        this.customerId,
        this.lot,
        status
      )
      .subscribe({

        next: async () => {

          await Swal.fire({

            icon: 'success',
            title:
              status === 'REVIEWED'
                ? 'Formulario aprobado'
                : 'Formulario devuelto',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#0d6efd'

          });

          this.router.navigate([
            '/soporte/formularios'
          ]);

        },

        error: () => {

          Swal.fire({

            icon: 'error',
            title: 'Error',
            text: 'No fue posible actualizar el formulario.'

          });

        }

      });

  }
}