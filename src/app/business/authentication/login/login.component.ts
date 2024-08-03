
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
  user: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router){
    console.log('Login constructor')
  }

  login(): void {
    console.log('login login');
    console.log(this.user);
    console.log(this.password);
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
