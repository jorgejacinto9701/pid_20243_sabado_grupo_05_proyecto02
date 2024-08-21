import { Component, OnInit } from '@angular/core';
import { Sede } from "../../../model/Sede";
import { Cancha } from "../../../model/Cancha";
import { Reserva } from "../../../model/Reserva";
import { ReservaService } from "../../../core/services/reserva.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-reserva',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-reserva.component.html',
  styleUrls: ['./registro-reserva.component.css']
})
export class RegistroReservaComponent implements OnInit {
  sedes: Sede[] = [];
  canchas: Cancha[] = [];
  selectedSede: number | null = null;
  selectedCancha: number | null = null;
  reserva: Reserva = {
    id: 0,
    sede: null as unknown as Sede,
    cancha: null as unknown as Cancha,
    fecha: '',
    horaInicio: '',
    horaFin: '',
    medioPago: ''
  };

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.loadSedes();
  }

  loadSedes() {
    this.reservaService.getSedes().subscribe(data => {
      this.sedes = data;
    });
  }

  onSedeChange(event: any) {
    this.selectedSede = Number(event.target.value); // Convierte a número
    this.loadCanchas();
  }

  loadCanchas() {
    if (this.selectedSede !== null) {
      this.reservaService.getCanchas(this.selectedSede).subscribe(data => {
        this.canchas = data;
      });
    } else {
      console.error('No se ha seleccionado una sede válida.');
    }
  }

  addMoreHours() {
    // Implementar lógica para agregar más horas
  }

  findSedeById(id: number): Sede | undefined {
    return this.sedes.find(sede => sede.id == id);
  }

  findCanchaById(id: number): Cancha | undefined {
    return this.canchas.find(cancha => cancha.id == id);
  }

  onSubmit() {
    if (this.selectedSede !== null && this.selectedCancha !== null) {
      const sede = this.findSedeById(this.selectedSede);
      const cancha = this.findCanchaById(this.selectedCancha);

      if (sede && cancha) {
        this.reserva.sede = sede;
        this.reserva.cancha = cancha;
        this.reservaService.saveReserva(this.reserva).subscribe(response => {
          console.log('Reserva registrada', response + "..." + JSON.stringify(this.reserva));
        });
      } else {
        console.error('Sede o cancha no encontrados.');
      }
    } else {
      console.error('Por favor, seleccione una sede y una cancha.');
    }
  }
}
