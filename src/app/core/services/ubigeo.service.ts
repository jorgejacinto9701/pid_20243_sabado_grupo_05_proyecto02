import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/ubigeo/listaDepartamentos`);
  }

  getProvincias(departamento: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/ubigeo/listaProvincias/${departamento}`);
  }

  getDistritos(departamento: string, provincia: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ubigeo/listaDistritos/${departamento}/${provincia}`);
  }
}
