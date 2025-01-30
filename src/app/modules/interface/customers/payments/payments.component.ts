import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { Vouncher, VouncherByCustomer } from 'src/app/core/interfaces/vounchers/vounchers.interfaces';
import { CustomersService } from 'src/app/core/services/customers.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { VounchersService } from 'src/app/core/services/vounchers.service';
import { UiServiceService } from 'src/app/shared/services/ui-service.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent {

  signal = new Subject<void>();

  loadedProjects: boolean = false;
  loadedVounchers: boolean = false;
  registeringPayment: boolean = false;

  user: User;
  projecSelected: Customer;
  projects: Customer[] = [];
  vounchersByCustomer: VouncherByCustomer = {};

  newVouncher: Vouncher;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly customersService: CustomersService,
    private readonly vounchersService: VounchersService,
    private readonly uiService: UiServiceService,

  ) {
    this.user = {} as User;
    this.projecSelected = {
      _id: '',
      batch: '',
      quota_value: 0,
      quotas: 0,
      finance_amount: 0,
      type: '',
      person: {
        _id: '',
        name: '',
        phone: '',
        email: ''
      },
      payments: []
    }
    this.newVouncher = {} as Vouncher;
  }

  ngOnInit() {
    this.user = this.localStorageService.getUsuario();
    this.loadProjects()
  }

  loadProjects() {
    this.customersService.customersByPerson(this.user.person._id).subscribe({
      next: (resp) => {
        this.projects = resp.data
        if (this.projects.length > 0) {
          this.projecSelected = this.projects[0];
          this.loadVouchers();
        }
      },
      complete: () => {
        this.loadedProjects = true;
      }
    });
  }

  loadVouchers() {
    for (const project of this.projects) {
      this.vounchersService.vounchersByCustomer(project._id).subscribe({
        next: (resp) => {
          this.vounchersByCustomer[project._id] = resp.data;
        },
        complete: () => {
          this.loadedVounchers = true;
        },
      });
    }
  }

  formSubmit(formData: FormData) {
    this.registeringPayment = true;
    this.vounchersService.createVouncher(formData).subscribe({
      next: () => {
        this.loadVouchers();
        this.signal.next();
        this.uiService.alertaSuccess('Pago registrado correctamente');
      },
      complete: () =>{
        this.registeringPayment = false;
      },
      error: () => {
        this.registeringPayment = false;
      }
    })
  }

}
