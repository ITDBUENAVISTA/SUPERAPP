import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/api/response.interface';
import { Reservation } from '../interfaces/reservations/reservations.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private readonly reservationsURL = `${environment.apiUrl}` + '/reservations';

  constructor(
    private readonly http: HttpClient
  ) { }

  getReservas(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.reservationsURL}/previus-reservations`);
  }

  createReservation(reservation: Reservation): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.reservationsURL}`, reservation);
  }

  reservationsNextDays(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.reservationsURL}/next-days`);
  }

}
