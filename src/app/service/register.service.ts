import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly URL = 'http://rutomatix.com/addUser/';

  constructor(private http: HttpClient) { }

  // checkUsernameExists(username: string): Observable<any> {
  //   const url = this.apiUrl;
  //   return this.http.post(url, { username });
  // }
  // getAllUsers(): Observable<any[]> {
  //   const url = this.apiUrl; // Adjust this endpoint based on your API design
  //   return this.http.get<any[]>(url);
  // }
  // checkUsernameExists(username: string): Observable<boolean> {
  //   return this.getAllUsers().pipe(
  //     map(users => users.some(user => user.username === username))
  //   );
  // }
  addUser(first_name: string, last_name: string, username: string, email: string, password:string): Observable<any> {
    console.log('Request is sent!');
    // Define the request body with user data
    const body = {
      'first_name': first_name,
      'last_name': last_name,
      'username': username,
      'email': email,
      'password': password
    };

    // Define headers for the request
    // const headers = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the HTTP POST request to the API endpoint
    return this.http.post<any>(this.URL, body,{ headers: headers });
    //return this.http.post(this.apiUrl, requestBody, headers);
  }
}
