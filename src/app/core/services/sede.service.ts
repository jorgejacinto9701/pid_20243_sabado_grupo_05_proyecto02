import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Sede, EstadoSede } from '../../model/Sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  private apiUrl = environment.apiUrl; // Cambia esta URL según tu backend

  constructor(private http: HttpClient) {}

  getSedes(): Observable<Sede[]> {
    console.log("get sedes")
    return this.http.get<Sede[]>(`${this.apiUrl}/sedes`);
  }

  getSedeById(id: number): Observable<Sede> {
    return this.http.get<Sede>(`${this.apiUrl}/sedes/${id}`);
  }

  createSede(sede: Sede): Observable<Sede> {
    return this.http.post<Sede>(`${this.apiUrl}/sedes`, sede);
  }

  updateSede(id: number, sede: Sede): Observable<Sede> {
    return this.http.put<Sede>(`${this.apiUrl}/sedes/${id}`, sede);
  }

  deleteSede(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sedes/${id}`);
  }


}
