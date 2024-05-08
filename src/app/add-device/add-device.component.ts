import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeviceaddService } from '../service/deviceadd.service';

@Component({
  selector: 'app-add-device',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.sass'
})
export class AddDeviceComponent{
  [x: string]: any;
  deviceaddform!: FormGroup;
  usernameExists: boolean = false;
  //result!: Observable<any>;

  constructor(
    private deviceaddservice: DeviceaddService
  ) {
  }
  ngOnInit() {
    this.deviceaddform = new FormGroup({
      username: new FormControl('', Validators.required),
      ipaddress: new FormControl('', [Validators.required, Validators.pattern('^([0-9]{1,3}\.){3}[0-9]{1,3}$')]),
      startDate: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
    });
  }
  onSubmit(): void {
    if (this.deviceaddform.valid) {
      const username = this.deviceaddform.get('username')!.value;
      const ipaddress = this.deviceaddform.get('ipaddress')!.value;
      const startDate = this.deviceaddform.get('startDate')!.value;
      const startTime = this.deviceaddform.get('startTime')!.value;
      const endDate = this.deviceaddform.get('endDate')!.value;
      const endTime = this.deviceaddform.get('endTime')!.value;

      // Check if username already exists
      // this.deviceaddservice.checkUsernameExists(username).subscribe((exists: boolean) => {
      //   //console.log('Username exists:', exists); // Log the response
      //   if (exists) {
      //     // Username already exists, set flag and return
      //     this.usernameExists = true;
      //     return;
      //   }
      this.deviceaddservice.addDevice(ipaddress, startDate, startTime, endDate, endTime, username).subscribe(() => {
        console.log('Device added:', Response); // Log the respons
        // User added successfully, reset form
        this.deviceaddform.reset();
        //this.usernameExists = false;
      }, (error) => {
        // Handle errors here if necessary
        console.error('Error loading device list:', error);
      });
      // } else {
      //   // Form is invalid, mark all fields as touched to display validation errors
      //   this.deviceaddform.markAllAsTouched();
      // }
    }
  }
}
