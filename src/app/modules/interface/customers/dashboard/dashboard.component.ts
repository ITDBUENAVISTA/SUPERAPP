import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';
import { Pay } from 'src/app/core/interfaces/customers/payments.interface';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { CustomersService } from 'src/app/core/services/customers.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  visible: boolean = false;
  showModal: boolean = false;
  indexActive: number = 0;

  generatingAccountStatement: boolean = false;

  data: any;

  options: any;

  user: User;

  paySelected: Pay;
  paymentes: Pay[] = [];
  loadedPaymentes: boolean = false;
  loadedProjects: boolean = false;
  projects: Customer[] = [];
  visibleProjects: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 2;
  projecSelected: Customer;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly customersService: CustomersService,
    private readonly http: HttpClient
  ) {
    this.user = {} as User;
    this.paySelected = {
      _id: '',
      date: '',
      mount: 0,
      capital_balance: '',
      batch: '',
      concept: '',
      quota_value: 0,
      corresponding_month: '',
      person: {
        _id: '',
        name: '',
        phone: '',
        email: ''
      }
    };
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
  }

  ngOnInit() {
    this.user = this.localStorageService.getUsuario();
    this.loadPayments();
    this.loadProjects()
  }

  loadPayments() {
    this.customersService.paymentsByUser(this.user.person._id).subscribe({
      next: (resp) => {
        this.paymentes = resp.data;
      }
    })
  }

  loadProjects() {
    this.customersService.customersByPerson(this.user.person._id).subscribe({
      next: (resp) => {
        this.projects = resp.data
        this.updateVisibleProjects();
        if (this.projects.length > 0) {
          this.projecSelected = this.projects[0];
        }
      },
      complete: () => {
        this.loadedProjects = true;
        this.loadedPaymentes = true;
      }
    });
  }

  updateVisibleProjects() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleProjects = this.projects.slice(startIndex, endIndex);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.projects.length) {
      this.currentPage++;
      this.updateVisibleProjects();
    }
  }

  // Retrocede a la página anterior
  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateVisibleProjects();
    }
  }

  selectProject(project: Customer) {
    this.projecSelected = project;
  }

  downloadAccountStatement() {
    this.generatingAccountStatement = true;
    this.customersService.generateAccountStatement(this.projecSelected._id).subscribe({
      next: (response: Blob) => {
        // Crear una URL a partir del Blob
        const fileURL = URL.createObjectURL(response);
        // Crear un enlace <a> para forzar la descarga
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = `EstadoDeCuenta-${this.projecSelected.person.name}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(fileURL); // Liberar la memoria
        this.generatingAccountStatement = false;
      },
      error: (error) => {
        this.generatingAccountStatement = false;
        console.error('Error al descargar el PDF:', error);
      }
    });
  }

}
