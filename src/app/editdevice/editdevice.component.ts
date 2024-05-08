import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DeviceaddService } from '../service/deviceadd.service';

@Component({
  selector: 'app-editdevice',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './editdevice.component.html',
  styleUrl: './editdevice.component.sass'
})
export class EditdeviceComponent {

  [x: string]: any;
  editdeviceform!: FormGroup;

  constructor(
    private deviceaddservice: DeviceaddService
  ) {
  }
  ngOnInit() {
    this.editdeviceform = new FormGroup({
      // username: new FormControl('', Validators.required),
      // email: new FormControl('', [Validators.required, Validators.email]),
      ipaddress: new FormControl('', [Validators.required, Validators.pattern('^([0-9]{1,3}\.){3}[0-9]{1,3}$')]),
      startDate: new FormControl ('', Validators.required),
      startTime: new FormControl ('', Validators.required),
      endDate: new FormControl ('', Validators.required),
      endTime: new FormControl ('', Validators.required),
    });
  }
  onSubmit(): void {
    if (this.editdeviceform.valid) {
      // const username = this.editdeviceform.get('username')!.value;
      // const email = this.editdeviceform.get('email')!.value;
      const ipaddress = this.editdeviceform.get('ipaddress')!.value;
      const startDate = this.editdeviceform.get('startDate')!.value;
      const startTime = this.editdeviceform.get('startTime')!.value;
      const endDate = this.editdeviceform.get('endDate')!.value;
      const endTime = this.editdeviceform.get('endTime')!.value;
}
  }
  onCancel() {
    // Implement the cancel action here
    // For example, you can navigate to another route or reset the form
    this.editdeviceform.reset(); // Reset the form
    // Alternatively, you can navigate to another route
    // this.router.navigate(['/other-route']);
  }
}
