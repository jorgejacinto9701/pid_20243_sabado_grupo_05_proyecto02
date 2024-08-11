import { Component, EventEmitter, Input, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { soloTexto } from "../../../../validator/validator";
import { CommonModule } from "@angular/common";
import { CanchaService } from "../../../../core/services/cancha.service";


@Component({
  selector: 'app-editar-cancha',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './editar-cancha.component.html',
  styleUrl: './editar-cancha.component.css'
})
export class EditarCanchaComponent {
  @Input() canchaEditar: any = {};
  @Output() modoOculto = new EventEmitter();
  canchaForm: FormGroup;


  constructor(private fb: FormBuilder, private canchaService: CanchaService) {
    this.canchaForm = this.fb.group({
      idCancha: '',
      numero: ['', [Validators.required,]],
      sede: ['', [Validators.required, soloTexto()]],
      precio: ['', [Validators.required,]],
      flat: ['', [Validators.required, soloTexto()]],
    });

    console.log("constructor");
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['canchaEditar'] && this.canchaEditar) {
      this.canchaForm.patchValue(this.canchaEditar);
    }
    console.log("onchange");
  }
  

  guardar(): void {
    const valoresFormulario = this.canchaForm.value;
    console.log("Cancha ", this.canchaEditar?.nombre);
    console.log("Cancha editada", valoresFormulario);
    
    if (this.canchaForm.valid) {
      
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
            
      Object.values(this.canchaForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.canchaService.actualizar(valoresFormulario).subscribe(
      response => {
        console.log('Cancha editada correctamente:', response);
        alert('Cancha editado correctamente');
        this.modoOculto.emit();
      },
      error => {
        console.error('Error al editar cancha:', error);
        alert('Error al editar cancha');	
      }
    )
  }
    
  }
