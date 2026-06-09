import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/api/response.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonsService {
  private readonly personsURL = `${environment.apiUrl}`+'/persons';

    constructor(
      private readonly http : HttpClient
    ) { }

    peopleWithoutAccount(): Observable<ResponseApi>{
      return this.http.get<ResponseApi>(`${this.personsURL}/without-account`);
    }

    getMyEmail(): Observable<ResponseApi> {
      return this.http.get<ResponseApi>(
        `${this.personsURL}/my-email`
      );
    }

    updateMyEmail(email: string): Observable<ResponseApi> {
      return this.http.patch<ResponseApi>(
        `${this.personsURL}/my-email`,
        { email }
      );
    }
}
