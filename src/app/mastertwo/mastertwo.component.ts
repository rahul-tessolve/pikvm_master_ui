import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mastertwo',
  standalone: true,
  imports: [RouterOutlet, RouterLink ],
  templateUrl: './mastertwo.component.html',
  styleUrl: './mastertwo.component.sass'
})
export class MastertwoComponent {
  isSidebarActive: boolean = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

}
