import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';
import {Cancha} from "../../model/Cancha";

@Injectable({
  providedIn: 'root'
})
export class CanchaService {
  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) {}

  getCanchas(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.apiUrl}/cancha`);
  }

  getCanchaById(id: number): Observable<Cancha> {
    return this.http.get<Cancha>(`${this.apiUrl}/cancha/${id}`);
  }

  createCancha(cancha: Cancha): Observable<Cancha> {
    return this.http.post<Cancha>(`${this.apiUrl}/cancha`, cancha);
  }

  updateCancha(id: number, cancha: Cancha): Observable<Cancha> {
    return this.http.put<Cancha>(`${this.apiUrl}/cancha/${id}`, cancha);
  }
}
