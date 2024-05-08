import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UseraddService } from '../service/useradd.service';

@Component({
  selector: 'app-useradd',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule,],
  templateUrl: './useradd.component.html',
  styleUrl: './useradd.component.sass'
})

export class UseraddComponent {
[x: string]: any;
  useraddform!: FormGroup;
  usernameExists: boolean = false;
  result!: Observable<any>;

  constructor(
    private useraddservice: UseraddService) {
  }
  ngOnInit() {
    this.useraddform = new FormGroup({
      // first_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      // last_name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      // username: ['', Validators.required],
      // //email: ['', [Validators.required, Validators.email]]
      first_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      last_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
  onSubmit(): void {
    if (this.useraddform.valid) {
      console.log(this.useraddform.value);
      // const first_name = this.useraddform.get('first_name')!.value;
      // const last_name = this.useraddform.get('last_name')!.value;
      // const username = this.useraddform.get('username')!.value;
      // const email = this.useraddform.get('email')!.value;

      // Check if username already exists
      // this.useraddservice.checkUsernameExists(username).subscribe((exists: boolean) => {
      //   //console.log('Username exists:', exists); // Log the response
      //   if (exists) {
      //     // Username already exists, set flag and return
      //     this.usernameExists = true;
      //     return;
      //   }
      this.result = this.useraddservice.addUser(this.useraddform.value.first_name, this.useraddform.value.last_name, this.useraddform.value.username, this.useraddform.value.email);
      this.result.subscribe(result => {
        console.log('User added:', result); // Log the respons
        // User added successfully, reset form
        this.useraddform.reset();
        //this.usernameExists = false;
      }, (error) => {
        // Handle errors here if necessary
        console.error('Error adding user:', error);
      });
      // });
    } else {
      // Form is invalid, mark all fields as touched to display validation errors
      this.useraddform.markAllAsTouched();
    }
  }
}