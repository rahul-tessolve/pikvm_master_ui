import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { take } from 'rxjs';
import { LoginService } from '../service/login.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  loginForm!: FormGroup;
  result!: Observable<any>;
  fieldTextType: boolean=false;
  repeatFieldTextType: boolean=false;

  constructor(private loginService: LoginService, private router:Router) {
  }
  
  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.result = this.loginService.postLogin(this.loginForm.value.username, this.loginForm.value.password);
      this.result.subscribe(result => {
        console.log("Result", result); 
        const token = result.user.token;
        if (token) {
          localStorage.setItem('token', token); // Store token in localStorage
          
          // Redirect to another page if login is successful
          // For example, navigate to the dashboard page
          // Replace '/dashboard' with the actual route
          this.router.navigate(['']);
        } else {
          console.error('Token not found in login response');
          // Handle error: Token not found
        }
      }, error => {
        console.error('Login failed:', error);
        // Handle login error
      });
    }
  };


  toggleFieldTextType() {
    // console.log('toggleFieldTextType() method called');
    this.fieldTextType = !this.fieldTextType;
  }
  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
}
