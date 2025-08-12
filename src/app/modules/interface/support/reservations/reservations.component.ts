import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/core/services/reservations.service';
import { ReservationDay } from 'src/app/core/interfaces/reservations/reservations.interfaces';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDetailModalComponent } from './reservation-detail-modal/reservation-detail-modal.component';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  reservations: ReservationDay[] = [];
  loadingReservations: boolean = false;
  previousReservations: any[] = [];

  calendarOptions: CalendarOptions;

  constructor(
    private reservationsService: ReservationsService,
    private dialog: MatDialog
  ) {
    this.reservations = [];
    this.calendarOptions = {} as CalendarOptions;
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadReservations();
    this.initCalendar();
  }


  initCalendar() {
    const today = new Date(); // Fecha actual
    const tomorrow = new Date(today);

    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);
    this.calendarOptions = {
      plugins: [dayGridPlugin],
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
      selectable: false,
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
