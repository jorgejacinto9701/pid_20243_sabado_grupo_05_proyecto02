import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Reserva } from '../../model/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getReservasPorCancha(canchaId: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reserva/por-cancha/${canchaId}`);
  }

  getReservasPorFechas(startDate: string, endDate: string): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reserva/por-fechas?startDate=${startDate}&endDate=${endDate}`);
  }

  getAllReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`${this.apiUrl}/reserva`);
  }

  getReservaById(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/reserva/${id}`);
  }
}
