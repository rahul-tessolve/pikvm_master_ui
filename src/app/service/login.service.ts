import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // URL which returns list of JSON items (API end-point URL)
  private readonly URL = 'http://www.rutomatix.com/login/';

  constructor(private http: HttpClient) { }

  // create a method named: resolveItems()
  // this method returns list-of-items in form of Observable
  // every HTTTP call returns Observable object
  postLogin(username: string, password: string): Observable<any> {
    console.log('Request is sent!');
    // Using the POST method
    const body = {
      'username': username,
      'password': password
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.URL, body,{ headers: headers });
    // return this.http.post(this.URL,
    //   {
    //     'username': username,
    //     'password': password
    //   },
    // );
      // headers);
  }
  handleLoginResponse(response: any): void {
    const token = response.Token;
    if (token) {
      // Save token to local storage
      localStorage.setItem('Token', token);
    }
  }
}
