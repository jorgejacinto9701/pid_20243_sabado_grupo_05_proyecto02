import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {DecimalPipe, NgFor, NgIf} from "@angular/common";
import { Reserva } from '../../../model/Reserva';
import {ReservaService} from "../../../core/services/reserva.service";

@Component({
  selector: 'app-reserva-filter-fecha',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, DecimalPipe],
  templateUrl: './reserva-filter-fecha.component.html',
  styleUrl: './reserva-filter-fecha.component.css'
})
export class ReservaFilterFechaComponent implements OnInit {
  filterForm: FormGroup;
  reservas: Reserva[] = [];
  paginatedReservas: Reserva[] = [];
  totalPrecio: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 1;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {}

  filterByFecha(): void {
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;
    if (startDate && endDate) {
      this.reservaService.getReservasPorFechas(startDate, endDate).subscribe(reservas => {
        this.reservas = reservas;
        this.totalPages = Math.ceil(this.reservas.length / this.itemsPerPage);
        this.updatePagination();
        this.calculateTotalPrecio();
      });
    }
  }

  calculateTotalPrecio(): void {
    this.totalPrecio = this.paginatedReservas.reduce((acc, reserva) => acc + (reserva.cancha?.precio || 0), 0);
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedReservas = this.reservas.slice(startIndex, endIndex);
  }

  nextPage(event: any): void {
    event.preventDefault();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(event: any): void {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
