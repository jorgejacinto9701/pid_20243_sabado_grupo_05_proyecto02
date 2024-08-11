import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { SedeService } from '../../../core/services/sede.service';
import { Sede, EstadoSede } from '../../../model/Sede';

@Component({
  selector: 'app-sede-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './sede-list.component.html',
  styleUrl: './sede-list.component.css'
})
export class SedeListComponent implements OnInit {
  sedes: Sede[] = [];

  constructor(private sedeService: SedeService) {}

  ngOnInit(): void {
    console.log("init sedes")
    this.sedeService.getSedes().subscribe((data) => {
      this.sedes = data;
      console.log(data)
    });
  }

  editSede(id: number): void {
    // Implementar navegación a la página de edición
  }

  deleteSede(id: number): void {
    this.sedeService.deleteSede(id).subscribe(() => {
      this.sedes = this.sedes.filter(s => s.id !== id);
    });
  }
}
