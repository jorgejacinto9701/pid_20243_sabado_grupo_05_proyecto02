import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { Reserva } from '../../model/Reserva';
import { Cancha } from '../../model/Cancha';
import { Sede } from '../../model/Sede';
import { LoginUser } from '../../model/LoginUser';
import { AuthService } from './auth.service';
import { User } from '../../model/user';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {


  private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient , private authService: AuthService) {

  }
  getReservasPorEmail(email: string): Observable<Reserva[]> {
    const body = { email };
    return this.http.post<Reserva[]>(`${this.apiUrl}/reserva/usuario/email`, body);
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
  getSede(id:number): Observable<Sede> {
    return this.http.get<Sede>(`${this.apiUrl}/sedes/${id}`);
  }

  getCancha(id: number): Observable<Cancha> {
    return this.http.get<Cancha>(`${this.apiUrl}/cancha/${id}`);
  }
  getUsuario(email: string): Observable<User> {
    // Crea un objeto con el email para enviar en el cuerpo de la solicitud
    const body = { email };

    // Realiza la solicitud POST con el cuerpo de la solicitud y espera un Usuario
    return this.http.post<User>(`${this.apiUrl}/auth/by-email`, body);
  }

  getCanchas(sedeId: number): Observable<any[]> {
    return this.http.get<Cancha[]>(`${this.apiUrl}/cancha/sede/${sedeId}`);
  }

  saveReserva(reserva: Reserva): Observable<Reserva> {
  // Obtén el usuario logueado desde AuthService
  const user = this.authService.currentUserValue;
  if (!user) {
    throw new Error('Usuario no autenticado');
  }

  // Llama al método getUsuario y usa switchMap para aplanar los observables
  return this.getUsuario(user.email).pipe(
    switchMap((usuario: User) => {
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      // Envía la reserva al backend
      return this.http.post<Reserva>(`${environment.apiUrl}/reserva/registrar`, reserva);
    })
  );
  }


   // Obtiene horarios disponibles para una sede y una fecha específicas
   getHorariosDisponibles(sedeId: number,canchaId: number, fecha: string): Observable<any[]> {
    console.log("INGRESO A METODO GET HORARIOS DIPOSNIBLES");
    return this.http.post<any[]>(`${this.apiUrl}/reserva/horarios-disponibles`, { sedeId,canchaId, fecha });
  }

  getCanchasActivas(): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.apiUrl}/canchas/activas`);
  }

  getSedesActivas(): Observable<Sede[]> {
    return this.http.get<Sede[]>(`${this.apiUrl}/sedes/activas`);
  }

  getCanchasActivasDeSede(sedeId: number): Observable<Cancha[]> {
    return this.http.get<Cancha[]>(`${this.apiUrl}/cancha/activas/sede/${sedeId}`);
  }
  // ** FIN -METODOS**
}


