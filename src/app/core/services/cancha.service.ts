import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanchaService {

  private URL_API: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Pendiente las APIS CANCHAS
  getData(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/canchas`);
  }

  enviarDatos(datos: any) {
    return this.http.post(`${this.URL_API}/canchas/guardar`, datos);
  }

  eliminarPorId(id: number) {
    const url = `${this.URL_API}/canchas/eliminar/${id}`;
    return this.http.delete(url);
  }

  actualizar(datos: any) {
    return this.http.put(`${this.URL_API}/canchas/actualizar`, datos);
  }

  //Pendiente crud verificar
  //verificarExistencia(cod: string) {
  //  return this.http.get<Response>(`${this.URL_API}/clientes/verificar-cliente/${cod}`);
  //}

}
