import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDto } from '../dto/EmployeeDto';

@Injectable({
  providedIn: 'root'
})
export class AdministratorApiService {
  baseUrl: string = "";

  constructor(private http: HttpClient) {
    this.baseUrl = "http://localhost:8080/api/administrator/";
  }

  getAllEmployees(): Observable<EmployeeDto[]> {
    return this.http.get<EmployeeDto[]>(this.baseUrl + "employees");
  }
}
