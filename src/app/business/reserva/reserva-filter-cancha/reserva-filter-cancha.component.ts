import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Sede} from "../../../model/Sede";
import {Cancha} from "../../../model/Cancha";
import { Reserva } from '../../../model/Reserva';
import {ReservaService} from "../../../core/services/reserva.service";
import {SedeService} from "../../../core/services/sede.service";
import {CanchaService} from "../../../core/services/cancha.service";
import {DecimalPipe, NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-reserva-filter-cancha',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, DecimalPipe],
  templateUrl: './reserva-filter-cancha.component.html',
  styleUrl: './reserva-filter-cancha.component.css'
})
export class ReservaFilterCanchaComponent implements OnInit {
  filterForm: FormGroup;
  sedes: Sede[] = [];
  canchas: Cancha[] = [];
  reservas: Reserva[] = []; // Inicializar como una lista vacía
  paginatedReservas: Reserva[] = [];
  totalPrecio: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 15;
  totalPages: number = 1;

  constructor(
    private fb: FormBuilder,
    private canchaService: CanchaService,
    private sedeService: SedeService,
    private reservaService: ReservaService
  ) {
    this.filterForm = this.fb.group({
      sedeId: [''],
      canchaId: ['']
    });
  }

  ngOnInit(): void {
    this.loadSedes();
  }

  loadSedes(): void {
    this.sedeService.getSedes().subscribe(sedes => this.sedes = sedes);
  }

  onSedeChange(event: any): void {
    const sedeId = event.target.value;
    this.canchaService.getCanchasBySede(sedeId).subscribe(canchas => this.canchas = canchas);
  }

  onCanchaChange(event: any): void {
    const canchaId = event.target.value;
    this.reservaService.getReservasPorCancha(canchaId).subscribe(reservas => {
      this.reservas = reservas || []; // Asegurarse de que reservas sea una lista vacía si es null
      this.totalPages = Math.ceil(this.reservas.length / this.itemsPerPage);
      this.updatePagination();
      this.calculateTotalPrecio();
    });
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
