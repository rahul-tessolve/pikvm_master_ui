import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UseraddService {

  private readonly apiUrl = 'http://172.16.38.205/addUser/';

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
  addUser(first_name: string, last_name: string, username: string, email: string): Observable<any> {
    // Define the request body with user data
    const token = localStorage.getItem('token');
    if (token) {
      const requestBody = {
        'first_name': first_name,
        'last_name': last_name,
        'username': username,
        'email': email
      };

      // Define headers for the request
      const headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
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
}
  // addUser(first_name: string, last_name: string, username: string, email: string): Observable<any> {
  //   const url = this.apiUrl;
  //   return this.http.post(url, { first_name, last_name, username, email });
  // }
}

//   checkUsernameExists(username: string): Observable<boolean> {
//     // API endpoint to check if username exists
//     const url = `${this.apiUrl}/check-username`;

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });

//     // Make POST request to check if username exists
//     return this.http.post<boolean>(url, { username }, { headers });
//   }

//   addUser(name: string, username: string, email: string): Observable<any> {
//     // API endpoint to add user
//     const url = `${this.apiUrl}/add-user`;

//     // Define HTTP headers
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });

//     // Make POST request to add user
//     return this.http.post<any>(url, { name, username, email }, { headers });
//   }
// }