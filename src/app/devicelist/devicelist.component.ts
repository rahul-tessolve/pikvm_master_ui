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
  originalRows: any[]=[];
  filteredRows: any[] = [];
  searchInput: string = '';
  startDateRange: Date | string = '';
  endDateRange: Date | string = '';
  isDateRangePickerOpen: boolean = false;
  currentPage: number = 1;
  itemsPerPage:number = 10;
  totalPages: number = 0; // Declare totalPages as a property


  constructor(private devicelistservice: DevicelistService) { }
  
 
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.devicelistservice.getDevicesList().subscribe(data => {
        console.log('API Response:', data.devices);
        this.originalRows = data.devices;
        this.filteredRows = data.devices; // Initialize filteredRows with all data
        this.currentPage = 1; // Initialize currentPage to 1
        this.totalPages = Math.ceil(this.originalRows.length / this.itemsPerPage); // Calculate totalPages
        this.loadPage(this.currentPage);
    });
}
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  loadPage(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredRows.length);
    this.rows = this.filteredRows.slice(startIndex, endIndex);
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadPage(this.currentPage);
    }
  }

  filterRowsByDateRange(): void {
    let filteredData = this.originalRows;

    // Apply search filter
    if (this.searchInput) {
      const searchText = this.searchInput.toLowerCase();
      filteredData = filteredData.filter(row =>
        row.device_ip.toLowerCase().includes(searchText) ||
        row.user_created.toLowerCase().includes(searchText)
      );
    }

    // Apply date range filter
    if (this.startDateRange && this.endDateRange) {
      const startDate = new Date(this.startDateRange);
      const endDate = new Date(this.endDateRange);
      filteredData = filteredData.filter(row => {
        const rowDate = new Date(row.start_date);
        return rowDate >= startDate && rowDate <= endDate;
      });
    }

    this.filteredRows = filteredData;
    this.currentPage = 1; // Reset to first page when filters change
    this.loadPage(this.currentPage);
  }

  openDateRanges(): void {
    this.isDateRangePickerOpen = !this.isDateRangePickerOpen; // Toggle the date range picker
  };

  clearFilter(): void {
    this.searchInput = '';
    this.startDateRange = '';
    this.endDateRange = '';
    this.filterRowsByDateRange();
  }

  search(): void {
    // Filter rows based on the search input
    if (this.searchInput.trim() !== '') {
        const searchText = this.searchInput.toLowerCase().trim();
        this.filteredRows = this.originalRows.filter(row =>
            row.device_ip.toLowerCase().includes(searchText) ||
            row.user_created.toLowerCase().includes(searchText)
        );
    } else {
        // If search input is empty, display all rows
        this.filteredRows = this.originalRows;
    }
    // Reset pagination to the first page
    this.currentPage = 1;
    this.loadPage(this.currentPage);
}

onSearch(event: any): void {
  const filterType: string = event.target.value;
  const currentDate = new Date();
  let startDate: Date | null = null;
  let endDate: Date;

  switch (filterType) {
      case 'thisWeek':
          // Calculate the start of the current week (Sunday)
          const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1); // Sunday of the current week
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDayOfWeek);
          // Calculate the end of the current week (Saturday)
          const lastDayOfWeek = firstDayOfWeek + 6;
          endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDayOfWeek);
          break;
      case 'thisMonth':
          // Calculate the start of the current monthBy
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          // Calculate the end of the current month by getting the next month's start and subtracting one day
          endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          break;
      case 'lastThreeMonths':
          // Calculate the start of three months ago
          startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);
          // Calculate the end of the current month
          endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
          break;
      default:
          // startDate = new Date(0); // Filter for all
          endDate = currentDate; // Set the end date to current date
          break;
  }

  if (startDate !== null) {
      // Filter rows based on the selected date range
      this.filteredRows = this.originalRows.filter((row: { start_date: string }) => {
          const rowStartDate = new Date(row.start_date);
          return rowStartDate >= startDate && rowStartDate <= endDate;
      });
  } else {
      // If startDate is null, reset to display all rows
      this.filteredRows = this.originalRows;
  }

  // Reset pagination to the first page
  this.currentPage = 1;
  this.loadPage(this.currentPage);
}

}
