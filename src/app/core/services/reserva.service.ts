import { Injectable } from '@angular/core';
import {  HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Reserva } from '../../model/Reserva';
import { Cancha } from '../../model/Cancha';
import { Sede } from '../../model/Sede';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }


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
  //REGISTRO DE RESERVA
  // **METODOS**
  getSedes(): Observable<any[]> {
    return this.http.get<Sede[]>(`${this.apiUrl}/sedes`);
  }

  getCanchas(sedeId: number): Observable<any[]> {
    return this.http.get<Cancha[]>(`${this.apiUrl}/cancha/sede/${sedeId}`);
  }

  saveReserva(reserva: Reserva): Observable<Reserva> {
      // Configuración de headers
      /*const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });*/

      console.log("Ingreso al método guardar reserva:", reserva);

      return this.http.post<Reserva>(`${this.apiUrl}/reserva/registrar`, reserva);
  }
  // ** FIN -METODOS**
}
