import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../confirm-password.validator';
import { HeaderComponent } from '../header/header.component';
import { Observable } from 'rxjs';
import { RegisterService } from '../service/register.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink,HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {
  registerForm!: FormGroup;
  result!: Observable<any>;
  fieldTextType: boolean=false;
  repeatFieldTextType: boolean=false;
  registrationSuccess: boolean = false;

  constructor(private registerService:RegisterService){}

  ngOnInit() {
    this.registerForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      last_name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)]),
      password2: new FormControl('', [Validators.required]), },
      { validators: [confirmPasswordValidator] });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.result = this.registerService.addUser(this.registerForm.value.first_name, this.registerForm.value.last_name, this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password);
      this.result.subscribe(result => {
        console.log("Result", result);
        if (result.status === 1) {
          this.registrationSuccess = true;
          console.log("User registered successfully!");
        } else {
          this.registrationSuccess = false;
        }
      });
    }
  }

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //   }
  //   else {
  //     this.registerForm.markAllAsTouched();
  //   }
  // }
  toggleFieldTextType() {
    // console.log('toggleFieldTextType() method called');
    this.fieldTextType = !this.fieldTextType;
  }
  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  
}
