import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../model/creation/users/LoginRequest';
import { SignupRequest } from '../model/creation/users/SignupRequest';
const AUTH_API = 'http://localhost:8080/api/auth';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(AUTH_API + '/signin', loginRequest, httpOptions);
  }

  register(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(AUTH_API + '/signup', signupRequest, httpOptions);
  }
}