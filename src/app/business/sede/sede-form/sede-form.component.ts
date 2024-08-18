import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { SedeService } from '../../../core/services/sede.service';
import { Sede, EstadoSede } from '../../../model/Sede';
import {UbigeoService} from "../../../core/services/ubigeo.service";

@Component({
  selector: 'app-sede-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './sede-form.component.html',
  styleUrl: './sede-form.component.css'
})
export class SedeFormComponent implements OnInit {
  sedeForm!: FormGroup;
  isEditMode = false;
  estados = Object.values(EstadoSede);
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private sedeService: SedeService,
    private ubigeoService: UbigeoService, // Injectar el UbigeoService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sedeForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^\\+?[0-9-]+$')]],
      email: ['', [Validators.required, Validators.email]],
      capacidad: ['', [Validators.required, Validators.min(1)]],
      horarioApertura: ['', Validators.required],
      horarioCierre: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.loadDepartamentos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.sedeService.getSedeById(+id).subscribe((sede) => {
        this.sedeForm.patchValue({
          ...sede,
          departamento: sede.ubigeo.departamento,
          provincia: sede.ubigeo.provincia,
          distrito: sede.ubigeo.id // Usar el ID del distrito como valor del campo distrito
        });
        this.onDepartamentoChange(sede.ubigeo.departamento); // Cargar provincias
        this.onProvinciaChange(sede.ubigeo.provincia); // Cargar distritos
      });
    }
  }


  loadDepartamentos(): void {
    this.ubigeoService.getDepartamentos().subscribe((data) => {
      this.departamentos = data;
    });
  }

  onDepartamentoChange(departamento: string | null): void {
    if (departamento) {
      this.ubigeoService.getProvincias(departamento).subscribe((data) => {
        this.provincias = data;
        this.distritos = []; // Limpiar los distritos al cambiar de provincia
        // Si estamos en modo de edición, establecer la provincia
        const provinciaSeleccionada = this.sedeForm.get('provincia')?.value;
        if (provinciaSeleccionada) {
          this.onProvinciaChange(provinciaSeleccionada);
        }
      });
    }
  }

  onProvinciaChange(provincia: string | null): void {
    const departamento = this.sedeForm.get('departamento')?.value;
    if (departamento && provincia) {
      this.ubigeoService.getDistritos(departamento, provincia).subscribe((data) => {
        this.distritos = data;
        // Si estamos en modo de edición, no sobrescribir el valor del distrito
        const distritoSeleccionado = this.sedeForm.get('distrito')?.value;
        if (distritoSeleccionado) {
          this.sedeForm.patchValue({ distrito: distritoSeleccionado });
        }
      });
    }
  }


  onSubmit(): void {
    if (this.sedeForm.valid) {
      const sedeData = this.sedeForm.value;

      // Asume que distrito tiene el ID del Ubigeo seleccionado
      sedeData.ubigeo = { id: sedeData.distrito };

      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        this.sedeService.updateSede(+id!, sedeData).subscribe(response => {
          console.log(response);
          this.router.navigate(['/sede-list']);
        });
      } else {
        this.sedeService.createSede(sedeData).subscribe(response => {
          console.log(response);
          this.router.navigate(['/sede-list']);
        });
      }
    }
  }


}
