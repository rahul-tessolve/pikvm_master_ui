// auth.guard.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

// import {localStorage} from Storage

@Injectable({
  providedIn: 'root',
})

export class AuthGuard {

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object ) {
    if (isPlatformBrowser(this.platformId)) {
    console.log('localStorage is available');
    console.log(localStorage.getItem('token'));
    }
    else {
      console.error('localStorage is not available in this environment');
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if token exists
    if (isPlatformBrowser(this.platformId)) {
      console.log('localStorage is available');
      const token = localStorage.getItem('token');
      // localStorage.removeItem('token');
      if (token) {
        // Token exists, user is authenticated, allow navigation
        return true;
      } else {
        // Token doesn't exist, user is not authenticated, redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    }
    else {
      // Handle non-browser environment (e.g., during SSR)
      // You might want to handle this case differently based on your requirements
      console.error('localStorage is not available in this environment');
      return false; // Return a default value
    }
  }
}
  // canActivate() {
  //   if (false) {
  //       return true; // User is authenticated, allow navigation
  //   } 
  //   else {
  //       return this.router.navigate(['/login']);
  //   }
  // }
