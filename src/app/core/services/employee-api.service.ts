import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CleaningFrequencyEnum } from '../dto/CleaningFrequencyEnum';
import { CleaningServiceDto } from '../dto/CleaningServiceDto';
import { EmergencyContactInformationDto } from '../dto/EmergencyContactInformationDto';
import { EmployeeDto } from '../dto/EmployeeDto';
import { EmployeesDayAgenda } from '../dto/EmployeesDayAgenda';
import { JobInformationDto } from '../dto/JobInformationDto';

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

  modifyJobInfo(userId: number, dto: JobInformationDto) {
    return this.http.post(this.baseUrl + "job-info/" + userId, dto);
  }

  getEmployee(id: number): Observable<EmployeeDto> {
    return this.http.get<EmployeeDto>(this.baseUrl + id);
  }

  getEmployeesAgendaForDate(date: string, cleaningFrequency: string): Observable<EmployeesDayAgenda[]>{
    return this.http.get<EmployeesDayAgenda[]>(this.baseUrl + "employees-day-agenda?date=" + date + "&frequency=" + cleaningFrequency);
  }

  getEmployeeCleaningServicesForDate(id: number, date: string): Observable<CleaningServiceDto[]> {
    return this.http.get<CleaningServiceDto[]>(this.baseUrl + 'employee-agenda/' + id + "?date=" + date);
  }
}
