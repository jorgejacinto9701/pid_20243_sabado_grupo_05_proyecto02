import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const currentUser = authService.currentUserValue;

  console.log('AuthenticatedGuard');

  console.log(currentUser);

  if (currentUser !== null) {
    // logged in so return true
    return true;
  }

  console.log("navigate login");

  // not logged in so redirect to login page with the return url
  //return router.navigate(['/login']);
  //console.log(route);
  //console.log(state);
  console.log("route  ");
  console.log(route.url[0].path);

  if(route.url[0].path != 'login') {
    console.log("logged");
    return router.navigate(['/login'], { queryParams: { returnUrl:state.url } });
  }else{
    console.log("not logged");
    return true;
  }
};
