import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // URL which returns list of JSON items (API end-point URL)
  private readonly URL = 'http://localhost:5000/login';

  constructor(private http: HttpClient) { }

  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  postLogin(email: string, password: string): Observable<any> {
    console.log('Request is sent!');
    // Using the POST method
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.URL,
      {
        'email': email,
        'password': password
      },
      headers);
  }
}
