import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ResponseApi } from '../interfaces/api/response.interface';

@Injectable({
  providedIn: 'root'
})
export class VounchersService {
  private readonly vounchersURL = `${environment.apiUrl}` + '/vounchers';

  constructor(
    private readonly http: HttpClient
  ) { }

  vounchersByCustomer(customer: string): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.vounchersURL}/${customer}`);
  }

  createVouncher(vouncher: FormData): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.vounchersURL}`,vouncher);
  }

  changeStatusVoucher(id: string, status: string): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.vounchersURL}/${id}/${status}`,{});
  }

  allVounchers(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.vounchersURL}`);
  }

}
