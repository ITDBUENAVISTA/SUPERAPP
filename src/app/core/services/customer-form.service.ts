import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../interfaces/api/response.interface';
import { CustomerForm } from '../interfaces/customers/customer-form.interface';

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
}
