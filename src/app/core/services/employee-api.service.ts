import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobInformationCreation } from '../model/creation/users/JobInformationCreation';
import { CleaningService } from '../model/representation/cleaning_service/CleaningService';
import { Employee } from '../model/representation/users/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/employee/";
  }

  modifyJobInfo(userId: number, dto: JobInformationCreation) {
    return this.http.post(this.baseUrl + "job-info/" + userId, dto);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.baseUrl + id);
  }

  getEmployeeCleaningServicesForDate(id: number, date: string): Observable<CleaningService[]> {
    return this.http.get<CleaningService[]>(this.baseUrl + 'employee-agenda/' + id + "?date=" + date);
  }
}
