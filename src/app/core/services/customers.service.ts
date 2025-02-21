import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/api/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private readonly customersURL = `${environment.apiUrl}`+'/customers';

      constructor(
        private readonly http : HttpClient
      ) { }

      paymentsByUser(user_id: string): Observable<ResponseApi>{
        return this.http.get<ResponseApi>(`${this.customersURL}/payments/${user_id}`);
      }

      customersByPerson(person_id: string): Observable<ResponseApi>{
        return this.http.get<ResponseApi>(`${this.customersURL}/customers/${person_id}`);
      }

      // generateAccountStatement(customerId: string): Observable<ResponseApi>{
      //   return this.http.get<ResponseApi>(`${this.customersURL}/generate-account-statement-hc/${customerId}`,);
      // }

      generateAccountStatement(customerId: string): Observable<Blob> {
        const url = `${this.customersURL}/generate-account-statement-hc/${customerId}`;
        return this.http.get(url, { responseType: 'blob' });
      }


}
