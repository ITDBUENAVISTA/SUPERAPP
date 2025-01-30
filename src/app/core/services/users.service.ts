import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { ResponseApi } from '../interfaces/api/response.interface';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users/user.intrefaces';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly usersURL = `${environment.apiUrl}`+'/users';

  constructor(
    private readonly http : HttpClient
  ) { }

  listUsers(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.usersURL}`);
  }

  createUser(user: User): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.usersURL}`, user);
  }
}
