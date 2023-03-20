import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobInformationCreation } from '../model/creation/users/JobInformationCreation';
import { Appointment } from '../model/representation/appointment/Appointment';
import { CleaningService } from '../model/representation/cleaning_service/CleaningService';
import { EmployeeAvailableInterval } from '../model/representation/shared/EmployeeAvailableInterval';
import { Employee } from '../model/representation/users/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  baseUrl: string = "";

  constructor(private http: HttpClient) { 
    this.baseUrl = "http://localhost:8080/api/employee";
  }

  updateJobInformation(jobInformationId: number, jobInformationCreation: JobInformationCreation) {
    return this.http.post(this.baseUrl + "/job-information/" + jobInformationId, jobInformationCreation);
  }

  getEmployeesAppointmentsForDate(employeeId: number, date: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.baseUrl + '/' + employeeId + '/appointments' + "?date=" + date);
  }

  getEmployeesAvailableIntervalsForDate(date: string, timeEstimation: number): Observable<EmployeeAvailableInterval[]> {
    return this.http.get<EmployeeAvailableInterval[]>(this.baseUrl + '/available-intervals', {
      params: {
        date: date,
        timeEstimation: timeEstimation
      }
    });
  }
}
