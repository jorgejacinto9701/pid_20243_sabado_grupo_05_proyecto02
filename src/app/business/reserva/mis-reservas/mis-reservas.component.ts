import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../core/services/reserva.service';
import { Router } from '@angular/router';
import { Reserva } from '../../../model/Reserva';
import { NgFor } from '@angular/common';
import { LoginUser } from '../../../model/LoginUser';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../model/user';
import { Console } from 'console';

@Component({
  selector: 'app-mis-reservas',
  standalone: true,
  imports: [NgFor],
  templateUrl: './mis-reservas.component.html',
  styleUrl: './mis-reservas.component.css'
})
export class MisReservasComponent implements OnInit{

  misreservas: Reserva[] = [];
  logueoUser: User | undefined;
  email!: string;

  constructor(private reservaService: ReservaService, private router: Router, private authService :AuthService ) {}

  createReserva(): void {
    this.router.navigate(['/registro-reserva']); // Navega a la página de edición con el ID de la sede
  }

  ngOnInit(): void {
    const currentUser = this.authService.currentUserValue?.email;
    if (currentUser) {
      this.reservaService.getReservasPorEmail(currentUser).subscribe((data) => {
      this.misreservas = data;
    });
  }

}

generarPDF(arg0: any) {
    console.log('ID', arg0 )
  throw new Error('Method not implemented.');
  }
  previsualizar(arg0: any) {
  throw new Error('Method not implemented.');
  }





}
