import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function soloTexto(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      //obtiene valor del formulario
      const textoIngresado: string = control.value || '';
      //permitir solo letras
      const regex = /^[a-zA-Z]*$/; 
      //verifica que contenga solo letras o espacio
      if (!textoIngresado.match(regex)) {
        //sino retorna mensaje error
        return { 'soloTexto': { message: 'Este campo solo permite texto.' } }; 
      }
      return null; 
    };
  }
  