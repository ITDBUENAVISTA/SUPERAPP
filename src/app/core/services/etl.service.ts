import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtlService {

  private apiUrl = `${environment.apiUrl}/etl/run`;

  constructor(private http: HttpClient) {}

  runEtl(): Observable<any> {

    const headers = new HttpHeaders({
      'x-api-key': 'u8Jk3Lm9Pq2Xs7Rt4Wv6Yz1B'
    });

    return this.http.post(this.apiUrl, {}, { headers });
  }
}