import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/core/services/reservations.service';
import { ReservationDay } from 'src/app/core/interfaces/reservations/reservations.interfaces';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDetailModalComponent } from './reservation-detail-modal/reservation-detail-modal.component';
import interactionPlugin from '@fullcalendar/interaction';
import { ElementRef, ViewChild } from '@angular/core';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';
import { Reservation } from 'src/app/core/interfaces/reservations/reservations.interfaces';
import { CustomersService } from 'src/app/core/services/customers.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  @ViewChild('openModalButton') openModalButton!: ElementRef<HTMLButtonElement>;

  customers: Customer[] = [];
  newReservation: Reservation = {} as Reservation;

  reservations: ReservationDay[] = [];
  loadingReservations: boolean = false;
  previousReservations: any[] = [];

  calendarOptions: CalendarOptions;


  constructor(
    private reservationsService: ReservationsService,
    private dialog: MatDialog,
    private customersService: CustomersService
  ) {
    this.reservations = [];
    this.calendarOptions = {} as CalendarOptions;
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadReservations();
    this.initCalendar();
    this.loadCustomers();
  }

  loadCustomers(): void {

    this.customersService.allCustomers().subscribe({

      next: (resp) => {

        console.log('CLIENTES SOPORTE');
        console.log(resp.data);

        this.customers = resp.data.filter(
          (customer: any) =>
            ['La Montaña', 'Paseo del Bosque'].includes(customer.project)
        );

      },

      error: (err) => {
        console.error(err);
      }

    });
  }

  onDateClick(info: any) {
    this.openModalButton.nativeElement.click();

    this.newReservation = {
      date: info.dateStr,
      schedule: '',
      pool: false,
      grill: false,
    } as Reservation;
  }

  formSubmit() {
    this.loadEvents();
    this.loadReservations();
  }


  initCalendar() {
    const today = new Date(); // Fecha actual
    const tomorrow = new Date(today);

    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    this.calendarOptions = {
      plugins: [dayGridPlugin,interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'prev,next'
      },
        buttonText: {
        prev: '<',
        next: '>',
        today: 'Hoy'
      },
      editable: false,
      selectable: true,
      dateClick: this.onDateClick.bind(this),
      events: [],
      validRange: {
        start: tomorrow.toISOString().split('T')[0], // Fecha mínima: mañana
        end: nextYear.toISOString().split('T')[0]
      },
    };
  }



  loadEvents() {
    this.reservationsService.reservationsNextDays().subscribe({
      next: (resp) => {
        console.log(resp.data);
        this.reservations = resp.data;
        const events = this.reservations.flatMap(eventDay =>
          eventDay.reservations.map(reservation => ({
            title: reservation.schedule, // Solo mostramos el horario
            date: eventDay.date, // Fecha del evento
            color: reservation.schedule === "9 A.M - 2 P.M" ? "#006666" : "#5A6A85", // Azul para la mañana, rojo para la tarde
            extendedProps: reservation // Pasamos TODOS los datos al evento
          }))
        );
        console.log(resp.data);

        // Actualizamos los eventos en el calendario
        this.calendarOptions = { ...this.calendarOptions, events, eventClick: (info) => {
            // info.event.extendedProps tiene el objeto que pusimos arriba
            const data = info.event.extendedProps;
            this.openReservationModal(data);
          } };
      }
    });
  }

  openReservationModal(reservation: any) {
    this.dialog.open(ReservationDetailModalComponent, {
      width: '500px',
      data: reservation,
      panelClass: 'custom-modal', // clase personalizada
      disableClose: true // evita cerrar haciendo clic fuera
    });
  }
  
  loadReservations(): void {
  this.reservationsService.getReservas().subscribe({
    next: (response) => {
      if (response.status === 'Ok' && Array.isArray(response.data)) {
        this.reservations = response.data;
        console.log(this.reservations)

        const today = new Date();

        this.previousReservations = this.reservations
          .filter(r => new Date(r.date) < today)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        console.log(this.previousReservations)
      }
    },
    error: (err) => console.error('Error cargando reservas', err)
  });
}


}
