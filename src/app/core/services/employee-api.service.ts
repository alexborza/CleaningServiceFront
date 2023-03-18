import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Frequency } from '../model/representation/cleaning_service/Frequency';
import { CleaningService } from '../model/representation/cleaning_service/CleaningService';
import { EmergencyContactInformationDto } from '../model/EmergencyContactInformationDto';
import { EmployeeDto } from '../model/EmployeeDto';
import { EmployeesDayAgenda } from '../model/EmployeesDayAgenda';
import { JobInformation } from '../model/users/JobInformation';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/employee/";
  }

  modifyEmergencyContactInfo(userId: number, dto: EmergencyContactInformationDto) {
    return this.http.post(this.baseUrl + "emergency-contact-info/" + userId, dto);
  }

  modifyJobInfo(userId: number, dto: JobInformation) {
    return this.http.post(this.baseUrl + "job-info/" + userId, dto);
  }

  getEmployee(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(this.baseUrl + id);
  }

  getEmployeesAgendaForDate(date: string, cleaningFrequency: string): Observable<EmployeesDayAgenda[]>{
    return this.http.get<EmployeesDayAgenda[]>(this.baseUrl + "employees-day-agenda?date=" + date + "&frequency=" + cleaningFrequency);
  }

  getEmployeeCleaningServicesForDate(id: number, date: string): Observable<CleaningService[]> {
    return this.http.get<CleaningService[]>(this.baseUrl + 'employee-agenda/' + id + "?date=" + date);
  }
}
