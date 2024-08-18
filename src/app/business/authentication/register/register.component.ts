import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nombre: string = '';
  apepaterno: string = '';
  apematerno: string = '';
  dni: string = '';
  email: string = '';

  get isNombreValid(): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.nombre) && this.nombre.trim().length > 0;
  }

  get isApePaternoValid(): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.apepaterno) && this.apepaterno.trim().length > 0;
  }

  get isApeMaternoValid(): boolean {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(this.apematerno) && this.apematerno.trim().length > 0;
  }


  get isDniValid(): boolean {
    const dniPattern = /^\d{8}$/;
    return dniPattern.test(this.dni);
  }


  get isEmailValid(): boolean {
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.email);
  }

  isFormValid(): boolean {
    return this.isNombreValid &&
           this.isApePaternoValid &&
           this.isApeMaternoValid &&
           this.isDniValid &&
           this.isEmailValid;
  }

  constructor(private userService: UserService,private router: Router){
    console.log('Login constructor')
  }

  registrar(): void {
    if (this.isFormValid()) {
      // Implementa la lógica para registrar al usuario

    this.userService.register(this.nombre, this.apepaterno, this.apematerno, this.dni, this.email)
    .subscribe({
      next: (msg)=> {
        console.log('login sucess')
        Swal.fire('Thank you...', 'Your Password is: '+msg, 'success')
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('Login failed')
        console.error('Login failed', err);
      }
    });
    console.log('Usuario registrado:', this.nombre, this.apepaterno, this.apematerno, this.dni, this.email);
    }

  }
  volver(): void {
    this.router.navigate(['/login']);
  }
}
