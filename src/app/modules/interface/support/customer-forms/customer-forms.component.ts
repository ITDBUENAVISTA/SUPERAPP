import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { Table } from 'primeng/table';

import { CustomerFormList } from 'src/app/core/interfaces/customers/customer-form-list.interface';

import { CustomerFormService } from 'src/app/core/services/customer-form.service';

@Component({
    selector: 'app-customer-forms',
    templateUrl: './customer-forms.component.html',
    styleUrls: ['./customer-forms.component.scss']
})
export class CustomerFormsComponent implements OnInit {

    @ViewChild('tabla')
    tabla!: Table;

    customerForms: CustomerFormList[] = [];

    loading = false;

    statusOptions = [

        {
            label: 'Pendiente',
            value: 'PENDING',
            icon: 'schedule',
            class: 'text-warning'
        },

        {
            label: 'Revisado',
            value: 'REVIEWED',
            icon: 'task_alt',
            class: 'text-success'
        },

        {
            label: 'Devuelto',
            value: 'RETURNED',
            icon: 'cancel',
            class: 'text-danger'
        }

    ];

    viewOptions = [

        {
            label: 'Vistos',
            value: 'YES'
        },

        {
            label: 'No vistos',
            value: 'NO'
        }

    ];

    constructor(

        private readonly customerFormService: CustomerFormService

    ) { }

    ngOnInit(): void {

        this.loadForms();

    }

    /**
     * ============================
     * CARGAR FORMULARIOS
     * ============================
     */

    loadForms(): void {

        this.loading = true;

        this.customerFormService
            .getAllCustomerForm()
            .subscribe({

                next: (resp) => {

                    this.customerForms = resp.data as CustomerFormList[];

                },

                error: (err) => {

                    console.error(err);

                },

                complete: () => {

                    this.loading = false;

                }

            });

    }

    /**
     * ============================
     * FILTRO ESTADO
     * ============================
     */

    onStatusFilterChange(value: string | null): void {

        if (value) {

            this.tabla.filter(
                value,
                'status',
                'equals'
            );

        }
        else {

            this.tabla.filter(
                null,
                'status',
                'equals'
            );

        }

    }

    /**
     * ============================
     * FILTRO VISTOS
     * ============================
     */

    onViewedFilterChange(value: string | null): void {

        if (!value) {

            this.tabla.filter(
                null,
                'viewed_at',
                'custom'
            );

            return;

        }

        this.tabla.filter(
            value,
            'viewed_at',
            'custom'
        );

    }

    /**
     * ============================
     * FILTRO PERSONALIZADO
     * PARA viewed_at
     * ============================
     */

    ngAfterViewInit(): void {

        this.tabla.filterService.register(

            'custom',

            (value: any, filter: any): boolean => {

                if (filter == null) {

                    return true;

                }

                if (filter === 'YES') {

                    return value != null;

                }

                if (filter === 'NO') {

                    return value == null;

                }

                return true;

            }

        );

    }

}