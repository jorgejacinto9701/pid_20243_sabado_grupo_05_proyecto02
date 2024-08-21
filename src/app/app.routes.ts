import { FormBuilder } from '@angular/forms';
import { TypeofTypeAnnotation } from './../../node_modules/@babel/types/lib/index-legacy.d';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import LayoutComponent from './shared/components/layout/layout.component';
import { SedeListComponent } from './business/sede/sede-list/sede-list.component';
import { SedeFormComponent } from './business/sede/sede-form/sede-form.component';



export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component'),
                canActivate: [AuthGuard]
            },
            {
              path: 'sede-list',
              loadComponent: () => import('./business/sede/sede-list/sede-list.component').then(m => m.SedeListComponent),
              canActivate: [AuthGuard]
            },
            {
              path: 'sede-form',
              loadComponent: () => import('./business/sede/sede-form/sede-form.component').then(m => m.SedeFormComponent),
              canActivate: [AuthGuard]
            },
            {
              path: 'sede-form/edit/:id',
              loadComponent: () => import('./business/sede/sede-form/sede-form.component').then(m => m.SedeFormComponent),
              canActivate: [AuthGuard]
            },
            {
              path: 'sede-form/create',
              loadComponent: () => import('./business/sede/sede-form/sede-form.component').then(m => m.SedeFormComponent),
              canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component'),
                canActivate: [AuthGuard]
            },
            {
              path: 'registro-reserva',
              loadComponent: () => import('./business/reserva/registro-reserva/registro-reserva.component').then(m => m.RegistroReservaComponent),
              canActivate: [AuthGuard]
            },
          {
            path: 'cancha-list',
            loadComponent: () => import('./business/cancha/cancha-list/cancha-list.component').then(m => m.CanchaListComponent),
            canActivate: [AuthGuard]
          },
          {
            path: 'cancha-form',
            loadComponent: () => import('./business/cancha/cancha-form/cancha-form.component').then(m => m.CanchaFormComponent),
            canActivate: [AuthGuard]
          },
          {
            path: 'cancha-form/edit/:id',
            loadComponent: () => import('./business/cancha/cancha-form/cancha-form.component').then(m => m.CanchaFormComponent),
            canActivate: [AuthGuard]
          },
          {
            path: 'cancha-form/create',
            loadComponent: () => import('./business/cancha/cancha-form/cancha-form.component').then(m => m.CanchaFormComponent),
            canActivate: [AuthGuard]
          },
          {
            path: 'reserva-filter-cancha',
            loadComponent: () => import('./business/reserva/reserva-filter-cancha/reserva-filter-cancha.component').then(m => m.ReservaFilterCanchaComponent),
            canActivate: [AuthGuard]
          },
          {
            path: 'reserva-filter-fecha',
            loadComponent: () => import('./business/reserva/reserva-filter-fecha/reserva-filter-fecha.component').then(m => m.ReservaFilterFechaComponent),
            canActivate: [AuthGuard]
          },

          {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: ()=> import('./business/authentication/login/login.component'),
        canActivate: [AuthenticatedGuard],

    },
    {
        path: 'logout',
        loadComponent: () => import('./business/authentication/logout/logout.component').then(m => m.LogoutComponent),
    },
    {
      path: 'register',
      loadComponent: () => import('./business/authentication/register/register.component').then(m => m.RegisterComponent),
    },
    { path: '', redirectTo: 'sedes', pathMatch: 'full' },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
