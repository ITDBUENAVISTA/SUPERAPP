import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/api/response.interface';
import { CustomerForm } from '../interfaces/customers/customer-form.interface';
import { CustomerFormList } from '../interfaces/customers/customer-form-list.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerFormService {

  private readonly customersFormURL = `${environment.apiUrl}`+'/customer-forms';

  constructor(
    private readonly http : HttpClient
  ) { }


  createCustomerForm(body: FormData): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.customersFormURL}`,body);
  }

  getCustomerForm(customerId: string, lot: string): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(
      `${this.customersFormURL}/${customerId}/${lot}`
    );
  }

  getAllCustomerForm(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(
      `${this.customersFormURL}/`
    );
  }

  markCustomerFormAsViewed(customerId: string, lot: string): Observable<ResponseApi> {

    return this.http.put<ResponseApi>(
      `${this.customersFormURL}/${customerId}/${lot}/viewed`,
      {}
    );

  }

  updateCustomerFormStatus(customerId: string,lot: string,status: 'REVIEWED' | 'RETURNED'): Observable<ResponseApi> {

    return this.http.put<ResponseApi>(
      `${this.customersFormURL}/${customerId}/${lot}`,
      {
        status
      }
    );

  }
}
