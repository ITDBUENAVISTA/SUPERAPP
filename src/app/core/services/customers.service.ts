import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ResponseApi } from '../interfaces/api/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly personsURL = `${environment.apiUrl}`+'/customers';

      constructor(
        private readonly http : HttpClient
      ) { }

      paymentsByUser(user_id: string): Observable<ResponseApi>{
        return this.http.get<ResponseApi>(`${this.personsURL}/payments/${user_id}`);
      }

      customersByPerson(person_id: string): Observable<ResponseApi>{
        return this.http.get<ResponseApi>(`${this.personsURL}/customers/${person_id}`);
      }
}
