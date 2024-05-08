// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInStatus = false;

  constructor() {}

  // Method to check if the user is logged in
  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  // Method to set the login status
  setLoggedInStatus(status: boolean) {
    this.isLoggedInStatus = status;
  }
}

// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService implements CanActivate {

//   isLoggedIn = true; // Set this based on the user's authentication status

//   constructor(private router: Router) {}

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if (this.isLoggedIn) {
//       // User is logged in, allow navigation to master-loggedin route
//       return true;
//     } else {
//       // User is not logged in, allow navigation to master route
//       return true;
//     }
//   }

//   setLoggedInStatus(status: boolean) {
//     this.isLoggedIn = status;
//   }
// }
