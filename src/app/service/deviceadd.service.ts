import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeviceaddService {

  private readonly apiUrl = 'http://rutomatix.com/add-device/';

  constructor(private http: HttpClient) { }

  // checkUsernameExists(username: string): Observable<any> {
  //   const url = this.apiUrl;
  //   return this.http.post(url, { username });
  // }
  getAllUsers(): Observable<any[]> {
    const url = this.apiUrl; // Adjust this endpoint based on your API design
    return this.http.get<any[]>(url);
  }
  addDevice(ipaddress: string, startDate: string, startTime:string, endDate: string, endTime: string, username:string): Observable<any> {
    // Define the request body with user data
    const token = localStorage.getItem('token');
    if (token) {
      const requestBody = {
        'device_ip': ipaddress,
        'start_date': startDate,
        'start_time': startTime,
        'end_date': endDate,
        'end_time': endTime,
        'user_created': username
      };

      // Define headers for the request
      const headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }),
      };
      console.log('Request headers:', headers);
        const authorizationHeader = headers.headers.get('Authorization');
        console.log('Authorization header:', authorizationHeader);

        // Make the HTTP POST request to the API endpoint
        return this.http.post(this.apiUrl, requestBody, headers);
      }
    else {
        console.error('Token not found in local storage');
        return throwError('Token not found in local storage');
      }

    // Make the HTTP POST request to the API endpoint
    // return this.http.post(this.apiUrl, requestBody, headers);
  }
  // addUser(first_name: string, last_name: string, username: string, email: string): Observable<any> {
  //   const url = this.apiUrl;
  //   return this.http.post(url, { first_name, last_name, username, email });
  // }
}