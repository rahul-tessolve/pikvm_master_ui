import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './master.component.html',
  styleUrl: './master.component.sass'
}) 
export class MasterComponent {
  isSidebarActive: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

}
