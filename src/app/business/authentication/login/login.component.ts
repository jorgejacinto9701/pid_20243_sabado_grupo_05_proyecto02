
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent  {

  isUserValid: boolean = true;
  isPasswordValid: boolean = true;
  user: string = '';
  password: string = '';

  validateEmail(email: string): void {
    this.isUserValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  validatePassword(password: string): void {
    this.isPasswordValid = password.length > 0; // Aquí puedes agregar más validaciones
  }

  get isFormValid(): boolean {
    return this.isUserValid && this.isPasswordValid && !!this.user && !!this.password;
  }


  constructor(private authService: AuthService, private router: Router){
    console.log('Login constructor')
  }

  login(): void {
    if (this.isFormValid) {
      // Implementa la lógica de inicio de sesión
      console.log('Formato Valido...');
      console.log('Usuario:' + this.user);
      console.log('Contraseña: '+this.password);
      this.authService.login(this.user, this.password)
      .subscribe({
        next: ()=> {
          console.log('login sucess')
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log('Login failed')
          console.error('Login failed', err);
        }
      });
    }

  }

}
