import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {EstadoSede, Sede} from "../../../model/Sede";
import {Cancha, DeporteEnum} from "../../../model/Cancha";
import {CanchaService} from "../../../core/services/cancha.service";
import {SedeService} from "../../../core/services/sede.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule, NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-cancha-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, NgIf, NgFor],
  templateUrl: './cancha-form.component.html',
  styleUrl: './cancha-form.component.css'
})
export class CanchaFormComponent implements OnInit {
  canchaForm: FormGroup;
  isEditMode: boolean = false;
  sedes: Sede[] = [];
  deportes = Object.values(DeporteEnum);
  estados = Object.values(EstadoSede);

  constructor(
    private fb: FormBuilder,
    private canchaService: CanchaService,
    private sedeService: SedeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.canchaForm = this.fb.group({
      tipoCancha: ['', Validators.required],
      sedeId: ['', Validators.required],
      deporte: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0.1)]],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSedes();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadCanchaDetails(id);
    }
  }

  loadSedes(): void {
    this.sedeService.getSedes().subscribe({
      next: (data) => {
        this.sedes = data;
        if (this.isEditMode) {
          // Necesitamos volver a parchear el valor de sede después de que las sedes hayan sido cargadas
          const currentSedeId = this.canchaForm.get('sedeId')?.value;
          if (currentSedeId) {
            this.canchaForm.patchValue({ sedeId: currentSedeId });
          }
        }
      },
      error: (error) => console.error('Error loading sedes:', error)
    });
  }

  loadCanchaDetails(id: string): void {
    this.canchaService.getCanchaById(+id).subscribe({
      next: (cancha) => {
        this.canchaForm.patchValue({
          ...cancha,
          sedeId: cancha.sede?.id,  // Asegúrate de mapear correctamente la sede
          deporte: cancha.deporte,
          estado: cancha.estado
        });
      },
      error: (error) => console.error('Error loading cancha details:', error)
    });
  }


  onSubmit(): void {
    if (this.canchaForm.valid) {
      const canchaData: Cancha = {
        ...this.canchaForm.value,
        sede: { id: this.canchaForm.value.sedeId } // Asegúrate de que el sedeId se mapee correctamente
      };

      if (this.isEditMode) {
        const canchaId = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la URL
        this.canchaService.updateCancha(Number(canchaId), canchaData).subscribe({
          next: () => this.router.navigate(['/cancha-list']),
          error: (error) => console.error('Error updating cancha:', error)
        });
      } else {
        this.canchaService.createCancha(canchaData).subscribe({
          next: () => this.router.navigate(['/cancha-list']),
          error: (error) => console.error('Error creating cancha:', error)
        });
      }
    }
  }

}
