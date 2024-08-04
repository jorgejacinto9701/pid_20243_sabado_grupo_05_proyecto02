import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router){
    console.log('Logout constructor')
  }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.logout(); // Llama al método de logout del servicio de autenticación
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}
