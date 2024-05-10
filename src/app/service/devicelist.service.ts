import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DevicelistService {
  private readonly URL= 'http://www.rutomatix.com/devices/';

  constructor(private http:HttpClient) {}
  getDevicesList(){
    console.log('Request is sent!');
    // Using the POST method
    const token = localStorage.getItem('token');
    if (token) {
      const headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        })
      };
      console.log('Request headers:', headers);
      const authorizationHeader = headers.headers.get('Authorization');
      console.log('Authorization header:', authorizationHeader);

      return this.http.get<any>(this.URL, headers);
    }
    else {
      console.error('Token not found in local storage');
      return throwError('Token not found in local storage');
    }
  }
}
