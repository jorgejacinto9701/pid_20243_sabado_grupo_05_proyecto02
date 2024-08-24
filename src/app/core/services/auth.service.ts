import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { first } from 'rxjs/operators';

import { environment } from '../../enviroments/enviroment';
import { LoginUser } from '../../model/LoginUser';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginUser | null>;
  public currentUser: Observable<LoginUser | null>;

  public username: String;
  public password: String;

  private http = inject(HttpClient);

  constructor() {

    this.currentUserSubject = new BehaviorSubject<LoginUser | null>(this.getUserFromLocalStorage());
    this.currentUser = this.currentUserSubject.asObservable();
    this.username = "";
    this.password = "";

    console.log("auth.service");
    console.log(environment.apiUrl);
  }

  private getUserFromLocalStorage(): LoginUser | null {
    if (typeof window !== 'undefined' && localStorage.getItem('currentUser')) {
      try {
        return JSON.parse(localStorage.getItem('currentUser')!);
      } catch (e) {
        console.error('Error parsing saved user from localStorage', e);
        return null;
      }
    }
    return null;
  }

   public get currentUserValue(): LoginUser | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<String> {
    const body = { email: username, password: password };
    return this.http.post<string>(`${environment.apiUrl}/auth/login`, body, { responseType: 'text' as 'json' }).pipe(
      map(msg => {
        const user: LoginUser = { email: username, password: password };
        this.saveUserToLocalStorage(user);
        this.currentUserSubject.next(user);
        return msg;
      })
    );
  }
  logout(): void {
    this.removeUserFromLocalStorage();
    this.currentUserSubject.next(null);
  }

  private saveUserToLocalStorage(user: LoginUser): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  private removeUserFromLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }

  private findByEmailAndPassword(email: string, password: string): Observable<string> {
    // Crea un objeto con los datos para el cuerpo de la solicitud
    const body = { email, password };

    // Realiza la solicitud POST con el cuerpo de la solicitud
    return this.http.post<string>(`${environment.apiUrl}/auth/login`, body, { responseType: 'text' as 'json' });
  }

}
