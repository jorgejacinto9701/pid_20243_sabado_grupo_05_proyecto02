import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { SedeService } from '../../../core/services/sede.service';
import { Sede, EstadoSede } from '../../../model/Sede';

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

  constructor(
    private fb: FormBuilder,
    private sedeService: SedeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sedeForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      distrito: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^\\+?[0-9-]+$')]],
      email: ['', [Validators.required, Validators.email]],
      capacidad: ['', [Validators.required, Validators.min(1)]],
      horarioApertura: ['', Validators.required],
      horarioCierre: ['', Validators.required],
      estado: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.sedeService.getSedeById(+id).subscribe((sede) => {
        this.sedeForm.patchValue(sede);
      });
    }
  }

  onSubmit(): void {
    if (this.sedeForm.valid) {
      if (this.isEditMode) {
        const id = this.route.snapshot.paramMap.get('id');
        this.sedeService.updateSede(+id!, this.sedeForm.value).subscribe(() => {
          this.router.navigate(['/sedes']);
        });
      } else {
        this.sedeService.createSede(this.sedeForm.value).subscribe(() => {
          this.router.navigate(['/sedes']);
        });
      }
    }
  }
}
