import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { environment } from '../../enviroments/enviroment';
import { LoginUser } from '../../model/LoginUser';
import { first } from 'rxjs/operators';

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

  public get currentUserValueSubject(): BehaviorSubject<LoginUser | null> {
    return this.currentUserSubject;
  }

  public get currentUserUsername(): String {
    return this.username;
  }

  public get currentUserPassword(): String {
    return this.password;
  }

  login(username: string, password: string): Observable<String> {
    this.username = username;
    this.password = password;
    return this.findByEmailAndPassword(username,password).pipe(
      map(msg => {
        console.log("auth service");
        console.log(msg);

        const user: LoginUser = {
          email: username,
          password: password
        };

        this.saveUserToLocalStorage(user);
        this.currentUserSubject.next(user);
        return msg;

      }))
    ;
  }



    private findByEmailAndPassword(email: string, password: string): Observable<String> {
      return this.http.post(`${environment.apiUrl}/auth/login`, { email, password }, { responseType: 'text' });
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
}
