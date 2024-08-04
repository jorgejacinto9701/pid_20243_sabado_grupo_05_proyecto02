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

  constructor(private userService: UserService,private router: Router){
    console.log('Login constructor')
  }

  registrar(): void {
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

  }
  volver(): void {
    this.router.navigate(['/login']);
  }
}
