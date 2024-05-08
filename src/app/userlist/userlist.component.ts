import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { UserslistService } from '../service/userslist.service';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.sass'
})
export class UserlistComponent implements OnInit {
  rows: any[] = [];
 
  constructor(private usersListService: UserslistService) { }
 
  ngOnInit(): void {
    this.usersListService.getUsersList().subscribe(data => {
      this.rows = data.data.users;
    });
  }

}
