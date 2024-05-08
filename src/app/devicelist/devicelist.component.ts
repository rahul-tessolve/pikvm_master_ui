import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { DevicelistService } from '../service/devicelist.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-devicelist',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './devicelist.component.html',
  styleUrl: './devicelist.component.sass'
})
export class DevicelistComponent implements OnInit {
  rows: any[] = [];
  filteredRows: any[] = [];
  searchInput: string = '';
  startDateRange: Date | string = '';
  endDateRange: Date | string = '';
  isDateRangePickerOpen: boolean = false;
  constructor(private devicelistservice: DevicelistService) { }
 
  ngOnInit(): void {
    this.devicelistservice.getDevicesList().subscribe(data => {
      console.log('API Response:', data.devices);
      
      this.rows = data.devices;
    });
  }
  openDateRanges(): void {
    this.isDateRangePickerOpen = !this.isDateRangePickerOpen; // Toggle the date range picker
  };
  filterRowsByDateRange(): void {
    if (this.startDateRange && this.endDateRange) {
      const startDate = new Date(this.startDateRange);
      const endDate = new Date(this.endDateRange);
      this.devicelistservice.getDevicesList().subscribe(data => {
      this.rows = data.devices.filter((row: { start_date: string | number | Date; }) => {
        const rowDate = new Date(row.start_date);
        return rowDate >= startDate && rowDate <= endDate;
      });
    });
    }
    this.isDateRangePickerOpen = false; // Close the date range picker after filtering
  }

  clearFilter(): void {
    this.devicelistservice.getDevicesList().subscribe(data => {
        this.rows = data.devices;
    });
  }

  search(): void {
    // Implement your search logic here
    // For example, you can filter the rows based on the searchInput value
    this.devicelistservice.getDevicesList().subscribe(data => {
      this.rows = data.devices.filter(
        (        row: { device_ip: string | string[]; user_created: string | string[]; }) => row.device_ip.includes(this.searchInput) ||
               row.user_created.includes(this.searchInput)
      );
    });
  }
  onSearch(event: any): void {
    const filterType: string = event.target.value;
    const currentDate = new Date();
    let startDate: Date;
    switch (filterType) {
        case 'thisWeek':
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
            break;
        case 'thisMonth':
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            break;
        case 'lastThreeMonths':
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
            break;
        default:
            startDate = new Date(0); // Filter for all
    }

    // Filter the rows based on the start date
    this.devicelistservice.getDevicesList().subscribe(data => {
        this.rows = data.devices.filter((row: { start_date: string }) => {
            const rowStartDate = new Date(row.start_date);
            return rowStartDate >= startDate;
        });
    });
  }

  // search(): void {
  //   if (!this.searchInput) {
  //     this.filteredRows = [...this.rows]; // Reset filtered rows if search input is empty
  //     return;
  //   }

  //   const searchTerm = this.searchInput.toLowerCase().trim();
  //   this.filteredRows = this.rows.filter(row =>
  //     row.device_ip.toLowerCase().includes(searchTerm) || row.user_created.toLowerCase().includes(searchTerm)
  //   );
  // }
}
