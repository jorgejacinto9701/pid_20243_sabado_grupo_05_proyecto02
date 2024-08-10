import { Component, Input, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { soloTexto } from "../../../../validator/validator";


@Component({
  selector: 'app-editar-cancha',
  standalone: true,
  imports: [],
  templateUrl: './editar-cancha.component.html',
  styleUrl: './editar-cancha.component.css'
})
export class EditarCanchaComponent {
  @Input() canchaEditar: any = {};
  canchaForm: FormGroup;


  constructor(private fb: FormBuilder) {
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
    if (changes['personaEditar'] && this.canchaEditar) {
      this.canchaForm.patchValue(this.canchaEditar);
    }
    console.log("onchange");
  }
  

  guardar(): void {

    const valoresFormulario = this.canchaForm.value;
    console.log("Persona ", this.canchaEditar?.nombre);
    console.log("Persona editada", valoresFormulario);
    
    if (this.canchaForm.valid) {
      
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      
      Object.values(this.canchaForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    
  }
}
