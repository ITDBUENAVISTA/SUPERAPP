import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/core/interfaces/customers/customers.interface';
import { Reservation, ReservationDay } from 'src/app/core/interfaces/reservations/reservations.interfaces';
import { User } from 'src/app/core/interfaces/users/user.intrefaces';
import { CustomersService } from 'src/app/core/services/customers.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ReservationsService } from 'src/app/core/services/reservations.service';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  @ViewChild('openModalButton') openModalButton!: ElementRef<HTMLButtonElement>;


  user: User;

  loadingReservations: boolean = false;
  reservations: ReservationDay[];
  newReservation: Reservation;
  projects: Customer[];

  calendarOptions: CalendarOptions;

  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly customersService: CustomersService,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.reservations = [];
    this.projects = [];
    this.newReservation = {} as Reservation;
    this.user = {} as User;
    this.calendarOptions = {} as CalendarOptions;
  }

  ngOnInit(): void {
    this.user = this.localStorageService.getUsuario();
    this.loadReservations();
    this.loadProjects();
    this.initCalendar();
  }


  initCalendar() {
    const today = new Date(); // Fecha actual
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Sumar 1 día

    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: ''
      },
      editable: true,
      selectable: true,
      validRange: {
        start: tomorrow.toISOString().split('T')[0], // Fecha mínima: mañana
        end: nextYear.toISOString().split('T')[0]
      },
      events: [],
      dateClick: this.onDateClick.bind(this),
      eventClassNames: (arg) => {
        const event = arg.event.extendedProps;
        if (event["title"] === "9 A.M - 2 P.M") return ['morning']; // Clase "morning" para la mañana
        if (event["title"] === "2 P.M - 6 P.M") return ['afternoon']; // Clase "afternoon" para la tarde
        return []; // Si no coincide, no agrega clases
      }
    };
  }

  onDateClick(info: any) {
    this.openModalButton.nativeElement.click();
    console.log('Día seleccionado:', info.dateStr);
    this.newReservation = {
      date: info.dateStr,
      schedule: '',
      pool: false,
      grill: false,
    }
  }

  loadEvents() {
    // Transformamos las reservas al formato de FullCalendar
    const events = this.reservations.flatMap(eventDay =>
      eventDay.reservations.map(reservation => ({
        title: reservation.schedule, // Solo mostramos el horario
        date: eventDay.date, // Fecha del evento
        color: reservation.schedule === "9 A.M - 2 P.M" ? "#006666" : "#5A6A85" // Azul para la mañana, rojo para la tarde
      }))
    );
    // Actualizamos los eventos en el calendario
    this.calendarOptions = { ...this.calendarOptions, events };
  }

  loadReservations() {
    this.loadingReservations = true;
    this.reservationsService.reservationsNextDays().subscribe({
      next: (resp) => {
        this.reservations = resp.data;
      },
      complete: () => {
        this.loadEvents();
        this.loadingReservations = false;
      }
    })
  }

  loadProjects() {
    this.customersService.customersByPerson(this.user.person._id).subscribe({
      next: (resp) => {
        this.projects = resp.data;
      }
    });
  }

  formatDate(dateString: string): string {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    const diasSemana = [
      "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    ];

    // Descomponer la fecha manualmente
    const [year, month, day] = dateString.split("-").map(num => parseInt(num, 10));

    // Crear la fecha en la zona horaria local
    const fecha = new Date(year, month - 1, day);

    const diaSemana = diasSemana[fecha.getDay()];
    const mes = meses[fecha.getMonth()];

    return `${diaSemana}, ${day} de ${mes}`;
  }

  formSubmit() {
    this.loadReservations();
  }




}
