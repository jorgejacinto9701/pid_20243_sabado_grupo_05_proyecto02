import {Component, OnInit} from '@angular/core';
import {Cancha} from "../../../model/Cancha";
import {CanchaService} from "../../../core/services/cancha.service";
import {Router} from "@angular/router";
import {CommonModule, CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-cancha-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  providers: [CurrencyPipe],
  templateUrl: './cancha-list.component.html',
  styleUrl: './cancha-list.component.css'
})
export class CanchaListComponent implements OnInit {
  canchas: Cancha[] = []; // Array para almacenar las canchas

  constructor(
    private canchaService: CanchaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.canchaService.getCanchas().subscribe({
      next: (data) => {
        this.canchas = data;  // Asegurarse de que los datos se asignan correctamente
      },
      error: (err) => {
        console.error('Error al cargar las canchas:', err);  // Manejo de error para diagnóstico
      }
    });
  }

  createCancha(): void {
    this.router.navigate(['/cancha-form/create']);  // Navegar al formulario de creación de cancha
  }

  editCancha(id: number): void {
    this.router.navigate(['/cancha-form/edit', id]);  // Navegar al formulario de edición de cancha
  }

}
