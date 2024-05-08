// auth.guard.ts
import { Inject, PLATFORM_ID,Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthUnguard {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
    console.log('localStorage is available');
    console.log(localStorage.getItem('token'));
    }
    else {
      console.error('localStorage is not available in this environment');
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Check if token exists
    if (isPlatformBrowser(this.platformId)) {
      console.log('localStorage is available');
      const token = localStorage.getItem('token');

      if (token) {
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
        // Token exists, user is authenticated, allow navigation

      } else {
        return true;
        // Token doesn't exist, user is not authenticated, redirect to login page

      }
    }
    else {
      // Handle non-browser environment (e.g., during SSR)
      // You might want to handle this case differently based on your requirements
      console.error('localStorage is not available in this environment');
      return false; // Return a default value
    }
  }

  // canActivate() {
  //   if (false) {
  //       this.router.navigate(['/useradd']);
  //       return false;
  //   } 
  //   else {
  //     return true; // User is authenticated, allow navigation
  //   }
  // }
}