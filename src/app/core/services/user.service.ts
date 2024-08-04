import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { first } from 'rxjs/operators';

import { environment } from '../../enviroments/enviroment';
import { LoginUser } from '../../model/LoginUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private http = inject(HttpClient);

  constructor() {

  }

  register(nombre: string, apepaterno: string,apematerno: string, dni: string,email: string): Observable<String> {
    return this.registerUser(dni,nombre,apepaterno,apematerno, email).pipe(
      map(msg => {
        console.log("auth service");
        console.log(msg);

        return msg;

      }))
    ;

  }

  private registerUser(nombre: string, apepaterno: string,apematerno: string, dni: string,email: string): Observable<String> {
    return this.http.post(`${environment.apiUrl}/auth/register`, { dni,nombre,apepaterno,apematerno, email }, { responseType: 'text' });
  }

}
