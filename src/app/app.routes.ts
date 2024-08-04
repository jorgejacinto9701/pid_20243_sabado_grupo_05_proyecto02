import { TypeofTypeAnnotation } from './../../node_modules/@babel/types/lib/index-legacy.d';
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import LayoutComponent from './shared/components/layout/layout.component';



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
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component'),
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
        path: '**',
        redirectTo: 'dashboard'
    }
];
